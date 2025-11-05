import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import Login from './components/Login';
import ChatRoom from './components/ChatRoom';
import RoomList from './components/RoomList';
import './App.css';

const socket = io('http://localhost:5000');

function App() {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState('general');
  const [privateChats, setPrivateChats] = useState({});

  useEffect(() => {
    // Listen for incoming messages
    socket.on('message', (message) => {
      setMessages(prev => [...prev, message]);
    });

    // Listen for private messages
    socket.on('private_message', (message) => {
      setPrivateChats(prev => {
        const otherUser = message.username === user?.username ? message.to : message.username;
        const chatKey = [user?.username, otherUser].sort().join('_');
        
        return {
          ...prev,
          [chatKey]: [...(prev[chatKey] || []), message]
        };
      });
    });

    // Listen for user status updates
    socket.on('user_status', (data) => {
      setOnlineUsers(prev => {
        const filtered = prev.filter(u => u.username !== data.username);
        if (data.online) {
          return [...filtered, data];
        }
        return filtered;
      });
    });

    // Listen for typing indicators
    socket.on('user_typing', (data) => {
      if (data.room === currentRoom) {
        setTypingUsers(prev => {
          const filtered = prev.filter(u => u.username !== data.username);
          if (data.typing) {
            return [...filtered, data];
          }
          return filtered;
        });
      }
    });

    // Listen for online users list
    socket.on('online_users', (users) => {
      setOnlineUsers(users);
    });

    // Listen for room list
    socket.on('room_list', (roomList) => {
      setRooms(roomList);
    });

    // Listen for new rooms
    socket.on('new_room', (room) => {
      setRooms(prev => [...prev, room]);
    });

    // Listen for room messages
    socket.on('room_messages', (data) => {
      if (data.room === currentRoom) {
        setMessages(data.messages);
      }
    });

    // Listen for errors
    socket.on('error', (error) => {
      console.error('Socket error:', error);
      alert(error.message);
    });

    return () => {
      socket.off('message');
      socket.off('private_message');
      socket.off('user_status');
      socket.off('user_typing');
      socket.off('online_users');
      socket.off('room_list');
      socket.off('new_room');
      socket.off('room_messages');
      socket.off('error');
    };
  }, [currentRoom, user]);

  const handleLogin = (username) => {
    const userData = { username };
    setUser(userData);
    socket.emit('user_join', userData);
  };

  const sendMessage = (content) => {
    const message = {
      content,
      username: user.username,
      room: currentRoom
    };
    socket.emit('send_message', message);
  };

  const sendPrivateMessage = (to, content) => {
    socket.emit('private_message', { to, content, from: user.username });
  };

  const handleTyping = (typing) => {
    socket.emit('typing', { 
      username: user.username, 
      typing,
      room: currentRoom 
    });
  };

  const joinRoom = (roomName) => {
    socket.emit('join_room', { 
      room: roomName, 
      username: user.username 
    });
    setCurrentRoom(roomName);
    setMessages([]);
  };

  const loadOlderMessages = () => {
    if (messages.length > 0) {
      const oldestMessage = messages[0];
      socket.emit('get_older_messages', {
        room: currentRoom,
        before: oldestMessage.timestamp
      });
    }
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="chat-app">
      <div className="sidebar">
        <RoomList 
          rooms={rooms} 
          currentRoom={currentRoom}
          onJoinRoom={joinRoom}
          currentUser={user.username}
        />
        
        <div className="online-users-section">
          <h3>Online Users ({onlineUsers.length})</h3>
          <div className="users-list">
            {onlineUsers.map((user) => (
              <div key={user.username} className="user-item">
                <div className="user-status">
                  <div className="status-dot online"></div>
                  <span className="username">
                    {user.username}
                    {user.username === user.username && ' (You)'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="chat-main">
        <ChatRoom
          user={user}
          messages={messages}
          currentRoom={currentRoom}
          typingUsers={typingUsers}
          onSendMessage={sendMessage}
          onTyping={handleTyping}
          onLoadOlderMessages={loadOlderMessages}
        />
      </div>
    </div>
  );
}

export default App;