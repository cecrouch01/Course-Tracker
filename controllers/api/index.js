const router = require('express').Router();
const courseRoutes = require('./course-routes');
const userRoutes = require('./user-routes');

router.use('/courses', courseRoutes);
router.use('/users', userRoutes);

module.exports = router