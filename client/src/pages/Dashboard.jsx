import React, { useEffect, useState } from 'react';
import FileList from '../components/FileList'; // Ensure this component exists and is properly imported
import { fetchFiles, fetchMetrics, uploadFile } from '../services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {
    const [files, setFiles] = useState([]);
    const [metrics, setMetrics] = useState({});
    const [loading, setLoading] = useState(false);

    // Fetch files and metrics on initial load
    useEffect(() => {
        const loadFiles = async () => {
            const files = await fetchFiles();
            console.log('Fetched Files:', files); // Check the response in the browser console
            setFiles(files);
        };

        const loadMetrics = async () => {
            const metrics = await fetchMetrics(); // Fetch system metrics
            setMetrics(metrics);
        };

        loadFiles();
        loadMetrics();
    }, []);

    // Handle file upload
    const handleFileUpload = async (event) => {
        const file = event.target.files[0]; // Get the file from the input
        if (file) {
            setLoading(true); // Set loading state to true while uploading

            try {
                // Use the uploadFile function from api.js to upload the file
                await uploadFile(file); // Passing file to uploadFile

                // Show success toast
                toast.success('File uploaded successfully!');

                // Fetch the updated list of files
                const updatedFiles = await fetchFiles();
                setFiles(updatedFiles); // Update the file list with the response

                // Fetch the updated system metrics
                const updatedMetrics = await fetchMetrics();
                setMetrics(updatedMetrics); // Update system metrics
            } catch (error) {
                console.error('Error uploading file:', error); // Log the complete error object
                if (error.response) {
                    // Check for a response error (e.g., 500 or 404 status code)
                    toast.error(`Error: ${error.response.data.message || error.response.statusText}`);
                } else if (error.request) {
                    // If no response was received from the server
                    toast.error('No response from the server. Please try again later.');
                } else {
                    // Any other error (e.g., setup error)
                    toast.error('Error uploading file. Please try again.');
                }
            } finally {
                setLoading(false); // Reset loading state
            }
        } else {
            toast.error('No file selected. Please choose a file to upload.');
        }
    };

    // Utility function to format bytes into KB, MB, GB, or TB
    const formatBytes = (bytes) => {
        if (!bytes || isNaN(bytes)) return 'Unknown Size'; // Handle undefined or invalid size

        const units = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        let size = bytes;
        let unitIndex = 0;

        while (size >= 1024 && unitIndex < units.length - 1) {
            size /= 1024;
            unitIndex++;
        }

        return `${size.toFixed(2)} ${units[unitIndex]}`; // Return formatted size with 2 decimal points
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Haystack Dashboard</h1>
            <div className="mb-3">
                <label className="form-label" htmlFor="fileInput">Upload a File</label>
                <input
                    type="file"
                    className="form-control"
                    id="fileInput"
                    onChange={handleFileUpload}
                    disabled={loading} // Disable the upload input while file is being uploaded
                />
            </div>

            <h2 className="mt-5">Uploaded Files</h2>
            <FileList files={files} /> {/* Render file list */}

            <h3 className="mt-5">System Metrics</h3>
            <ul className="list-group">
                <li className="list-group-item">
                    Total Files: {metrics.totalFiles || 'Loading...'}
                </li>
                <li className="list-group-item">
                    Total Replicas: {metrics.totalReplicas || 'Loading...'}
                </li>
                <li className="list-group-item">
                    Storage Used: {metrics.storageUsed ? formatBytes(metrics.storageUsed) : 'Loading...'}
                </li>
                <li className="list-group-item">
                    Available Storage: {metrics.availableStorage ? formatBytes(metrics.availableStorage) : 'Loading...'}
                </li>
            </ul>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
};

export default Dashboard;
