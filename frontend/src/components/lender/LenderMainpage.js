import React, { useState, useEffect, useContext } from 'react';
import SessionContext from '../../contexts/SessionContext';

const LenderMainpage = () => {
  const session = useContext(SessionContext);
  const sessionUserId = session.sessionData.userId;
  const [lenderData, setLenderData] = useState({
    totalInvestment: 0,
    totalUnrealizedReturns: 0,
    totalRealizedReturns: 0,
    totalAcceptedContracts: 0
  });

  useEffect(() => {
    const fetchLenderData = async () => {
      if (sessionUserId) {
        try {
          // Replace these with actual API endpoint calls
          const responses = await Promise.all([
            fetch(`http://localhost:3001/api/mainmenu/${sessionUserId}/totalInvestment`),
            fetch(`http://localhost:3001/api/mainmenu/${sessionUserId}/totalUnrealizedReturns`),
            fetch(`http://localhost:3001/api/mainmenu/${sessionUserId}/totalRealizedReturns`),
            fetch(`http://localhost:3001/api/mainmenu/${sessionUserId}/totalAcceptedContracts`),
          ]);

          const data = await Promise.all(responses.map(res => res.json()));
          setLenderData({
            totalInvestment: data[0].totalInvestment,
            totalUnrealizedReturns: data[1].totalUnrealizedReturns,
            totalRealizedReturns: data[2].totalRealizedReturns,
            totalAcceptedContracts: data[3].totalAcceptedContracts,
          });
        } catch (error) {
          console.error('Error fetching lender menu data:', error);
        }
      }
    };

    fetchLenderData();
  }, [sessionUserId]);

  return (
    <div className="user-main-menu">
      <div className="menu-row top">
        <div className="menu-item">
          Total Investment: <br />
          RM {lenderData.totalInvestment}
        </div>
        <div className="menu-item">
          Total Unrealized Returns: <br />
          RM {lenderData.totalUnrealizedReturns}
        </div>
      </div>
      <div className="menu-row bottom">
        <div className="menu-item">
          Total Realized Returns: <br />
          RM {lenderData.totalRealizedReturns}
        </div>
        <div className="menu-item">
          Total Accepted Contracts: <br />
          {lenderData.totalAcceptedContracts}
        </div>
      </div>
    </div>
  );
};  

export default LenderMainpage;
