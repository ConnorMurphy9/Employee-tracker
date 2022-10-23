const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Department = require('./department');

class Role extends Model {}

Role.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },

        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 30],
            }
        },

        salary: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },

        department_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references:{
                model: "Department",
                key: "id",
            },
        }
    },
    {
        sequelize,
    timestamps: false,
    freezeTableName: true, //By Default, without true, table will be called users,
    underscored: true,
    modelName: "Role",
    },
);

// the defined model is the class itself
console.log(Role === sequelize.models.Role); // true

module.exports = Role;