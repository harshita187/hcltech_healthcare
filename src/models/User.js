const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Name is required'] },
    email: { 
      type: String, 
      required: [true, 'Email is required'], 
      unique: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please add a valid email']
    },
    password: { type: String, required: [true, 'Password is required'] },
    
    // Profile Fields (Supports "My Profile" page)
    age: { type: Number },
    gender: { type: String, enum: ['Male', 'Female', 'Other'] },
    bloodGroup: { type: String },
    height: { type: Number }, // cm
    weight: { type: Number }, // kg
    medicalHistory: [{ type: String }], // Array of strings for cleaner history
  },
  { timestamps: true }
);

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Encrypt password using bcrypt
// FIX: Removed 'next' parameter. In async Mongoose hooks, just use return.
userSchema.pre('save', async function () {
  if (!this.isModified('password')) {
    return; // Simply return to exit the hook
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model('User', userSchema);