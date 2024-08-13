const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


router.post('/register', async(req, res)=>{

  // validation logic here

  // check if user already exists
  const user = await User.findOne({ email: req.body.email });
  if(user) return res.status(400).send({
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
    passowrd: hashPassword,
  });
  try {
    const savedUser = await newUser.save();
    res.send({
      msg: "User Created"
    });
  }catch(err){
    res.status(502).send(err);
  }





})