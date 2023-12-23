// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BorrowerContract {
    struct Contract {
        uint256 id;
        address borrower;
        uint256 loanAmount;
        uint256 interestRate;
        uint256 startDate;
        uint256 endDate;
        // Add other necessary attributes
    }

    Contract[] public contracts;

    function createContract(uint _loanAmount, uint _interestRate, uint _startDate) public {
        uint _endDate = _startDate + 30 days;
        contracts.push(Contract(contracts.length, msg.sender, _loanAmount, _interestRate, _startDate, _endDate, true));
    }

    function updateContract(uint _id, uint _loanAmount, uint _interestRate) public {
        Contract storage contractToUpdate = contracts[_id];
        require(msg.sender == contractToUpdate.borrower, "Only the borrower can update the contract.");
        contractToUpdate.loanAmount = _loanAmount;
        contractToUpdate.interestRate = _interestRate;
    }

    function listUserContracts(address _user) public view returns (Contract[] memory) {
        uint contractCount;
        for (uint i = 0; i < contracts.length; i++) {
            if(contracts[i].borrower == _user) {
                contractCount++;
            }
        }

        Contract[] memory userContracts = new Contract[](contractCount);
        uint currentIndex;
        for (uint i = 0; i < contracts.length; i++) {
            if(contracts[i].borrower == _user) {
                userContracts[currentIndex] = contracts[i];
                currentIndex++;
            }
        }

        return userContracts;
    }

    function getContractDetails(uint _id) public view returns (Contract memory) {
        require(_id < contracts.length, "Contract does not exist.");
        return contracts[_id];
    }

    function invalidateContract(uint _id) public {
        Contract storage contractToInvalidate = contracts[_id];
        require(msg.sender == contractToInvalidate.borrower, "Only the borrower can invalidate the contract.");
        contractToInvalidate.isActive = false;
    }
}
