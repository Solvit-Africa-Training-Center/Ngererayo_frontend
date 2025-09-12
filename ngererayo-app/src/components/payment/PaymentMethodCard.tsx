import React from 'react';
import { Smartphone, Building2, Banknote } from 'lucide-react';
import { PaymentMethod } from '../../type/payment';

interface PaymentMethodCardProps {
  method: PaymentMethod;
  selected: boolean;
  onSelect: (id: PaymentMethod['id']) => void;
}

const iconMap = {
  smartphone: Smartphone,
  'building-2': Building2,
  banknote: Banknote,
};

const PaymentMethodCard: React.FC<PaymentMethodCardProps> = ({ method, selected, onSelect }) => {
  const IconComponent = iconMap[method.icon as keyof typeof iconMap];

  return (
    <div
      onClick={() => onSelect(method.id)}
      className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
        selected ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      <div className="flex items-center gap-3">
        <input
          type="radio"
          checked={selected}
          onChange={() => onSelect(method.id)}
          className="text-green-600"
        />
        <IconComponent size={24} className={selected ? 'text-green-600' : 'text-gray-600'} />
        <div>
          <h3 className="font-medium">{method.name}</h3>
          <p className="text-sm text-gray-500">{method.description}</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodCard;