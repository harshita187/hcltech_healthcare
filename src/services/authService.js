const User = require('../models/User');
const WellnessData = require('../models/WellnessData'); // <-- Import this
const jwt = require('jsonwebtoken');

// Helper to generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Register Logic
const registerUser = async (userData) => {
  const { name, email, password } = userData;

  // Check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error('User already exists');
  }

  // Create user
  const user = await User.create({ name, email, password });

  if (user) {
    // ✅ Initialize Wellness Data immediately upon registration
    await WellnessData.create({
      user: user._id,
      steps: { current: 3620, target: 6000, weeklyHistory: [] },
      activity: { minutes: 56, targetMinutes: 60, caloriesBurned: 1712, distanceKm: 1.23 },
      sleep: { hours: 6, minutes: 30, bedTime: '11:30 PM', wakeTime: '06:00 AM' },
      preventiveReminders: [
        { title: 'Annual blood test', date: new Date('2025-01-23'), type: 'Checkup' }
      ]
    });

    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    };
  } else {
    throw new Error('Invalid user data');
  }
};

// Login Logic
const loginUser = async (email, password) => {
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    };
  } else {
    throw new Error('Invalid email or password');
  }
};

module.exports = { registerUser, loginUser };