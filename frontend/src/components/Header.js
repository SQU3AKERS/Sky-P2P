import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header style={{ background: '#282c34', color: 'white' }}>
      <nav style={{ display: 'flex', flexDirection: 'column', padding: '10px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <div>
            <Link to="/" style={{ color: 'white', textDecoration: 'none', marginRight: '10px' }}>Home</Link> | 
            <Link to="/about-us" style={{ color: 'white', textDecoration: 'none', margin: '0 10px' }}>About Us</Link> | 
            <Link to="/support" style={{ color: 'white', textDecoration: 'none', marginLeft: '10px' }}>Support</Link>
          </div>
          <div>
            <Link to="https://www.youtube.com/watch?v=xvFZjo5PgG0&t=0s" style={{ color: 'white', textDecoration: 'none' }}>Youtube</Link>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
          <Link to="/">
            <img src="/logo192.png" alt="P2P Icon" style={{ height: '50px', marginRight: '10px' }} />
          </Link>
          <h1>Sky's P2P Lending Platform</h1>
        </div>
      </nav>
    </header>
  );
};

export default Header;
