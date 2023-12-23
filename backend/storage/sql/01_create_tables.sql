-- Users Table
CREATE TABLE Users (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    FirstName VARCHAR(255) NOT NULL,
    LastName VARCHAR(255) NOT NULL,
    PasswordHash VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL UNIQUE,
    DateOfBirth DATE NOT NULL,
    Nationality VARCHAR(255) NOT NULL,
    UserType ENUM('Lender', 'Borrower') NOT NULL
);

-- LenderPortfolio Table
CREATE TABLE LenderPortfolio (
    PortfolioID INT AUTO_INCREMENT PRIMARY KEY,
    LenderID INT NOT NULL,
    ContractID INT NOT NULL,
    InvestmentAmount DECIMAL(19,4) NOT NULL,
    InvestmentDate DATE NOT NULL,
    Status ENUM('Active', 'Earning', 'Completed', 'Defaulted') NOT NULL,
    FOREIGN KEY (LenderID) REFERENCES Users(UserID),
    FOREIGN KEY (ContractID) REFERENCES BorrowerContract(ContractID)
);

-- Payments Table
CREATE TABLE Payments (
    PaymentID INT AUTO_INCREMENT PRIMARY KEY,
    ContractID INT NOT NULL,
    PayerID INT NOT NULL,
    PaymentAmount DECIMAL(19,4) NOT NULL,
    PaymentDate DATE NOT NULL,
    PaymentStatus ENUM('Pending', 'Completed', 'Late') NOT NULL,
    BlockchainRecordID VARCHAR(255),
    FOREIGN KEY (ContractID) REFERENCES BorrowerContract(ContractID),
    FOREIGN KEY (PayerID) REFERENCES Users(UserID)
);

CREATE TABLE RewardsStore (
    ItemID INT AUTO_INCREMENT PRIMARY KEY,
    ItemName VARCHAR(255) NOT NULL,
    ItemDescription TEXT,
    PointsCost INT NOT NULL
);

CREATE TABLE RewardsOrder (
    OrderID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT NOT NULL,
    ItemID INT NOT NULL,
    OrderDate DATE NOT NULL,
    Status ENUM('Pending', 'Completed') NOT NULL,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (ItemID) REFERENCES RewardsStore(ItemID)
);

-- RewardsPoints Table
CREATE TABLE RewardsPoints (
    RewardsID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT NOT NULL,
    Points INT NOT NULL,
    AcquiredDate DATE NOT NULL,
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

-- The below are Blockchain structure and attributes that are part of the Database + Blockchain hybrid system
-- Transaction Blocks:
-- BlockID
-- PreviousHash
-- Timestamp
-- Nonce
-- Transactions (containing TransactionID, FromUserID, ToUserID, Amount, TransactionDate, Status)
-- Hash

-- Credit Score Blocks:
-- BlockID
-- PreviousHash
-- Timestamp
-- Nonce
-- CreditScores (containing UserID, CreditScore, ScoreDate)
-- Hash

-- Borrower Contract Blocks:
-- BlockID
-- PreviousHash
-- Timestamp
-- Nonce
-- Contracts (containing details like ContractID, BorrowerID, LoanAmount, InterestRate, StartDate, EndDate, Status)
-- Hash