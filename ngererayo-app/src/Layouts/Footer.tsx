import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { APP_NAME, CATEGORIES } from '../utilis/constraints';
import logo from '../../assets/images/LOGO.png';

const Footer: React.FC = () => {
  return (
    <footer className="bg-green-900 text-white py-5 mb-0">
      
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-200">
          <p>© {new Date().getFullYear()} {APP_NAME}. All rights reserved.</p>
        </div>
     
    </footer>
  );
};

export default Footer;