const mongoose = require('mongoose');

const wellnessSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
      index: true, // Optimization for frequent queries
    },
    // Widget 1: Steps Tracking
    steps: {
      current: { type: Number, default: 0 },
      target: { type: Number, default: 6000 }, // Default from UI
      // Store last 7 days for the mini-bar chart in UI
      weeklyHistory: [{ date: Date, count: Number }], 
    },
    // Widget 2: Active Time
    activity: {
      minutes: { type: Number, default: 0 },
      targetMinutes: { type: Number, default: 60 },
      caloriesBurned: { type: Number, default: 0 }, // Kcal
      distanceKm: { type: Number, default: 0 }, // Km
    },
    // Widget 3: Sleep
    sleep: {
      hours: { type: Number, default: 0 },
      minutes: { type: Number, default: 0 },
      bedTime: { type: String, default: '11:30 PM' }, // String for display
      wakeTime: { type: String, default: '06:00 AM' },
    },
    // Section: Preventive Care Reminders
    preventiveReminders: [
      {
        title: { type: String, required: true }, // e.g., "Annual blood test"
        date: { type: Date, required: true },
        isCompleted: { type: Boolean, default: false },
        type: { type: String, enum: ['Checkup', 'Vaccination', 'Test'], default: 'Checkup' }
      },
    ],
    // Section: Daily Health Tip
    dailyTip: {
      type: String,
      default: "Stay hydrated! Aim to drink at least 8 glasses of water per day.",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('WellnessData', wellnessSchema);