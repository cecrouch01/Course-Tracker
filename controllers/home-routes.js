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
router.post('/subscribe', (req, res) => {
    const subscription = req.body;
    console.log(subscription);
    const payload = JSON.stringify({ title: "Hello World", body: "This is your first push notification" });
    
    
/*magic*/
    return webpush.sendNotification(subscription, payload)
        .then(()=>{
            res.status(201).json(payload);
        })
        .catch(console.log);
})

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
        console.log(user)
        res.render('dashboard', {
            user
        })
    } catch(err) {
        res.status(500).json(err)
    }
});

router.get('/login', async (req, res) => {
    try{
        res.render('login')
    } catch(err) {
        res.status(500).json(err)
    }
});

router.get('/', async (req, res) => {
    try{
        res.render('homepage')
    } catch(err) {
        res.status(500).json(err)
    }
});

router.get('/course', withAuth, async (req, res) => {
    try{
        const courseData = await Course.findByPk(1, 
            {
            include: [
                {
                    model: Assignment
                },
                {
                    model: Note,
                    where: {
                        user_id: req.session.user_id
                    }
                },
                {
                    model: Goal,
                    where: {
                        user_id: req.session.user_id
                    }
                }
            ]
        }
        )
        const course = courseData.get({ plain: true })
        res.render('course', {
            course
        })
    } catch(err) {
        res.status(500).json(err)
    }
});


module.exports = router;