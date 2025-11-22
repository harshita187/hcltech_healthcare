const wellnessService = require('../services/wellnessService');
const { successResponse } = require('../utils/apiResponse');

// @desc    Get dashboard
const getDashboard = async (req, res, next) => {
  try {
    const data = await wellnessService.getDashboardData(req.user._id);
    successResponse(res, 'Dashboard data fetched', data);
  } catch (error) {
    next(error);
  }
};

// @desc    Update metrics (steps/activity/sleep)
const updateMetric = async (req, res, next) => {
  try {
    const { metric } = req.params;
    const data = await wellnessService.updateMetrics(req.user._id, metric, req.body);
    successResponse(res, `Updated ${metric} successfully`, data);
  } catch (error) {
    next(error);
  }
};

// --- New Goal Handlers ---

// @desc    Add a custom goal
const addGoal = async (req, res, next) => {
  try {
    const { title } = req.body;
    const data = await wellnessService.addCustomGoal(req.user._id, title);
    successResponse(res, 'Goal added', data);
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle goal completion
const toggleGoal = async (req, res, next) => {
  try {
    const data = await wellnessService.toggleCustomGoal(req.user._id, req.params.id);
    successResponse(res, 'Goal toggled', data);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a goal
const deleteGoal = async (req, res, next) => {
  try {
    const data = await wellnessService.deleteCustomGoal(req.user._id, req.params.id);
    successResponse(res, 'Goal deleted', data);
  } catch (error) {
    next(error);
  }
};

module.exports = { getDashboard, updateMetric, addGoal, toggleGoal, deleteGoal };