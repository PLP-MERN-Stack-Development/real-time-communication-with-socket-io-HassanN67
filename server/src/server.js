import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const server = createServer(app);

// SIMPLE CORS FIX - Allow all origins for development
app.use(cors({
  origin: true, // Allow all origins
  credentials: true
}));

const io = new Server(server, {
  cors: {
    origin: true, // Allow all origins
    methods: ["GET", "POST"],
    credentials: true
  }
});

app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/chat-app')
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Simple in-memory storage (remove if you want MongoDB)
const users = new Map();
const messages = [];

// Socket.io connection
io.on('connection', (socket) => {
  console.log('🔌 User connected:', socket.id);

  // User joins
  socket.on('user_join', (userData) => {
    console.log('👋 User joining:', userData.username);
    
    const user = {
      username: userData.username,
      socketId: socket.id,
      online: true,
      joinedAt: new Date()
    };
    
    users.set(userData.username, user);

    // Notify others
    socket.broadcast.emit('user_status', {
      username: userData.username,
      online: true
    });

    // Send online users
    const onlineUsers = Array.from(users.values()).filter(u => u.online);
    socket.emit('online_users', onlineUsers);

    // Send message history
    socket.emit('message_history', messages.slice(-50));

    console.log(`✅ User ${userData.username} joined successfully`);
  });

  // Send message
  socket.on('send_message', (messageData) => {
    console.log('💬 New message:', messageData);
    
    const message = {
      id: Date.now().toString(),
      content: messageData.content,
      username: messageData.username,
      room: messageData.room || 'general',
      timestamp: new Date().toISOString()
    };
    
    messages.push(message);
    
    // Broadcast to everyone
    io.emit('message', message);
  });

  // Typing indicator
  socket.on('typing', (data) => {
    socket.broadcast.emit('user_typing', {
      username: data.username,
      typing: data.typing,
      room: data.room
    });
  });

  // Disconnect
  socket.on('disconnect', () => {
    console.log('🔌 User disconnected:', socket.id);
    
    // Find and update user status
    for (let [username, userData] of users.entries()) {
      if (userData.socketId === socket.id) {
        users.set(username, { ...userData, online: false });
        io.emit('user_status', { username, online: false });
        console.log(`👋 User ${username} went offline`);
        break;
      }
    }
  });
});

// Simple health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running!',
    timestamp: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`✅ CORS enabled for ALL origins (development mode)`);
  console.log(`🔌 Socket.io ready for connections`);
  console.log(`🌐 Test server:http://localhost:${PORT}/api/health`);
});