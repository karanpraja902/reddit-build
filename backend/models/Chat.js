const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  userId: {
    type: String,
    required: false,
    index: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  messages: [{
    role: {
      type: String,
      enum: ['user', 'assistant'],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    files: [{
      filename: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
      mediaType: {
        type: String,
        required: true,
      },
      pdfAnalysis: {
        type: String,
        required: false,
      },
    }],
  }],
  title: {
    type: String,
    default: 'New Chat',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

// Update the updatedAt field before saving
ChatSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Create compound indexes for better query performance
ChatSchema.index({ id: 1, isActive: 1 });
ChatSchema.index({ userId: 1, isActive: 1 });
ChatSchema.index({ createdAt: -1 });
ChatSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model('Chat', ChatSchema);
