import React, { useState, useEffect, useContext } from 'react';
import SessionContext from '../../contexts/SessionContext';

const BorrowerMainpage = () => {
  const session = useContext(SessionContext);
  const sessionUserId = session.sessionData.userId;
  const [userFirstName, setUserFirstName] = useState('');
  const [menuData, setMenuData] = useState({
    totalContractsCreated: 0,
    totalContractsFunded: 0,
    creditScore: 0,
    totalOutstanding: 0,
    totalPaid: 0
  });

  useEffect(() => {
    // This inner function is necessary to use async inside useEffect
    const fetchUserFirstName = async () => {
      if (sessionUserId) {
        try {
        console.log('Session ID found', sessionUserId);
          const response = await fetch(`http://localhost:3001/api/mainmenu/${sessionUserId}/firstname`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setUserFirstName(data.firstName);
        } catch (error) {
          console.error('Error fetching user first name:', error);
          setUserFirstName("you're not supposed to be here!");
        }
      }
    };

    fetchUserFirstName();
  }, [sessionUserId]);

  useEffect(() => {
    const fetchMainMenuData = async () => {
      if (sessionUserId) {
        try {
          const responses = await Promise.all([
            fetch(`http://localhost:3001/api/mainmenu/${sessionUserId}/totalContractsCreated`),
            fetch(`http://localhost:3001/api/mainmenu/${sessionUserId}/totalContractsFunded`),
            fetch(`http://localhost:3001/api/mainmenu/${sessionUserId}/creditScore`),
            fetch(`http://localhost:3001/api/mainmenu/${sessionUserId}/totalOutstanding`),
            fetch(`http://localhost:3001/api/mainmenu/${sessionUserId}/totalPaid`),
          ]);
  
          const data = await Promise.all(responses.map(res => {
            if (!res.ok) throw new Error('Network response was not ok');
            return res.json();
          }));
  
          setMenuData({
            totalContractsCreated: data[0].totalContractsCreated,
            totalContractsFunded: data[1].totalContractsFunded,
            creditScore: data[2].creditScore,
            totalOutstanding: data[3].totalOutstanding,
            totalPaid: data[4].totalPaid,
          });
        } catch (error) {
          console.error('Error fetching main menu data:', error);
          // Optionally set an error state here
        }
      }
    };
  
    fetchMainMenuData();
  }, [sessionUserId]);  

  return (
    <div className="user-main-menu">
      <div className="welcome-message">Welcome, {userFirstName}!</div>
      <div className="menu-row top">
        <div className="menu-item">Total Contracts Created: {menuData.totalContractsCreated}</div>
        <div className="menu-item">Total Contracts Funded: {menuData.totalContractsFunded}</div>
        <div className="menu-item">Credit Score: {menuData.creditScore}</div>
      </div>
      <div className="menu-row bottom">
        <div className="menu-item">Total Outstanding: {menuData.totalOutstanding}</div>
        <div className="menu-item">Total Paid: {menuData.totalPaid}</div>
      </div>
    </div>
  );
}

export default BorrowerMainpage;
