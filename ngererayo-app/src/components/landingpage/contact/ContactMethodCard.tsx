// components/ContactMethodCard.tsx
import React from 'react';

type ContactMethodCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  detail: string;
  note: string;
};

const ContactMethodCard: React.FC<ContactMethodCardProps> = ({
  icon,
  title,
  description,
  detail,
  note,
}) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md text-center flex flex-col items-center space-y-2">
      <div className="text-green-600 text-3xl">{icon}</div>
      <h4 className="text-lg font-semibold">{title}</h4>
      <p className="text-sm text-gray-600">{description}</p>
      <p className="text-sm text-gray-800 font-medium">{detail}</p>
      <p className="text-xs text-gray-500 italic">{note}</p>
    </div>
  );
};

export default ContactMethodCard;
