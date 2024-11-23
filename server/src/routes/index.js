const express = require('express');
const fileRoutes = require('./fileRoutes');
const configDetailsRouts = require('./configDetailsRoutes');

const router = express.Router();

router.use('/files', fileRoutes); // File-related routes
router.use('/config-details', configDetailsRoutes); // Config details route

module.exports = router;
