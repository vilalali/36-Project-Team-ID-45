import React, { useEffect, useState } from 'react';
import fetchMetaData from '../metadata.json'; // Import the metadata JSON directly
import FormatBytes from '../components/FormatBytes'; // Import the FormatBytes component

const FileList = () => {
    const [files, setFiles] = useState([]);

    // Load the metadata when the component mounts
    useEffect(() => {
        const loadFiles = () => {
            // Use the imported metadata directly
            const fetchedFiles = Object.values(fetchMetaData); // Convert the metadata object to an array
            setFiles(fetchedFiles);
        };

        loadFiles();
    }, []); // Empty dependency array to load once when the component mounts

    return (
        <div className="table-responsive">
            <h3 className="mt-8 mb-4 text-primary">Files Replication Metrics</h3>
            <table className="table table-bordered table-hover border-primary">
                <thead className="thead-light table-primary">
                    <tr>
                        <th>File Name</th>
                        <th>Size</th>
                        <th>Access Frequency</th>
                        <th>Min Replicas</th>
                        <th>Max Replicas</th>
                        <th>Number of Replicas</th>
                        <th>Replicas</th>
                        <th>Monitored Nodes</th>
                    </tr>
                </thead>
                <tbody>
                    {files.length > 0 ? (
                        files.map((file, index) => (
                            <tr key={index}>
                                <td>{file.fileName}</td>
                                <td><FormatBytes bytes={file.size || 'N/A'} /></td>
                                <td>{file.accessFrequency || 0}</td>
                                <td>{file.minReplicas}</td>
                                <td>{file.maxReplicas}</td>
                                <td>{file.replicas ? file.replicas.length : 0}</td>
                                <td>
                                    {file.replicas && file.replicas.length > 0 ? (
                                        <div>
                                            {file.replicas.map((replica, idx) => (
                                                <div key={idx}>
                                                    {replica.path.split('/').slice(1).join('/')}
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <span>No replicas available</span>
                                    )}
                                </td>
                                <td>
                                    {file.monitoredNodes && file.monitoredNodes.length > 0 ? (
                                        file.monitoredNodes.map((node, idx) => (
                                            <div key={idx}>
                                                {node.nodeName} ({node.status}) - IP: {node.ip}
                                            </div>
                                        ))
                                    ) : (
                                        <span>No monitored nodes</span>
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8" className="text-center">
                                No files uploaded yet.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default FileList;
