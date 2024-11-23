import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-dark text-white text-center py-3">
            <div className="container">
                <p className="mb-1">
                    <strong>Project Title:</strong> Haystack - Dynamic Replication
                </p>
                <p className="mb-1">
                    <strong>Team ID:</strong> TEAM_ID_45 | <strong>Project ID:</strong> 36
                </p>
                <p className="mb-1">
                    <strong>Team Members:</strong> Vilal Ali (2024701027), Shriom Tyagi (2023900034)
                </p>
                <p className="small mb-0">© {new Date().getFullYear()} Haystack Project. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
