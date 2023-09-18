const router = require('express').Router();
const webpush = require('web-push');
const withAuth = require('../utils/auth');
const { Assignment, Course, Goal, Note, User, UserCourse} = require('../models')
const publicVapidKey = process.env.VAPID_PUBLIC_KEY;
const vapidEmail = process.env.VAPID_EMAIL;
const privateVapidKey = process.env.VAPID_PRIVATE_KEY;


// Setup the public and private VAPID keys to web-push library.
webpush.setVapidDetails(`mailto:${vapidEmail}`, publicVapidKey, privateVapidKey);



// Create route for allow client to subscribe to push notification.
router.post('/subscribe', async (req, res) => {
    const sub = req.body;
    const user = await User.findByPk(req.session.user_id)
    await user.update({
        subscription: true,
        endpoint: sub.endpoint,
        expiration_time: sub.expirationTime,
        p256dh: sub.keys.p256dh,
        auth: sub.keys.auth
    });
});

router.get('/dashboard', withAuth, async (req, res) => {
    try{
        const userData = await User.findByPk(req.session.user_id, 
            {
            include: [
            {
                model: Course,
                through: UserCourse,
                include: {
                    model: Assignment,
                }   
            },
            ],
            attributes: ['id','email', 'first_name', 'last_name']
        }
        )
        const user = userData.get({ plain: true })
        res.render('dashboard', {
            user,
            logged_in: req.session.logged_in 
        })
    } catch(err) {
        res.status(500).json(err)
    }
});

router.get('/login', async (req, res) => {
    try{
        if(req.session.logged_in) {
            res.redirect('/dashboard')
            return;
        }
        res.render('login')
    } catch(err) {
        res.status(500).json(err)
    }
});

router.get('/', async (req, res) => {
    try{
        res.render('homepage', {
            logged_in: req.session.logged_in 
        })
    } catch(err) {
        res.status(500).json(err)
    }
});

router.get('/course/:id', withAuth, async (req, res) => {
    try{
        const userData = await User.findByPk(req.session.user_id, {
                attributes: ['id','email', 'first_name', 'last_name'],
        })
        const courseData = await Course.findByPk(req.params.id, {
            include: [
                {
                    model: Assignment
                }
            ]
        });
        const userCourseGoals = await Goal.findAll({
            where: {
                course_id: req.params.id,
                user_id: req.session.user_id
            }
        });
        const userCourseNotes = await Note.findAll({
            where: {
                course_id: req.params.id,
                user_id: req.session.user_id
            }
        })
       
        const user = userData.get({ plain: true })
        const goals = userCourseGoals.map((goal) => goal.get({ plain: true }))
        const notes = userCourseNotes.map((note) => note.get({ plain: true }))
        const course = courseData.get({ plain: true })
        res.render('course', {
            user,
            course,
            goals,
            notes,
            logged_in: req.session.logged_in 
        })
    } catch(err) {
        res.status(500).json(err)
    }
});


module.exports = router;