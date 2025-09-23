import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TestimonialCard from '../../../components/landingpage/TestimonialCards';
import ConsultantList from "../../../components/landingpage/ConsultantList";
import Categories from '../../landingPage/Categories'

import { api } from '../../../utilis/api';


import { 
  APP_NAME, 
  TESTIMONIALS 
} from '../../../utilis/constraints';
import ProductsSection from '../marketplace/productList';
import StatsSection from '../../../pages/landingPage/StatsSection';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [userRoles, setUserRoles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    api
      .get('/accounts/current-user/', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const roles = res.data.role?.map((r: any) => r.name) || [];
        setUserRoles(roles);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const hasFarmerRole = userRoles.includes('farmer');
  const hasConsultantRole = userRoles.includes('consultant');

  return (
    <div className="min-h-screen bg-gray-50">
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

      {!loading && (
             <div className="flex gap-4 mt-12">
  {hasFarmerRole ? (
    <span className="bg-yellow-200 text-yellow-800 px-6 py-3 rounded-lg font-bold cursor-not-allowed">
      You are already a seller
    </span>
  ) : (
    <button
      onClick={() => navigate('/buyer/become-seller')}
      className="bg-yellow-400 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-100 hover:text-black cursor-pointer transition"
    >
      Become a seller →
    </button>
  )}

  {hasConsultantRole ? (
    <span className="bg-green-200 text-green-800 px-6 py-3 rounded-lg font-bold cursor-not-allowed">
      You are already a consultant
    </span>
  ) : (
    <button
      onClick={() => navigate('/buyer/become-consultant')}
      className="bg-green-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-100 hover:text-black cursor-pointer transition"
    >
      Become consultant
    </button>
  )}
</div>

            )}
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
    {/* Consultants Section */}
    <section id='consultant' className="py-12 bg-white/70">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Meet Our Consultants</h2>
        <ConsultantList />
      </div>
    </section>
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
    
   
    </div>
  );
};

export default Home;