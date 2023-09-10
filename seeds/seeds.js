const sequelize = require("../config/connection");
const {Assignment, Course, Goal, Note, User, UserCourse} = require('../models');
const assignmentData = require('./assignment-data.json');
const courseData = require('./coures-data.json');
const goalData = require('./goal-data.json');
const noteData = require('./note-data.json');
const userCourseData = require('./user-course-data.json');
const userData = require('./user-data.json');

async function seedDatabase() {
    await sequelize.sync({ force: true });

    await User.bulkCreate(userData, 
        {
            individualHooks: true,
        });
    console.log('user data successfully seeded');

    await Course.bulkCreate(courseData);
    console.log('course data successfully seeded');

    await UserCourse.bulkCreate(userCourseData);
    console.log('User/Course Junction Table successfully seeded');

    await Assignment.bulkCreate(assignmentData);
    console.log('assignment data succsesfully seeded');

    await Goal.bulkCreate(goalData);
    console.log('goal data successfully seeded');

    await Note.bulkCreate(noteData);
    console.log('note data successfully seeded');

    process.exit(0)
}

seedDatabase();

