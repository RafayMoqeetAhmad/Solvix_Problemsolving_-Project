const Tutorial = require('../models/Tutorial');

// @desc    Create new tutorial
// @route   POST /api/tutorials
// @access  Private/Admin
exports.createTutorial = async (req, res, next) => {
  try {
    const { title, category, difficulty, duration, steps } = req.body;

    const tutorial = await Tutorial.create({
      title,
      category,
      difficulty,
      duration,
      steps,
      createdBy: req.user.id
    });

    await tutorial.populate('createdBy', 'name username');

    res.status(201).json({
      success: true,
      message: 'Tutorial created successfully',
      data: tutorial
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all tutorials
// @route   GET /api/tutorials
// @access  Public
exports.getTutorials = async (req, res, next) => {
  try {
    const { category, difficulty, search, sort } = req.query;

    // Build query
    let query = { isActive: true };

    if (category) query.category = category;
    if (difficulty) query.difficulty = difficulty;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } }
      ];
    }

    // Execute query
    let tutorials = Tutorial.find(query).populate('createdBy', 'name username');

    // Sorting
    if (sort === 'popular') {
      tutorials = tutorials.sort({ views: -1 });
    } else if (sort === 'helpful') {
      tutorials = tutorials.sort({ helpful: -1 });
    } else {
      tutorials = tutorials.sort({ createdAt: -1 }); // newest first by default
    }

    const result = await tutorials;

    res.status(200).json({
      success: true,
      count: result.length,
      data: result
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single tutorial
// @route   GET /api/tutorials/:id
// @access  Public
exports.getTutorial = async (req, res, next) => {
  try {
    const tutorial = await Tutorial.findById(req.params.id).populate('createdBy', 'name username');

    if (!tutorial) {
      return res.status(404).json({
        success: false,
        message: 'Tutorial not found'
      });
    }

    if (!tutorial.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Tutorial is not available'
      });
    }

    // Increment views
    await tutorial.incrementViews();

    res.status(200).json({
      success: true,
      data: tutorial
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update tutorial
// @route   PUT /api/tutorials/:id
// @access  Private/Admin
exports.updateTutorial = async (req, res, next) => {
  try {
    let tutorial = await Tutorial.findById(req.params.id);

    if (!tutorial) {
      return res.status(404).json({
        success: false,
        message: 'Tutorial not found'
      });
    }

    // Update tutorial
    tutorial = await Tutorial.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    ).populate('createdBy', 'name username');

    res.status(200).json({
      success: true,
      message: 'Tutorial updated successfully',
      data: tutorial
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete tutorial
// @route   DELETE /api/tutorials/:id
// @access  Private/Admin
exports.deleteTutorial = async (req, res, next) => {
  try {
    const tutorial = await Tutorial.findById(req.params.id);

    if (!tutorial) {
      return res.status(404).json({
        success: false,
        message: 'Tutorial not found'
      });
    }

    await tutorial.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Tutorial deleted successfully',
      data: {}
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Mark tutorial as helpful
// @route   PUT /api/tutorials/:id/helpful
// @access  Private
exports.markHelpful = async (req, res, next) => {
  try {
    const tutorial = await Tutorial.findById(req.params.id);

    if (!tutorial) {
      return res.status(404).json({
        success: false,
        message: 'Tutorial not found'
      });
    }

    tutorial.helpful += 1;
    await tutorial.save();

    res.status(200).json({
      success: true,
      message: 'Thank you for your feedback',
      data: tutorial
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get tutorial statistics
// @route   GET /api/tutorials/stats
// @access  Private/Admin
exports.getTutorialStats = async (req, res, next) => {
  try {
    const totalTutorials = await Tutorial.countDocuments({ isActive: true });
    const totalViews = await Tutorial.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: null, total: { $sum: '$views' } } }
    ]);

    // Category breakdown
    const categoryStats = await Tutorial.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);

    // Most popular tutorials
    const popularTutorials = await Tutorial.find({ isActive: true })
      .sort({ views: -1 })
      .limit(5)
      .select('title views category');

    res.status(200).json({
      success: true,
      data: {
        totalTutorials,
        totalViews: totalViews.length > 0 ? totalViews[0].total : 0,
        categoryBreakdown: categoryStats,
        popularTutorials
      }
    });
  } catch (error) {
    next(error);
  }
};
