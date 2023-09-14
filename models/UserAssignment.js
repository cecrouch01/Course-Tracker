const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class UserAssignment extends Model {}

UserAssignment.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    assignment_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'assignments',
            key: 'id',
        }
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'id'
        }
    },
},
{
    sequelize,
    modelName: 'user_assignments',
    freezeTableName: true,
    underscored: true,
    timestamps: false
})

module.exports = UserAssignment;