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

//This gets a single course
router.get('/:id', async (req, res) => {
    try{
        const singleCourseData = await Course.findByPk(req.params.id)
        if(singleCourseData !== null) {
            res.status(200).json(singleCourseData) 
        } else{
            res.status(400).json({ message: 'Oops, it seems like there has been an error'})
        }
        
    } catch(err) {
        res.status(500).json(err)
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


module.exports = router;