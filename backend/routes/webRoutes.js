import express from 'express';
const router = express.Router();
import path from 'path'
import { fileURLToPath } from 'url';



// Get the current file path and directory in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.get('/', (req, res) => {
  res.render('homepage', {
    title: "Scholarly",
    heading: "Scholarly"
  });
})

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

router.get('/confirmation', (req, res)=>{
  res.sendFile(path.join(__dirname, '../../public/views/confirmation.html'));
})

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

router.get('/register', (req, res) => {
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

router.get('/dashboard', (req, res) => {
  res.render('dashboard', {
    layout: './layouts/dash-layout',
    title: "Dashboard",
    heading: "Dashboard"
  })
})


router.get('/logout', (req, res) => {
  res.cookie('authToken', '', {
    maxAge: 1
  })
    .redirect('/');
})


export default router;
