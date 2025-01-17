import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Admin from './Pages/Admin';
import reportWebVitals from './reportWebVitals';
import NoPage from './Pages/NoPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router> 
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="*" element={<NoPage />} />
    </Routes>
  </Router>
);

reportWebVitals();