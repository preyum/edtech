const express = require('express');
const dotenv = require('dotenv').config();
const mongoose = require ('mongoose');

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

// routes


app.listen(process.env.PORT, ()=>{
  console.log(`Listening on port: ${process.env.PORT}`);
  
})