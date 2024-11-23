const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors()); // Enable CORS

// Middleware
app.use(bodyParser.json());

app.use(express.json()); // Parse JSON bodies
app.use('/api', routes); // Register API routes

module.exports = app;
