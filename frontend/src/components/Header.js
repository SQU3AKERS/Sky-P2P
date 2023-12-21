import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <nav className="navbar">
        <Link to="/" className="navbar-logo">
          <img src="logo512.png" alt="Logo" />
          Sky's P2P Lending Platform
        </Link>
        <div className="navbar-menu">
          <Link to="/home">Home</Link>
          <Link to="/about-us">About us</Link>
          <div className="dropdown">
            <button className="dropbtn">Blockchain +</button>
            <div className="dropdown-content">
              <Link to="/transactions">Transactions</Link>
              <Link to="/credit-scores">Credit Scores</Link>
            </div>
          </div>
          <Link to="/support">Support</Link>
        </div>
        <div className="navbar-auth">
          <Link to="/login" className="btn btn-login">Login</Link>
          <Link to="/register" className="btn btn-signup">Sign Up</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
