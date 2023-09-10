const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Assignment extends Model {}

Assignment.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING,
        validate: {
            isAlpha: true,
        }
    },
    description: {
        type: DataTypes.STRING,
    },
    due_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    course_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'courses',
            key: 'id'
        }
    },
},
{
    sequelize,
    modelName: 'assignments',
    timestamps: false,
})

module.exports = Assignment;