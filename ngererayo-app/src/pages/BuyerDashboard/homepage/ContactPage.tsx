// pages/ContactPage.tsx
import React from 'react';
import ContactHeader from '../../../components/landingpage/contact/ContactHeader';
import ContactMethodsSection from '../../../components/landingpage/contact/ContactMethodsSection';
import ContactForm from '../../../components/landingpage/contact/ContactForm';
import ContactAddress from '../../../components/landingpage/contact/contactAddress'


const ContactPage: React.FC = () => {
  return (
    <div>
      
       <div className='py-10'>
      <ContactHeader />
      <ContactMethodsSection />
      <ContactForm />
      <ContactAddress />
       </div>
      
     
    </div>
  );
};

export default ContactPage;
