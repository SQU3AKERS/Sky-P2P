import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import RegisterComponent from './components/RegisterComponent';
import LoginComponent from './components/LoginComponent';
import SessionContext from './contexts/SessionContext';
import "slick-carousel/slick/slick-theme.css";

const App = () => {
  const [sessionData, setSessionData] = useState(null);

  useEffect(() => {
    // Function to fetch session data from the server
    const fetchSessionData = async () => {
      // Make the API call to the server to get session data
      const response = await fetch('/api/session');
      const data = await response.json();
      console.log('Session data:', data); // Log the session data
      setSessionData(data); // Update the session data state
    };

    fetchSessionData();
  }, []);
  
  return (
      <Router>
        <SessionContext.Provider value={sessionData}>
          <div className="App">
            <Header />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/register" element={<RegisterComponent />} />
              <Route path="/login" element={<LoginComponent />} />
            </Routes>
            <Footer />
          </div>
        </SessionContext.Provider>
      </Router>
  );
};

export default App;
