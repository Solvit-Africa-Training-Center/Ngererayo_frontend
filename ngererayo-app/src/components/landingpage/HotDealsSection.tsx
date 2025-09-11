// components/HotDealsSection.tsx
import React from 'react';
import DealCard from './DealCard';

const HotDealsSection: React.FC = () => {
  return (
    <section className="bg-orange-50 border border-orange-200 p-6 rounded-xl mb-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-red-600">
          🔥 Hot Deals Today
        </h2>
        <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium">
          SPECIAL PRICES
        </span>
      </div>

      <div className="flex flex-wrap gap-4">
        <DealCard
          productName="Fresh Avocados"
          price={350}
          unit="Kg"
          discount={20}
          description="Limited time offer · Until 10PM"
          onBuy={() => alert('Buying Fresh Avocados')}
        />

        <DealCard
          productName="Premium Rice"
          price={1200}
          unit="Kg"
          discount={15}
          description="Buy now · Deal ends soon"
          onBuy={() => alert('Buying Premium Rice')}
        />
      </div>
    </section>
  );
};

export default HotDealsSection;
