const express = require('express');
const router = express.Router();
const {
  getPlatformStats,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  getAllProblems,
  getProblemDetail,
  solveProblem,
  updateProblemStatus
} = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/auth');

// Saare admin routes ke liye auth + admin role zaroori
router.use(protect);
router.use(authorize('admin'));

// ─── Stats ─────────────────────────────────────────
router.get('/stats', getPlatformStats);

// ─── Problems Management ────────────────────────────
// Saari problems dekho (filter: ?status=pending)
router.get('/problems', getAllProblems);
// Ek problem ki detail
router.get('/problems/:id', getProblemDetail);
// Problem solve karo (apni reply ke saath)
router.put('/problems/:id/solve', solveProblem);
// Sirf status change karo
router.put('/problems/:id/status', updateProblemStatus);

// ─── Users Management ──────────────────────────────
router.route('/users')
  .get(getAllUsers);

router.route('/users/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;
