const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Note extends Model {}

Note.init({
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
            isAlphanumeric: true,
        },
    },
    contents: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    date_created: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    course_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'courses',
            key: 'id',
        }
    },
    goal_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'goals',
            key: 'id',
        },
    },
    assignment_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'assignments',
            key: 'id'
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
    modelName: 'notes',
    timestamps: false
});

module.exports = Note;