import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './components/Hero/Hero';
import './styles/App.css';

function App() {
    return (
        <Router basename="/Arkansasplumbers">
            <div className="app">
                <Routes>
                    <Route path="/" element={<Hero />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;