-- Users Table
CREATE TABLE Users (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    FirstName VARCHAR(255) NOT NULL,
    LastName VARCHAR(255) NOT NULL,
    PasswordHash VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL UNIQUE,
    DateOfBirth DATE NOT NULL,
    Nationality VARCHAR(255) NOT NULL,
    UserType ENUM('Lender', 'Borrower') NOT NULL,
    BlockchainAddress VARCHAR(255) NOT NULL
);

-- BorrowerContract Table
CREATE TABLE BorrowerContract (
    ContractID INT AUTO_INCREMENT PRIMARY KEY,
    BorrowerID INT NOT NULL,
    LoanAmount DECIMAL(19,4) NOT NULL,
    InterestRate DECIMAL(5,2) NOT NULL,
    StartDate DATE NOT NULL,
    EndDate DATE NOT NULL,
    Status ENUM('Available', 'Accepted', 'Active', 'Completed', 'Defaulted') NOT NULL,
    BlockchainRecordID VARCHAR(255),
    FOREIGN KEY (BorrowerID) REFERENCES Users(UserID)
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
