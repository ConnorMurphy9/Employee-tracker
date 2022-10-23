const Department = require("./Department");
const Employee = require("./Employee");
const Role = require("./Role")


// Department.hasMany(Employee, {
//     foreignKey: "id",
// });

Employee.belongsTo(Role, {
    foreignKey: "role_id",
});

Role.hasMany(Employee, {
    foreignKey: 'role_id',
});

Department.hasMany(Role, {
    foreignKey: "department_id",
});

Role.belongsTo(Department, {
        foreignKey: "department_id",
    });





// Manager.hasMany(Employee)
// // .belongsTo(User, {
// //     foreignKey: "user_id",
// // });



module.exports = { Department, Employee, Role };