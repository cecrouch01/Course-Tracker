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
    const subscription = req.body;
    console.log(subscription);
    const user = await User.findByPk(req.session.user_id)
    await user.update({
        endpoint: subscription.endpoint,
        expiration_time: subscription.expirationTime,
        p256dh: subscription.keys.p256dh,
        auth: subscription.keys.auth
    });
    const payload = JSON.stringify({ title: "Hello World", body: "This is your first push notification" });
    
    
/*magic*/
//userdata
// cosnt subscription = {
//     endpoint: userdata.endpoint,
//     expirationTime: userdata.expirationTime,
//     keys: {
//             p256dh: userdata.p256dh,
//             auth: userdata.auth
//     }
// }
        await webpush.sendNotification(subscription, payload)
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
        //await web push
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