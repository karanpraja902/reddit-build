const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    default: '',
  },
  avatar: {
    type: String,
    default: '',
  },
  preferences: {
    theme: {
      type: String,
      enum: ['light', 'dark'],
      default: 'light',
    },
    language: {
      type: String,
      default: 'en',
    },
    aiModel: {
      type: String,
      default: 'gemini-2.5-flash',
    },
    conversationStyle: {
      type: String,
      enum: ['formal', 'casual', 'technical'],
      default: 'casual',
    },
    topics: [{
      type: String,
      default: [],
    }],
  },
  memory: {
    type: Object,
    default: {},
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  lastActive: {
    type: Date,
    default: Date.now,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

// Update the updatedAt field before saving
UserSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  this.lastActive = new Date();
  next();
});

// Create indexes for better query performance
UserSchema.index({ id: 1, isActive: 1 });
UserSchema.index({ lastActive: -1 });

module.exports = mongoose.model('User', UserSchema);
