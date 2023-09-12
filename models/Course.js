const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Course extends Model {}

Course.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    start_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    end_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
},
{
    sequelize,
    modelName: 'courses',
    timestamps: false,
});

module.exports = Course;