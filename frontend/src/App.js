import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import RegisterComponent from './components/RegisterComponent';
import LoginComponent from './components/LoginComponent';
import BorrowerActiveContractCreate from './components/borrower/BorrowerActiveContractCreate';
import BorrowerActiveContractUser from './components/borrower/BorrowerActiveContractUser';
import BlockchainContractList from './components/BlockchainContractList';
import LenderActiveContractMarketplace from './components/lender/LenderActiveContractMarketplace';
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
              <Route path="/borrower/BorrowerActiveContractCreate" element={<BorrowerActiveContractCreate />} />
              <Route path="/borrower/BorrowerActiveContractUser" element={<BorrowerActiveContractUser />} />
              <Route path="/BlockchainContractList" element={<BlockchainContractList />} />
              <Route path="/lender/LenderActiveContractMarketplace" element={<LenderActiveContractMarketplace />} />
            </Routes>
          <Footer />
        </div>
    </Router>
  );
};

export default App;
