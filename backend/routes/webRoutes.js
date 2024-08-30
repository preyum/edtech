const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req,res)=>{
  res.render('index');
})

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/users/', (req, res)=>{
  res.sendFile(path.join(__dirname, '../'))
})

router.get('/users/welcome', (req, res) => {

  res.render('welcome');

});

router.get('/logout', (req,res)=>{
  res.cookie('authToken', '', {
    maxAge: 1
  })
  .redirect('/');
})

// serve nav-bar
// router.get('/nav-bar',(req, res) => {

//   res.sendFile(path.join(__dirname, '../../public/view/components', 'nav-bar.html'));

// });

module.exports = router;