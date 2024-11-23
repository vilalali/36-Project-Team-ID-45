const express = require('express');
const fs = require('fs');
const path = require('path');
const replicationConfig = require('../config/replicationConfig');

const router = express.Router();

// File metadata storage path
const metadataFile = path.join(__dirname, '../../file.json');


// Utility to read metadata
const readMetadata = () => {
    return fs.existsSync(metadataFile)
        ? JSON.parse(fs.readFileSync(metadataFile, 'utf-8'))
        : {};
};

// Endpoint to get config details and uploaded file info
router.get('/config-details', (req, res) => {
    try {
        // Fetch the replication configuration
        const configDetails = {
            minReplicas: replicationConfig.minReplicas,
            maxReplicas: replicationConfig.maxReplicas,
            accessThreshold: replicationConfig.accessThreshold,
            accessFrequency: replicationConfig.accessFrequency,
        };

        // Fetch the uploaded file metadata
        const files = readMetadata();

        // Combine and send the response
        res.json({
            configDetails,
            uploadedFiles: Object.values(files),
        });
    } catch (error) {
        console.error('Error fetching config details or file metadata:', error.message);
        res.status(500).json({
            message: 'Failed to load config details or file info',
            error: error.message,
        });
    }
});

module.exports = router;
