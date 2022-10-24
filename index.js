const express = require('express')
// const fs = require("fs");
// const path = require('path');
const inquirer = require("inquirer");

const cTable = require('console.table');

const Model = require("./models");
const {Department, Employee, Role} = require("./models");
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
    
    const viewAllEmployees = async () => {
      const sql = `SELECT 
      Employee.id, 
      Employee.first_name, 
      Employee.last_name, 
      Employee.role_id, 
      Employee.manager_id, 
      Role.title, 
      Role.salary  
      FROM Employee
      LEFT OUTER JOIN Role ON Employee.role_id = Role.id`;
      con.query(sql, (err, res) => {
          if (err) {return err;}
          else {console.table(res);}
          // questions();
      });questions();}
    
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
      .then( async (data) => {
        console.log(data);
      //  query to get role ID based on option they chose, do same for manager

      // const chosenRole = data.role;
  
      const roleSearched = await Model.Role.findOne({ where: { title: data.role } });
      if (roleSearched === null) {
        console.log('Role not found!');
      } else {
        console.log(roleSearched instanceof Model.Role); // true
        // console.log(Role.title); // 
      }

      const manager = await Model.Employee.findOne({where: {manager_id: data.manager}});
      if (manager === null) {
        console.log('Not found!');
      } else {
        console.log(manager instanceof Model.Employee); // true
        // console.log(Employee.title); // 
      }
      
if (manager === null) {
  console.log('Not found!');
} else {
  console.log(manager instanceof Model.Employee); // true

}
        Model.Employee.create({first_name: data.firstName, last_name: data.lastName,
      role_id: roleSearched.id, manager_id: manager
    });
    })
  questions();
  }
    
    // const updateEmployeeRole = () => {

    // }
    

    const viewAllRoles = () => {
      const sql = `SELECT * FROM role`;
      con.query(sql, (err, res) => {
          if (err) {return err;}
          else {console.table(res);}
          questions();
      });
    }


    const addRole = async () => {
      await inquirer
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
       console.log(data);
        
       const departmentSearched = await Model.Department.findOne({where: { name: data.roleDepartment }});
       if (departmentSearched === null) {
        console.log('Department not found!');
       } else {
        console.log(departmentSearched instanceof Model.Department);
       }
       await Model.Role.create({title: data.roleName, salary: data.roleSalary, department_id: departmentSearched.id});
        // console.log(newEmployee);
        // employees.push(newEmployee);
        questions();
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


    // const queryRoleId = async (data) => {
    //   await Role.findOne({ where: { title: data.role } });
    //   if (Role === null) {
    //     console.log('Not found!');
    //   } else {
    //     console.log(Role instanceof Role); // true
    //     console.log(Role.title); // 
    //   }
    // };




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