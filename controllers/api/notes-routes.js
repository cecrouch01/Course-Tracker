const router = require('express').Router();
const { Note } = require('../../models');
const withAuth = require('../../utils/auth');

// Add a new note
router.post('/', withAuth, async (req, res) => {
    try {
        const newNote = await Note.create({
            ...req.body,
            user_id: req.session.user_id
        });
        res.status(200).json(newNote);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Get all notes for the logged-in user
router.get('/', withAuth, async (req, res) => {
    try {
        const userNotes = await Note.findAll({
            where: {
                user_id: req.session.user_id
            }
        });
        res.status(200).json(userNotes);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
