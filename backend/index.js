import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import cookieParser from 'cookie-parser';
import expressLayouts from 'express-ejs-layouts';
import cors from 'cors';
import { fileURLToPath } from 'url';

// Get the current file path and directory in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// import routes
import authRoute from './routes/authRoute.js';
import webRoute from './routes/webRoutes.js';


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