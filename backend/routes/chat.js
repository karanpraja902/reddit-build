const express = require('express');
const router = express.Router();
const {
  createChat,
  getChat,
  getUserChats,
  addMessage,
  updateChatTitle,
  deleteChat,
  getChatMessages
} = require('../controllers/chatController');

// Create new chat
router.post('/', createChat);

// Get all chats for a user
router.get('/', getUserChats);

// Get chat by ID
router.get('/:id', getChat);

// Get chat messages
router.get('/:id/messages', getChatMessages);

// Add message to chat
router.post('/:id/messages', addMessage);

// Update chat title
router.put('/:id/title', updateChatTitle);

// Delete chat
router.delete('/:id', deleteChat);

module.exports = router;

