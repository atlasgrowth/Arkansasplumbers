import Context from './components/Context/Context';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainContent from './components/MainContent';
import './styles/App.css';

function App() {
  return (
    <BrowserRouter basename="/Arkansasplumbers">
      <Routes>
        <Route path="*" element={<MainContent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;