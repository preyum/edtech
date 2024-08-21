const express = require('express');
const router = express.Router();
const path = require('path');


router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/login.html'));
});

router.get('/users/', (req, res)=>{
  res.sendFile(path.join(__dirname, '../'))
})

router.get('/users/welcome', (req, res) => {

  res.sendFile(path.join(__dirname, '../../public', 'welcome.html'));

});

module.exports = router;