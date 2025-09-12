// pages/LandingPage.tsx
import React from 'react';
import HotDealsSection from '../../components/landingpage/HotDealsSection';
import CategorySection from '../../components/landingpage/CategorySection';
import WeatherCard from '../../components/landingpage/WeatherCard';
import QuickActions from '../../components/landingpage/QuickActions';
import FarmerOfTheMonth from '../../components/landingpage//FarmerOfTheMonth';

const LandingPage: React.FC = () => {
  return (
    <div className="w-full">
      <div className=" grid grid-cols-[1fr_auto] gap-9 py-12 bg-white/70 px-15">
        {/* LEFT SIDEBAR */}
   
        {/* MAIN CONTENT */}
        <div className="">
          <HotDealsSection />
          <CategorySection />
        </div>
             <div className="">
          <WeatherCard />
          <QuickActions />
          <FarmerOfTheMonth />
        </div>

      </div>
    </div>
  );
};

export default LandingPage;
