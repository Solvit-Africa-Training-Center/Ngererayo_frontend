import React from 'react';
import DealCard from './DealCard';
import { useTranslation } from 'react-i18next';

const HotDealsSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-orange-50 border border-orange-200 p-6 rounded-xl mb-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-red-600">
           {t('hotDealsToday')}
        </h2>
        <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium">
          {t('specialPrices')}
        </span>
      </div>

      <div className="flex flex-wrap gap-4">
        <DealCard
          productName={t('freshAvocados')}
          price={350}
          unit={t('kg')}
          discount={20}
          description={t('limitedTimeOffer')}
          onBuy={() => alert(t('buying', { product: t('freshAvocados') }))}
        />

        <DealCard
          productName={t('premiumRice')}
          price={1200}
          unit={t('kg')}
          discount={15}
          description={t('dealEndsSoon')}
          onBuy={() => alert(t('buying', { product: t('premiumRice') }))}
        />
      </div>
    </section>
  );
};

export default HotDealsSection;
