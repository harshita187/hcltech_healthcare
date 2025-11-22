const User = require('../models/User');
const WellnessData = require('../models/WellnessData');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

const registerUser = async (userData) => {
  // 1. Destructure ALL fields from the request
  const { name, email, password, age, gender, bloodGroup, height, weight } = userData;

  const userExists = await User.findOne({ email });
  if (userExists) throw new Error('User already exists');

  // 2. Create User with ALL fields
  const user = await User.create({ 
    name, email, password, age, gender, bloodGroup, height, weight 
  });

  if (user) {
    // 3. Init Wellness Data with Defaults + Custom Goals support
    await WellnessData.create({
      user: user._id,
      steps: { current: 0, target: 6000, weeklyHistory: [] },
      activity: { minutes: 0, targetMinutes: 60, caloriesBurned: 0, distanceKm: 0 },
      sleep: { hours: 0, minutes: 0, bedTime: '11:30 PM', wakeTime: '06:00 AM' },
      preventiveReminders: [
        { title: 'Annual blood test', date: new Date('2025-01-23'), type: 'Checkup' }
      ],
      customGoals: [] // <--- Added this to support the Goals Page immediately
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