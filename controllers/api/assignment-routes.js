const router = require('express').Router();
const { Assignment, Course, Goal, Note, User, UserAssignment } = require('../../models')
const withAuth = require('../../utils/auth');

//This is the /api/assignments endpoint

//This gets all assignments
router.get('/', async (req, res) => {
    try {
        const assignmentData = await Assignment.findAll()
        res.status(200).json(assignmentData)
    } catch(err) {
        res.status(500).json(err)
    }
});

//This gets a single assignment
router.get('/:id', async (req, res) => {
    try{
        const singleAssignmentData = await Assignment.findByPk(req.params.id)
        if(singleAssignmentData !== null) {
            res.status(200).json(singleAssignmentData) 
        } else{
            res.status(400).json({ message: 'Oops, it seems like there has been an error'})
        }
    } catch(err) {
        res.status(500).json(err)
    }
});

router.post('/', withAuth, async (req, res) => {
    try {
         // This will create a new assignment
            // {
            //     title: "insert title",
            //     type: "insert type(maybe a drop down menu)" (optional),
            //     description: "insert description" (optional),
            //     due_date: "insert due date" (optional)
            //     //course id will not be sent and need to go through the front end. 
            // }
        const newAssignment = await Assignment.create(req.body)
        //This creates an instance of a relationship between user/assignment
        await UserAssignment.create({
            assignment_id: newAssignment.id,
            user_id: req.session.user_id
        });
        res.status(200).json(newAssignment);
    } catch(err) {
        res.status(400).json({ message: 'Oops, it seems like there has been an error'})
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const deletedAssignment = await Assignment.destroy({
            where: {
                id: req.params.id,
            },
        })

        if(!deletedAssignment) {
            res.status(404).json({ message: 'No Assignment found with this id'})
            return;
        }
        res.status(200).json({ message: 'Assignment has been deleted'})
    } catch(err) {
        res.status(500).json(err)
    }
});

module.exports = router;