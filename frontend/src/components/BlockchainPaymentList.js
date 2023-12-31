import React, { useState, useEffect } from 'react';

function BlockchainPaymentList() {
    const [contracts, setContracts] = useState([]);
  
    useEffect(() => {
      const fetchContracts = async () => {
        // Fetch contracts from the blockchain via your backend
        const response = await fetch('http://localhost:3001/api/payment/blockchain/allContracts');
        const blockchainContracts = await response.json();

        // For each contract, fetch user details from your backend
        const contractsWithUserDetails = await Promise.all(blockchainContracts.map(async paymentContract => {
          const userResponse = await fetch(`http://localhost:3001/api/payment/user-detail/${paymentContract.borrowerId}`);
          const userData = await userResponse.json();
          return { ...paymentContract, borrowerName: `${userData.FirstName} ${userData.LastName}` };
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
          <p>Contract Block ID: <br></br>{contract.contractBlockId}</p>
          <p>Payment Amount: <br></br>RM {contract.paymentAmount}.00</p>
          <p>Payment Date: <br></br>{contract.paymentDate}</p>
          <p>Previous Block Hash in Network: <br></br>{contract.blockHash}</p>
        </div>
      ))}
    </div>
  );
}

export default BlockchainPaymentList;
