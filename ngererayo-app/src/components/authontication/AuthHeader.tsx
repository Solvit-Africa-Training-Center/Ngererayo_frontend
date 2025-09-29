import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Search,
  ShoppingCart,
  User,
  Bell,
  Globe,
  Menu,
  X,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/LOGO.png';

const Header: React.FC = () => {
  const { i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setIsLanguageOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as Element).closest('.language-dropdown')) {
        setIsLanguageOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-white shadow-md fixed z-50 w-full">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img src={logo} alt="Logo" className="h-8 w-auto" />
          <div className="leading-tight">
            <Link to="/" className="text-green-700 font-bold text-lg">
              NGERERAYO
            </Link>
            <p className="text-xs text-gray-500 -mt-1">
              Agricultural Marketplace
            </p>
          </div>
        </div>

        {/* Right Icons */}
        <div className="hidden lg:flex items-center space-x-4">
          {/* Language Toggle */}
          <div className="relative language-dropdown">
            <button
              className="text-sm text-black flex items-center cursor-pointer space-x-1 hover:text-green-600"
              onClick={() => setIsLanguageOpen(!isLanguageOpen)}
            >
              <Globe size={16} />
              <span>{(i18n.language || 'en').toUpperCase()}</span>
            </button>
            {isLanguageOpen && (
              <div className="absolute right-0 mt-2 bg-white border border-gray-300 rounded shadow-lg flex flex-col z-50">
                <button
                  onClick={() => changeLanguage('en')}
                  className="px-4 py-2 hover:bg-green-100 text-left"
                >
                  English
                </button>
                <button
                  onClick={() => changeLanguage('rw')}
                  className="px-4 py-2 hover:bg-green-100 text-left"
                >
                  Kinyarwanda
                </button>
                <button
                  onClick={() => changeLanguage('fr')}
                  className="px-4 py-2 hover:bg-green-100 text-left"
                >
                  Français
                </button>
              </div>
            )}
          </div>

          <button className="text-black hover:text-green-600">
            <ShoppingCart size={20} />
          </button>
          <button className="text-black hover:text-green-600">
            <Bell size={20} />
          </button>
          <button className="text-black hover:text-green-600">
            <User size={20} />
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white shadow-md px-4 py-3 space-y-4">
          <div className="flex space-x-4 mt-4">
            <Search size={20} />
            <ShoppingCart size={20} />
            <Bell size={20} />
            <User size={20} />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
