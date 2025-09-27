import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Search, ShoppingCart, User, Bell, Globe, Menu, X, Phone, LifeBuoy, Users, LayoutGrid, Store
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import logo from '../../assets/images/LOGO.png'

const Header: React.FC = () => {
  const { t, i18n } = useTranslation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLanguageOpen, setIsLanguageOpen] = useState(false)
  const { getCartItemCount } = useCart()
  const cartCount = getCartItemCount()

  const navLinks = [
    { key: 'marketplace', path: '#marketplace', icon: <Store size={16} /> },
    { key: 'categories', path: '#categories', icon: <LayoutGrid size={16} /> },
    { key: 'community', path: '#community', icon: <Users size={16} /> },
    { key: 'consultant', path: '#consultant', icon: <LifeBuoy size={16} /> },
    { key: 'contact', path: '/contact', icon: <Phone size={16} /> },
  ]

  const handleScroll = (hash: string) => {
    const element = document.querySelector(hash)
    if (element) element.scrollIntoView({ behavior: 'smooth' })
  }

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang)
    setIsLanguageOpen(false)
  }

  // Close language dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as Element).closest('.language-dropdown')) {
        setIsLanguageOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className="bg-white shadow-md fixed z-50 w-full">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img src={logo} alt="Logo" className="h-8 w-auto" />
          <div className="leading-tight">
            <Link to="/" className="text-green-700 font-bold text-lg">NGERERAYO</Link>
            <p className="text-xs text-gray-500 -mt-1">{t('agriculturalMarketplace')}</p>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex space-x-6 items-center">
          {navLinks.map(item => (
            item.path.startsWith('#') ? (
              <button
                key={item.key}
                onClick={() => handleScroll(item.path)}
                className="flex items-center cursor-pointer space-x-1 text-sm text-black hover:text-green-600"
              >
                {item.icon}
                <span>{t(item.key)}</span>
              </button>
            ) : (
              <Link
                key={item.key}
                to={item.path}
                className="flex items-center cursor-pointer space-x-1 text-sm text-black hover:text-green-600"
              >
                {item.icon}
                <span>{t(item.key)}</span>
              </Link>
            )
          ))}
        </nav>

        {/* Right Icons */}
        <div className="hidden lg:flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder={t('searchPlaceholder')}
              className="bg-gray-100 text-sm px-4 py-2 rounded-full w-64 focus:outline-none focus:ring-2 focus:ring-green-300"
            />
            <Search className="absolute right-3 top-2.5 text-gray-500" size={16} />
          </div>

          {/* Language Toggle */}
          <div className="relative language-dropdown">
            <button 
              className="text-sm text-black flex items-center cursor-pointer space-x-1 hover:text-green-600"
              onClick={() => setIsLanguageOpen(!isLanguageOpen)}
            >
              <Globe size={16}  />
              <span>{(i18n.language || 'en').toUpperCase()}</span>
            </button>
            {/* Language dropdown */}
            {isLanguageOpen && (
              <div className="absolute right-0 mt-2 bg-white border border-gray-600  rounded shadow-lg flex flex-col z-50">
                <button onClick={() => changeLanguage('en')} className="px-4 py-2 hover:bg-green-100 cursor-pointer text-left">English</button>
                <button onClick={() => changeLanguage('rw')} className="px-4 py-2 hover:bg-green-100 cursor-pointer text-left">Kinyarwanda</button>
                <button onClick={() => changeLanguage('fr')} className="px-4 py-2 hover:bg-green-100 cursor-pointer text-left">Français</button>
              </div>
            )}
          </div>

          <Link to="/cart" className="text-black hover:text-green-600 relative">
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          <button className="text-black hover:text-green-600">
            <Bell size={20} />
          </button>
          <Link to="/login">
            <button className="text-black hover:text-green-600 cursor-pointer">
              <User size={20} />
            </button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white shadow-md px-4 py-3 space-y-4">
          {navLinks.map(item => (
            item.path.startsWith('#') ? (
              <button 
                key={item.key} 
                onClick={() => {handleScroll(item.path); setIsMenuOpen(false);}} 
                className="block w-full text-left text-black hover:text-green-600"
              >
                {t(item.key)}
              </button>
            ) : (
              <Link 
                key={item.key} 
                to={item.path} 
                onClick={() => setIsMenuOpen(false)} 
                className="block text-black hover:text-green-600"
              >
                {t(item.key)}
              </Link>
            )
          ))}
        </div>
      )}
    </header>
  )
}

export default Header