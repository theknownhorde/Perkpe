import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Transfer from './pages/TransferPoints';
import Redeem from './pages/RedeemPoints';
import AddPoints from './pages/AddPoints';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/profile';
import Settings from './pages/Settings';
import AppNavbar from './components/Navbar';
import RedeemPoints from './pages/RedeemPoints';
import PaymentSuccess from './components/paymentSuccess';
import BlockchainView from './components/BlockchainView';

const App = () => {
    return (
        <Router>
            <AppNavbar />
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/transfer" element={<Transfer />} />
                <Route path="/redeem" element={<Redeem />} />
                <Route path="/add-points" element={<AddPoints />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/redeem-points" element={<RedeemPoints />} />
                <Route path="/payment-success" element={<PaymentSuccess />} />
                <Route path="/blockchain" element={<BlockchainView />} />
            </Routes>
        </Router>
    );
};

export default App;
