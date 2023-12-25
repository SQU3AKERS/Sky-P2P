import React, { useState, useEffect } from 'react';

function LenderActiveContractMarketplace() {
    const [contracts, setContracts] = useState([]);
    const [selectedContract, setSelectedContract] = useState(null);
    const [showModal, setShowModal] = useState(false);

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
        console.log('Contract Stuff:', contractsWithUserDetails);
      };
  
      fetchContracts();
    }, []);

    const handleContractClick = (contract) => {
        setSelectedContract(contract);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedContract(null);
    };

    return (
        <div className="contracts-container">
            {contracts.map((contract, index) => (
                <div key={index} className="contract-box" onClick={() => handleContractClick(contract)}>
                    <h3>Contract {index + 1}</h3>
                    <p>Loan Amount: {contract.loanAmount}</p>
                    <p>Interest Rate: {contract.interestRate}</p>
                </div>
            ))}

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <h2>Contract Details</h2>
                        <p>Block ID: {selectedContract.id}</p>
                        <p>Borrower Full Name: </p> {/*Combine First and Last Names*/}
                        <p>Loan Amount: RM {selectedContract.loanAmount}</p>
                        <p>Interest Rate: {selectedContract.interestRate}%</p>
                        <p>Potential Returns: </p> {/*Loan times Interest*/}
                        <p>Start Date: </p>
                        <p>End Date: </p>
                        {/* Add more details as needed */}
                    </div>
                </div>
            )}
        </div>
    );
}

export default LenderActiveContractMarketplace;