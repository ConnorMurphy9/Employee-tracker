const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

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
                model: "role",
                key: "id",
            },
            // {
            //     model: "" //manager_id here
            // }
        }
    },

    {
        sequelize,
        timestamps: true,
        freezeTableName: true, //By Default, without true, table will be called users,
        underscored: true,
        modelName: "employee",
    },
)

module.exports = Employee;