import React, { useState, useEffect, useContext } from 'react';
import { SessionContext } from '../../contexts/SessionContext';
import getEthereumAddress from '../../utils/getEthereumAddress';

function LenderActiveContractMarketplace() {
    const session = useContext(SessionContext);
    const [filteredContracts, setFilteredContracts] = useState([]);
    const [selectedContract, setSelectedContract] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);

    useEffect(() => {
        const fetchContracts = async () => {
            console.log('Fetching contracts...');
            // Fetch BlockIds from LenderPortfolio
            console.log('Fetching BlockIds from LenderPortfolio...');
            const lenderPortfolioResponse = await fetch('http://localhost:3001/api/transaction/allDBResults');
            const lenderPortfolioBlockIds = await lenderPortfolioResponse.json();
            console.log('LenderPortfolio BlockIds:', lenderPortfolioBlockIds);
        
            // Fetch contracts from the blockchain
            console.log('Fetching contracts from the blockchain...');
            const response = await fetch('http://localhost:3001/api/contract/blockchain/allContracts');
            const blockchainContracts = await response.json();
        
            console.log('Processing each contract for user details...');
            // Fetch user details for each contract
            const contractsWithUserDetails = await Promise.all(blockchainContracts.map(async contract => {
                console.log(`Fetching user details for contract ID: ${contract.id}`);
                const userResponse = await fetch(`http://localhost:3001/api/contract/user-detail/${contract.borrowerId}`);
                const userData = await userResponse.json();
                return { ...contract, borrowerName: `${userData.FirstName} ${userData.LastName}` };
            }));
        
            // Filter out contracts that exist in LenderPortfolio
            console.log('Filtering out contracts already present in LenderPortfolio...');
            const filteredContracts = contractsWithUserDetails.filter(contract => 
                !lenderPortfolioBlockIds.includes(contract.id));
        
            console.log('Final list of contracts to display:', filteredContracts);
            setFilteredContracts(filteredContracts);
        };
        
        fetchContracts();        
        
    }, []);

    const handleContractClick = (filteredContracts) => {
        setSelectedContract(filteredContracts);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedContract(null);
    };

    const handleConfirmSendMoney = () => {
        setShowConfirmationModal(false);
        handleSendMoney();
    };

    const handleSendMoney = async () => {
        try {
            const lenderId = session.sessionData.userId;
            const borrowerId = selectedContract.borrowerId;
            const amount = selectedContract.loanAmount;
            const transactionDate = Math.floor(Date.now() / 1000); // Current timestamp in seconds
            const blockId = selectedContract.id;
            const ethereumAddress = await getEthereumAddress();

            /// Prepare the data for the API call
            const transactionData = {
                lenderId,
                borrowerId,
                amount,
                transactionDate,
                blockId
            };

            console.log('transactionData is:', transactionData);

            // Make an API call to your backend
            const response = await fetch('http://localhost:3001/api/transaction/uploadToBCDB', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ lenderId: lenderId, borrowerId: borrowerId, amount: amount, transactionDate: transactionDate, blockId: blockId, senderAddress: ethereumAddress})
            });
            const data = await response.json();
            console.log('Transaction response:', data);
        } catch (error) {
            console.error('Error in sending money:', error);
        }
    };

    return (
        <div className="contracts-container">
            {filteredContracts.map((filteredContracts, index) => (
                <div key={index} className="contract-box" onClick={() => handleContractClick(filteredContracts)}>
                    <h3>Contract {index + 1}</h3>
                    <p>Loan Amount: RM {filteredContracts.loanAmount}.00</p>
                    <p>Interest Rate: {filteredContracts.interestRate}%</p>
                </div>
            ))}

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <h2>Contract Details</h2>
                        <p>Contract ID: {selectedContract.id}</p>
                        <p>Borrower Full Name: {selectedContract.borrowerName}</p>
                        <p>Loan Amount: RM {selectedContract.loanAmount}.00</p>
                        <p>Interest Rate: {selectedContract.interestRate}%</p>
                        <p>Potential Returns: +RM {Number((selectedContract.loanAmount * (1 + selectedContract.interestRate / 100)) - selectedContract.loanAmount).toFixed(2)}</p>
                        <p>Start Date: {selectedContract.startDate}</p>
                        <p>End Date: {selectedContract.endDate}</p>
                        <div className="modal-buttons">
                            <button onClick={() => setShowConfirmationModal(true)}>Send Money</button>
                                {showConfirmationModal && (
                                    <div className="modal">
                                        <div className="modal-content">
                                            <p>Are you sure you want to send the money? You will agree to the full amount if you selected 'Yes'.</p>
                                            <div className="modal-buttons">
                                                <button onClick={handleConfirmSendMoney}>Yes</button>
                                                <button onClick={() => setShowConfirmationModal(false)}>No</button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            <br />
                            <button onClick={closeModal}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default LenderActiveContractMarketplace;