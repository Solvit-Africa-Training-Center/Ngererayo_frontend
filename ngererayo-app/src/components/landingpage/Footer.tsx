import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { APP_NAME, CATEGORIES } from '../../utilis/constraints';

const Footer: React.FC = () => {
  return (
    <footer className="bg-green-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className=" text-green-800 p-2 rounded-lg">
                
              </div>
              <span className="text-xl font-bold">{APP_NAME}</span>
            </div>
            <p className="text-gray-400">
              Connecting farmers and buyers across Rwanda with fresh, locally sourced produce.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'Products', 'Farmers', 'Categories', 'About Us'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-white transition">{item}</a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Categories</h3>
            <ul className="space-y-2">
              {CATEGORIES.slice(0, 5).map((category) => (
                <li key={category.id}>
                  <a href="#" className="text-gray-400 hover:text-white transition">{category.name}</a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Phone size={16} className="mr-2 text-green-400" />
                <span className="text-gray-400">+250 788 123 456</span>
              </li>
              <li className="flex items-center">
                <Mail size={16} className="mr-2 text-green-400" />
                <span className="text-gray-400">info@ngererayo.rw</span>
              </li>
              <li className="flex items-center">
                <MapPin size={16} className="mr-2 text-green-400" />
                <span className="text-gray-400">Kigali, Rwanda</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} {APP_NAME}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;