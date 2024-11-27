//server/src/config/replicationConfig.js
const replicationConfig = {
    minReplicas: 2, // Minimum replicas per file
    maxReplicas: 5, // Maximum replicas per file
    accessThreshold: 10, // Access frequency threshold for creating replicas
    accessFrequency: 100, // Access frequency for creating replicas
};
module.exports = replicationConfig;