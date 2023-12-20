import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header style={{ background: '#282c34', color: 'white' }}>
      <nav style={{ display: 'flex', flexDirection: 'column', padding: '10px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <div>
            <Link to="/" style={{ color: 'white', textDecoration: 'none', marginRight: '10px' }}>Home</Link> | 
            <Link to="/" style={{ color: 'white', textDecoration: 'none', margin: '0 10px' }}>Contract Marketplace</Link> | 
            <Link to="/" style={{ color: 'white', textDecoration: 'none', marginLeft: '10px' }}>Portfolio</Link> | 
            <Link to="../about-us" style={{ color: 'white', textDecoration: 'none', margin: '0 10px' }}>About Us</Link> | 
            <Link to="../support" style={{ color: 'white', textDecoration: 'none', marginLeft: '10px' }}>Support</Link>
          </div>
          <div>
            <Link to="https://youtu.be/xMHJGd3wwZk?si=9UT22qMkvXbHy10Z" style={{ color: 'white', textDecoration: 'none' }}>Support Us Here!</Link> | 
            <Link to="/logout" style={{ color: 'white', textDecoration: 'none' }}> Logout</Link>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
          <Link to="/">
            <img src="/logo192.png" alt="P2P Icon" style={{ height: '50px', marginRight: '10px' }} />
          </Link>
          <h1><Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Sky's P2P Lending Platform</Link></h1>
        </div>
      </nav>
    </header>
  );
};

export default Header;
