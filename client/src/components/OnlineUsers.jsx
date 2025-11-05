import React from 'react';

const OnlineUsers = ({ users, currentUser }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4">
      <h3 className="font-semibold text-gray-300 mb-4">
        Online Users ({users.length})
      </h3>
      <div className="space-y-2">
        {users.map((user) => (
          <div key={user.username} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-700 transition-colors">
            <div className="relative">
              <div className="w-3 h-3 bg-green-500 rounded-full border-2 border-gray-800 absolute -right-1 -top-1 z-10"></div>
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                {user.username.charAt(0).toUpperCase()}
              </div>
            </div>
            <span className="text-gray-200">
              {user.username}
              {user.username === currentUser && (
                <span className="text-gray-400 text-sm ml-1">(You)</span>
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OnlineUsers;