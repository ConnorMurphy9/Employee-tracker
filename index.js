const express = require('express')
const fs = require("fs");
const path = require('path');
const inquirer = require("inquirer");

const cTable = require('console.table');
console.table([
  {
    name: 'foo',
    age: 10
  }, {
    name: 'bar',
    age: 20
  }
]);

// // prints
// name  age
// ----  ---
// foo   10
// bar   20