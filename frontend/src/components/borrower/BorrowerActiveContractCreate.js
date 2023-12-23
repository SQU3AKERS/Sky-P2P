import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function BorrowerActiveContractCreate() {
  const [contractData, setContractData] = useState({ /* initial state */ });
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

    // Calculate end date as 30 days from the start date
    const startDate = new Date(contractData.startDate);
    const endDate = new Date(startDate.setDate(startDate.getDate() + 30));
    
    // Format endDate to YYYY-MM-DD before sending
    const formattedEndDate = endDate.toISOString().split('T')[0];
    
    const contractSubmission = {
        ...contractData,
        endDate: formattedEndDate,
    };

    try {
      const response = await fetch('http://localhost:3000/api/contract/borrowerContract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contractSubmission)
      });
      
      if (response.ok) {
        navigate('/mainpage'); // Redirect to mainpage
        alert('Contract created successfully!'); // Show success message
      }
    } catch (error) {
      console.error('Contract creation failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="borrower-contract-form">
    <div className="form-group">
        <label htmlFor="loanAmount">Loan Amount</label>
        <input type="number" id="loanAmount" name="loanAmount" required onChange={handleChange} />
    </div>
    <div className="form-group">
        <label htmlFor="interestRate">Interest Rate (%)</label>
        <input type="number" id="interestRate" name="interestRate" step="0.01" required onChange={handleChange} />
    </div>
    <div className="form-group">
        <label htmlFor="startDate">Start Date</label>
        <input type="date" id="startDate" name="startDate" required onChange={handleChange} />
    </div>
    <button type="submit" className="submit-btn">Create Contract</button>
    </form>
  );
}

export default BorrowerActiveContractCreate;
