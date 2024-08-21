const express = require('express');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');




// import routes
const authRoute = require('./routes/authRoute');
const webRoute = require('./routes/webRoutes');


// db connection string
const conn_str = process.env.DB_URL;

//create express server
const app = express();

// serve webpages from server
app.use(express.static(path.join(__dirname, '../public')));

// method for parsing body
app.use(express.json());

// parsing data from forms
app.use(express.urlencoded({ extended: true }));

// parsing cookies
app.use(cookieParser());

// connecting to DB
mongoose.connect(conn_str)
  .then(() => {
    console.log('Connected to database');
  })
  .catch((err) => {
    console.log(`Error: ${err}`);
  })

// routes middlewares
app.use('/users', authRoute);
app.use('/', webRoute);


app.listen(process.env.PORT, () => {
  console.log(`Listening on port: ${process.env.PORT}`);

})