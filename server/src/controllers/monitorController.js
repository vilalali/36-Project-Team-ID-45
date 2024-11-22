exports.getSystemMetrics = (req, res) => {
    const metrics = {
        totalFiles: 10,
        totalReplicas: 25,
        storageUsed: '5GB',
        availableStorage: '15GB'
    };
    res.json(metrics);
};
