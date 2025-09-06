const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

// Initialize static user
const initializeStaticUser = asyncHandler(async (req, res) => {
  try {
    const staticUserId = 'static_user_karan';
    
    // Check if static user already exists
    let staticUser = await User.findOne({ id: staticUserId });
    
    if (!staticUser) {
      // Create static user
      const hashedPassword = await bcrypt.hash('static_password', 10);
      
      staticUser = new User({
        id: staticUserId,
        email: 'static@example.com',
        username: 'static_user',
        password: hashedPassword,
        name: 'Static User',
        preferences: {
          theme: 'light',
          language: 'en',
          aiModel: 'google',
          conversationStyle: 'casual',
          topics: ['technology', 'programming', 'ai']
        },
        memory: {
          preferences: {
            conversationStyle: 'casual',
            topics: ['technology', 'programming', 'ai']
          },
          recentConversations: [],
          learningProgress: {}
        }
      });
      
      await staticUser.save();
    }
    
    res.status(200).json({
      success: true,
      message: 'Static user initialized successfully',
      user: {
        id: staticUser.id,
        email: staticUser.email,
        username: staticUser.username,
        name: staticUser.name,
      },
    });
  } catch (error) {
    console.error('Init error:', error);
    res.status(500).json({ error: 'Failed to initialize static user' });
  }
});

// Get user with memory
const getUserWithMemory = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.query;
    
    if (!userId) {
      return res.status(400).json({ error: 'User ID required' });
    }
    
    const user = await User.findOne({ id: userId, isActive: true });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.status(200).json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        name: user.name,
        preferences: user.preferences,
      },
      memory: user.memory,
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Failed to get user' });
  }
});

// User login
const login = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    
    const user = await User.findOne({ email, isActive: true });
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );
    
    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        name: user.name,
        preferences: user.preferences,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Update user memory
const updateUserMemory = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.params;
    const { memory } = req.body;
    
    if (!userId) {
      return res.status(400).json({ error: 'User ID required' });
    }
    
    const user = await User.findOneAndUpdate(
      { id: userId, isActive: true },
      { 
        memory,
        lastActive: new Date()
      },
      { new: true }
    );
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.status(200).json({
      success: true,
      message: 'User memory updated successfully',
      memory: user.memory,
    });
  } catch (error) {
    console.error('Update memory error:', error);
    res.status(500).json({ error: 'Failed to update user memory' });
  }
});

module.exports = {
  initializeStaticUser,
  getUserWithMemory,
  login,
  updateUserMemory,
};

