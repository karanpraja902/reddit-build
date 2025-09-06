const express = require('express');
const router = express.Router();
const {
  getUserProfile,
  updateUserProfile,
  getUserStats
} = require('../controllers/userController');

// Get user profile
router.get('/:userId', getUserProfile);

// Update user profile
router.put('/:userId', updateUserProfile);

// Get user statistics
router.get('/:userId/stats', getUserStats);

module.exports = router;

