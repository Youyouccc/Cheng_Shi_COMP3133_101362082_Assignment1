const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    created_at: String!
    updated_at: String!
  }

  type Mutation {
    signup(username: String!, email: String!, password: String!): User
    login(username: String!, password: String!): String  # JWT Token
  }


  type Employee {
    _id: ID!
    first_name: String!
    last_name: String!
    email: String!
    gender: String!
    designation: String!
    salary: Float!
    date_of_joining: String!
    department: String!
    employee_photo: String
    created_at: String!
    updated_at: String!
  }

  type Query {
    getAllEmployees: [Employee]
    searchEmployeeByEid(eid: ID!): Employee
    searchEmployeeByDesignationOrDepartment(designation: String, department: String): [Employee]
  }

  type Mutation {
    addNewEmployee(
        first_name: String!, 
        last_name: String!, 
        email: String!, 
        gender: String!, 
        designation: String!, 
        salary: Float!, 
        date_of_joining: String!, 
        department: String!, 
        employee_photo: String
    ): Employee
    
    updateEmployeeByEid(
        eid: ID!, 
        first_name: String, 
        last_name: String, 
        email: String, 
        gender: String, 
        designation: String, 
        salary: Float, 
        date_of_joining: String, 
        department: String, 
        employee_photo: String
    ): Employee
    
    deleteEmployeeByEid(eid: ID!): String
  }
`;
module.exports = { typeDefs };