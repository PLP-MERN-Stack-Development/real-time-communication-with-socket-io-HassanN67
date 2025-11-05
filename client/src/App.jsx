import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import Login from './components/Login';
import ChatRoom from './components/ChatRoom';

const socket = io('http://localhost:5000');

function App() {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);

  useEffect(() => {
    console.log('Setting up socket listeners...');

    socket.on('message', (message) => {
      console.log('New message received:', message);
      setMessages(prev => [...prev, message]);
    });

    socket.on('user_status', (data) => {
      console.log('User status update:', data);
      setOnlineUsers(prev => {
        const filtered = prev.filter(u => u.username !== data.username);
        if (data.online) {
          return [...filtered, data];
        }
        return filtered;
      });
    });

    socket.on('user_typing', (data) => {
      console.log('Typing indicator:', data);
      setTypingUsers(prev => {
        const filtered = prev.filter(u => u.username !== data.username);
        if (data.typing) {
          return [...filtered, data];
        }
        return filtered;
      });
    });

    socket.on('online_users', (users) => {
      console.log('Online users:', users);
      setOnlineUsers(users);
    });

    socket.on('message_history', (history) => {
      console.log('Message history loaded:', history.length, 'messages');
      setMessages(history);
    });

    socket.on('error', (error) => {
      console.error('Socket error:', error);
      alert(error.message);
    });

    return () => {
      socket.off('message');
      socket.off('user_status');
      socket.off('user_typing');
      socket.off('online_users');
      socket.off('message_history');
      socket.off('error');
    };
  }, []);

  const handleLogin = (username) => {
    console.log('Logging in user:', username);
    const userData = { username };
    setUser(userData);
    socket.emit('user_join', userData);
  };

  const sendMessage = (content) => {
    if (!user) return;
    
    console.log('Sending message:', content);
    const message = {
      content,
      username: user.username,
      room: 'general'
    };
    socket.emit('send_message', message);
  };

  const handleTyping = (typing) => {
    if (!user) return;
    
    socket.emit('typing', { 
      username: user.username, 
      typing,
      room: 'general'
    });
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="h-screen bg-gray-100 flex items-center justify-center">
      <div className="flex h-[90vh] w-full max-w-6xl bg-white rounded-lg shadow-lg overflow-hidden">
        <ChatRoom
          user={user}
          messages={messages}
          onlineUsers={onlineUsers}
          typingUsers={typingUsers}
          onSendMessage={sendMessage}
          onTyping={handleTyping}
        />
      </div>
    </div>
  );
}

export default App;