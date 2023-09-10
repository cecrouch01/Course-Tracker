const Assignment = require('./Assignment');
const Course = require('./Course');
const Goal = require('./Goal');
const Note = require('./Note');
const User = require('./User');
const UserCourse = require('./UserCourse');

User.belongsToMany(Course, {
    through: UserCourse,
});
Course.belongsToMany(User, {
    through: UserCourse,
});
Course.hasMany(Assignment, {
    foreignKey: 'course_id',
});
Assignment.belongsTo(Course, {
    foreignKey: 'course_id'
});
Course.hasMany(Goal, {
    foreignKey: 'course_id',
});
Goal.belongsTo(Course, {
    foreignKey: 'course_id',
});
Assignment.hasMany(Goal, {
    foreignKey: 'assignment_id',
});
Goal.belongsTo(Assignment, {
    foreignKey: 'assignment_id',
});
User.hasMany(Goal, {
    foreignKey: 'user_id'
});
Goal.belongsTo(User, {
    foreignKey: 'user_id'
});
User.hasMany(Note, {
    foreignKey: 'user_id'
});
Note.belongsTo(User, {
    foreignKey: 'user_id'
});
Course.hasMany(Note, {
    foreignKey: 'course_id',
});
Note.belongsTo(Course, {
    foreignKey: 'course_id',
});
Goal.hasMany(Note, {
    foreignKey: 'goal_id',
});
Note.belongsTo(Goal, {
    foreignKey: 'goal_id',
});
Assignment.hasMany(Note, {
    foreignKey: 'assignment_id',
});
Note.belongsTo(Assignment, {
    foreignKey: 'assignment_id',
});

module.exports = {
    Assignment,
    Course,
    Goal,
    Note,
    User,
    UserCourse
}
