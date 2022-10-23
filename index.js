const express = require('express')
// const fs = require("fs");
// const path = require('path');
const inquirer = require("inquirer");

const cTable = require('console.table');

const Model = require("./models");

const sequelize = require("./config/connection");

const mysql = require("mysql2");

require("dotenv").config();

// const employees = [];

const con = mysql.createConnection(
  {
      host: 'localhost',
      user: process.env.DB_USER,
      password: process.env.DB_PW,
      database: process.env.DB_NAME
  }
  );



  const questions = () => {

    inquirer
        .prompt([
          {
            name: "first",
            type: "list",
            message: "What would you like to do?",
            choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit' ]
          },
        ])
        .then((data) => {
          switch (data.first) {
              case "View All Employees":
                viewAllEmployees();
              break;
    
              case "Add Employee":
                addEmployee();
              break;
    
              case "Update Employee Role":
                updateEmployeeRole();
              break;
    
              case "View All Roles":
                viewAllRoles();
              break;
    
              case "Add Role":
                addRole();
              break;
    
              case "View All Departments":
                viewAllDepartments();
              break;
    
              case "Add Department":
                addDepartment();
                break;
    
                default:
                  // process you want to happen when the user chooses quit 
          }
        })};
    
    // const viewAllEmployees = () => {
    
    // }
    
    const addEmployee = async() => {
     await inquirer
      .prompt([
          {
            name: "firstName",
            type: "input",
            message: "What is the employee's first name?",
          },
          {
            name: "lastName",
            type: "input",
            message: "What is the employee's last name?"
          },
          {
            name: "role",
            type: "list",
            message: "What is the employee's role?",
            choices: ["Sales Lead", "Salesperson", "Lead Engineer", "Software Engineer", "Account Manager", "Accountant", "Legal Team Lead", "Lawyer", "Customer Service"]
        },
        {  
            name: "manager",
            type: "input",
            message: "Who is the employee's manager?",
        },
      ])
      .then( (data) => {
        Model.Employee.create({first_name: data.firstName, last_name: data.lastName,
      role_id: data.role, manager_id: data.manager
    });
  
        // console.log(newEmployee);
        // employees.push(newEmployee);
 
    
    })}
    
    // const updateEmployeeRole = () => {

    // }
    

    // const viewAllRoles = () => {

    // }


    const addRole = () => {
      inquirer
      .prompt([
          {
            name: "roleName",
            type: "input",
            message: "What is the name of the role?",
          },
          {
            name: "roleSalary",
            type: "input",
            message: "What is the salary of the role?"
          },
          {
            name: "roleDepartment",
            type: "list",
            message: "Which department does the role belong to?",
            choices: ["Engineering", "Finance", "Legal", "Sales"]
        }
      ])
      .then(async (data) => {
       await Model.Role.create({title: data.roleName, salary: data.roleSalary});
        // console.log(newEmployee);
        // employees.push(newEmployee);
    })}


    const viewAllDepartments = () => {
      const sql = `SELECT * FROM department`;
      con.query(sql, (err, res) => {
          if (err) {return err;}
          else {console.table(res);}
          questions();
      });
    }


    const addDepartment = async() => {
      await inquirer
      .prompt([
          {
            name: "name",
            type: "input",
            message: "What is the name of the department?",
          },
          
      ])
        .then( async (data) => {
       await Model.Department.create({name: data.name});
    });questions();};


    questions();







// const PORT = 5500;


// console.table([
//   {
//     name: 'foo',
//     age: 10
//   }, {
//     name: 'bar',
//     age: 20
//   }
// ]);

// // prints
// name  age
// ----  ---
// foo   10
// bar   20












    //   {
    //     name: "id",
    //     type: "input",
    //     message: "What is the manager's id?",
    //   },
    //   {
    //     name: "email",
    //     type: "input",
    //     message: "What is the manager's email?",
    //   },
    //   {
    //     name: "officeNumber",
    //     type: "input",
    //     message: "What is the manager's office number?",
    //   },
    // ])
    // .then((data) => {





    // })};


    // // get the client
    // const mysql = require('mysql2');
    // // create the connection
    // const con = mysql.createConnection(
    //   {host:'localhost', user: 'root', database: 'test'}
    // );
    // con.query("SELECT 1")
    // .then( ([rows, fields]) => {
    //   console.log(rows);
    // })
    // .catch(console.log)
    // .then( () => con.end());