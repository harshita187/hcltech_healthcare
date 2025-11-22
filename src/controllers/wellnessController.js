const wellnessService = require('../services/wellnessService');
const { successResponse } = require('../utils/apiResponse');

// @desc    Get user wellness dashboard
// @route   GET /api/wellness
const getDashboard = async (req, res, next) => {
  try {
    const data = await wellnessService.getDashboardData(req.user._id);
    successResponse(res, 'Dashboard data fetched', data);
  } catch (error) {
    next(error);
  }
};

// @desc    Update specific metric (steps, activity, sleep)
// @route   PATCH /api/wellness/:metric
const updateMetric = async (req, res, next) => {
  try {
    const { metric } = req.params; // 'steps', 'activity', or 'sleep'
    const data = await wellnessService.updateMetrics(req.user._id, metric, req.body);
    successResponse(res, `Updated ${metric} successfully`, data);
  } catch (error) {
    next(error);
  }
};

module.exports = { getDashboard, updateMetric };