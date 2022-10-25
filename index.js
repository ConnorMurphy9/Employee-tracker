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
          else {console.table("\n", res);}
          questions()});}
    

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
 
      const roleSearched = await Model.Role.findOne({ where: { title: data.role } });
      if (roleSearched === null) {
        console.log('Role not found!');
      } else {
        console.log(roleSearched instanceof Model.Role);
      }

      const manager = await Model.Employee.findOne({where: {manager_id: data.manager}});
      if (manager === null) {
        console.log('Not found!');
      } else {
        console.log(manager instanceof Model.Employee); 
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
    
    const updateEmployeeRole = async () => {
      const employeesArray = await sequelize.query("Select id AS value, CONCAT(first_name, ' ', last_name) AS name FROM Employee");
      const employees = employeesArray[0];

      const rolesArray = await sequelize.query("Select id AS value, title AS name FROM Role");
   
      const roles = rolesArray[0];
      await inquirer
        .prompt ([
          {
            name: "whichEmployee",
            type: "list",
            message: "Which employee's role do you want to update?",
            choices: employees
          },
          {
            name: "assignRole",
            type: "list",
            message: "Which role do you want to assign the selected employee? Select 1 for Sales Lead, 2 for Salesperson, 3 for Lead Engineer, 4 for Software Engineer, 5 for Account Manager, 6 for Accountant, 7 for Legal Team Lead, and 8 for Lawyer",
            choices: roles
          }
        ])
        .then(async (data) => {
          console.log("This is the data = " + data);
          console.log("This is data.assignRole = " + data.assignRole);
          console.log("This is data.whichEmployee = " + data.whichEmployee);
          console.log("This is simply roles = " + roles);
          console.log("This is simply employees = " + employees);
            await Employee.update({ role_id: data.assignRole}, {
              where: 
                {
                  id: data.whichEmployee
                }
            });
            questions();
        })
      }

    const viewAllRoles = () => {
      const sql = `SELECT * FROM role`;
      con.query(sql, (err, res) => {
          if (err) {return err;}
          else {console.table(res);}
          questions();
      });
    }


    const addRole = async () => {

// const employeesArray = await sequelize.query("Select id AS value, CONCAT(first_name, ' ', last_name) AS name FROM Employee");
//       const employees = employeesArray[0];

// const departmentArray = await sequelize.query("Select id AS value, name AS name FROM Department");
// console.log("This is departmentArray: " + departmentArray)
//    const departments = departmentArray[0];
// console.timeLog("This is simply departments: " + departments);

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
    
  
       const departmentSearched = await Model.Department.findOne({where: { name: data.roleDepartment }});
       if (departmentSearched === null) {
        console.log('Department not found!');
       } else {
        console.log(departmentSearched instanceof Model.Department);
       }
       await Model.Role.create({title: data.roleName, salary: data.roleSalary, department_id: departmentSearched.id});
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

   



















