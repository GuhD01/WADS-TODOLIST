import React from 'react';
import ReactDOM from 'react-dom/client'; // Use client import for ReactDOM
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import Login from './Login.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/app" element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
