const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class UserCourse extends Model {}

UserCourse.init(
    {  
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        course_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'courses',
                key: 'id',
            },
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'users',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        modelName: 'user_courses'

});

module.exports = UserCourse;