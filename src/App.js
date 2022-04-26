import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Sign from './pages/Sign';
import Rsscat from './pages/Rsscat';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/sign" element={<Sign />} />
        <Route path="/rsscat" element={<Rsscat />} />
      </Routes>
    </div>
  );
};

export default App;
