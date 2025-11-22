const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    
    // Detailed Profile Fields
    age: { type: Number },
    gender: { type: String },
    bloodGroup: { type: String },
    height: { type: Number },
    weight: { type: Number },
    medicalHistory: [{ type: String }],
  },
  { timestamps: true }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// FIX: Check if model exists before compiling
module.exports = mongoose.models.User || mongoose.model('User', userSchema);