const router = require('express').Router();
const { Assignment, Course, Goal, Note, User } = require('../../models')
const withAuth = require('../../utils/auth');

//This is the /api/goals endpoint

//This gets all goals
router.get('/', async (req, res) => {
    try {
        const goalData = await Goal.findAll()
        res.status(200).json(goalData)
    } catch(err) {
        res.status(500).json(err)
    }
});

//This gets a single goal
router.get('/:id', async (req, res) => {
    try{
        const singleGoalData = await Goal.findByPk(req.params.id)
        if(singleGoalData !== null) {
            res.status(200).json(singleGoalData) 
        } else{
            res.status(400).json({ message: 'Oops, it seems like there has been an error'})
        }
    } catch(err) {
        res.status(500).json(err)
    }
});



router.delete('/:id', withAuth, async (req, res) => {
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
})

module.exports = router;