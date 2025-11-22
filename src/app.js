const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// Import Routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes'); // <-- Added
const wellnessRoutes = require('./routes/wellnessRoutes');
const { errorHandler } = require('./middlewares/errorHandler');

const app = express();

// --- Global Middleware ---
app.use(helmet());
app.use(cors({ origin: '*' })); 
app.use(express.json()); 
app.use(morgan('dev')); 

// --- Routes ---
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes); // <-- Added
app.use('/api/wellness', wellnessRoutes);

// --- Health Check ---
app.get('/', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Wellness Portal Backend is Running 🚀' });
});

// --- Global Error Handler ---
app.use(errorHandler);

module.exports = app;