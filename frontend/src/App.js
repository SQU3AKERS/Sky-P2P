import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Support from './components/Support';
import AboutUs from './components/AboutUs';
import HomePage from './components/HomePage';
import RegisterComponent from './components/RegisterComponent';
import LoginComponent from './components/LoginComponent';
import BorrowerMainpage from './components/borrower/BorrowerMainpage';
import BorrowerActiveContractCreate from './components/borrower/BorrowerActiveContractCreate';
import BorrowerActiveContractUser from './components/borrower/BorrowerActiveContractUser';
import BlockchainContractList from './components/BlockchainContractList';
import BlockchainTransactionList from './components/BlockchainTransactionList';
import BlockchainPaymentList from './components/BlockchainPaymentList';
import BlockchainCreditScoreList from './components/BlockchainCreditScoreList';
import LenderMainpage from './components/lender/LenderMainpage';
import LenderPortfolio from './components/lender/LenderPortfolio';
import LenderActiveContractMarketplace from './components/lender/LenderActiveContractMarketplace';
import UserUpdateProfile from './components/UserUpdateProfile';
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <Router>
        <div className="App">
          <Header />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/register" element={<RegisterComponent />} />
              <Route path="/login" element={<LoginComponent />} />
              <Route path="/support" element={<Support />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/borrower/BorrowerMainpage" element={<BorrowerMainpage />} />
              <Route path="/borrower/BorrowerActiveContractCreate" element={<BorrowerActiveContractCreate />} />
              <Route path="/borrower/BorrowerActiveContractUser" element={<BorrowerActiveContractUser />} />
              <Route path="/BlockchainContractList" element={<BlockchainContractList />} />
              <Route path="/BlockchainTransactionList" element={<BlockchainTransactionList />} />
              <Route path="/BlockchainPaymentList" element={<BlockchainPaymentList />} />
              <Route path="/BlockchainCreditScoreList" element={<BlockchainCreditScoreList />} />
              <Route path="/lender/LenderMainpage" element={<LenderMainpage />} />
              <Route path="/lender/LenderPortfolio" element={<LenderPortfolio />} />
              <Route path="/lender/LenderActiveContractMarketplace" element={<LenderActiveContractMarketplace />} />
              <Route path="/UserUpdateProfile" element={<UserUpdateProfile />} />
            </Routes>
          <Footer />
        </div>
    </Router>
  );
};

export default App;
