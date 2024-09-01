const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req,res)=>{
  res.render('index');
})

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/courses', (req, res) => {

  res.render('courses', {
    title: "Courses",
    heading: 'Courses',
  });
});

router.get('/about', (req, res) => {

  res.render('about', {
    title: "About Us",
    heading: 'About Us',
  });
});

router.get('/signin', (req, res) => {

  res.render('signin', {
    title: "Login",
    heading: 'Login',
  });
});

router.get('/contact', (req, res) => {

  res.render('contact', {
    title: "Contact Us",
    heading: 'Contact Us',
  });
});

router.get('/register', (req,res)=>{

  res.render('registration', {
    title: "Register",
    heading: "Register"
  })
})

router.get('/users/welcome', (req, res) => {

  res.render('welcome', {
    title: "Welcome",
    heading: 'Scholarly',
  });
});

router.get('/logout', (req,res)=>{
  res.cookie('authToken', '', {
    maxAge: 1
  })
  .redirect('/');
})


module.exports = router;