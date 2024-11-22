import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';

function App() {
    return (
        <Router>
            <div>
                <Navbar />
                <Routes>
                    {/* Default route that will show the Dashboard */}
                    <Route path="/" element={<Dashboard />} />
                    {/* Route for dashboard page */}
                    <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
