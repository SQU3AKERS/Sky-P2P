// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PaymentContract {
    struct Payment {
        uint id;
        uint contractBlockId;
        uint borrowerId;
        uint paymentAmount;
        uint paymentDate;
    }

    Payment[] public payments;

    function createPayment(uint _contractBlockId, uint _borrowerId, uint _paymentAmount, uint _paymentDate) public {
        payments.push(Payment(payments.length, _contractBlockId, _borrowerId, _paymentAmount, _paymentDate));
    }

    function getAllPayments() public view returns (Payment[] memory) {
        return payments;
    }

    function getPaymentsForBorrowerId(uint _borrowerId) public view returns (Payment[] memory) {
        uint paymentCount = 0;
        for (uint i = 0; i < payments.length; i++) {
            if (payments[i].borrowerId == _borrowerId) {
                paymentCount++;
            }
        }

        Payment[] memory borrowerPayments = new Payment[](paymentCount);
        uint currentIndex = 0;
        for (uint i = 0; i < payments.length; i++) {
            if (payments[i].borrowerId == _borrowerId) {
                borrowerPayments[currentIndex] = payments[i];
                currentIndex++;
            }
        }
        return borrowerPayments;
    }
}
