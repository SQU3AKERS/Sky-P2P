// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BorrowerContract {
    struct Contract {
        uint256 id;
        uint256 borrowerId;
        address borrower;
        uint256 loanAmount;
        uint256 interestRate;
        uint256 startDate;
        uint256 endDate;
        bytes32 blockHash;
    }


    Contract[] public contracts;

    modifier contractExists(uint _id) {
        require(_id < contracts.length, "Contract ID is out of bounds.");
        _;
    }

    function createContract(uint _borrowerId, uint _loanAmount, uint _interestRate, uint _startDate) public {
        uint _endDate = _startDate + 30 days;
        bytes32 hashOfRecentBlock = blockhash(block.number - 1);
        contracts.push(Contract(contracts.length, _borrowerId, msg.sender, _loanAmount, _interestRate, _startDate, _endDate, hashOfRecentBlock));
    }

    function listAllContractsForBorrowerId(uint256 _borrowerId) public view returns (Contract[] memory) {
        uint256[] memory contractIndices = listUserContracts(_borrowerId);
        Contract[] memory detailedContracts = new Contract[](contractIndices.length);

        for (uint256 i = 0; i < contractIndices.length; i++) {
            detailedContracts[i] = contracts[contractIndices[i]];
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

    // Method to list all contracts in the system
    function getAllContracts() public view returns (Contract[] memory) {
        return contracts;
    }
}
