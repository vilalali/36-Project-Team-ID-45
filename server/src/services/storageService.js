const fs = require('fs');
const path = require('path');
const replicationConfig = require('../config/replicationConfig');

// Function to save file to the uploads directory
const uploadFileToStorage = async (file) => {
    try {
        const targetDir = path.join(__dirname, '../../uploads');
        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true }); // Create directory if it doesn't exist
        }

        const targetPath = path.join(targetDir, file.filename);

        // Move the file to the uploads directory
        fs.renameSync(file.path, targetPath);

        console.log(`File successfully uploaded to ${targetPath}`);
    } catch (error) {
        console.error(`Error uploading file: ${error.message}`);
        throw new Error('Error saving file to storage');
    }
};

// Function to create replicas
const createReplica = (file) => {
    try {
        const { accessFrequency } = file;
        const { minReplicas, maxReplicas, accessThreshold } = replicationConfig;

        // Determine number of replicas to create based on access frequency
        let numReplicas = minReplicas;
        if (accessFrequency >= accessThreshold) {
            // Increase replicas based on access frequency, but do not exceed maxReplicas
            numReplicas = Math.min(minReplicas + Math.floor(accessFrequency / 10), maxReplicas);
        }

        console.log(`Creating ${numReplicas} replicas for ${file.fileName} based on access frequency (${accessFrequency})`);

        // Simulated replication logic
        for (let i = 1; i <= numReplicas; i++) {
            const replicaPath = path.join(__dirname, `../../replicas/replica_${i}`);
            if (!fs.existsSync(replicaPath)) {
                console.log(`Creating replica directory: ${replicaPath}`);
                fs.mkdirSync(replicaPath, { recursive: true });
            }

            const replicaFilePath = path.join(replicaPath, file.fileName);
            console.log(`Copying file to replica path: ${replicaFilePath}`);
            fs.copyFileSync(
                path.join(__dirname, '../../uploads', file.fileName),
                replicaFilePath
            );

            console.log(`Replica ${i} created at ${replicaFilePath}`);
        }
    } catch (error) {
        console.error(`Error creating replicas: ${error.message}`);
        throw new Error('Replication failed');
    }
};


// Export functions
module.exports = {
    uploadFileToStorage,
    createReplica, // Ensure this is exported
};
