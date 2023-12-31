import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SessionContext } from '../../contexts/SessionContext';
import getEthereumAddress from '../../utils/getEthereumAddress';

function BorrowerActiveContractUser() {
    const session = useContext(SessionContext);
    const navigate = useNavigate();
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
                console.log('Lender Portfolios:', lenderPortfolios);
    
                const updatedContracts = contracts.map(contract => {
                    console.log('Contract ID:', contract.id);
                    const portfolio = lenderPortfolios.find(p => p.BlockID.trim() === contract.id.trim());

                    let contractStatus;
                        if (portfolio) {
                            contractStatus = portfolio.Status === 'Earning' ? 'Active' : portfolio.Status;
                        } else {
                            contractStatus = 'No Funding';
                        }

                    console.log(`Contract ID: ${contract.id} (type: ${typeof contract.id}), Matching Portfolio:`, portfolio);
                    lenderPortfolios.forEach(p => {
                        console.log(`Comparing Portfolio BlockID: '${p.BlockID}' (type: ${typeof p.BlockID}) with Contract ID: '${contract.id}' (type: ${typeof contract.id})`);
                    });
                    
                    return { ...contract, status: contractStatus };
                });
    
                setUserContracts(updatedContracts);
            } else {
                console.error('Expected an array, received:', contracts);
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
            if (response.headers.get("content-type")?.includes("application/json")) {
                const result = await response.json();
                console.log('Payment successful:', result);
                navigate('/borrower/BorrowerActiveContractUser');
                window.location.reload();
            } else {
                console.log('Payment successful, no JSON response');
                navigate('/borrower/BorrowerActiveContractUser');
                window.location.reload();
            }
        } else {
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
                        {selectedContract.status !== 'Completed' && selectedContract.status !== 'No Funding' && (
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
