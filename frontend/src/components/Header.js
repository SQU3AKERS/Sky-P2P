import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ userType }) => {
  // Function to generate navigation based on userType
  const renderNavLinks = () => {
    switch (userType) {
      case 'borrower':
        return (
          <>
            {/* Borrower-specific links */}
            <Link to="/contracts">Contract +</Link>
            <Link to="/rewards">Rewards +</Link>
            {/* Common links */}
            <Link to="/settings">Settings</Link>
          </>
        );
      case 'lender':
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
            <Link to="/blockchain">Blockchain +</Link>
          </>
        );
    }
  };

  return (
    <header className="header">
      <nav className="navbar">
        {/* Logo and title always show */}
        <Link to="/" className="navbar-logo">
          <img src="/path-to-512logo.png" alt="Logo" />
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
