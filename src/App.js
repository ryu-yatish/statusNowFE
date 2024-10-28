import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import './App.css';
import { useNavigate } from 'react-router-dom';

import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Pricing from './components/Pricing';
import Docs from './components/Docs';
import Features from './components/Features';
import { AuthProvider } from './context/AuthContext';
import PublicServiceStatus from './components/PublicServiceStatus';
import ServiceManagement from './components/ServiceManagement';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const handleLogin = (token) => {
    localStorage.setItem('authToken', token);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
  };

  // Check if the token is valid
  const checkAuth = () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        debugger
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp < currentTime) {
          handleLogout();
        } else {
          setIsAuthenticated(true);

        }
      } catch (error) {
        console.error('Invalid token:', error);
        handleLogout();
      }
    }
  };

  React.useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthProvider>
    <Router>
      <div className="App">
        <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/features" element={<Features />} />
            <Route path="/register" element={<Register />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/service/:serviceId" element={<PublicServiceStatus />} />
            <Route path="/docs" element={<Docs />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/manage-service/:serviceId" element={<ServiceManagement />} />
          </Routes>
        </main>

      </div>
    </Router>
    </AuthProvider>
  );
}

export default App;
