const userService = require('../services/userService');
const { successResponse } = require('../utils/apiResponse');

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getProfile = async (req, res, next) => {
  try {
    const user = await userService.getUserProfile(req.user._id);
    successResponse(res, 'User profile fetched', user);
  } catch (error) {
    next(error);
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateProfile = async (req, res, next) => {
  try {
    const user = await userService.updateUserProfile(req.user._id, req.body);
    successResponse(res, 'User profile updated', user);
  } catch (error) {
    next(error);
  }
};

module.exports = { getProfile, updateProfile };