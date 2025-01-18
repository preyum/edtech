import express from 'express';
const router = express.Router();
import path from 'path'
import { fileURLToPath } from 'url';
import { auth } from '../middlewares/auth.middleware.js';



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

router.get('/dashboard', auth, (req, res) => {
  res.render('dashboard', {
    layout: './layouts/dash-layout',
    title: "Dashboard",
    heading: "Dashboard"
  })
})
router.get('/profile-settings', auth, (req, res) => {
  res.render('profile-settings', {
    layout: './layouts/dash-layout',
    title: "profile-settings",
    heading: "profile-settings"
  })
})

router.get('/links', auth, (req, res) => {
  res.render('classroom-chat-box', {
    layout: './layouts/dash-layout',
    title: "classroom-chat-box",
    heading: "classroom-chat-box"
  })
})
router.get('/courses/cpp', auth, (req, res) => {
  res.render('coursedetailsc++', {
    layout: './layouts/dash-layout',
    title: "C++",
    heading: "C++"
  })
});
router.get('/courses/dotnet', auth, (req, res) => {
  res.render('coursedetaildotnet', {
    layout: './layouts/dash-layout',
    title: ".NET",
    heading: ".NET"
  })
});
router.get('/courses/html', auth, (req, res) => {
  res.render('coursedetailshtml', {
    layout: './layouts/dash-layout',
    title: "HTML",
    heading: "HTML"
  })
});
router.get('/courses/java', auth, (req, res) => {
  res.render('coursedetailsjava', {
    layout: './layouts/dash-layout',
    title: "java",
    heading: "Java"
  })
});

router.get('/courses/php', auth, (req, res) => {
  res.render('coursedetailsphp', {
    layout: './layouts/dash-layout',
    title: "PHP",
    heading: "PHP"
  })
});
router.get('/courses/python', auth, (req, res) => {
  res.render('coursedetailsPython', {
    layout: './layouts/dash-layout',
    title: "Python",
    heading: "Python"
  })
});
router.get('/courses/R', auth, (req, res) => {
  res.render('coursedetailsR', {
    layout: './layouts/dash-layout',
    title: "R",
    heading: "R"
  })
});
router.get('/courses/react', auth, (req, res) => {
  res.render('coursedetailsreact', {
    layout: './layouts/dash-layout',
    title: "React",
    heading: "React"
  })
});
router.get('/logout', (req, res) => {
  res.cookie('authToken', '', {
    maxAge: 1
  })
    .redirect('/');
})


export default router;
