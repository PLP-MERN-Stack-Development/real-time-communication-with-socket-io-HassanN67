💬 Real-Time Chat Application

A full-stack real-time chat application built with React, Socket.io, Node.js, Express, and MongoDB. Features instant messaging, multiple rooms, user presence, and typing indicators.

https://img.shields.io/badge/React-19.1.1-blue https://img.shields.io/badge/Socket.io-4.8.1-green https://img.shields.io/badge/Node.js-20+-brightgreen https://img.shields.io/badge/MongoDB-8.19.3-green

🚀 Live Demo

· Frontend: https://your-chat-app.vercel.app
· Backend: https://your-chat-app.onrender.com

✨ Features

Core Features

· ✅ Real-time messaging with Socket.io
· ✅ User authentication (username-based)
· ✅ Multiple chat rooms
· ✅ Online/offline user status
· ✅ Typing indicators
· ✅ Message timestamps
· ✅ Responsive design (mobile & desktop)

Advanced Features

· ✅ Private messaging between users
· ✅ Message persistence with MongoDB
· ✅ User join/leave notifications
· ✅ Message history
· ✅ Room management
· ✅ Read receipts (optional)

Technical Features

· ✅ RESTful API endpoints
· ✅ CORS configuration for cross-origin requests
· ✅ Error handling and validation
· ✅ Production-ready deployment

🛠 Tech Stack

Frontend:

· React 19.1.1
· Vite
· Tailwind CSS
· Socket.io Client
· Axios

Backend:

· Node.js
· Express.js
· Socket.io
· MongoDB with Mongoose
· CORS
· Dotenv

📦 Installation & Setup

Prerequisites

· Node.js (v18 or higher)
· MongoDB (local or Atlas)
· Git

1. Clone the Repository

bash
git clone https://github.com/your-username/chat-app.git
cd chat-app


2. Backend Setup

bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create environment file
echo "MONGODB_URI=mongodb://localhost:27017/chat-app" > .env
echo "PORT=5000" >> .env
echo "CLIENT_URL=http://localhost:5173" >> .env

# Start development server
npm run dev


3. Frontend Setup

bash
# Navigate to client directory (from root)
cd client

# Install dependencies
npm install

# Start development server
npm run dev


4. Access the Application

· Frontend: http://localhost:5173
· Backend API: http://localhost:5000
· API Health Check: http://localhost:5000/api/health

🗄 Database Setup

Option 1: Local MongoDB

bash
# Install MongoDB locally
# Start MongoDB service
mongod

# Or using Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest


Option 2: MongoDB Atlas (Recommended for Production)

1. Go to MongoDB Atlas
2. Create free account and cluster
3. Get connection string
4. Update MONGODB_URI in server/.env

🚀 Deployment

Backend Deployment (Render)

1. Push code to GitHub
2. Connect repository to Render
3. Set environment variables:
   · MONGODB_URI: Your MongoDB Atlas connection string
   · NODE_ENV: production

Frontend Deployment (Vercel)

1. Connect repository to Vercel
2. Set environment variable:
   · VITE_SOCKET_SERVER_URL:

📡 API Endpoints

REST API

· GET /api/health - Server health check
· GET /api/rooms - Get all chat rooms
· GET /api/users/online - Get online users
· GET /api/messages/:room - Get room messages
· GET /api/stats - Get application statistics

Socket Events

Client → Server

· user_join - User joins the chat
· send_message - Send a new message
· typing - Typing indicator
· join_room - Join a chat room
· private_message - Send private message
· message_read - Mark message as read

Server → Client

· message - New message received
· user_status - User online/offline status
· user_typing - Typing indicator
· online_users - List of online users
· message_history - Previous messages
· room_list - Available chat rooms

🎯 Usage

Basic Chat

1. Open the application in your browser
2. Enter a username to join
3. Start sending messages in the general room
4. See other users join and leave in real-time

Room Management

1. Create new rooms using the room panel
2. Join existing rooms by clicking on them
3. Switch between rooms seamlessly

Private Messaging

1. Click on a user in the online users list
2. Send private messages that only they can see
3. View private message history

🏗 Project Structure


chat-app/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── Login.jsx
│   │   │   ├── ChatRoom.jsx
│   │   │   ├── MessageList.jsx
│   │   │   ├── MessageInput.jsx
│   │   │   └── OnlineUsers.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── server/                 # Node.js backend
│   ├── src/
│   │   └── server.js       # Main server file
│   ├── package.json
│   └── .env
└── README.md


🔧 Configuration

Environment Variables

Server (.env)

env
MONGODB_URI=mongodb://localhost:27017/chat-app
PORT=5000
CLIENT_URL=http://localhost:5173
NODE_ENV=development


Client (Environment Variables)

env
VITE_SOCKET_SERVER_URL=http://localhost:5000


🐛 Troubleshooting

Common Issues

1. CORS Errors
   · Ensure CLIENT_URL matches your frontend URL
   · Check server CORS configuration
2. Socket Connection Failed
   · Verify server is running on correct port
   · Check firewall settings
3. MongoDB Connection Issues
   · Verify MongoDB is running
   · Check connection string format
4. Messages Not Persisting
   · Check MongoDB connection
   · Verify database permissions

Development Tips

· Use browser developer tools to monitor WebSocket connections
· Check server logs for connection events
· Use MongoDB Compass to inspect database

🤝 Contributing

1. Fork the repository
2. Create a feature branch (git checkout -b feature/amazing-feature)
3. Commit your changes (git commit -m 'Add amazing feature')
4. Push to the branch (git push origin feature/amazing-feature)
5. Open a Pull Request

📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

🙏 Acknowledgments

· Socket.io for real-time communication
· Vite for fast development build tools
· Tailwind CSS for utility-first styling
· MongoDB for data persistence
· Render & Vercel for free hosting

📞 Support

If you have any questions or issues, please open an issue on GitHub or contact the development team.

---

Happy Chatting! 💬✨

Built with ❤ using modern web technologies.