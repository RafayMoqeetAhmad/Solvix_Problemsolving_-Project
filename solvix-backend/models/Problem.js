const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    trim: true,
    maxlength: [200, 'Title cannot be more than 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Please select a category'],
    enum: ['Hardware', 'Software', 'Network', 'Printer', 'Email', 'Security', 'Other'] // ✅ frontend se match
  },
  status: {
    type: String,
    enum: ['pending', 'solved', 'closed'],
    default: 'pending'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  solution: {
    type: {
      type: String,
      enum: ['ai', 'expert', 'manual'],
      default: 'ai'
    },
    steps: [{
      type: String
    }],
    additionalInfo: {
      type: String
    },
    providedAt: {
      type: Date,
      default: Date.now
    }
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: null
  },
  feedback: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Index for faster queries
problemSchema.index({ user: 1, createdAt: -1 });
problemSchema.index({ category: 1 });
problemSchema.index({ status: 1 });

module.exports = mongoose.model('Problem', problemSchema);