import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { registerValidation, loginValidation } from '../controllers/userValidation.js';
import { User } from '../models/user.model.js'
const router = express.Router();


router.post('/register', async (req, res) => {

  // validation logic here
  registerValidation.parse(req.body)
  // check if user already exists
  const user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send({
    msg: "Email already exists"
  });

  // hash the password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  // create user
  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hashPassword,
    phone: req.body.phone,
    role: req.body.role
  });
  try {
    await newUser.save();
    console.log("User Created");
    
    res.redirect('/confirmation');
  } catch (err) {
    res
      .status(502)
      .send(
        {
          msg: "Error while creating user",
          error: err
        }
      )
  }

})


router.post('/signin', async (req, res) => {
  // validate data

  // check if user exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send({ msg: "User does not exist" });

  // check password
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send({ msg: "Invalid password" });

  // create jwt token
  const token = jwt.sign({ _id: user._id }, process.env.JWT_PASS);
  res
    .status(200)
    .cookie('authToken', token, {
      httpOnly: true
    })
    .redirect('/users/welcome');

})


export default router;
