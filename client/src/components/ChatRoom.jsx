import React from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import OnlineUsers from './OnlineUsers';

const ChatRoom = ({ user, messages, onlineUsers, typingUsers, onSendMessage, onTyping }) => {
  return (
    <>
      {/* Sidebar */}
      <div className="w-80 bg-gray-800 text-white flex flex-col">
        <div className="p-4 bg-gray-900 border-b border-gray-700">
          <h3 className="font-semibold text-lg">Welcome, {user.username}!</h3>
          <div className="flex items-center mt-1">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            <span className="text-sm text-gray-300">Online</span>
          </div>
        </div>
        
        <OnlineUsers users={onlineUsers} currentUser={user.username} />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">#general</h2>
            <div className="text-sm text-gray-500">
              {typingUsers.length > 0 && (
                <div className="flex items-center space-x-1">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span>
                    {typingUsers.map(u => u.username).join(', ')} 
                    {typingUsers.length === 1 ? ' is' : ' are'} typing...
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Messages */}
        <MessageList 
          messages={messages} 
          currentUser={user.username}
          typingUsers={typingUsers}
        />

        {/* Message Input */}
        <MessageInput 
          onSendMessage={onSendMessage}
          onTyping={onTyping}
        />
      </div>
    </>
  );
};

export default ChatRoom;