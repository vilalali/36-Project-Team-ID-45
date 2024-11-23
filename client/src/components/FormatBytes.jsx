import React from 'react';

const FormatBytes = ({ bytes }) => {
    const units = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    let size = bytes;
    let unitIndex = 0;

    while (size >= 1024 && unitIndex < units.length - 1) {
        size /= 1024;
        unitIndex++;
    }

    return <span>{size.toFixed(2)} {units[unitIndex]}</span>;
};

export default FormatBytes;
