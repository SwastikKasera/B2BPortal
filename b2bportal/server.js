const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { createServer } = require('http');  // Import createServer from http module
const { Server } = require('socket.io');
const bodyParser = require('body-parser');
const cors = require('cors');
const Router = require('./routes/company.route');
const ChatModel = require('./models/Chat.model');
require('dotenv').config();

const PORT = process.env.PORT || 4000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use('/', Router);

// Connect to MongoDB
mongoose
  .connect('mongodb://127.0.0.1:27017/b2bportal')
  .then(() => {
    console.log('Database connected');
  })
  .catch(() => {
    console.log('Error in connecting DB');
  });

// Create HTTP server
const httpServer = createServer(app);  // Create an HTTP server using Express app
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",  // Replace with your client URL
    methods: ["GET", "POST"],
  },
});

// Socket.io connection setup
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('sendMessage', async ({ chatId, senderId, recieverId, message }) => {
    console.log(`Message from ${senderId} to ${recieverId} in chat ${chatId}: ${message}`);

    try {
      
      let chat = await ChatModel.findOne({ chatId:`${senderId}${recieverId}`});
      if(!chat){
        chat = await ChatModel.findOne({ chatId:`${recieverId}${senderId}` });
      }
      console.log("prv chats", chat);
      
      if (!chat) {
        chat = new ChatModel({
          chatId,
          chats: [],
        });
      }

      chat.chats.push({
        senderId,
        recieverId,
        chat: message,
      });

      // Save the updated chat to MongoDB
      await chat.save();

      // Emit the received message to all connected clients
      io.to(chatId).emit('receiveMessage', { senderId, recieverId, text: message });
    } catch (error) {
      console.error('Error saving chat to MongoDB:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });

  socket.on('joinChat', (chatId) => {
    socket.join(chatId);
  });
});


// Start the server
httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
