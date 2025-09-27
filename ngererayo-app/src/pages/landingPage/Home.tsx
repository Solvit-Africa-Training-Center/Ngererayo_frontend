import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Header from '../../components/landingpage/Header';
import TestimonialCard from '../../components/landingpage/TestimonialCards';
import ConsultantList from "../../components/landingpage/ConsultantList";
import Categories from '../landingPage/Categories';
import Footer from '../../components/landingpage/Footer';
import ProductsSection from './Products';
import StatsSection from './StatsSection';

import { APP_NAME, TESTIMONIALS } from '../../utilis/constraints';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center text-white py-25"
        style={{ backgroundImage: `url('/hero.jpg')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-green-700 to-yellow-800 opacity-80"></div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t('welcomeTo')} <br />
              <span className="text-amber-400">{APP_NAME}</span>
            </h1>
            <p className="text-lg mb-8 font-bold">{t('rwandaDigitalMarketplace')}</p>
            <p>{t('connectingFarmersBuyers')}</p>
            <p>{t('connectWithNearbyFarmers')}</p>

            <div className="flex gap-4 mt-12">
              <button
                onClick={() => navigate('/register')}
                className="bg-yellow-400 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-100 hover:text-black cursor-pointer transition"
              >
                {t('signUpNow')} →
              </button>
              <button
                onClick={() => navigate('/login')}
                className="bg-green-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-100 hover:text-black transition cursor-pointer"
              >
                {t('login')}
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
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">{t('categories')}</h2>
          <Categories />
        </div>

        {/* Featured Products */}
        <div id='marketplace' className="py-12 bg-white/70">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">{t('marketplace')}</h2>
          <ProductsSection />
        </div>

        {/* Consultants Section */}
        <section id='consultant' className="py-12 bg-white/70">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
              {t('meetOurConsultants')}
            </h2>
            <ConsultantList />
          </div>
        </section>

        {/* Testimonials */}
        <div id='community' className="py-12 bg-white/70">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
              {t('whatOurCommunitySays')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {TESTIMONIALS.map(testimonial => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
