const express = require('express');
const { getSystemMetrics } = require('../controllers/monitorController');

const router = express.Router();

router.get('/metrics', getSystemMetrics); // Get system metrics

module.exports = router;
