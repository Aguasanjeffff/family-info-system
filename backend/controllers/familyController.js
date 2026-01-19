const User = require('../models/User');

// @desc    Get all family members
// @route   GET /api/family
// @access  Public
exports.getAllFamily = async (req, res, next) => {
  try {
    const family = await User.find().sort({ 'position.row': 1, 'position.order': 1 });

    res.status(200).json({
      success: true,
      count: family.length,
      data: family,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single family member
// @route   GET /api/family/:id
// @access  Public
exports.getFamilyMember = async (req, res, next) => {
  try {
    const familyMember = await User.findById(req.params.id);

    if (!familyMember) {
      return res.status(404).json({
        success: false,
        message: 'Family member not found',
      });
    }

    res.status(200).json({
      success: true,
      data: familyMember,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update family member
// @route   PUT /api/family/:id
// @access  Private (own profile or admin)
exports.updateFamilyMember = async (req, res, next) => {
  try {
    let familyMember = await User.findById(req.params.id);

    if (!familyMember) {
      return res.status(404).json({
        success: false,
        message: 'Family member not found',
      });
    }

    // Don't allow updating email, password, role through this endpoint
    const { email, password, role, ...updateData } = req.body;

    familyMember = await User.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: familyMember,
    });
  } catch (error) {
    next(error);
  }
};
