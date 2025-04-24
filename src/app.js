const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const allRoutes = require('./routes/all.route');
app.use('/api', allRoutes);

module.exports = app;
