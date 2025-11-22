const { errorResponse } = require('../utils/apiResponse');

const errorHandler = (err, req, res, next) => {
  console.error(`⚠️ Error: ${err.message}`);
  
  // If the error status code is not set, default to 500
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  errorResponse(res, err.message, statusCode);
};

module.exports = { errorHandler };