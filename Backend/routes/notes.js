const express = require('express')
const router = express.Router()
var fetchuser = require('../middleware/fetchuser');
const Note = require("../models/Note");
// express validator is used to check if the input is valid like it is not empty
const { body, validationResult } = require('express-validator');

// ROUTE 1: Get user notes: GET "/api/notes/fetchallnotes"  Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})

// ROUTE 2: Add notes using: POST "/api/notes/addnotes"  Login required
router.post('/addnotes', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'description must be at least 5 characters').isLength({ min: 5 })
], async (req, res) => {

    try {
        // destructuring concept -- he kya kya chahiye apni body me
        const { title, description, tag } = req.body;

        //If there are errors, return the bad errors and the array
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Note({
            title, description, tag, user: req.user.id
        })

        const savedNote = await note.save();
        res.json(savedNote);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})

// ROUTE 3: Update an existing note using: POST "/api/notes/updatenote"  Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    // Destructuring
    const {title, description,tag} = req.body;

    // Create a newNote object
    const newNote = {};

    if(title){
        newNote.title = title;
    }
    if(description){
        newNote.description = description;
    }
    if(tag){
        newNote.tag = tag;
    }

    // Find a note to be updated and update it
    let note = await Note.findById(req.params.id);
    // Agr uss id se notes nahi access hore, mtlb koi glt id ya hack krne ka try krra h
    if(!note){
        return res.status(401).send("Not found");
    }

    // To check that the user logged in is updating his notes only, not someone else'
    if(note.user.toString() !== req.user.id){
        return res.status(404).send("Not allowed")
    }

    note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true});
    res.json({note}); 
})
module.exports = router