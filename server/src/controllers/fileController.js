const path = require('path');
const fs = require('fs');
const os = require('os'); // To get local IP address
const replicationConfig = require('../config/replicationConfig');
const { uploadFileToStorage, createReplica, calculateReplicas } = require('../services/storageService');

// File metadata storage path
const metadataFile = path.join(__dirname, '../../../client/src/metadata.json');

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

// Utility to get the local IP address
const getLocalIpAddress = () => {
    const interfaces = os.networkInterfaces();
    for (let interfaceName in interfaces) {
        for (let networkInterface of interfaces[interfaceName]) {
            if (!networkInterface.internal && networkInterface.family === 'IPv4') {
                return networkInterface.address;
            }
        }
    }
    return 'localhost'; // Fallback to 'localhost' if no IP found
};

// Utility to get node status dynamically
const getNodeStatus = (nodeName) => {
    const status = nodeName === 'Node' ? 'Active' : 'Inactive'; // Example logic
    const ip = getLocalIpAddress(); // Get local IP dynamically
    return { status, ip };
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

        // Get dynamic node information
        const nodeStatus = getNodeStatus('Node');

        // Determine replicas to create
        const accessFrequency = parseInt(req.body.replicationConfig?.accessFrequency || replicationConfig.accessFrequency, 10);
        const replicasToCreate = calculateReplicas(accessFrequency);

        // Create replicas metadata
        const replicas = Array.from({ length: replicasToCreate }, (_, i) => ({
            path: `/replica_${i + 1}/${req.file.filename}`,
        }));

        // Monitored nodes status
        const monitoredNodes = [
            { nodeName: 'Node', status: nodeStatus.status, ip: nodeStatus.ip },
        ];

        // Create file metadata
        const newFile = {
            fileName: req.file.filename,
            size: req.file.size,
            accessFrequency,
            minReplicas: replicationConfig.minReplicas,
            maxReplicas: replicationConfig.maxReplicas,
            accessThreshold: replicationConfig.accessThreshold,
            replicas,
            totalReplicas: replicas.length,
            monitoredNodes,
        };

        // Update metadata with the new file
        metadata[req.file.filename] = newFile;
        writeMetadata(metadata);

        // Perform replication
        createReplica(newFile, replicasToCreate);

        return res.json({ message: 'File uploaded successfully', file: newFile });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'File upload failed', error: error.message });
    }
};

// Get the list of replicas for a specific file
exports.getReplicas = async (req, res) => {
    try {
        const { filename } = req.params;

        // Read metadata to fetch the file's information
        const metadata = readMetadata();

        if (!metadata[filename]) {
            return res.status(404).json({ message: 'File not found' });
        }

        const fileData = metadata[filename];
        return res.json({ replicas: fileData.replicas });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to fetch replicas', error: error.message });
    }
};

// Get the list of uploaded files
exports.getFiles = async (req, res) => {
    try {
        const metadata = readMetadata();
        res.json(Object.values(metadata)); // Return metadata as an array
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to fetch files', error: error.message });
    }
};
