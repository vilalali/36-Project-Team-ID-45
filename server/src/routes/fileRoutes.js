const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs'); // File system module
const { uploadFile, getFiles } = require('../controllers/fileController');

// Set up multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, '../../uploads'); // Define upload directory
        // Ensure the directory exists, create it if not
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir); // Set destination folder
    },
    filename: (req, file, cb) => {
        // Generate a unique filename using a timestamp
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// Initialize multer with the configured storage
const upload = multer({ storage });

// Initialize the router
const router = express.Router();

// Route for file upload
router.post('/upload', upload.single('file'), (req, res) => {
    console.log('File upload request received');
    uploadFile(req, res);
});

// Route for retrieving the list of uploaded files along with their sizes
router.get('/', (req, res) => {
    const uploadDir = path.join(__dirname, '../../uploads'); // Path to the uploads directory

    try {
        // Read the contents of the uploads directory
        const files = fs.readdirSync(uploadDir);

        // Map the files into an array of objects with fileName and size
        const fileDetails = files.map(fileName => {
            const filePath = path.join(uploadDir, fileName);
            const { size } = fs.statSync(filePath); // Get file size
            return { fileName, size }; // Return an object with fileName and size
        });

        res.json(fileDetails); // Send the file details as a response
    } catch (err) {
        console.error('Error reading uploaded files:', err.message);
        res.status(500).json({ message: 'Failed to retrieve uploaded files' });
    }
});

module.exports = router;
