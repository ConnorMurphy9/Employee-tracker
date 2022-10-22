const Department = require("./Department");
const Employee = require("./Employee");
const Role = require("./Role")

Department.hasMany(Role, {
    foreignKey: "id",
    onDelete: "CASCADE",
});

Employee.belongsTo(Department, Role, {
    foreignKey: "id",
    onDelete: "CASCADE"
});

Role.hasMany(Employee,{
    foreignKey: 'id',
    onDelete: "CASCADE"

});


Manager.hasMany(Employee)
// .belongsTo(User, {
//     foreignKey: "user_id",
// });


module.exports = { Department, Employee, Role };