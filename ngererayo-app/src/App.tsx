import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// landing page components
import LandingPage from './pages/landingPage/Home';
import RegisterForm from './components/authontication/RegisterForm'; 
import LoginForm from './components/authontication/LoginForm';
import ContactPage from './pages/landingPage/ContactPage';
import VerifyAccount from './components/authontication/VerifyAccount';

import ProductDetailPage from "./components/landingpage/ProductDetail";
import ProtectedRoute from "./components/authontication/ProtectedRoute";

// import of buyer dashboard
import BuyerDashboardLayout from './Layouts/BuyerDashboardLayout';
import BuyerMarketPlace from './pages/BuyerDashboard/marketplace/productList';
import ProductDetails from "./components/buyerdashboard/productList/ProductDetail";
import ProductChat from './components/buyerdashboard/productchat/messaging'
import ShoppingCart from './pages/BuyerDashboard/cart/ShoppingCart'
import PaymentPage from './pages/BuyerDashboard/cart/PaymentPage'
import BuyerHomePage from './pages/BuyerDashboard/homepage/HomePage';
import SellerApplicationForm from './pages/BuyerDashboard/sellerApplicationForm';
import MakeOrderForm from './pages/BuyerDashboard/cart/makeOrderForm';
import ConsultantApplicationForm from './pages/BuyerDashboard/consultantApplicationForm'
import UserProfile from './pages/BuyerDashboard/profile/Mainprofile';
import ContactUsPage from './pages/BuyerDashboard/homepage/ContactPage';

// import of seller dashboard
import SellerDashboardLayout from './Layouts/SellerLayouts';
import SellerProductOrders from './pages/SellerDashboard/OrdersPlacedPage';
import SellerProductList from './pages/SellerDashboard/sellerProductList';
import OrderOverview from './pages/BuyerDashboard/cart/OrderOverview';
import SellerOverview from './pages/SellerDashboard/SellerOverview';
import ProductList from './components/sellerDashboard/MessageProductList';
import MessagePage from './pages/SellerDashboard/MessagePage';
import Consultants from './pages/BuyerDashboard/consultants/ConsultantPage';
import ProductDiscountManagement from './pages/SellerDashboard/DiscountManagementPage';

//  import of consultant dashboard 
import ConsultantDashboardLayout from './Layouts/ConsultantDashboardLayout';
import ConsultantPostList  from './pages/consultDashboard/PostsListPage';
import Consultantoverview from './pages/consultDashboard/ConsultantOverview';

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




    {/* Buyer Dashboard Layout with nested routes */}
     <Route
       path="/buyer"
       element={
         <ProtectedRoute>
           <BuyerDashboardLayout />
         </ProtectedRoute>
       }
     >
       <Route index element={<BuyerHomePage />} />
       <Route path="home" element={<BuyerHomePage />} />
       <Route path="marketplace" element={<BuyerMarketPlace />} />
       <Route path="product/:productId" element={<ProductDetails />} />
       <Route path="contact" element={<ContactUsPage />} />

       <Route path="product/:productId/chat" element={<ProductChat />} />
       <Route path="cart" element={<ShoppingCart />} />
       <Route path="make-order" element={<MakeOrderForm />} />
       <Route path="order-overview" element={<OrderOverview />} />
       <Route path="payment" element={<PaymentPage />} />
       <Route path="become-seller" element={<SellerApplicationForm />} />
       <Route path="consultant" element ={<Consultants />} />
       <Route path="become-consultant" element={<ConsultantApplicationForm />} />
       <Route path="user-profile" element={<UserProfile />} />
     </Route>


    

        {/* Seller Dashboard Layout with nested routes */}
        <Route path="/seller-dashboard" element={<SellerDashboardLayout />}>
         <Route index element={<SellerOverview />} /> 

          <Route path="overview" element={<SellerOverview />} />
          <Route path="productslist" element={<SellerProductList />} />
          <Route path="orders" element={<SellerProductOrders />} />
         <Route path="messaging" element={<ProductList />} />
         <Route path="messaging/:productId" element={<MessagePage />} />

         <Route path="discount" element={<ProductDiscountManagement />} />
        </Route>
      

       {/* consultants Dashboard Layout with nested routes */}
        <Route path="/consultant-board" element={<ConsultantDashboardLayout />}>
         <Route index element={<Consultantoverview />} /> 

        <Route path="consultantoverview" element={<Consultantoverview />} />
        <Route path="postlist" element={<ConsultantPostList />} />
      
        </Route>


      </Routes>
      </Router>
       <ToastContainer position="top-right" autoClose={5000} />
    </CartProvider>
  );
};

export default App;
