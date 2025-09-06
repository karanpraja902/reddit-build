const express = require('express');
const router = express.Router();
const {
  initializeStaticUser,
  getUserWithMemory,
  login,
  updateUserMemory
} = require('../controllers/authController');

// Initialize static user
router.post('/init', initializeStaticUser);

// Get user with memory
router.get('/user', getUserWithMemory);

// User login
router.post('/login', login);

// Update user memory
router.put('/user/:userId/memory', updateUserMemory);

module.exports = router;

