const router = require('express').Router();
const { Assignment, Course, Goal, Note, User, UserCourse } = require('../../models')
const withAuth = require('../../utils/auth');
const webpush = require('web-push');

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

//This creates an assignment attached to its course
router.post('/:id/assignments', withAuth, async (req, res) => {
    try {
        const newAssignment = await Assignment.create({
            ...req.body,
            course_id: req.params.id
        });
        const course = await Course.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    through: UserCourse,
                    where: {
                        subscription: true
                    }
                }
            ]
        })

        // For each user in the course send a notification
        for(let i = 0; i < course.users.length; i++) {
            const sub = { endpoint: course.users[i].endpoint, expirationTime: course.users[i].expiration_time, keys: { p256dh: course.users[i].p256dh, auth: course.users[i].auth}};
            const payload = JSON.stringify({ title: "New Assignment", body: `Assignment has been created for ${course.title}`})
            await webpush.sendNotification(sub, payload)
        }

        res.status(200).json(newAssignment);
    } catch(err) {
        res.status(400).json({ message: 'Oops, it seems like there has been an error'})
    }
});

//this creates a course
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

//This deletes an assignment
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

//this deletes a course
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