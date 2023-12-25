import React, { useState, useEffect } from 'react';

function AllContractsDisplay() {
    const [contracts, setContracts] = useState([]);
  
    useEffect(() => {
      const fetchContracts = async () => {
        // Fetch contracts from the blockchain via your backend
        const response = await fetch('http://localhost:3001/api/contract/blockchain/allContracts');
        const blockchainContracts = await response.json();
  
        // For each contract, fetch user details from your backend
        const contractsWithUserDetails = await Promise.all(blockchainContracts.map(async contract => {
          const userResponse = await fetch(`http://localhost:3001/api/contract/user-detail/${contract.borrowerId}`);
          const userData = await userResponse.json();
          return { ...contract, borrowerName: `${userData.FirstName} ${userData.LastName}` };
        }));
  
        setContracts(contractsWithUserDetails);
      };
  
      fetchContracts();
    }, []);

  return (
    <div className="contracts-container">
      {contracts.map((contract, index) => (
        <div key={index} className="contract-box">
          <h3>Contract {index + 1}</h3>
          <p>Block ID: {contract.id}</p>
          <p>Block Hash: {contract.blockHash}</p>
          <p>Borrower: {contract.borrowerName}</p>
          <p>Loan Amount: {contract.loanAmount}</p>
          <p>Interest Rate: {contract.interestRate}%</p>
          <p>Start Date: {contract.startDate}</p>
          <p>End Date: {contract.endDate}</p>
        </div>
      ))}
    </div>
  );
}

export default AllContractsDisplay;
