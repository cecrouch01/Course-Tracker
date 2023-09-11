const router = require('express').Router();
const { Assignment, Course, Goal, Note, User, UserCourse } = require('../../models')
const withAuth = require('../../utils/auth');

//This is the /api/user-courses endpoint

//This will create a new user/course relationship
router.post('/', withAuth, async (req, res) => {
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

//This will remove a course from a users profile
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const deletedUserCourse = await UserCourse.destroy({
            where: {
                course_id: req.params.id,
                user_id: req.session.user_id,
            },
        });
        if(!deletedUserCourse) {
            res.status(404).json({ message: 'No course found'})
            return;
        }
        res.status(200).json({ message: `Course has been removed`})
    } catch(err) {
        res.status(500).json(err)
    }
})

module.exports = router;