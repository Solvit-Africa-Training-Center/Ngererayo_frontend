import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/landingPage/Home';
import RegisterForm from './components/authontication/RegisterForm'; 
import LoginForm from './components/authontication/LoginForm';
import ContactPage from './pages/landingPage/ContactPage';
import BuyerHomeDashboard from './pages/BuyerDashboard/HomePage'


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* landing page */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/contact" element={<ContactPage />} />



        <Route path="/buyerhome" element={<BuyerHomeDashboard />} />
        {/* <Route path="/product/:id" element={<ProductDetail product={someProduct} />} /> */}

      </Routes>
    </Router>
  );
};

export default App;
