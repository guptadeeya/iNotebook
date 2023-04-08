const express = require('express')
const router = express.Router()
var fetchuser = require('../middleware/fetchuser');
const Note = require("../models/Note");
// express validator is used to check if the input is valid like it is not empty
const { body, validationResult } = require('express-validator');

// ROUTE 1: Get user notes: GET "/api/notes/fetchallnotes"  Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try{
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})

// ROUTE 2: Add notes using: POST "/api/notes/addnotes"  Login required
router.post('/addnotes', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'description must be at least 5 characters').isLength({ min: 5 })
], async (req, res) => {

    try{

   // destructuring concept -- he kya kya chahiye apni body me
   const{title, description, tag} = req.body;

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
catch(error){
    console.error(error.message);
    res.status(500).send("Internal server error");
}
})

module.exports = router