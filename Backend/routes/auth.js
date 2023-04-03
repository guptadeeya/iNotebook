const express = require('express')
const User = require('../models/User')
const router = express.Router()
const { body, validationResult } = require('express-validator');

// create a user using: POST "/api/auth/"   Doesn't require auth

router.post('/',[body('email').isEmail(),
     body('name', 'Enter a valid name').isLength({ min: 3 }),
     body('password').isLength({ min: 5 })
    ],
    (req, res)=>{
    // obj = {
    //     a: "thios",
    //     number: 34
    // }

    // console.log(req.body);
    // const user = User(req.body);
    // user.save();

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
      }).then(user => res.json(user));

    // res.send(req.body);
    // res.json(obj)
})

module.exports = router

// C:\Users\pc\AppData\Roaming\npm