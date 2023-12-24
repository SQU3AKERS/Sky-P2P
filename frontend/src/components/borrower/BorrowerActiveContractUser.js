import React, { useState, useEffect, useContext } from 'react';
import { SessionContext } from '../../contexts/SessionContext';

function BorrowerActiveContractUser() {
const session = useContext(SessionContext);
const [contracts, setContracts] = useState([]);

useEffect(() => {
    const fetchContracts = async () => {
      try {
        // Retrieve the userId from session context
        const sessionUserId = session.sessionData.userId;
        console.log('Session UserId:', sessionUserId);

        // Make an API call to your backend using the sessionUserId to fetch contracts
        const response = await fetch(`http://localhost:3001/api/contract/user/${sessionUserId}`);
        console.log('Response in fetchContracts:', response);
        const userContracts = await response.json();

        setContracts(userContracts);
      } catch (error) {
        console.error('Error fetching contracts for the user:', error);
      }
    };
  
    fetchContracts();
}, [session.sessionData.userId]); // Dependency array ensures useEffect runs when userId updates

  return (
    <div className="contracts-container">
      {contracts.map((contract, index) => (
        <div key={index} className="contract-box">
          <h3>Contract {index + 1}</h3>
          <p>Block ID: {contract.id}</p>
          <p>Borrower ID: {contract.borrowerId}</p>
          <p>Transacted using this account: {contract.borrower}</p>
          <p>Loan Amount: {contract.loanAmount}</p>
          <p>Interest Rate: {contract.interestRate}%</p>
          <p>Start Date: {contract.startDate}</p>
          <p>End Date: {contract.endDate}</p>
          <p>Active?: {contract.isActive ? 'Yes' : 'No'}</p>
        </div>
      ))}
    </div>
  );
}

export default BorrowerActiveContractUser;