import React from 'react';

interface MobileNumberInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const validateRwandanPhone = (phone: string): boolean => {
  const rwandaPhoneRegex = /^(\+250|0)(7[0-9]{8})$/;
  return rwandaPhoneRegex.test(phone.replace(/\s/g, ''));
};

const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.startsWith('250')) {
    return `+${cleaned}`;
  } else if (cleaned.startsWith('07')) {
    return `+25${cleaned}`;
  }
  return phone;
};

const MobileNumberInput: React.FC<MobileNumberInputProps> = ({ value, onChange, error }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    onChange(formatted);
  };

  const isValid = validateRwandanPhone(value);

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Mobile Number
      </label>
      <input
        type="tel"
        value={value}
        onChange={handleChange}
        placeholder="+250 7XX XXX XXX"
        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
          error ? 'border-red-500' : value && isValid ? 'border-green-500' : 'border-gray-300'
        }`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      {value && !isValid && !error && (
        <p className="text-red-500 text-sm mt-1">Please enter a valid Rwandan phone number</p>
      )}
    </div>
  );
};

export { validateRwandanPhone };
export default MobileNumberInput;