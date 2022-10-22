const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

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
                model: "department",
                key: "id",
            },
        }
    },
    {
        sequelize,
    timestamps: true,
    freezeTableName: true, //By Default, without true, table will be called users,
    underscored: true,
    modelName: "role",
    },
);

module.exports = Role;