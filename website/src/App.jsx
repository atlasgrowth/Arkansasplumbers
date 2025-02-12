import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './components/Hero/Hero';
import './styles/App.css';

function App() {
    return (
        <Router basename="/Arkansasplumbers">
            <div className="app">
                <Routes>
                    <Route path="/:businessId" element={<Hero />} />
                    <Route path="/" element={
                        <div className="no-business">Please provide a business ID</div>
                    } />
                </Routes>
            </div>
        </Router>
    );
}

export default App;