const router = require('express').Router();
const { Assignment, Course, Goal, Note, User } = require('../../models')
const withAuth = require('../../utils/auth');

//This is the /api/notes endpoint

//This gets all notes
router.get('/', async (req, res) => {
    try {
        const noteData = await Note.findAll()
        res.status(200).json(noteData)
    } catch(err) {
        res.status(500).json(err)
    }
});

//This gets a single note
router.get('/:id', async (req, res) => {
    try{
        const singleNoteData = await Note.findByPk(req.params.id)
        if(singleNoteData !== null) {
            res.status(200).json(singleNoteData) 
        } else{
            res.status(400).json({ message: 'Oops, it seems like there has been an error'})
        }
    } catch(err) {
        res.status(500).json(err)
    }
});

module.exports = router;