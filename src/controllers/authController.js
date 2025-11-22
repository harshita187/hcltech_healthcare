const authService = require('../services/authService');
const { successResponse } = require('../utils/apiResponse');

// @desc    Register a new user
// @route   POST /api/auth/register
const register = async (req, res, next) => {
  try {
    const userData = await authService.registerUser(req.body);
    successResponse(res, 'User registered successfully', userData, 201);
  } catch (error) {
    res.status(400);
    next(error);
  }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userData = await authService.loginUser(email, password);
    successResponse(res, 'Login successful', userData);
  } catch (error) {
    res.status(401);
    next(error);
  }
};

module.exports = { register, login };