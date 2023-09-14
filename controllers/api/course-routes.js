const router = require('express').Router();
const { Assignment, Course, Goal, Note, User, UserCourse } = require('../../models')
const withAuth = require('../../utils/auth');

//This is the /api/courses endpoint

//This gets all courses
router.get('/', async (req, res) => {
    try {
        const courseData = await Course.findAll()
        res.status(200).json(courseData)
    } catch(err) {
        res.status(500).json(err)
    }
});

//This gets a single course with its assignments
router.get('/:id/assignments', async (req, res) => {
    try{
        const singleCourseData = await Course.findByPk(req.params.id,{
            include: {
                model: Assignment
            }
        });
        if(singleCourseData !== null) {
            res.status(200).json(singleCourseData) 
        } else{
            res.status(400).json({ message: 'Oops, it seems like there has been an error'})
        }
        
    } catch(err) {
        res.status(500).json(err)
    }
});


router.post('/:id/assignments', withAuth, async (req, res) => {
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

router.post('/', withAuth, async (req, res) => {
    try {
        const newCourse = await Course.create(req.body)
        //This creates an instance of a relationship between the user and course junction
        await UserCourse.create({
            course_id: newCourse.id,
            user_id: req.session.user_id
        });
        res.status(200).json(newCourse)
    } catch(err) {
        res.status(400).json(err)
    }
});

router.delete('/assignments/:id', withAuth, async (req, res) => {
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

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const deletedCourse = await Course.destroy({
            where: {
                id: req.params.id,
            },
        });

        if(!deletedCourse) {
            res.status(404).json({ message: 'No Assignment found with this id'})
            return;
        }
        res.status(200).json({ message: 'Assignment has been deleted'})
    } catch(err) {
        res.status(500).json(err)
    }
});



module.exports = router;