const mongoose = require('mongoose');

const wellnessSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
      index: true,
    },
    // Widget 1: Steps Tracking
    steps: {
      current: { type: Number, default: 0 },
      target: { type: Number, default: 6000 },
      weeklyHistory: [{ date: Date, count: Number }], 
    },
    // Widget 2: Active Time
    activity: {
      minutes: { type: Number, default: 0 },
      targetMinutes: { type: Number, default: 60 },
      caloriesBurned: { type: Number, default: 0 },
      distanceKm: { type: Number, default: 0 },
    },
    // Widget 3: Sleep
    sleep: {
      hours: { type: Number, default: 0 },
      minutes: { type: Number, default: 0 },
      bedTime: { type: String, default: '11:30 PM' },
      wakeTime: { type: String, default: '06:00 AM' },
    },
    // Section: Preventive Care Reminders
    preventiveReminders: [
      {
        title: { type: String, required: true },
        date: { type: Date, required: true },
        isCompleted: { type: Boolean, default: false },
        type: { type: String, enum: ['Checkup', 'Vaccination', 'Test'], default: 'Checkup' }
      },
    ],
    // NEW: Custom User Goals (Checklist)
    customGoals: [
      {
        title: { type: String, required: true },
        isCompleted: { type: Boolean, default: false }
      }
    ],
    // Section: Daily Health Tip
    dailyTip: {
      type: String,
      default: "Stay hydrated! Aim to drink at least 8 glasses of water per day.",
    },
  },
  { timestamps: true }
);

// FIX: Check if model exists before compiling
module.exports = mongoose.models.WellnessData || mongoose.model('WellnessData', wellnessSchema);