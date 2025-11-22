const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { errorResponse } = require('../utils/apiResponse');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token ID
      const user = await User.findById(decoded.id).select('-password');

      if (!user) {
        return errorResponse(res, 'Not authorized, user not found', 401);
      }

      req.user = user;
      next();
    } catch (error) {
      console.error(error);
      return errorResponse(res, 'Not authorized, token failed', 401);
    }
  } else {
    return errorResponse(res, 'Not authorized, no token', 401);
  }
};

module.exports = { protect };