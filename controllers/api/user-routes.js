const router = require('express').Router();
const { Assignment, Course, Goal, Note, User, UserCourse} = require('../../models')
const withAuth = require('../../utils/auth');

//This is the /api/users endpoint

//This allows the user to view a course and its goals and notes
router.get('/courses/:id/goals/notes', withAuth, async (req, res) => {
    try {
        const courseGoalNoteData = await Course.findByPk(req.params.id, {
            include: [{
                model: Note,
                where: {
                    user_id: req.params.user_id
                }
            },
            {
                model: Goal,
                where: {
                    user_id: req.params.user_id
                }
            }
            ]
        })
        if(courseGoalNoteData !== null) {
            res.status(200).json(courseGoalNoteData) 
        } else{
            res.status(400).json({ message: 'Oops, it seems like there has been an error'})
        }
    } catch(err) {
        res.status(500).json(err)
    }
})

//This gets an assignment with its goal and notes
router.get('/assignments/:id/goals/notes', withAuth, async (req, res) => {
    try {
        const assignmentNoteGoalData = await Assignment.findByPk(req.params.id, {
            include:[{
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
        })
        if(assignmentNoteGoalData !== null) {
            res.status(200).json(assignmentNoteGoalData) 
        } else{
            res.status(400).json({ message: 'Oops, it seems like there has been an error'})
        }
    } catch(err) {
        res.status(500).json(err)
    }
});


//This gets the goal and it's notes
router.get('/goals/:id/notes', withAuth, async (req, res) => {
    try{
        const goalNotesData = await Goal.findByPk(req.params.id, {
            include: {
                model: Note,
                where: {
                    user_id: req.session.user_id
                }
            },
        });
        if(goalNotesData !== null) {
            res.status(200).json(goalNotesData) 
        } else{
            res.status(400).json({ message: 'Oops, it seems like there has been an error'})
        }
    } catch(err) {
        res.status(500).json(err)
    }
});

//This will create a new user/course relationship
router.post('/courses/:id', withAuth, async (req, res) => {
    try {
        const newUserCourse = UserCourse.create({
            course_id: req.params.id,
            user_id: req.session.user_id
        });
        res.status(200).json(newUserCourse)
    } catch(err) {
        res.status(400).json(err)
    }
});

//This will create a user
router.post('/', async (req, res) => {
    try{
        const newUser = await User.create(req.body)
        req.session.save(() => {
            req.session.user_id = newUser.id;
            req.session.logged_in = true;
        })
        res.redirect('/dashboard');  // redirects user to /dashboard'
    } catch {
        res.status(400).json(err)
    }
});
//This will log a user in
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                email: req.body.email
            },
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
            res.redirect('/dashboard');  // Assuming your dashboard route is '/dashboard'
        })

    } catch(err) {
        res.status(400).json(err)
    }
});

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

//this creates a goal with a course id
router.post('/goals/courses/:id', withAuth, async (req, res) => {
    try{
        const newGoal = await Goal.create({
            ...req.body,
            course_id: req.params.id,
            user_id: req.session.user_id,
        });
        res.status(200).json(newGoal);
    } catch(err) {
        res.status(400).json(err)
    }
});

//This creates a goal with a assignment id
router.post('/goals/assignments/:id', withAuth, async (req, res) => {
    try{
        const newGoal = await Goal.create({
            ...req.body,
            assignment_id: req.params.id,
            user_id: req.session.user_id,
        });
        res.status(200).json(newGoal);
    } catch(err) {
        res.status(400).json(err)
    }
});

//This will create a course note
router.post('/notes/courses/:id', withAuth, async (req, res) => {
    try{
        const newNote = await Note.create({
            ...req.body,
            course_id: req.params.id,
            user_id: req.session.user_id
        })
        res.status(200).json(newNote);
    } catch(err){
        res.status(500).json(err);
    }
});

//This will create a goal note
router.post('/notes/goals/:id', withAuth, async (req, res) => {
    try{
        const newNote = await Note.create({
            ...req.body,
            goal_id: req.params.id,
            user_id: req.session.user_id
        })
        res.status(200).json(newNote);
    } catch(err){
        res.status(500).json(err);
    }
});

//This will create an assignment note
router.post('/notes/assignments/:id', withAuth, async (req, res) => {
    try{
        const newNote = await Note.create({
            ...req.body,
            assignment_id: req.params.id,
            user_id: req.session.user_id
        })
        res.status(200).json(newNote);
    } catch(err){
        res.status(500).json(err);
    }
});


//This deletes a goal
router.delete('/goals/:id', withAuth, async (req, res) => {
    try {
        const deletedGoal = await Goal.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id
            },
        })
        if(!deletedGoal) {
            res.status(404).json({ message: 'No goal found'})
            return;
        }
        res.status(200).json({ message: "Goal has been deleted" })
    } catch(err) {
        res.status(500).json(err)
    }
});


//this deletes a note
router.delete('/notes/:id', withAuth, async (req, res) => {
    try {
        const deletedNote = await Note.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id
            }
        })

        if(!deletedNote) {
            res.status(404).json({ message: "No note found with this id"})
            return;
        }
        res.status(200).json({ message: `Note has been deleted`})
    } catch(err) {
        res.status(500).json(err)
    }
});



module.exports = router;