import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function BorrowerActiveContract() {
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

    try {
      const response = await fetch('http://localhost:3000/api/contract/borrowerContract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contractData)
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
    <form onSubmit={handleSubmit}>
      {/* Form fields here */}
      <button type="submit">Create Contract</button>
    </form>
  );
}

export default BorrowerActiveContract;
