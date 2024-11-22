const express = require('express');
const cors = require('cors');
const fileRoutes = require('./routes/fileRoutes'); // Import file routes
const path = require('path');
const fs = require('fs');
const disk = require('diskusage'); // Import diskusage package
const app = express();
const port = 3001;

// Enable CORS (Cross-Origin Resource Sharing)
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Static folder to serve uploaded files (if needed)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Mount file routes
app.use('/api/files', fileRoutes);

// Example file directory and storage mount path (you should update these based on your setup)
const fileDirectory = path.join(__dirname, '../uploads'); // Your file upload directory
const mountPath = '/'; // The mount path where your disk is located (e.g., '/' for root)

// Function to count files in the uploads directory
const countFiles = (directoryPath) => {
    return new Promise((resolve, reject) => {
        fs.readdir(directoryPath, (err, files) => {
            if (err) reject(err);
            resolve(files.length); // Return the number of files
        });
    });
};

// Function to calculate the total storage used by files in the uploads directory
const getStorageUsed = (directoryPath) => {
    return new Promise((resolve, reject) => {
        fs.readdir(directoryPath, (err, files) => {
            if (err) reject(err);

            let totalSize = 0;
            files.forEach(file => {
                const filePath = path.join(directoryPath, file);
                const stats = fs.statSync(filePath);
                totalSize += stats.size; // Add the size of the file to the total
            });

            resolve(totalSize); // Return the total storage used in bytes
        });
    });
};

// Function to get available storage space using the diskusage package
const getAvailableStorage = async () => {
    try {
        const { available } = await disk.check(mountPath);
        return available; // Return the available storage in bytes
    } catch (error) {
        console.error('Error fetching available storage:', error);
        return 0; // Return 0 if there is an error fetching available storage
    }
};

// API route for fetching system metrics
app.get('/api/monitor/metrics', async (req, res) => {
    try {
        // Fetch metrics
        const totalFiles = await countFiles(fileDirectory);  // Get total number of files in the uploads directory
        const storageUsed = await getStorageUsed(fileDirectory);  // Get total storage used in the uploads directory
        const availableStorage = await getAvailableStorage();  // Get available storage on the system

        // Example: Replace with logic to fetch real replica count if necessary
        const totalReplicas = 10; // Replace with logic for real replica count if needed

        // Send the metrics as a response
        const metrics = {
            totalFiles,
            totalReplicas,
            storageUsed,
            availableStorage,
        };

        res.json(metrics);  // Return the metrics as JSON
    } catch (error) {
        console.error('Error fetching metrics:', error);
        res.status(500).json({ error: 'Error fetching metrics' }); // Handle errors
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
