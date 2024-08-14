const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


router.post('/register', async (req, res) => {

  // validation logic here

  // check if user already exists
  const user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send({
    msg: "Email Already exists"
  });

  // hash the password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  // create user
  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    email: req.body.email,
    password: hashPassword,
  });
  try {
    const savedUser = await newUser.save();
    res.send({
      msg: "User Created"
    });
  } catch (err) {
    res.status(502).send(err);
  }





})


router.post('/login', async (req, res) => {
  // validate data

  // check if user exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.send({ msg: "User does not exist" });

  // check password
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send({ msg: "Invalid password" });

  // create jwt token
  const token = jwt.sign({ _id: user._id }, process.env.JWT_PASS);
  res.header('auth-token', token)
    .send({ msg: "Logged in" });

})


module.exports = router;