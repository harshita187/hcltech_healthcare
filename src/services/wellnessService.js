const WellnessData = require('../models/WellnessData');

// Fetch or Create Dashboard Data
const getDashboardData = async (userId) => {
  let data = await WellnessData.findOne({ user: userId });

  // If no data exists, initialize with UI Default Mock Data
  if (!data) {
    data = await WellnessData.create({
      user: userId,
      steps: {
        current: 3620, // Mock value from UI
        target: 6000,
        weeklyHistory: [] // Can populate with dummy data if needed
      },
      activity: {
        minutes: 56,
        targetMinutes: 60,
        caloriesBurned: 1712,
        distanceKm: 1.23
      },
      sleep: {
        hours: 6,
        minutes: 30,
        bedTime: '11:30 PM',
        wakeTime: '06:00 AM'
      },
      preventiveReminders: [
        {
          title: 'Annual blood test',
          date: new Date('2025-01-23'), // From UI image
          type: 'Checkup'
        }
      ]
    });
  }
  return data;
};

// Update Specific Metrics (Steps, Sleep, etc.)
const updateMetrics = async (userId, metricType, payload) => {
  const data = await WellnessData.findOne({ user: userId });
  if (!data) throw new Error('Wellness data not found');

  // Dynamic update based on widget type
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

module.exports = { getDashboardData, updateMetrics };