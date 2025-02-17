const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

// Middleware to hash password before saving the user
UserSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }
    this.updated_at = Date.now();
    next();
  });
  
  // Method to check if entered password matches stored encrypted password
  UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
  };
  
  module.exports = mongoose.model('User', UserSchema);