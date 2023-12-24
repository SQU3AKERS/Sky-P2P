// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BorrowerContract {
    struct Contract {
        uint256 id;
        uint256 borrowerId; // Added field
        address borrower;
        uint256 loanAmount;
        uint256 interestRate;
        uint256 startDate;
        uint256 endDate;
        bool isActive;
    }

    Contract[] public contracts;

    modifier contractExists(uint _id) {
        require(_id < contracts.length, "Contract ID is out of bounds.");
        _;
    }

    modifier onlyBorrower(uint _id) {
        require(msg.sender == contracts[_id].borrower, "Only the borrower can perform this action.");
        _;
    }

    function createContract(uint _borrowerId, uint _loanAmount, uint _interestRate, uint _startDate) public {
        uint _endDate = _startDate + 30 days;
        contracts.push(Contract(contracts.length, _borrowerId, msg.sender, _loanAmount, _interestRate, _startDate, _endDate, true));
    }

    function updateContract(uint _id, uint _loanAmount, uint _interestRate) public contractExists(_id) onlyBorrower(_id) {
        Contract storage contractToUpdate = contracts[_id];
        contractToUpdate.loanAmount = _loanAmount;
        contractToUpdate.interestRate = _interestRate;
    }

    function listUserContracts(address _user) public view returns (uint256[] memory) {
        uint256[] memory userContractIds = new uint256[](contracts.length);
        uint currentIndex = 0;
        for (uint i = 0; i < contracts.length; i++) {
            if (contracts[i].borrower == _user) {
                userContractIds[currentIndex] = i;
                currentIndex++;
            }
        }
        return userContractIds;
    }

    function getContractDetails(uint _id) public view contractExists(_id) returns (Contract memory) {
        return contracts[_id];
    }

    function invalidateContract(uint _id) public contractExists(_id) onlyBorrower(_id) {
        contracts[_id].isActive = false;
    }
}
