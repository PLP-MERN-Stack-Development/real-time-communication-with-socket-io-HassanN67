import React, { useState } from 'react';
import './RoomList.css';

const RoomList = ({ rooms, currentRoom, onJoinRoom, currentUser }) => {
  const [showCreateRoom, setShowCreateRoom] = useState(false);
  const [newRoomName, setNewRoomName] = useState('');

  const handleCreateRoom = (e) => {
    e.preventDefault();
    if (newRoomName.trim()) {
      onJoinRoom(newRoomName.trim());
      setNewRoomName('');
      setShowCreateRoom(false);
    }
  };

  return (
    <div className="room-list">
      <div className="room-header">
        <h3>Chat Rooms</h3>
        <button 
          className="create-room-btn"
          onClick={() => setShowCreateRoom(!showCreateRoom)}
        >
          +
        </button>
      </div>

      {showCreateRoom && (
        <form onSubmit={handleCreateRoom} className="create-room-form">
          <input
            type="text"
            placeholder="Enter room name"
            value={newRoomName}
            onChange={(e) => setNewRoomName(e.target.value)}
            maxLength={20}
          />
          <button type="submit">Create</button>
        </form>
      )}

      <div className="rooms">
        {rooms.map(room => (
          <div
            key={room.name}
            className={`room-item ${currentRoom === room.name ? 'active' : ''}`}
            onClick={() => onJoinRoom(room.name)}
          >
            <span className="room-name">#{room.name}</span>
            {room.createdBy === currentUser && (
              <span className="room-owner">You</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomList;