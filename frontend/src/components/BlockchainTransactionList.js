import React, { useState, useEffect } from 'react';

function BlockchainTransactionList() {
    const [contracts, setContracts] = useState([]);

    useEffect(() => {
      const fetchContracts = async () => {
        try {
          // Fetch contracts from the blockchain via your backend
          const response = await fetch('http://localhost:3001/api/transaction/blockchain/allTransactions');
          const blockchainContracts = await response.json();
          console.log('Blockchain Contract:', blockchainContracts);
      
          // Fetch all user details at once
          const usersResponse = await fetch('http://localhost:3001/api/transaction/fetchAllUsers/');
          console.log('Raw response from /fetchAllUsers/:', usersResponse); // Log the raw response
            if (!usersResponse.ok) {
              throw new Error(`HTTP error! status: ${usersResponse.status}`); // Check for HTTP errors
            }
          const users = await usersResponse.json();
          console.log('Users data:', users)
          const userMap = users.reduce((acc, user) => {
            acc[user.UserID] = `${user.FirstName} ${user.LastName}`;
            return acc;
          }, {});
      
          // Map user details to each transaction contract
          const contractsWithUserDetails = blockchainContracts.map(contract => {
            return {
              ...contract,
              borrowerName: userMap[contract.borrowerId],
              lenderName: userMap[contract.lenderId]
            };
          });

        setContracts(contractsWithUserDetails);

        } catch (error) {

          console.error('Error in fetchContracts:', error);

        }
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
          <p>From Lender: <br></br>{contract.lenderName}</p>
          <p>To Borrower: <br></br>{contract.borrowerName}</p>
          <p>Loan Amount: <br></br>RM {contract.amount}.00</p>
          <p>Transaction Date: <br></br>{contract.transactionDate}</p>
          <p>Previous Block Hash in Network: <br></br>{contract.blockHash}</p>
          {/*<p>Interest Rate: <br></br>{contract.interestRate}%</p>*/}
        </div>
      ))}
    </div>
  );
}

export default BlockchainTransactionList;
