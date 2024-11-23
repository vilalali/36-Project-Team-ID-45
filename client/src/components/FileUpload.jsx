import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { uploadFile } from '../services/api';
import { fetchFiles, fetchMetrics } from '../services/api';

const FileUpload = ({ setFiles, setMetrics }) => {
    const [loading, setLoading] = useState(false);

    // Handle file upload
    const handleFileUpload = async (event) => {
        const file = event.target.files[0]; // Get the file from the input
        if (file) {
            setLoading(true); // Set loading state to true while uploading

            try {
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
                    toast.error(`Error: ${error.response.data.message || error.response.statusText}`);
                } else if (error.request) {
                    toast.error('No response from the server. Please try again later.');
                } else {
                    toast.error('Error uploading file. Please try again.');
                }
            } finally {
                setLoading(false); // Reset loading state
            }
        } else {
            toast.error('No file selected. Please choose a file to upload.');
        }
    };

    return (
        <div>
            <div className="mb-3">
                <label className="form-label" htmlFor="fileInput">Upload a File</label>
                <input
                    type="file"
                    className="form-control"
                    id="fileInput"
                    onChange={handleFileUpload}
                    disabled={loading}
                />
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
};

export default FileUpload;
