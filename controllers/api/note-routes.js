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

//This will create a note
router.post('/', withAuth, async (req, res) => {
    try{
        const newNote = await Note.create({
            //This is the necessary req body
            // {
            //     title: 'insert title',
            //     contents: 'instert contents',
            //     date_created: 'insert date', (optional)
            //     User id is added through req
            //     There needs to be a way to tie the correct id of the attached assignment/goal/course
            // }
            ...req.body,
            user_id: req.session.user_id
        })
        res.status(200).json(newNote);
    } catch(err){
        res.status(500).json(err);
    }
})

router.delete('/:id', withAuth, async (req, res) => {
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
})

module.exports = router;