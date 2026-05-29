const Problem = require('../models/Problem');
const { generateAISolution } = require('../utils/aiSolution');
const { notifyAdminNewProblem } = require('../utils/emailService');

// @desc    Create new problem
// @route   POST /api/problems
// @access  Private
exports.createProblem = async (req, res, next) => {
  try {
    const { title, description, category } = req.body;

    // AI solution generate karo
    const solution = generateAISolution(category, title, description);

    // ✅ FIX: Status 'pending' rakho taake admin review kar sake
    const problem = await Problem.create({
      title,
      description,
      category,
      user: req.user.id,
      solution,
      status: 'pending'  // Admin baad mein solve karega
    });

    await problem.populate('user', 'name username email');

    // ✅ Admin ko email bhejo (background mein)
    notifyAdminNewProblem(problem, req.user).catch(err =>
      console.error('Admin email error:', err.message)
    );

    res.status(201).json({
      success: true,
      message: 'Problem submit ho gayi! Admin jald hi review karega.',
      data: problem
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all problems (current user ki)
// @route   GET /api/problems
// @access  Private
exports.getProblems = async (req, res, next) => {
  try {
    const { category, status, sort } = req.query;
    let query = { user: req.user.id };
    if (category) query.category = category;
    if (status) query.status = status;

    let problems = Problem.find(query).populate('user', 'name username email');
    if (sort === 'oldest') {
      problems = problems.sort({ createdAt: 1 });
    } else {
      problems = problems.sort({ createdAt: -1 });
    }

    const result = await problems;
    res.status(200).json({ success: true, count: result.length, data: result });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single problem
// @route   GET /api/problems/:id
// @access  Private
exports.getProblem = async (req, res, next) => {
  try {
    const problem = await Problem.findById(req.params.id).populate('user', 'name username email');
    if (!problem) {
      return res.status(404).json({ success: false, message: 'Problem not found' });
    }
    if (problem.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to access this problem' });
    }
    res.status(200).json({ success: true, data: problem });
  } catch (error) {
    next(error);
  }
};

// @desc    Update problem
// @route   PUT /api/problems/:id
// @access  Private
exports.updateProblem = async (req, res, next) => {
  try {
    let problem = await Problem.findById(req.params.id);
    if (!problem) {
      return res.status(404).json({ success: false, message: 'Problem not found' });
    }
    if (problem.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to update this problem' });
    }
    problem = await Problem.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
      .populate('user', 'name username email');
    res.status(200).json({ success: true, message: 'Problem updated successfully', data: problem });
  } catch (error) {
    next(error);
  }
};

// @desc    Rate problem solution
// @route   PUT /api/problems/:id/rate
// @access  Private
exports.rateProblem = async (req, res, next) => {
  try {
    const { rating, feedback } = req.body;
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ success: false, message: 'Please provide a rating between 1 and 5' });
    }
    let problem = await Problem.findById(req.params.id);
    if (!problem) {
      return res.status(404).json({ success: false, message: 'Problem not found' });
    }
    if (problem.user.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized to rate this problem' });
    }
    problem.rating = rating;
    if (feedback) problem.feedback = feedback;
    await problem.save();
    res.status(200).json({ success: true, message: 'Rating submitted successfully', data: problem });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete problem
// @route   DELETE /api/problems/:id
// @access  Private
exports.deleteProblem = async (req, res, next) => {
  try {
    const problem = await Problem.findById(req.params.id);
    if (!problem) {
      return res.status(404).json({ success: false, message: 'Problem not found' });
    }
    if (problem.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this problem' });
    }
    await problem.deleteOne();
    res.status(200).json({ success: true, message: 'Problem deleted successfully', data: {} });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all problems (Admin only)
// @route   GET /api/problems/admin/all
// @access  Private/Admin
exports.getAllProblems = async (req, res, next) => {
  try {
    const { category, status, sort } = req.query;
    let query = {};
    if (category) query.category = category;
    if (status) query.status = status;

    let problems = Problem.find(query).populate('user', 'name username email');
    if (sort === 'oldest') {
      problems = problems.sort({ createdAt: 1 });
    } else {
      problems = problems.sort({ createdAt: -1 });
    }
    const result = await problems;
    res.status(200).json({ success: true, count: result.length, data: result });
  } catch (error) {
    next(error);
  }
};

// @desc    Get problem stats
// @route   GET /api/problems/stats
// @access  Private
exports.getProblemStats = async (req, res, next) => {
  try {
    const userId = req.user.role === 'admin' ? {} : { user: req.user.id };
    const totalProblems = await Problem.countDocuments(userId);
    const solvedProblems = await Problem.countDocuments({ ...userId, status: 'solved' });
    const pendingProblems = await Problem.countDocuments({ ...userId, status: 'pending' });

    const ratedProblems = await Problem.find({ ...userId, rating: { $ne: null } });
    const avgRating = ratedProblems.length > 0
      ? ratedProblems.reduce((sum, p) => sum + p.rating, 0) / ratedProblems.length : 0;

    const categoryStats = await Problem.aggregate([
      { $match: req.user.role === 'admin' ? {} : { user: req.user._id } },
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalProblems, solvedProblems, pendingProblems,
        averageRating: Math.round(avgRating * 10) / 10,
        categoryBreakdown: categoryStats
      }
    });
  } catch (error) {
    next(error);
  }
};