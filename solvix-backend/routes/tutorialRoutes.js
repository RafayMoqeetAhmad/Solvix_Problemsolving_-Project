const express = require('express');
const router = express.Router();
const {
  createTutorial,
  getTutorials,
  getTutorial,
  updateTutorial,
  deleteTutorial,
  markHelpful,
  getTutorialStats
} = require('../controllers/tutorialController');
const { protect, authorize } = require('../middleware/auth');

// Public routes
router.get('/', getTutorials);
router.get('/:id', getTutorial);
router.put('/:id/view', async (req, res) => {
  try {
    const Tutorial = require('../models/Tutorial');
    const tutorial = await Tutorial.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    );
    res.json({ success: true, views: tutorial.views });
  } catch (error) {
    res.status(500).json({ success: false });
  }
});

// Protected routes
router.put('/:id/helpful', protect, markHelpful);

// Admin routes
router.post('/', protect, authorize('admin'), createTutorial);
router.put('/:id', protect, authorize('admin'), updateTutorial);
router.delete('/:id', protect, authorize('admin'), deleteTutorial);
router.get('/admin/stats', protect, authorize('admin'), getTutorialStats);

module.exports = router;