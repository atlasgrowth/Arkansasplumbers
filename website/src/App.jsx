import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Hero from './components/Hero/Hero';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="*" element={<Hero />} />
      </Routes>
    </div>
  );
}

export default App;
