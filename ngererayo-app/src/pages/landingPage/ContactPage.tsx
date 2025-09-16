// pages/ContactPage.tsx
import React from 'react';
import ContactHeader from '../../components/landingpage/contact/ContactHeader';
import ContactMethodsSection from '../../components/landingpage/contact/ContactMethodsSection';
import ContactForm from '../../components/landingpage/contact/ContactForm';
import ContactAddress from '../../components/landingpage/contact/contactAddress'
import Header from '../../components/authontication/AuthHeader';
import Footer from '../../components/landingpage/Footer';

const ContactPage: React.FC = () => {
  return (
    <div>
      <Header />
       <div className='py-10'>
      <ContactHeader />
      <ContactMethodsSection />
      <ContactForm />
      <ContactAddress />
       </div>
      
      <Footer />
    </div>
  );
};

export default ContactPage;
