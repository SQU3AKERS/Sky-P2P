import React, { useState, useEffect, useContext } from 'react';
import { SessionContext } from '../../contexts/SessionContext';
import getEthereumAddress from '../../utils/getEthereumAddress';

function BorrowerActiveContractUser() {
    const session = useContext(SessionContext);
    const [userContracts, setUserContracts] = useState([]);
    const [selectedContract, setSelectedContract] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchContracts = async () => {
            const sessionUserId = session.sessionData.userId;
            const contractsResponse = await fetch(`http://localhost:3001/api/contract/user/${sessionUserId}`);
            const contracts = await contractsResponse.json();
            console.log(contracts);

            if (Array.isArray(contracts)) {
                const lenderPortfolioResponse = await fetch('http://localhost:3001/api/payment/fetchLenderPortfolio/');
                const lenderPortfolios = await lenderPortfolioResponse.json();
    
                const updatedContracts = contracts.map(contract => {
                    const portfolio = lenderPortfolios.find(p => p.BlockID === contract.id);
                    return { ...contract, status: portfolio ? portfolio.Status : 'Active' };
                });
    
                setUserContracts(updatedContracts);
            } else {
                console.error('Expected an array, received:', contracts);
                // Handle the error appropriately
            }
        };
    
        fetchContracts();
    }, [session.sessionData.userId]);    

    const handleContractClick = (contract) => {
        setSelectedContract(contract);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedContract(null);
    };

    const handlePayContract = async () => {
      try {
        const ethereumAddress = await getEthereumAddress();
          // Prepare the payment data
          const paymentData = {
              contractId: selectedContract.id,
              borrowerId: session.sessionData.userId,
              paymentAmount: Number(selectedContract.loanAmount * (1 + selectedContract.interestRate / 100)),
              endDate: selectedContract.endDate,
              senderAddress: ethereumAddress
          };
  
          console.log('Payment Data Packed:', paymentData);
          // Send the payment request to the backend
          const response = await fetch('http://localhost:3001/api/payment/payContract/', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(paymentData),
          });
  
          if (response.ok) {
              const result = await response.json();
              // Refresh the page if payment is successful
              window.location.reload();
              console.log('Payment successful:', result);
          } else {
              // Handle errors
              console.error('Payment failed:', response.status);
          }
      } catch (error) {
          console.error('Error during payment:', error);
      } finally {
          closeModal();
      }
    };
  

    return (
        <div className="contracts-container">
            {userContracts.map((contract, index) => (
                <div key={index} className={`contract-box ${contract.status.toLowerCase()}`} onClick={() => handleContractClick(contract)}>
                    <h3>Contract {index + 1}</h3>
                    <p>Status: {contract.status}</p>
                </div>
            ))}

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <h2>Contract Details</h2>
                        <p><strong>Contract ID:</strong> {selectedContract.id}</p>
                        <p><strong>Borrower ID:</strong> {selectedContract.borrowerId}</p>
                        <p><strong>Loan Amount:</strong> RM {selectedContract.loanAmount}</p>
                        <p><strong>Interest Rate:</strong> {selectedContract.interestRate}%</p>
                        <p><strong>Start Date:</strong> {selectedContract.startDate}</p>
                        <p><strong>End Date:</strong> {selectedContract.endDate}</p>
                        <p><strong>Full Amount to Repay:</strong> RM {Number(selectedContract.loanAmount * (1 + selectedContract.interestRate / 100)).toFixed(2)}</p>
                        <p><strong>Status:</strong> {selectedContract.status}</p>
                        {selectedContract.status !== 'Completed' && (
                            <button onClick={handlePayContract}>Pay Contract</button>
                        )}
                        <br></br>
                        <button onClick={closeModal}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default BorrowerActiveContractUser;
