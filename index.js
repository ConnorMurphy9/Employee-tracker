// const express = require('express')
// const fs = require("fs");
// const path = require('path');
const inquirer = require("inquirer");

const cTable = require('console.table');

const Model = require("./models");

const sequelize = require("./config/connection");


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