const router = require('express').Router();
const { Assignment, Course, Goal, Note, User, UserCourse, UserAssignment } = require('../../models');
const withAuth = require('../../utils/auth');

//This is the /api/user-assignments endpoint
router.post('/', withAuth, async (req, res) => {
    try {
        const newUserAssignment = UserAssignment.create({
            assignment_id: req.body.assignment_id,
            user_id: req.session.user_id
        });
        res.status(200).json(newUserAssignment);
    } catch(err) {
        res.status(400).json(err)
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const deletedUserAssignment = await UserAssignment.destroy({
            where: {
                assignment_id: req.params.id,
                user_id: req.session.user_id,
            },
        });
        if(!deletedUserAssignment) {
            res.status(404).json({ message: 'No assignment found'})
            return;
        }
        res.status(200).json({ message: 'Assignment has been removed '})
    } catch(err) {
        res.status(500).json(err)
    }
})

module.exports = router;