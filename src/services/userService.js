const User = require('../models/User');

// Get User Profile (exclude password)
const getUserProfile = async (userId) => {
  const user = await User.findById(userId).select('-password');
  if (!user) throw new Error('User not found');
  return user;
};

// Update User Profile
const updateUserProfile = async (userId, updateData) => {
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');

  // Update fields if they exist in request
  user.name = updateData.name || user.name;
  user.age = updateData.age || user.age;
  user.gender = updateData.gender || user.gender;
  user.bloodGroup = updateData.bloodGroup || user.bloodGroup;
  user.height = updateData.height || user.height;
  user.weight = updateData.weight || user.weight;
  user.medicalHistory = updateData.medicalHistory || user.medicalHistory;

  const updatedUser = await user.save();
  
  // Return user without password
  const userObj = updatedUser.toObject();
  delete userObj.password;
  
  return userObj;
};

module.exports = { getUserProfile, updateUserProfile };