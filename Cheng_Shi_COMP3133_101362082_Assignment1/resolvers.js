const User = require('./models/Users');
const Employee = require('./models/Employee');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Define resolvers
const resolvers = {
    Query: {
      getAllEmployees: async () => {
        return await Employee.find();
      },
      searchEmployeeByEid: async (_, { eid }) => {
        return await Employee.findById(eid);
      },
      searchEmployeeByDesignationOrDepartment: async (_, { designation, department }) => {
        return await Employee.find({
          $or: [
            { designation },
            { department }
          ]
        });
      }
    },
    Mutation: {
      signup: async (_, { username, email, password }) => {
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
          throw new Error("Username or email already taken");
        }
        const user = new User({ username, email, password });
        await user.save();
        return user;
      },
      login: async (_, { username, password }) => {
        const user = await User.findOne({ $or: [{ username }, { email: username }] });
        if (!user || !(await bcrypt.compare(password, user.password))) {
          throw new Error("Invalid credentials");
        }
        const token = jwt.sign({ userId: user._id }, "secret", { expiresIn: "1h" });
        return token;
      },
      addNewEmployee: async (_, { first_name, last_name, email, gender, designation, salary, date_of_joining, department, employee_photo }) => {
        const newEmployee = new Employee({ first_name, last_name, email, gender, designation, salary, date_of_joining, department, employee_photo });
        await newEmployee.save();
        return newEmployee;
      },
      updateEmployeeByEid: async (_, { eid, ...updatedData }) => {
        const employee = await Employee.findByIdAndUpdate(eid, updatedData, { new: true });
        if (!employee) {
          throw new Error("Employee not found");
        }
        return employee;
      },
      deleteEmployeeByEid: async (_, { eid }) => {
        const result = await Employee.findByIdAndDelete(eid);
        if (!result) {
          throw new Error("Employee not found");
        }
        return "Employee deleted successfully";
      }
    }
  };

  module.exports = { resolvers };
