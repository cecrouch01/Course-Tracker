const router = require('express').Router();
const { Assignment, Course, Goal, Note, User, UserCourse } = require('../../models')
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    //This will create a new user/course relationship
    try {
        const newUserCourse = UserCourse.create({
            course_id: req.body.course_id,
            user_id: req.session.user_id
        });
        res.status(200).json(newUserCourse)
    } catch(err) {
        res.status(400).json(err)
    }
});

module.exports = router;