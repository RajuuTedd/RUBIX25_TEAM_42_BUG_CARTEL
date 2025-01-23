// src/index.js
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Router components
import './index.css';
import App from './App.jsx';
import Signup from './Signup.jsx';
import SignupForm from './pages/signup.jsx';
import LoginPage from './pages/login.jsx';
import Dashboard from './pages/dashboard.jsx';
import FoodDonationForm from './pages/FoodDonation.jsx';
import DonationList from './pages/getalldonations.jsx';

const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} /> {/* Main App component */}
       {/* <Route path="/login" element={<Login />} /> Login route */}
       <Route path="/login" element={<LoginPage/>} /> 
        <Route path="/signup" element={<SignupForm/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/donate" element={<FoodDonationForm/>} />
        <Route path="/dona" element={<DonationList/>} />
         {/* Signup route */}
      </Routes>
    </Router>
  </StrictMode>,
);