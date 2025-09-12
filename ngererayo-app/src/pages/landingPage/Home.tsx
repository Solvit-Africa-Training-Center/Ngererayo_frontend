import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Star } from 'lucide-react';
import Header from '../../components/landingpage/Header';
import TestimonialCard from '../../components/landingpage/TestimonialCards';
import Categories from '../landingPage/Categories'
import StatCard from '../../components/landingpage/StatCard';

import { 
  APP_NAME, 
  STATS_DATA, 
  TESTIMONIALS 
} from '../../utilis/constraints';
import Footer from '../../components/landingpage/Footer';
import ProductsSection from './Products';
import StatsSection from './StatsSection';

const Home: React.FC = () => {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50">
     {/* header */}
     <Header />
      
    {/* Hero Section */}
<section
  className="relative bg-cover bg-center text-white py-25"
  style={{
    backgroundImage: `url('/hero.jpg')`,
  }}
>
  {/* Overlay */}
  <div className="absolute inset-0 bg-gradient-to-r from-green-700 to-yellow-800 opacity-80"></div>

  <div className="container mx-auto px-4 py-20 relative z-10">
    <div className="max-w-2xl">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        Welcome to <br />
        <span className="text-amber-400">{APP_NAME}</span>
      </h1>
      <p className="text-lg mb-8 font-bold">
        Rwanda’s Digital Agricultural Marketplace
      </p>
      <p>Connecting Farmers and Buyers Nationwide</p>
      <p>
        Connect with nearby farmers, buy fresh agricultural products, and
        support local rural economy.
      </p>

      <div className="flex gap-4 mt-12">
      <button
            onClick={() => navigate('/register')}
            className="bg-yellow-400 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-100 hover:text-black  cursor-pointer transition"
          >
            Sign up Now →
          </button>
        <button  onClick={() => navigate('/login')}
         className="bg-green-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-100 hover:text-black transition cursor-pointer">
          Login
        </button>
      </div>
    </div>
  </div>
</section>


      {/* Stats Section */}
      <section className="py-12 bg-white">
        <StatsSection />
      </section>

         {/* Background Wrapper */}
    <section 
      className="bg-cover bg-center bg-no-repeat" 
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
  

        {/* Categories Section */}
        
       <div id='categories'>
         <Categories />
    
       </div>
    
      {/* Featured Products */}
      <div id='marketplace' className="py-12 bg-white/70">
       <ProductsSection />
      </div>
    
      {/* Testimonials */}
      <div id='community' className="py-12 bg-white/70">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">What Our Community Says</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map(testimonial => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </div>
    </section>
    
    <Footer/>
    </div>
  );
};

export default Home;