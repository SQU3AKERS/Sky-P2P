import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SessionContext } from '../../contexts/SessionContext';
import getEthereumAddress from '../../utils/getEthereumAddress';

function BorrowerActiveContractCreate() {
  const session = useContext(SessionContext);
  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];
  console.log('SessionContext in Create:', session);

  const [contractData, setContractData] = useState({ startDate: today });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setContractData({...contractData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!contractData.loanAmount || contractData.loanAmount <= 0) {
        alert('Please enter a valid loan amount.');
        return;
    }
    if (!contractData.interestRate || contractData.interestRate <= 0) {
    alert('Please enter a valid interest rate.');
    return;
    }
    
    if (!contractData.startDate) {
    alert('Please enter a start date.');
    return;
    }
    
    const ethereumAddress = await getEthereumAddress();
    const sessionUserId = session.sessionData.userId;
    console.log('User ID found:', sessionUserId);
    try {
      const response = await fetch('http://localhost:3001/api/contract/createContract', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...contractData, borrowerId: sessionUserId, senderAddress: ethereumAddress })
      });

      if (response.ok) {
        navigate('/borrower/BorrowerMainpage');
        alert('Contract created successfully!');
        } else {
          const result = await response.json();
          alert(result.message); // Display the error message from the server
      }
    } catch (error) {
      console.error('Contract creation failed:', error);
      alert('An error occurred while creating the contract.', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="borrower-contract-form">
    <div className="form-group">
        <label htmlFor="loanAmount">Loan Amount in MYR</label>
        <input type="number" id="loanAmount" name="loanAmount" required onChange={handleChange} />
    </div>
    <div className="form-group">
        <label htmlFor="interestRate">Interest Rate (%)</label>
        <input type="number" id="interestRate" name="interestRate" step="0.01" required onChange={handleChange} />
    </div>
    <div className="form-group">
        <label htmlFor="startDate">Start Date</label>
        <input 
          type="date" 
          id="startDate" 
          name="startDate" 
          required 
          onChange={handleChange} 
          value={contractData.startDate} // Set the value to today's date
          disabled // Disable the input
        />
    </div>
    <button type="submit" className="submit-btn">Create Contract</button>
    </form>
  );
}

export default BorrowerActiveContractCreate;
