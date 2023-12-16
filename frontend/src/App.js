import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage'; // This is a new component to be created
import RegisterComponent from './components/RegisterComponent';
import "slick-carousel/slick/slick-theme.css";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterComponent />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
