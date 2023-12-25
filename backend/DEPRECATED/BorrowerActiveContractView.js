import React from 'react';
import { useLocation } from 'react-router-dom';

function BorrowerActiveContractView() {
  const location = useLocation();
  const contract = location.state.contract;

  // Calculate potential returns
  const potentialReturns = contract.loanAmount * (1 + contract.interestRate / 100);

  // Here you would fetch the user's credit score using the borrowerId from the contract
  // For this example, let's assume it's a static value
  const creditScore = 750; // Replace with actual credit score fetch logic

  return (
    <div>
      <h2>Contract Details</h2>
      <p>Block ID: {contract.id}</p>
      <p>Borrower ID: {contract.borrowerId}</p>
      <p>Loan Amount: {contract.loanAmount}</p>
      <p>Interest Rate: {contract.interestRate}%</p>
      <p>Potential Returns: {potentialReturns}</p>
      <p>Credit Score: {creditScore}</p>
      {/* Add more contract details as needed */}
    </div>
  );
}

export default BorrowerActiveContractView;
