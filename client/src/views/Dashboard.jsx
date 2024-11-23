import React, { useEffect, useState } from 'react';
import FileUpload from '../components/FileUpload';
import FileList from '../components/FileList';
import Metrics from '../components/Metrics';
import { fetchFiles, fetchMetrics } from '../services/api'; // Assuming you have these API functions

const Dashboard = () => {
    const [files, setFiles] = useState([]);
    const [metrics, setMetrics] = useState();  // Initialize as empty

    useEffect(() => {
        // Reset state when the component is first loaded
        const loadInitialData = async () => {
            try {
                // Reset the data to default states
                setFiles([]); // Reset files
                setMetrics({}); // Reset metrics

                // Fetch updated data
                const fetchedFiles = await fetchFiles();
                const fetchedMetrics = await fetchMetrics();

                setFiles(fetchedFiles); // Set the files data
                setMetrics(fetchedMetrics); // Set the metrics data
            } catch (error) {
                console.error('Error fetching initial data:', error);
            }
        };

        loadInitialData(); // Call the function to reset and fetch new data
    }, []); // Empty dependency array to ensure this runs only once when the component mounts

    return (
        <div className="container mt-5">
            <h1 className="mb-4 text-center">Project Title: Haystack - Dynamic Replication</h1>
            <h2 className='mb-4 text-center'>Team ID: TEAM_ID_45 | Project ID: 36</h2>
            <FileUpload setFiles={setFiles} setMetrics={setMetrics} className="mb-4" />
            <FileList files={files} />
            <Metrics setMetrics={setMetrics} />
        </div>
    );
};

export default Dashboard;
