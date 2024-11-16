import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './screen/Login';
import Register from './screen/Register';
import Home from './screen/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
