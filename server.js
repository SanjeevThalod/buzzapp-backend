const express = require('express');
const db = require('./Config/db');
const cors = require('cors');
const userRoutes = require('./Routes/userRoutes');
const dashRoutes = require('./Routes/dashRoutes');
require('dotenv').config();
const app = express();

// Adding json input to req
app.use(express.json());

// Handling cors
app.use(cors());

// Connecting to DB
db();

// Routes
app.use('/',userRoutes);
app.use('/',dashRoutes);

// Firing server
app.listen(process.env.PORT,console.log(`Listening on ${process.env.PORT}`));