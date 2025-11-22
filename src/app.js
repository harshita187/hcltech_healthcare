const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db'); // Import the new cached DB function

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const wellnessRoutes = require('./routes/wellnessRoutes');
const { errorHandler } = require('./middlewares/errorHandler');

const app = express();

// --- Global Middleware ---
app.use(helmet());
app.use(cors({ origin: '*' })); 
app.use(express.json()); 
app.use(morgan('dev')); 

// --- CRITICAL: Connect to DB before any route handler ---
// This ensures Mongoose is connected before 'users.findOne()' runs
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("Database Connection Failed:", error);
    res.status(500).json({ success: false, message: "Database Connection Error" });
  }
});

// --- Routes ---
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/wellness', wellnessRoutes);

// --- Health Check ---
app.get('/', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Wellness Portal Backend is Running 🚀' });
});

// --- Global Error Handler ---
app.use(errorHandler);

module.exports = app;