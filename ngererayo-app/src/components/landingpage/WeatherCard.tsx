// components/WeatherCard.tsx
import React from 'react';
import { WiDayCloudy, WiRaindrop, WiStrongWind } from 'react-icons/wi';

const WeatherCard: React.FC = () => {
  return (
    <div className="bg-[var(--weather-division-bg)] rounded-xl shadow-md p-4 mb-4 border border-[var(--weather-division-border)]">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-500">Current Weather</p>
          <h3 className="text-xl font-bold">24°C</h3>
          <p className="text-sm text-gray-600">Partly cloudy</p>
        </div>
        <WiDayCloudy className="text-4xl text-yellow-500" />
      </div>

      <div className="mt-4 space-y-1 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <WiStrongWind /> <span>12km/h Wind</span>
        </div>
        <div className="flex items-center gap-2">
          <WiRaindrop /> <span>55% Humidity</span>
        </div>
      </div>

      <div className="mt-3 bg-blue-50 p-2 rounded text-xs text-blue-800">
         <strong>Farming Tip:</strong> Ideal for planting vegetables today!
      </div>
    </div>
  );
};

export default WeatherCard;
