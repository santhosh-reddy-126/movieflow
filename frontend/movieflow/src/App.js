import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './screen/Login';
import Register from './screen/Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
