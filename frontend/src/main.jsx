// src/index.js
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Router components
import './index.css';
import App from './App.jsx';
import Signup from './Signup.jsx';

const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} /> {/* Main App component */}
       {/* <Route path="/login" element={<Login />} /> Login route */}
        <Route path="/signup" element={<Signup />} /> {/* Signup route */}
      </Routes>
    </Router>
  </StrictMode>,
);