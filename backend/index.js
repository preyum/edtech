const express = require('express');
const dotenv = require('dotenv').config();
const mongoose = require ('mongoose');

// import routes
const authRoute = require ('./routes/authRoute');

// db connection string
const conn_str = process.env.DB_URL;

//create express server
const app = express();


// method for parsing body
app.use(express.json());

// connecting to DB
mongoose.connect(conn_str)
.then(()=>{
  console.log('Connected to database');
})
.catch((err)=>{
  console.log(`Error: ${err}`);
})

// routes middlewares
app.use('/users', authRoute);


app.listen(process.env.PORT, ()=>{
  console.log(`Listening on port: ${process.env.PORT}`);
  
})