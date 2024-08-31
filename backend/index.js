require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');
const cors = require('cors');


// import routes
const authRoute = require('./routes/authRoute');
const webRoute = require('./routes/webRoutes');


// db connection string
const conn_str = process.env.DB_URL;

//create express server
const app = express();

//middlewares
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}))

app.use(express.json({
  limit: "16kb"
}));

app.use(express.urlencoded({
  extended: true,
  limit: "16kb"
}));

app.use(cookieParser());

// Set EJS as the templating engine
app.use(expressLayouts)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../public/views'));
app.set('layout', 'layouts/main-layout');

// serve webpages from server
app.use(express.static(path.join(__dirname, '../public')));

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