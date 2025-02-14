import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainContent from './components/MainContent';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainContent />} />
    </Routes>
  );
}

export default App;
