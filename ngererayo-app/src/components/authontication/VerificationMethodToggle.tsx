import React from 'react';
import { VerificationMethod } from '../../type/verification';

interface VerificationMethodToggleProps {
  methods: VerificationMethod[];
  selectedMethod: 'sms' | 'email';
  onMethodChange: (method: 'sms' | 'email') => void;
}

const VerificationMethodToggle: React.FC<VerificationMethodToggleProps> = ({
  methods,
  selectedMethod,
  onMethodChange
}) => {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        Choose verification method:
      </label>
      <div className="flex gap-2">
        {methods.map((method) => (
          <button
            key={method.type}
            onClick={() => onMethodChange(method.type)}
            className={`flex-1 px-4 py-3 text-sm font-medium rounded-lg border transition-colors ${
              selectedMethod === method.type
                ? 'bg-green-500 text-white border-green-500'
                : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
            }`}
          >
            {method.display}
          </button>
        ))}
      </div>
    </div>
  );
};

export default VerificationMethodToggle;