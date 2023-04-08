const express = require('express')
const User = require('../models/User')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'Harryisagoodboy';

// ROUTE 1: create a user using: POST "/api/auth/createuser"   No login required

router.post('/createUser', [body('email').isEmail(),
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

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);
    // create a new user
    user = await User.create({
      name: req.body.name,
      password: secPass,
      email: req.body.email,
    })
    // .then(user => res.json(user));

    // res.send(req.body);
    // res.json(obj)

    const data = {
      user: {
        id: user.id,
      }
    }

    const authToken = jwt.sign(data, JWT_SECRET);
    // console.log(jwtData);

    // res.json(user);
    res.json({ authToken });
  }
  // Catch errors
  catch (error) {
    console.log(error.message);
    res.status(500).send("Internal sever error");
  }
})

// ROUTE 2: Authenticate a user using POST: /api/auth/login  - No login required
router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password cannot be blank').exists()
], async (req, res) => {

  // If there is any faulty user then the below error code will run
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Ideal scenario - when we get proper email and password i.e, authenticate user
  // We will use destructuring for this process
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Please try to login with correct credentials" });
    }

    // comparing passwords of already existing user and the faulty entered password
    const passwordcompare = await bcrypt.compare(password, user.password);

    // If the password dosen't matches
    if (!passwordcompare) {
      return res.status(400).json({ error: "Please try to login with correct credentials" });
    }

    // If the password matches
    const data = {
      user: {
        id: user.id
      }
    }
    const authToken = jwt.sign(data, JWT_SECRET);
    res.json({ authToken });
  }
  catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
})

// ROUTE 3: Get loggedin user details: POST "/api/auth/getuser"  Login required
router.post('/getuser', fetchuser,
  // [body('email', 'Enter a valid email').isEmail(),
  // body('password', 'Password cannot be blank').exists()],
 async (req, res) => {

  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  }
  catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal error occured" });
  }
})

module.exports = router

// C:\Users\pc\AppData\Roaming\npm