const router = require('express').Router();
const { Assignment, Course, Goal, Note, User } = require('../../models')
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

module.exports = router;