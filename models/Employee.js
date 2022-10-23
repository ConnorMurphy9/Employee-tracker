const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Role = require('./Role')
class Employee extends Model {}

Employee.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },

        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 30],
            }
        },

        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 30],
            },
        },

        role_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references:{
                model: "Role",
                key: "id",
            }},
            manager_id: {
                type: DataTypes.INTEGER,
                references:{
                model: "Employee",
                key: "id",
                //manager_id here
                }
            },
    
        },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true, //By Default, without true, table will be called users,
        underscored: true,
        modelName: "Employee",
    }
);
// the defined model is the class itself
console.log(Employee === sequelize.models.Employee); // true
module.exports = Employee;