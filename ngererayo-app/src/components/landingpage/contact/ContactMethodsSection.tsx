// components/ContactMethodsSection.tsx
import React from 'react';
import ContactMethodCard from './ContactMethodCard';
import { MdEmail, MdPhone, MdChat } from 'react-icons/md';

const ContactMethodsSection: React.FC = () => {
  const methods = [
    {
      icon: <MdEmail />,
      title: 'Email support',
      description: 'Send us an email anytime.',
      detail: 'info@ngererayo.rw',
      note: 'Response in 24hrs',
    },
    {
      icon: <MdPhone />,
      title: 'Phone call',
      description: 'Speak to our Team',
      detail: '0789568624',
      note: 'Monday–Friday',
    },
    {
      icon: <MdChat />,
      title: 'Live Chat',
      description: 'Chat with us in real time',
      detail: 'Available on website',
      note: 'Everyday',
    },
  ];

  return (
    <section className="py-12 bg-white">
      <h2 className="text-center text-2xl font-bold text-gray-800 mb-2">
        How can we help you?
      </h2>
      <p className="text-center text-gray-500 mb-8">
        Choose the best way to reach us based on your needs
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {methods.map((method, idx) => (
          <ContactMethodCard key={idx} {...method} />
        ))}
      </div>
    </section>
  );
};

export default ContactMethodsSection;
