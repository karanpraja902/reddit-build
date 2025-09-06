const Chat = require('../models/Chat');
const User = require('../models/User');
const asyncHandler = require('express-async-handler');
const { nanoid } = require('nanoid');

// Create new chat
const createChat = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.body;
    
    const chatId = nanoid();
    
    const newChat = new Chat({
      id: chatId,
      userId: userId || 'static_user_karan',
      messages: [],
      title: 'New Chat',
      isActive: true
    });
    
    await newChat.save();
    
    res.status(201).json({
      success: true,
      message: 'Chat created successfully',
      chat: {
        id: newChat.id,
        userId: newChat.userId,
        title: newChat.title,
        createdAt: newChat.createdAt
      }
    });
  } catch (error) {
    console.error('Create chat error:', error);
    res.status(500).json({ error: 'Failed to create chat' });
  }
});

// Get chat by ID
const getChat = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    
    const chat = await Chat.findOne({ id, isActive: true });
    
    if (!chat) {
      return res.status(404).json({ error: 'Chat not found' });
    }
    
    res.status(200).json({
      success: true,
      chat
    });
  } catch (error) {
    console.error('Get chat error:', error);
    res.status(500).json({ error: 'Failed to get chat' });
  }
});

// Get all chats for a user
const getUserChats = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.query;
    
    if (!userId) {
      return res.status(400).json({ error: 'User ID required' });
    }
    
    const chats = await Chat.find({ 
      userId, 
      isActive: true 
    }).sort({ updatedAt: -1 });
    
    res.status(200).json({
      success: true,
      chats: chats.map(chat => ({
        id: chat.id,
        title: chat.title,
        createdAt: chat.createdAt,
        updatedAt: chat.updatedAt,
        messageCount: chat.messages.length
      }))
    });
  } catch (error) {
    console.error('Get user chats error:', error);
    res.status(500).json({ error: 'Failed to get user chats' });
  }
});

// Add message to chat
const addMessage = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { role, content, files } = req.body;
    
    if (!role || !content) {
      return res.status(400).json({ error: 'Role and content are required' });
    }
    
    const chat = await Chat.findOne({ id, isActive: true });
    
    if (!chat) {
      return res.status(404).json({ error: 'Chat not found' });
    }
    
    const newMessage = {
      role,
      content,
      timestamp: new Date(),
      files: files || []
    };
    
    chat.messages.push(newMessage);
    chat.updatedAt = new Date();
    
    // Update title if it's the first user message
    if (role === 'user' && chat.messages.length === 1) {
      const words = content.split(' ').slice(0, 4).join(' ');
      chat.title = words.length > 20 ? words.substring(0, 20) + '...' : words;
    }
    
    await chat.save();
    
    res.status(200).json({
      success: true,
      message: 'Message added successfully',
      message: newMessage
    });
  } catch (error) {
    console.error('Add message error:', error);
    res.status(500).json({ error: 'Failed to add message' });
  }
});

// Update chat title
const updateChatTitle = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }
    
    const chat = await Chat.findOneAndUpdate(
      { id, isActive: true },
      { title, updatedAt: new Date() },
      { new: true }
    );
    
    if (!chat) {
      return res.status(404).json({ error: 'Chat not found' });
    }
    
    res.status(200).json({
      success: true,
      message: 'Chat title updated successfully',
      chat: {
        id: chat.id,
        title: chat.title,
        updatedAt: chat.updatedAt
      }
    });
  } catch (error) {
    console.error('Update chat title error:', error);
    res.status(500).json({ error: 'Failed to update chat title' });
  }
});

// Delete chat
const deleteChat = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    
    const chat = await Chat.findOneAndUpdate(
      { id, isActive: true },
      { isActive: false },
      { new: true }
    );
    
    if (!chat) {
      return res.status(404).json({ error: 'Chat not found' });
    }
    
    res.status(200).json({
      success: true,
      message: 'Chat deleted successfully'
    });
  } catch (error) {
    console.error('Delete chat error:', error);
    res.status(500).json({ error: 'Failed to delete chat' });
  }
});

// Get chat messages
const getChatMessages = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    
    const chat = await Chat.findOne({ id, isActive: true });
    
    if (!chat) {
      return res.status(404).json({ error: 'Chat not found' });
    }
    
    res.status(200).json({
      success: true,
      messages: chat.messages
    });
  } catch (error) {
    console.error('Get chat messages error:', error);
    res.status(500).json({ error: 'Failed to get chat messages' });
  }
});

module.exports = {
  createChat,
  getChat,
  getUserChats,
  addMessage,
  updateChatTitle,
  deleteChat,
  getChatMessages,
};
