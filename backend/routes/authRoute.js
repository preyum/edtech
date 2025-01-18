import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { registerValidation, loginValidation } from '../controllers/userValidation.js';
import { User } from '../models/user.model.js'
import { upload } from '../middlewares/multer.middleware.js';
import { uploadOnCloudinary } from '../utils/clodinary.service.js';
const router = express.Router();


router.post('/register', upload.fields([{ name: 'photo', maxCount: 1 }]),  async (req, res) => {

   // Optional image upload logic
  let imageUrl;
  if (req.files && req.files.photo) {
    try {
      const localFilePath = req.files.photo[0].path;
      console.log("file path from server: ", localFilePath);
      imageUrl = await uploadOnCloudinary(localFilePath);
      console.log('File uploaded successfully!');
    } catch (err) {
      return res.status(500).json({
        msg: 'File upload failed.',
        error: err
      });
    }
  }

  // validation logic here
  const result = registerValidation.safeParse(req.body)
  if(!result.success)
  {
     // Format errors as field-specific object
    const errors = result.error.errors.reduce((acc, err) => {
      acc[err.path[0]] = err.message; // Map path to message
      return acc;
    }, {});
    return res.status(400).json(errors);
  }
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
   // role: req.body.role,
    avatar: req.files && req.files.photo ? imageUrl : undefined
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
  const result = loginValidation.safeParse(req.body);
  if(!result.success)
  {
     // Format errors as field-specific object
    const errors = result.error.errors.reduce((acc, err) => {
      acc[err.path[0]] = err.message; // Map path to message
      return acc;
    }, {});
    return res.status(400).json(errors);
  }
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
    })
    .json({name: user.firstName, avatar: user.avatar, role: user.role});
})


export default router;
