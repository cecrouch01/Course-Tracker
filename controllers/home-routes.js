const router = require('express').Router();
const webpush = require('web-push');
const publicVapidKey =process.env.VAPID_PUBLIC_KEY ;
const vapidEmail =process.env.VAPID_EMAIL ;
const privateVapidKey =process.env.VAPID_PRIVATE_KEY ;


// Setup the public and private VAPID keys to web-push library.
// webpush.setVapidDetails(`mailto:${vapidEmail}`, publicVapidKey, privateVapidKey);



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

router.get('/dashboard', async (req, res) => {
    try{
        res.render('dashboard')
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