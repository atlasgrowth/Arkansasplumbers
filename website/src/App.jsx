
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import MainContent from './components/MainContent';
import './styles/App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainContent />} />
      </Routes>
    </Router>
  );
}

export default App;
