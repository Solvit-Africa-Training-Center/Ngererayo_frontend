import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import LandingPage from './pages/landingPage/Home';
import RegisterForm from './components/authontication/RegisterForm'; 
import LoginForm from './components/authontication/LoginForm';
import ContactPage from './pages/landingPage/ContactPage';
import BuyerHomeDashboard from './pages/BuyerDashboard/HomePage';
import ProductDetailPage from "./components/landingpage/ProductDetail";
import MessagingPage from './components/messaging/MessagingPage';
import OTPVerificationPage from './components/authontication/OTPVerificationPage';
import ShoppingCart from './pages/BuyerDashboard/ShoppingCart';
import PaymentPage from './pages/BuyerDashboard/PaymentPage';
import OrderSuccess from './pages/BuyerDashboard/OrderSuccess';


const App: React.FC = () => {
  return (
    <CartProvider>
      <Router>
      <Routes>
        {/* landing page */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/contact" element={<ContactPage />} />



        <Route path="/buyerhome" element={<BuyerHomeDashboard />} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        
        {/* Messaging Routes */}
        <Route path="/messages" element={<MessagingPage />} />
        <Route path="/messages/:chatId" element={<MessagingPage />} />
        <Route path="/messages/product/:productId/seller/:sellerId" element={<MessagingPage />} />
        
        {/* Verification Route */}
        <Route path="/verify-account" element={<OTPVerificationPage />} />

      </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
