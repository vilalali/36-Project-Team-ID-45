const express = require('express');
const routes = require('./routes');
const cors = require('cors');

const app = express();
app.use(cors()); // Enable CORS

app.use(express.json()); // Parse JSON bodies
app.use('/api', routes); // Register API routes

module.exports = app;
