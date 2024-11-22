const { monitorNodes } = require('../services/storageService');

// Run node monitoring every minute
setInterval(() => {
    monitorNodes();
}, 60000); // 1 minute interval
