const User = require('../models/User');
const { notifyUserProblemSolved } = require('../utils/emailService');
const Problem = require('../models/Problem');
const Tutorial = require('../models/Tutorial');

// @desc    Get platform statistics
// @route   GET /api/admin/stats
exports.getPlatformStats = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ isActive: true });
    const adminUsers = await User.countDocuments({ role: 'admin' });
    const totalProblems = await Problem.countDocuments();
    const solvedProblems = await Problem.countDocuments({ status: 'solved' });
    const pendingProblems = await Problem.countDocuments({ status: 'pending' });
    const ratedProblems = await Problem.find({ rating: { $ne: null } });
    const avgRating = ratedProblems.length > 0
      ? ratedProblems.reduce((sum, p) => sum + p.rating, 0) / ratedProblems.length : 0;
    const totalTutorials = await Tutorial.countDocuments({ isActive: true });
    const totalTutorialViews = await Tutorial.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: null, total: { $sum: '$views' } } }
    ]);
    const recentProblems = await Problem.find()
      .sort({ createdAt: -1 }).limit(5)
      .populate('user', 'name username')
      .select('title category status createdAt');
    const recentUsers = await User.find()
      .sort({ createdAt: -1 }).limit(5)
      .select('name username email role createdAt');
    const problemsByCategory = await Problem.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    res.status(200).json({
      success: true,
      data: {
        users: { total: totalUsers, active: activeUsers, admins: adminUsers },
        problems: { total: totalProblems, solved: solvedProblems, pending: pendingProblems, averageRating: Math.round(avgRating * 10) / 10 },
        tutorials: { total: totalTutorials, totalViews: totalTutorialViews.length > 0 ? totalTutorialViews[0].total : 0 },
        recentActivity: { problems: recentProblems, users: recentUsers },
        analytics: { problemsByCategory }
      }
    });
  } catch (error) { next(error); }
};

// ✅ NAYA: Admin ko saari problems dikhao (pending filter ke saath)
// @route   GET /api/admin/problems?status=pending
exports.getAllProblems = async (req, res, next) => {
  try {
    const { status, category, sort } = req.query;
    let query = {};
    if (status) query.status = status;
    if (category) query.category = category;

    let problems = Problem.find(query).populate('user', 'name username email');
    if (sort === 'oldest') {
      problems = problems.sort({ createdAt: 1 });
    } else {
      problems = problems.sort({ createdAt: -1 });
    }
    const result = await problems;

    res.status(200).json({ success: true, count: result.length, data: result });
  } catch (error) { next(error); }
};

// ✅ NAYA: Admin ek problem ki full detail dekhe
// @route   GET /api/admin/problems/:id
exports.getProblemDetail = async (req, res, next) => {
  try {
    const problem = await Problem.findById(req.params.id)
      .populate('user', 'name username email');
    if (!problem) {
      return res.status(404).json({ success: false, message: 'Problem nahi mili' });
    }
    res.status(200).json({ success: true, data: problem });
  } catch (error) { next(error); }
};

// ✅ NAYA: Admin problem solve kare — apni reply ke saath
// @route   PUT /api/admin/problems/:id/solve
exports.solveProblem = async (req, res, next) => {
  try {
    const { adminReply, solutionSteps } = req.body;

    if (!adminReply) {
      return res.status(400).json({
        success: false,
        message: 'adminReply zaroori hai — user ko kya karna chahiye yeh batao'
      });
    }

    const problem = await Problem.findById(req.params.id);
    if (!problem) {
      return res.status(404).json({ success: false, message: 'Problem nahi mili' });
    }
    if (problem.status === 'solved') {
      return res.status(400).json({ success: false, message: 'Yeh problem pehle se solved hai' });
    }

    problem.status = 'solved';
    problem.solution = {
      type: 'expert',
      steps: solutionSteps && solutionSteps.length > 0 ? solutionSteps : [adminReply],
      additionalInfo: adminReply,
      providedAt: new Date()
    };

    await problem.save();
    await problem.populate('user', 'name username email');

    // ✅ User ko email bhejo — problem solve notification
    notifyUserProblemSolved(problem, adminReply).catch(err =>
      console.error('User email error:', err.message)
    );

    res.status(200).json({
      success: true,
      message: `Problem solve ho gayi! User ${problem.user.name} ko email bhi bheji gayi.`,
      data: problem
    });
  } catch (error) { next(error); }
};

// ✅ NAYA: Admin sirf status badalna chahata ho (solved/closed/pending)
// @route   PUT /api/admin/problems/:id/status
exports.updateProblemStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const validStatuses = ['pending', 'solved', 'closed'];

    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Valid status dalo: pending, solved, ya closed'
      });
    }

    const problem = await Problem.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    ).populate('user', 'name username email');

    if (!problem) {
      return res.status(404).json({ success: false, message: 'Problem nahi mili' });
    }

    res.status(200).json({
      success: true,
      message: `Status update ho gaya: ${status}`,
      data: problem
    });
  } catch (error) { next(error); }
};

// USER MANAGEMENT (pehle se tha — unchanged)
exports.getAllUsers = async (req, res, next) => {
  try {
    const { role, isActive, search } = req.query;
    let query = {};
    if (role) query.role = role;
    if (isActive !== undefined) query.isActive = isActive === 'true';
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { username: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }
    const users = await User.find(query).select('-password').sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: users.length, data: users });
  } catch (error) { next(error); }
};

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    const problems = await Problem.find({ user: req.params.id }).sort({ createdAt: -1 }).limit(10);
    res.status(200).json({ success: true, data: { user, problems } });
  } catch (error) { next(error); }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { name, email, role, isActive } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    if (req.user.id === req.params.id && isActive === false) {
      return res.status(400).json({ success: false, message: 'You cannot deactivate your own account' });
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id, { name, email, role, isActive }, { new: true, runValidators: true }
    ).select('-password');
    res.status(200).json({ success: true, message: 'User updated successfully', data: updatedUser });
  } catch (error) { next(error); }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    if (req.user.id === req.params.id) {
      return res.status(400).json({ success: false, message: 'You cannot delete your own account' });
    }
    await user.deleteOne();
    await Problem.deleteMany({ user: req.params.id });
    res.status(200).json({ success: true, message: 'User and associated data deleted successfully', data: {} });
  } catch (error) { next(error); }
};