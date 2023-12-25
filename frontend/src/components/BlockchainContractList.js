import React, { useState, useEffect } from 'react';

function BlockchainContractList() {
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
          {/*<p>Contract ID in Network: <br></br>{contract.id}</p>
          <p>Current Block Number in Network: <br></br>{contract.blockNumber}</p>*/}
          <p>Borrower: <br></br>{contract.borrowerName}</p>
          <p>Start Date: <br></br>{contract.startDate}</p>
          <p>End Date: <br></br>{contract.endDate}</p>
          <p>Previous Block Hash in Network: <br></br>{contract.blockHash}</p>
          {/*<p>Loan Amount: <br></br>{contract.loanAmount}</p>
          <p>Interest Rate: <br></br>{contract.interestRate}%</p>*/}
        </div>
      ))}
    </div>
  );
}

export default BlockchainContractList;
