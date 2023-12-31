import React, { useState, useEffect } from 'react';

function BlockchainContractList() {
    const [contracts, setContracts] = useState([]);
  
    useEffect(() => {
      const fetchContracts = async () => {
        // Fetch contracts from the blockchain via your backend
        const response = await fetch('http://localhost:3001/api/creditscore/blockchain/allContracts');
        const blockchainContracts = await response.json();
  
        // For each contract, fetch user details from your backend
        const contractsWithUserDetails = await Promise.all(blockchainContracts.map(async creditScoreContract => {
          const userResponse = await fetch(`http://localhost:3001/api/creditscore/user-detail/${creditScoreContract.borrowerId}`);
          const userData = await userResponse.json();
          return { ...creditScoreContract, borrowerName: `${userData.FirstName} ${userData.LastName}` };
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
          <p>Borrower: <br></br>{contract.borrowerName}</p>
          <p>Borrower's Added Score: <br></br>{contract.score} point(s)</p>
          <p>Earned Score Date: <br></br>{contract.scoreDate}</p>
          <p>Previous Block Hash in Network: <br></br>{contract.blockHash}</p>
        </div>
      ))}
    </div>
  );
}

export default BlockchainContractList;
