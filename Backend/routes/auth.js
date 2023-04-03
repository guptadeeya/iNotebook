const express = require('express')
const User = require('../models/User')
const router = express.Router()

// create a user using: POST "/api/auth/"   Doesn't require auth

router.post('/', (req, res)=>{
    // obj = {
    //     a: "thios",
    //     number: 34
    // }
    console.log(req.body);
    const user = User(req.body);
    user.save();

    res.send(req.body);
    // res.json(obj)
})

module.exports = router

// C:\Users\pc\AppData\Roaming\npm