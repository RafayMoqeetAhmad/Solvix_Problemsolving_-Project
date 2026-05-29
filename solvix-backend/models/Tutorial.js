// const mongoose = require('mongoose');

// const tutorialSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: [true, 'Please provide a title'],
//     trim: true,
//     maxlength: [200, 'Title cannot be more than 200 characters']
//   },
//   category: {
//     type: String,
//     required: [true, 'Please select a category'],
//     enum: ['Technical', 'Household', 'Scheduling', 'Writing', 'Financial', 'Health', 'Education', 'Other']
//   },
//   difficulty: {
//     type: String,
//     required: [true, 'Please select difficulty level'],
//     enum: ['Easy', 'Medium', 'Hard']
//   },
//   duration: {
//     type: String,
//     required: [true, 'Please provide estimated duration'],
//     trim: true
//   },
//   steps: [{
//     type: String,
//     required: true
//   }],
//   views: {
//     type: Number,
//     default: 0
//   },
//   helpful: {
//     type: Number,
//     default: 0
//   },
//   createdBy: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   isActive: {
//     type: Boolean,
//     default: true
//   }
// }, {
//   timestamps: true
// });

// // Index for faster queries
// tutorialSchema.index({ category: 1 });
// tutorialSchema.index({ difficulty: 1 });
// tutorialSchema.index({ views: -1 });

// // Method to increment views
// tutorialSchema.methods.incrementViews = async function() {
//   this.views += 1;
//   await this.save();
// };

// module.exports = mongoose.model('Tutorial', tutorialSchema);
const mongoose = require('mongoose');

const tutorialSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    trim: true,
    maxlength: [200, 'Title cannot be more than 200 characters']
  },
  category: {
    type: String,
    required: [true, 'Please select a category'],
    enum: ['Technical', 'Household', 'Scheduling', 'Writing', 'Financial', 'Health', 'Education', 'Other']
  },
  difficulty: {
    type: String,
    required: [true, 'Please select difficulty level'],
    enum: ['Easy', 'Medium', 'Hard']
  },
  duration: {
    type: String,
    required: [true, 'Please provide estimated duration'],
    trim: true
  },
  videoUrl: {
    type: String,
    default: null
  },
  // ✅ NAYA FIELD — YouTube live search ke liye
  videoQuery: {
    type: String,
    default: null,
    trim: true
  },
  steps: [{
    type: String,
    required: true
  }],
  views: {
    type: Number,
    default: 0
  },
  helpful: {
    type: Number,
    default: 0
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for faster queries
tutorialSchema.index({ category: 1 });
tutorialSchema.index({ difficulty: 1 });
tutorialSchema.index({ views: -1 });

// Method to increment views
tutorialSchema.methods.incrementViews = async function() {
  this.views += 1;
  await this.save();
};

module.exports = mongoose.model('Tutorial', tutorialSchema);