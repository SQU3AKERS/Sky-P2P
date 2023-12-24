// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TransactionContract {
    struct Transaction {
        uint id;
        uint lenderId;
        uint borrowerId;
        uint amount;
        uint transactionDate;
    }

    Transaction[] public transactions;

    function createTransaction(uint _lenderId, uint _borrowerId, uint _amount, uint _transactionDate) public {
        transactions.push(Transaction(transactions.length, _lenderId, _borrowerId, _amount, _transactionDate));
    }

    function getAllTransactions() public view returns (Transaction[] memory) {
        return transactions;
    }

    function getTransactionsForUser(uint _userId) public view returns (Transaction[] memory) {
        uint transactionCount = 0;
        for (uint i = 0; i < transactions.length; i++) {
            if (transactions[i].lenderId == _userId || transactions[i].borrowerId == _userId) {
                transactionCount++;
            }
        }

        Transaction[] memory userTransactions = new Transaction[](transactionCount);
        uint currentIndex = 0;
        for (uint i = 0; i < transactions.length; i++) {
            if (transactions[i].lenderId == _userId || transactions[i].borrowerId == _userId) {
                userTransactions[currentIndex] = transactions[i];
                currentIndex++;
            }
        }
        return userTransactions;
    }
}
