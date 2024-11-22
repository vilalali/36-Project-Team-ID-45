const path = require('path');
const fs = require('fs');
const replicationConfig = require('../config/replicationConfig');
const { uploadFileToStorage, createReplica, removeExtraReplicas, monitorNodes } = require('../services/storageService');

// File metadata storage path
const metadataFile = path.join(__dirname, '../../files.json');

// Ensure metadata directory exists
if (!fs.existsSync(path.dirname(metadataFile))) {
    fs.mkdirSync(path.dirname(metadataFile), { recursive: true });
}

// Utility to read metadata
const readMetadata = () => {
    return fs.existsSync(metadataFile)
        ? JSON.parse(fs.readFileSync(metadataFile, 'utf-8'))
        : {};
};

// Utility to write metadata
const writeMetadata = (metadata) => {
    fs.writeFileSync(metadataFile, JSON.stringify(metadata, null, 2));
};

// Handle file upload
exports.uploadFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // Save file using the storage service
        await uploadFileToStorage(req.file);

        // Read existing metadata or initialize
        const metadata = readMetadata();

        const newFile = {
            fileName: req.file.filename,
            size: req.file.size,
            accessFrequency: 25, // Initialize access frequency
            replicas: [`localhost:${req.file.destination}`], // Add initial replica
        };

        // Update metadata
        metadata[req.file.filename] = newFile;
        writeMetadata(metadata);

        // Perform initial replication
        createReplica(newFile, replicationConfig.minReplicas);

        return res.json({ message: 'File uploaded successfully', file: newFile });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'File upload failed', error: error.message });
    }
};

// Get the list of uploaded files
exports.getFiles = async (req, res) => {
    try {
        // Read metadata and return as JSON
        const metadata = readMetadata();
        res.json(Object.values(metadata)); // Convert metadata object to an array
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to fetch files', error: error.message });
    }
};
