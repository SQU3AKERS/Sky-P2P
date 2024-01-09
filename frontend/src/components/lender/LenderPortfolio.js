import React, { useState, useEffect, useContext } from 'react';
import SessionContext from '../../contexts/SessionContext';

const LenderPortfolio = () => {
  const session = useContext(SessionContext);
  const sessionUserId = session.sessionData.userId;
  const [portfolio, setPortfolio] = useState([]);

  useEffect(() => {
    const fetchPortfolio = async () => {
      if (sessionUserId) {
        try {
          const response = await fetch(`http://localhost:3001/api/portfolio/${sessionUserId}/getPortfolio`);
          const data = await response.json();
          setPortfolio(data);
        } catch (error) {
          console.error('Error fetching portfolio data:', error);
        }
      }
    };

    fetchPortfolio();
  }, [sessionUserId]);

  return (
    <div className="lender-portfolio">
      {portfolio.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Contract ID</th>
              <th>Investment Amount</th>
              <th>Date</th>
              <th>Status</th>
              {/* Add more columns as needed */}
            </tr>
          </thead>
          <tbody>
            {portfolio.map((item, index) => (
              <tr key={index}>
                <td>{item.BlockID}</td>
                <td>RM {Math.floor(Number(item.InvestmentAmount))}.00</td>
                <td>{item.InvestmentDate}</td>
                <td>{item.Status}</td>
                {/* Add more cells as needed */}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="no-investments">
          Begin investing in contracts now!
        </div>
      )}
    </div>
  );
};

export default LenderPortfolio;
