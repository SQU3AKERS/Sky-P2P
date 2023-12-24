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

    // Define a new struct to hold all relevant information for the front end
    struct DetailedContract {
        uint256 id;
        uint256 borrowerId;
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

    function listAllContractsForBorrowerId(uint256 _borrowerId) public view returns (DetailedContract[] memory) {
        uint256[] memory contractIndices = listUserContracts(_borrowerId);
        DetailedContract[] memory detailedContracts = new DetailedContract[](contractIndices.length);

        for (uint256 i = 0; i < contractIndices.length; i++) {
            uint256 contractIndex = contractIndices[i];
            Contract storage contractItem = contracts[contractIndex];
            detailedContracts[i] = DetailedContract(
                contractItem.id,
                contractItem.borrowerId,
                contractItem.borrower,
                contractItem.loanAmount,
                contractItem.interestRate,
                contractItem.startDate,
                contractItem.endDate,
                contractItem.isActive
            );
        }

        return detailedContracts;
    }

    function listUserContracts(uint256 _borrowerId) internal view returns (uint256[] memory) {
        uint256 contractCount = 0;
        for (uint256 i = 0; i < contracts.length; i++) {
            if (contracts[i].borrowerId == _borrowerId) {
                contractCount++;
            }
        }

        uint256[] memory contractIndices = new uint256[](contractCount);
        uint256 currentIndex = 0;
        for (uint256 i = 0; i < contracts.length; i++) {
            if (contracts[i].borrowerId == _borrowerId) {
                contractIndices[currentIndex] = i;
                currentIndex++;
            }
        }
        return contractIndices;
    }

    function getContractDetails(uint _id) public view contractExists(_id) returns (Contract memory) {
        return contracts[_id];
    }

    function invalidateContract(uint _id) public contractExists(_id) onlyBorrower(_id) {
        contracts[_id].isActive = false;
    }
}
