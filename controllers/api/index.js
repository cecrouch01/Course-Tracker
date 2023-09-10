const router = require('express').Router();
const assignmentRoutes = require('./assignment-routes');
const courseRoutes = require('./course-routes');
const goalRoutes = require('./goal-routes');
const noteRoutes = require('./note-routes');
const userRoutes = require('./user-routes');
const userCourseRoutes = require('./user-course-routes')

router.use('/assignments', assignmentRoutes);
router.use('/courses', courseRoutes);
router.use('/goals', goalRoutes);
router.use('/notes', noteRoutes);
router.use('/users', userRoutes);
router.use('/user-course', userCourseRoutes);

module.exports = router