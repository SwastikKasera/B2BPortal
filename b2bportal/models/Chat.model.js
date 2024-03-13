const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  chatId: String,
  chats: [
    {
      senderId: String,
      receiverId: String,
      chat: String,
    }
  ],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Chat', chatSchema);
