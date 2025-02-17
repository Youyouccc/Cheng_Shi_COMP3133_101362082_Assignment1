const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, unique: true, require: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  designation: { type: String, required: true },
  salary: { type: Number, required: true, min: 1000 },
  date_of_joining: { type: Date, required: true },
  department: { type: String, required: true },
  employee_photo: { type: String, default: "" }, 
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

// Middleware to update 'updated_at' when an employee document is updated
EmployeeSchema.pre('save', function(next) {
    this.updated_at = Date.now();
    next();
  });
  
  module.exports = mongoose.model('Employee', EmployeeSchema);