const User = require('../models/User');
const asyncHandler = require('express-async-handler');

// Get user profile
const getUserProfile = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.params;
    
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
        avatar: user.avatar,
        preferences: user.preferences,
        createdAt: user.createdAt,
        lastActive: user.lastActive
      }
    });
  } catch (error) {
    console.error('Get user profile error:', error);
    res.status(500).json({ error: 'Failed to get user profile' });
  }
});

// Update user profile
const updateUserProfile = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, avatar, preferences } = req.body;
    
    const updateData = {};
    if (name) updateData.name = name;
    if (avatar) updateData.avatar = avatar;
    if (preferences) updateData.preferences = preferences;
    
    updateData.lastActive = new Date();
    
    const user = await User.findOneAndUpdate(
      { id: userId, isActive: true },
      updateData,
      { new: true }
    );
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.status(200).json({
      success: true,
      message: 'User profile updated successfully',
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        name: user.name,
        avatar: user.avatar,
        preferences: user.preferences,
        lastActive: user.lastActive
      }
    });
  } catch (error) {
    console.error('Update user profile error:', error);
    res.status(500).json({ error: 'Failed to update user profile' });
  }
});

// Get user statistics
const getUserStats = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.params;
    
    const user = await User.findOne({ id: userId, isActive: true });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // You can add more statistics here based on your needs
    const stats = {
      totalChats: 0, // This would need to be calculated from Chat model
      totalMessages: 0, // This would need to be calculated from Chat model
      lastActive: user.lastActive,
      memberSince: user.createdAt,
      preferences: user.preferences
    };
    
    res.status(200).json({
      success: true,
      stats
    });
  } catch (error) {
    console.error('Get user stats error:', error);
    res.status(500).json({ error: 'Failed to get user statistics' });
  }
});

module.exports = {
  getUserProfile,
  updateUserProfile,
  getUserStats,
};
