const router = require('express').Router();
const { User } = require('../../models');

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
})

module.exports = router;