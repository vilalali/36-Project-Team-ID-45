const express = require('express');
const fileRoutes = require('./fileRoutes');
const monitorRoutes = require('./monitorRoutes');

const router = express.Router();

router.use('/files', fileRoutes); // File-related routes
router.use('/monitor', monitorRoutes); // Monitoring and metrics

module.exports = router;
