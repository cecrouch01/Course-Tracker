const router = require('express').Router();
const { User } = require('../../models');
const withAuth = require('../../utils/auth');

//this is the /api/users endpoint

//This will create a user
router.post('/', async (req, res) => {
    try{
        // req.body needs to be: 
        // {
        //     email: 'insert email here',
        //     password: 'insert password here',
        //     first_name: 'insert first name here',
        //     last_name: 'insert last_name here'
        // }
        const newUser = await User.create(req.body)
        req.session.save(() => {
            req.session.user_id = newUser.id;
            req.session.logged_in = true;
        })
        res.status(200).json(newUser)
    } catch {
        res.status(400).json(err)
    }
})
//This will log a user in
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                email: req.body.email
            }
        })

        if(userData === null) {
            res.status(400).json({ message: 'Incorrect email or password, please try again'})
            return;
        };

        const validPassword = await userData.checkPassword(req.body.password)

        if(validPassword === false) {
            res.status(400).json({ message: 'Incorrect email or password, please try again'})
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.status(200).json({ user: userData, message: 'You are now logged in!'})
        })

    } catch(err) {
        res.status(400).json(err)
    }
})

//This will log a user in
router.post('/logout', (req, res) => {
    if(req.session.logged_in === true) {
        req.session.destroy(() => {
            res.status(200).end();
        });
    } else {
        res.status(400).end();
    }
});

// router.post('/goal/course/:id', withAuth, async (req, res) => {
//     try{
//         const newGoal = await Goal.create({
//             // This will create a new goal
//             // {
//             //     title: "insert title here",
//             //     description: "insert description", (optional)
//             //     //course_id or assignment_id needs to be attached through the fetch request
//             // }
//             ...req.body,
//             user_id: req.session.user_id,
//         });
//         res.status(200).json(newGoal);
//     } catch(err) {
//         res.status(400).json(err)
//     }
// });

// router.post('/goal/assignment/:id', withAuth, async (req, res) => {
//     try{
//         const newGoal = await Goal.create({
//             // This will create a new goal
//             // {
//             //     title: "insert title here",
//             //     description: "insert description", (optional)
//             //     //course_id or assignment_id needs to be attached through the fetch request
//             // }
//             ...req.body,
//             user_id: req.session.user_id,
//         });
//         res.status(200).json(newGoal);
//     } catch(err) {
//         res.status(400).json(err)
//     }
// });

module.exports = router;