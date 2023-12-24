pragma solidity ^0.8.0;

contract CreditScoreContract {
    struct CreditScore {
        uint id;
        uint borrowerId;
        uint score;
        uint scoreDate;
    }

    CreditScore[] public creditScores;

    function createCreditScore(uint _borrowerId, uint _score, uint _scoreDate) public {
        creditScores.push(CreditScore(creditScores.length, _borrowerId, _score, _scoreDate));
    }

    function getAllCreditScores() public view returns (CreditScore[] memory) {
        return creditScores;
    }

    function getCreditScoresForBorrowerId(uint _borrowerId) public view returns (CreditScore[] memory) {
        uint scoreCount = 0;
        for (uint i = 0; i < creditScores.length; i++) {
            if (creditScores[i].borrowerId == _borrowerId) {
                scoreCount++;
            }
        }

        CreditScore[] memory borrowerScores = new CreditScore[](scoreCount);
        uint currentIndex = 0;
        for (uint i = 0; i < creditScores.length; i++) {
            if (creditScores[i].borrowerId == _borrowerId) {
                borrowerScores[currentIndex] = creditScores[i];
                currentIndex++;
            }
        }
        return borrowerScores;
    }
}
