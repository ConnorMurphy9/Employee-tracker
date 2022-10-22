const express = require("express");
const app = express();
const sequelize = require("./config/connection");
// const mysql = require('mysql2');
// const Model = require("./models");

const PORT = 5501;

sequelize.sync().then(() => {
app.listen(PORT, () => {
  console.log("I'm running.");
});
});
// Express middleware
// app.use(express.urlencoded({}));
// app.use(express.json());
// app.get('/', (req, res) => {
//   res.json("hi");
// });
// // Connect to database
// const db = mysql.createConnection(
//   {
//     host: 'localhost',
//     // MySQL username,
//     user: 'root',
//     // MySQL password
//     password: 'root123',
//     database: 'employee_db'
//   },
//   console.log(`Connected to the  database.`)
// );

// Query database
// db.query('SELECT * FROM employee', function (err, results) {
//     console.log(results);
//   });

  // // Default response for any other request (Not Found)
  // app.use((req, res) => {
  //   res.status(404).end();
  // });



// sequelize.sync().then(() => {
//     app.listen(PORT, () => {
//         console.log("I'm running.")
// });
// });