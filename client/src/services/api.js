import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

// Fetch files with error handling
export const fetchFiles = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/files`);
        return response.data; // Should return an array of files
    } catch (error) {
        console.error("Error fetching files:", error.message);
        return []; // Return an empty array on error
    }
};

// Fetch metrics with error handling
export const fetchMetrics = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/monitor/metrics`);
        return response.data;
    } catch (error) {
        console.error("Error fetching metrics:", error.message);
        return {};  // Return default empty metrics object
    }
};

// Handle file upload with FormData and error handling
export const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);  // Append file to FormData

    try {
        const response = await axios.post(`${API_BASE_URL}/files/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;  // Assuming the response contains details of the uploaded file
    } catch (error) {
        console.error("Error uploading file:", error.message);
        throw new Error("File upload failed. Please try again.");  // Throw a more descriptive error
    }
};

