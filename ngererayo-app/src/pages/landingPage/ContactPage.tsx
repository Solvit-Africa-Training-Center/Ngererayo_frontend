// pages/ContactPage.tsx
import React from 'react';
import ContactHeader from '../../components/landingpage/contact/ContactHeader';
import ContactMethodsSection from '../../components/landingpage/contact/ContactMethodsSection';
import ContactForm from '../../components/landingpage/contact/ContactForm';

const ContactPage: React.FC = () => {
  return (
    <div>
      <ContactHeader />
      <ContactMethodsSection />
      <ContactForm />
    </div>
  );
};

export default ContactPage;
