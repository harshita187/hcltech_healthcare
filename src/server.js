require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 8080;

// Connect to Database then start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`
    ################################################
    🚀 Server listening on port: ${PORT}
    🏠 Environment: ${process.env.NODE_ENV || 'development'}
    ################################################
    `);
  });
});