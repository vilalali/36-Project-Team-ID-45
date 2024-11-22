import React from 'react';

const FileList = ({ files }) => {
    // Utility function to format bytes into KB, MB, GB, or TB
    const formatBytes = (bytes) => {
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
        <div className="table-responsive">
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>File Name</th>
                        <th>Size</th>
                        <th>Access Frequency</th>
                        <th>Min Replicas</th>
                        <th>Max Replicas</th>
                        <th>Number of Replicas</th>
                        <th>Replicas</th>
                        <th>Monitored Nodes</th> {/* New column for monitored nodes */}
                    </tr>
                </thead>
                <tbody>
                    {files.length > 0 ? (
                        files.map((file, index) => (
                            <tr key={index}>
                                <td>{file.fileName}</td>
                                <td>{formatBytes(file.size)}</td> {/* Convert size to readable format */}
                                <td>{file.accessFrequency || 0}</td> {/* Display access frequency */}
                                <td>{file.minReplicas}</td> {/* Min replicas from config */}
                                <td>{file.maxReplicas}</td> {/* Max replicas from config */}
                                <td>{file.replicas ? file.replicas.length : 0}</td> {/* Number of replicas */}
                                <td>
                                    {file.replicas && file.replicas.length > 0 ? (
                                        file.replicas.map((replica, idx) => (
                                            <div key={idx}>
                                                {replica.node} ({replica.path})
                                            </div>
                                        ))
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
                                </td> {/* Display monitored nodes */}
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
