import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    // Fetch session data when the component mounts
    const fetchSessionData = async () => {
      try {
        const response = await fetch('/path-to-session-endpoint');
        const data = await response.json();
        if (data && data.userType) {
          setUserType(data.userType); // Set userType in state
        }
      } catch (error) {
        console.error('Error fetching session data:', error);
      }
    };

    fetchSessionData();
  }, []);

  const renderNavLinks = () => {
    switch (userType) {
      case 'Borrower':
        return (
          <>
            {/* Borrower-specific links */}
            <Link to="/contracts">Contract +</Link>
            <Link to="/rewards">Rewards +</Link>
            {/* Common links */}
            <Link to="/settings">Settings</Link>
          </>
        );
      case 'Lender':
        return (
          <>
            {/* Lender-specific links */}
            <Link to="/portfolio">Portfolio</Link>
            {/* Common links */}
            <Link to="/settings">Settings</Link>
          </>
        );
      default:
        // Links to show when no user is logged in
        return (
          <>
            <Link to="/about-us">About us</Link>
            <div className="dropdown">
            <button className="dropbtn">Blockchain +</button>
            <div className="dropdown-content">
              <Link to="/transactions">Transactions</Link>
              <Link to="/credit-scores">Credit Scores</Link>
            </div>
          </div>
          </>
        );
    }
  };

  return (
    <header className="header">
      <nav className="navbar">
        {/* Logo and title always show */}
        <Link to="/" className="navbar-logo">
          <img src="logo512.png" alt="Logo" />
          Sky's P2P Lending Platform
        </Link>
        {/* Render links based on user type */}
        <div className="navbar-menu">
          <Link to="/home">Home</Link>
          {renderNavLinks()}
          <Link to="/support">Support</Link>
        </div>
        {/* Right side of the navbar */}
        <div className="navbar-auth">
          {userType ? (
            <Link to="/logout" className="btn btn-logout">Logout</Link>
          ) : (
            <>
              <Link to="/login" className="btn btn-login">Login</Link>
              <Link to="/signup" className="btn btn-signup">Sign Up</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
