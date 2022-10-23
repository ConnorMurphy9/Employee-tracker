const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Role = require("./Role")
class Department extends Model {}

Department.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            references: {
                model: Role,
                key: "id",
            }
        },
 
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 30],
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "Department",
    }
);
// the defined model is the class itself
console.log(Department === sequelize.models.Department); // true
module.exports = Department;