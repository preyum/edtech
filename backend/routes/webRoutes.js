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

router.get('/users/', (req, res)=>{
  res.sendFile(path.join(__dirname, '../'))
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