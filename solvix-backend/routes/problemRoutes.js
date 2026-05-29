const express = require('express');
const router = express.Router();
const {
  createProblem,
  getProblems,
  getProblem,
  updateProblem,
  rateProblem,
  deleteProblem,
  getAllProblems,
  getProblemStats
} = require('../controllers/problemController');
const { protect, authorize } = require('../middleware/auth');

// Protected routes
router.route('/')
  .get(protect, getProblems)
  .post(protect, createProblem);

router.get('/stats', protect, getProblemStats);

// ✅ FIX: Admin route ko /:id se PEHLE define karo
// Warna Express "admin" ko :id samajh leta hai
router.get('/admin/all', protect, authorize('admin'), getAllProblems);

// Ab /:id define karo — neeche
router.route('/:id')
  .get(protect, getProblem)
  .put(protect, updateProblem)
  .delete(protect, deleteProblem);

router.put('/:id/rate', protect, rateProblem);

module.exports = router;