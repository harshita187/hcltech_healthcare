const WellnessData = require('../models/WellnessData');

// Fetch or Create Dashboard Data
const getDashboardData = async (userId) => {
  let data = await WellnessData.findOne({ user: userId });

  if (!data) {
    data = await WellnessData.create({
      user: userId,
      steps: { current: 3620, target: 6000, weeklyHistory: [] },
      activity: { minutes: 56, targetMinutes: 60, caloriesBurned: 1712, distanceKm: 1.23 },
      sleep: { hours: 6, minutes: 30, bedTime: '11:30 PM', wakeTime: '06:00 AM' },
      preventiveReminders: [
        { title: 'Annual blood test', date: new Date('2025-01-23'), type: 'Checkup' }
      ],
      customGoals: [] // Initialize empty
    });
  }
  return data;
};

// Update Specific Metrics
const updateMetrics = async (userId, metricType, payload) => {
  const data = await WellnessData.findOne({ user: userId });
  if (!data) throw new Error('Wellness data not found');

  if (metricType === 'steps') {
    data.steps = { ...data.steps, ...payload };
  } else if (metricType === 'activity') {
    data.activity = { ...data.activity, ...payload };
  } else if (metricType === 'sleep') {
    data.sleep = { ...data.sleep, ...payload };
  }

  await data.save();
  return data;
};

// --- New Functionalities ---

const addCustomGoal = async (userId, title) => {
  const data = await WellnessData.findOne({ user: userId });
  if (!data) throw new Error('Data not found');
  
  data.customGoals.push({ title, isCompleted: false });
  await data.save();
  return data;
};

const toggleCustomGoal = async (userId, goalId) => {
  const data = await WellnessData.findOne({ user: userId });
  if (!data) throw new Error('Data not found');

  const goal = data.customGoals.id(goalId);
  if (goal) {
    goal.isCompleted = !goal.isCompleted;
    await data.save();
  }
  return data;
};

const deleteCustomGoal = async (userId, goalId) => {
  const data = await WellnessData.findOne({ user: userId });
  if (!data) throw new Error('Data not found');

  // Filter out the goal to delete it
  data.customGoals = data.customGoals.filter(g => g._id.toString() !== goalId);
  await data.save();
  return data;
};

module.exports = { 
  getDashboardData, 
  updateMetrics, 
  addCustomGoal, 
  toggleCustomGoal, 
  deleteCustomGoal 
};