# Sky-P2P Lending Platform
## Introduction
Sky-P2P is an innovative Peer-to-Peer (P2P) lending platform that integrates a credit scoring system on a blockchain network. This platform aims to revolutionize the way lending and borrowing are conducted by leveraging the security, transparency, and efficiency of blockchain technology. This project is also developed for my final year project as a proof of concept. Do not use this project for any commercial purposes as the project is solely a proof of concept without much security considerations.

## Features
+ **User Registration and Authentication**: Users can register as either lenders or borrowers, providing essential information that is securely stored in the system.
+ **Database Integration**: A robust MySQL database is used for storing user data and transaction records.
+ **Blockchain Integration**: Each transaction is recorded on a blockchain, ensuring transparency and security.
+ **Credit Scoring System**: A unique credit scoring algorithm assesses the creditworthiness of borrowers.
+ **Loan Contracts Management**: Borrowers can create loan requests, and lenders can view and fund these requests.

## Technologies Used
+ **Frontend**: React.js for a dynamic and responsive user interface.
+ **Backend**: Node.js with Express.js for efficient server-side operations.
+ **Database**: MySQL for data storage and management.
+ **Blockchain**: Integration with a blockchain network for secure and transparent transactions.

## Getting Started
### Prerequisites
+ [Node.js](https://nodejs.org/en)
+ [MySQL](https://dev.mysql.com/downloads/mysql/)
+ [Truffle](https://npmjs.com/package/truffle)
+ [Ganache](https://trufflesuite.com/ganache/)

### Installation
1. Clone the repository:
```
git clone https://github.com/SQU3AKERS/Sky-P2P.git
```

2. Install dependencies for both frontend and backend:
```
npm install
```

3. Set up the MySQL database:
+ Create the database and tables using the SQL scripts provided.
+ Modify backend/config/database.js with your database credentials.

## Running the application
1. Start both servers:
```
npm start
```

2. Access the application at http://localhost:3000.
