const router = require('express').Router();
const { Assignment, Course, Goal, Note, User } = require('../../models')
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
        res.status(200).json(newAssignment);
    } catch(err) {
        res.status(400).json({ message: 'Oops, it seems like there has been an error'})
    }
});

module.exports = router;