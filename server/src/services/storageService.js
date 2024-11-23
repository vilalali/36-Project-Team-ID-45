const fs = require('fs');
const path = require('path');
const replicationConfig = require('../config/replicationConfig');

// Function to save a file to the uploads directory
const uploadFileToStorage = async (file) => {
    try {
        const targetDir = path.join(__dirname, '../../uploads');
        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
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

// Function to create replicas for a file
const createReplica = (file, numReplicas) => {
    try {
        const replicasDir = path.join(__dirname, '../../replicas');
        if (!fs.existsSync(replicasDir)) {
            fs.mkdirSync(replicasDir, { recursive: true });
        }

        console.log(`Creating ${numReplicas} replicas for file: ${file.fileName}`);

        for (let i = 1; i <= numReplicas; i++) {
            const replicaDir = path.join(replicasDir, `replica_${i}`);
            if (!fs.existsSync(replicaDir)) {
                fs.mkdirSync(replicaDir, { recursive: true });
            }

            const replicaFilePath = path.join(replicaDir, file.fileName);
            const sourceFilePath = path.join(__dirname, '../../uploads', file.fileName);

            fs.copyFileSync(sourceFilePath, replicaFilePath);

            console.log(`Replica ${i} created at ${replicaFilePath}`);
        }
    } catch (error) {
        console.error(`Error creating replicas: ${error.message}`);
        throw new Error('Replication failed');
    }
};

// Function to calculate the number of replicas dynamically
const calculateReplicas = (accessFrequency) => {
    const { minReplicas, maxReplicas, accessThreshold } = replicationConfig;

    let replicasToCreate = minReplicas;

    if (accessFrequency >= accessThreshold) {
        const excessReplicas = Math.floor((accessFrequency - accessThreshold) / 10);
        replicasToCreate = Math.min(minReplicas + excessReplicas, maxReplicas);
    }

    return replicasToCreate;
};

module.exports = {
    uploadFileToStorage,
    createReplica,
    calculateReplicas,
};
