import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function BorrowerActiveContractMarketplace() {
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
                <Link to={{ 
                    pathname: `/contract/${contract.id}`, 
                    state: { contract } 
                }} key={index} className="contract-box-link"> 
                    <div className="contract-box">
                        <h3>Contract {index + 1}</h3>
                        <p>Contract ID in Network: {contract.id}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default BorrowerActiveContractMarketplace;
