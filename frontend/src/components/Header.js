import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import SessionContext from '../contexts/SessionContext';

const Header = () => {
  const { sessionData, logout } = useContext(SessionContext);
  console.log('Session Data in Header:', sessionData);

  const userType = sessionData && sessionData.userType ? sessionData.userType : null;
  console.log('User Type:', userType);

  const handleLogout = () => {
    logout();
    window.location.href = "http://localhost:3000/";
  };

  const homeLink = userType === 'Borrower' ? '/borrower/BorrowerMainpage' :
                  userType === 'Lender' ? '/lender/LenderMainpage' : '/';

  const renderNavLinks = () => {
    switch (userType) {
      case 'Borrower':
        return (
          <>
            {/* Borrower-specific links */}
            <div className="dropdown">
              <button className="dropbtn">Contracts +</button>
              <div className="dropdown-content">
                <Link to="/borrower/BorrowerActiveContractMarketplace">Contracts Marketplace</Link>
                <Link to="/borrower/BorrowerActiveContractUser">My Contracts</Link>
                <Link to="/borrower/BorrowerActiveContractCreate">Create Contract</Link>
                <Link to="/borrower/BorrowerActiveContractPay">Pay Contract</Link>
              </div>
            </div>
            <div className="dropdown">
              <button className="dropbtn">Rewards +</button>
              <div className="dropdown-content">
                <Link to="/borrower/BorrowerRewardsMarketplace">Rewards Marketplace</Link>
                <Link to="/borrower/BorrowerRewardsList">My Rewards</Link>
              </div>
            </div>
            <Link to="/borrower/BorrowerUpdateProfile">Profile</Link>
          </>
        );
      case 'Lender':
        return (
          <>
            {/* Lender-specific links */}
            <div className="dropdown">
              <button className="dropbtn">Contracts +</button>
              <div className="dropdown-content">
                <Link to="/lender/LenderActiveContractMarketplace">Contracts Marketplace</Link>
                <Link to="/lender/LenderPortfolio">My Portfolio</Link>
              </div>
            </div>
            <Link to="/lender/LenderProfileUpdate">Profile</Link>
            {/* Common links */}
            <Link to="/settings">Settings</Link>
          </>
        );
      default:
    }
  };

  return (
    <header className="header">
      <nav className="navbar">
        {/* Logo and title always show */}
        <Link to={homeLink} className="navbar-logo">
          <img src="logo512.png" alt="Logo" />
          Sky's P2P Lending Platform
        </Link>
        {/* Render links based on user type */}
        <div className="navbar-menu">
          <Link to={homeLink}>Home</Link>
          <Link to="/about-us">About us</Link>
          <div className="dropdown">
          <button className="dropbtn">Blockchain +</button>
          <div className="dropdown-content">
            <Link to="/BlockchainContractList">Contracts</Link>
            <Link to="/BlockchainTransactionList">Transactions</Link>
            <Link to="/BlockchainCreditScoreList">Credit Scores</Link>
            </div>
          </div>
          {renderNavLinks()}
          <Link to="/support">Support</Link>
        </div>
        {/* Right side of the navbar */}
        <div className="navbar-auth">
        {userType ? (
          <button onClick={handleLogout} className="btn btn-logout">Logout</button>
          ) : (
          <>
            <Link to="/login" className="btn btn-login">Login</Link>
            <Link to="/register" className="btn btn-signup">Sign Up</Link>
          </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;