const express = require('express')
const User = require('../models/User')
const router = express.Router()
const { body, validationResult } = require('express-validator');

// create a user using: POST "/api/auth/createuser"   No login required

router.post('/createuser', [body('email').isEmail(),
body('name', 'Enter a valid name').isLength({ min: 3 }),
body('password').isLength({ min: 5 })
], async (req, res) => {
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

  try {
    //check whether the user with this email already exists

    let user = await User.findOne({ email: req.body.email });
    // console.log(user);
    if (user) {
      return res.status(400).json({ error: "Sorry a user with email already exists" });
    }

    // create a new user
    user = await User.create({
      name: req.body.name,
      password: req.body.password,
      email: req.body.email,
    })
    // .then(user => res.json(user));

    // res.send(req.body);
    // res.json(obj)

    res.json(user)
  }
  // Catch errors
  catch (error) {
    console.log(error.message);
    res.status(500).send("Some error occured");
  }
})
module.exports = router

// C:\Users\pc\AppData\Roaming\npm