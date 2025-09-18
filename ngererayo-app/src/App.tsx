import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';

// landing page components
import LandingPage from './pages/landingPage/Home';
import RegisterForm from './components/authontication/RegisterForm'; 
import LoginForm from './components/authontication/LoginForm';
import ContactPage from './pages/landingPage/ContactPage';
import BuyerHomeDashboard from './pages/BuyerDashboard/HomePage';
import ProductDetailPage from "./components/landingpage/ProductDetail";
import ProtectedRoute from "./components/authontication/ProtectedRoute";
// import of buyer dashboard
import BuyerMarketPlace from './pages/BuyerDashboard/marketplace/productList';
import ProductChat from './components/buyerdashboard/productchat/messaging'
import ShoppingCart from './pages/BuyerDashboard/ShoppingCart'
import PaymentPage from './pages/BuyerDashboard/PaymentPage'
import OrderSuccess from './pages/BuyerDashboard/OrderSuccess'
import VerifyAccount from './components/authontication/VerifyAccount';
import SellerApplicationForm from './pages/BuyerDashboard/sellerApplicationForm'
import MakeOrderForm from './pages/BuyerDashboard/cart/makeOrderForm'


// import of seller dashboard
import SellerHomeDashboard from './pages/SellerDashboard/SellerDashboard';
import SellerMarketPlace from './pages/SellerDashboard/sellerProductList';
import AddNewProduct from './pages/SellerDashboard/addProductPage';
import OrderOverview from './pages/BuyerDashboard/cart/OrderOverview';


const App: React.FC = () => {
  return (
    <CartProvider>
      <Router>
      <Routes>
        {/* landing page */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/verify-otp" element={<VerifyAccount />} />

        <Route path="/contact" element={<ContactPage />} />
        <Route path="/product/:productId" element={<ProductDetailPage />} />




{/* routes of buyer dashboard */}
        <Route
          path="/buyerhome"
          element={
            <ProtectedRoute>
              <BuyerHomeDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/buyer-marketplace" element={<BuyerMarketPlace />} />
       
        <Route path="/product/:productId/chat" element={<ProductChat />} />
        

        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/make_order" element={<MakeOrderForm />} />
        <Route path="/order-oveview" element={<OrderOverview />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/become-seller" element={<SellerApplicationForm />} />

        {/* <Route path="/product/:id" element={<ProductDetail product={someProduct} />} /> */}
    

      {/* seller dashboard */}

      <Route
          path="/seller-dashboard"
          element={
            <ProtectedRoute>
              <SellerHomeDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/seller-marketplace" element={<SellerMarketPlace />} />
        <Route path="/add-new-product" element={<AddNewProduct />} />
      </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
