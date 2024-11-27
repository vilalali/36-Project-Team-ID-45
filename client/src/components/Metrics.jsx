import React, { useEffect, useState } from 'react';
import { fetchMetrics } from '../services/api'; // Assuming you have this API function
import FormatBytes from '../components/FormatBytes'; // Import the FormatBytes component

const Metrics = ({ setMetrics }) => {
    const [loading, setLoading] = useState(true);
    const [metrics, setMetricsState] = useState({});

    useEffect(() => {
        const loadMetrics = async () => {
            try {
                const metrics = await fetchMetrics();
                setMetricsState(metrics);
                setMetrics(metrics);
            } catch (error) {
                console.error('Error fetching metrics:', error);
            } finally {
                setLoading(false);
            }
        };

        loadMetrics();
    }, [setMetrics]);

    return (
        <div className="table-responsive">
            <h3>System Metrics</h3>
            {loading ? (
                <p>Loading metrics...</p>
            ) : (
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Field Name</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Total Original Files</td>
                            <td>{metrics.totalFiles}</td>
                        </tr>
                        
                        {/* <tr>
                            <td>Storage Used</td>
                            <td> <FormatBytes bytes={metrics.storageUsed || 'N/A'} /></td>
                        </tr> */}
                        <tr>
                            <td>Available Storage</td>
                            <td> <FormatBytes bytes={metrics.availableStorage || 'N/A'} /></td>
                        </tr>
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Metrics;
