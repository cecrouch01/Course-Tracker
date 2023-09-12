const router = require('express').Router();
const webpush = require('web-push');
const { Assignment, Course, Goal, Note, User, UserAssignment, UserCourse } = require('../models')
const publicVapidKey = "BJRA9Ov1NkqMUYb0RmC0WJrhMF-8ak-dTljxVqtanouSQYKiQLhz_WUpHVhMwpPqFni0gNO5Ee2LA28UR5809-0";

const privateVapidKey = "E044gkGh3cFatv8GDiRqc1d_U-cncG2j44eTPDlJDTE";


// Setup the public and private VAPID keys to web-push library.
webpush.setVapidDetails("mailto:seanconnor22@gmail.com", publicVapidKey, privateVapidKey);



// Create route for allow client to subscribe to push notification.
router.post('/subscribe', (req, res) => {
    const subscription = req.body;
    console.log(subscription);
    const payload = JSON.stringify({ title: "Hello World", body: "This is your first push notification" });
    
    
/*magic*/
    webpush.sendNotification(subscription, payload)
        .then(()=>{
            res.status(201).json(payload);
        })
        .catch(console.log);
})

router.get('/dashboard', async (req, res) => {
    try{
        // const userData = await User.findByPk(req.params.user_id, {
        //     include: [
        //     {
        //         model: Course,
        //         through: UserCourse,
        //         attributes: ['title']
        //     },
        //     {
        //         model: Assignment,
        //         through: UserAssignment,
        //         attributes: ['title']
        //     }            
        //     ],
        //     attributes: ['id','first_name']
        // })
        // const user = userData.get({ plain: true })
        res.render('dashboard', {
            // user
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

router.get('/course', async (req, res) => {
    try{
        res.render('course')
    } catch(err) {
        res.status(500).json(err)
    }
});


module.exports = router;