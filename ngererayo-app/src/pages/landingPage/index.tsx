import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '@/pages/landingPage/Home';
import Products from '@/pages/landingPage/Products';
import Farmers from '@/pages/landingPage/Farmers';
import Categories from '@/pages/landingPage/Categories';

const App: React.FC = () => {
  return (
    
      <div className="App">
  
        <Home />
        <Products />
        <Farmers />
        <Categories />
      </div>
 
  );
};

export default App;