import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Phone, MapPin, ChevronDown } from 'lucide-react';

import { SITE_CONFIG } from '../../config';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = SITE_CONFIG.nav.main;

  /* Removed hardcoded phone/location - unused in render but defined */


  const handleDropdown = (idx) => {
    setOpenDropdown(openDropdown === idx ? null : idx);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${isScrolled
        ? 'bg-white/60 backdrop-blur-lg shadow-lg'
        : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="flex items-center space-x-3">
              <img
                src="/images/logo/tamberma-logo.jpg"
                alt="Tamberma Restaurant Logo"
                className="h-20 w-auto drop-shadow-lg"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            {navItems.map((item, idx) => (
              item.dropdown ? (
                <div key={item.name} className="relative group">
                  <button
                    className={`flex items-center font-medium transition-all duration-300 hover:scale-105 ${isScrolled
                      ? 'text-neutral-800 hover:text-primary-400'
                      : 'text-white hover:text-primary-400'
                      } ${item.dropdown.some(sub => location.pathname === sub.href) ? 'text-primary-400 font-bold underline' : ''}`}
                    onClick={() => handleDropdown(idx)}
                    onMouseEnter={() => setOpenDropdown(idx)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    {item.name}
                    <ChevronDown className="ml-1 w-4 h-4" />
                  </button>
                  <div className={`absolute left-0 mt-2 w-40 bg-white rounded-lg shadow-lg opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto pointer-events-none transition-opacity duration-200 z-50 ${openDropdown === idx ? 'opacity-100 pointer-events-auto' : ''}`} onMouseEnter={() => setOpenDropdown(idx)} onMouseLeave={() => setOpenDropdown(null)}>
                    {item.dropdown.map((sub) => (
                      <Link
                        key={sub.name}
                        to={sub.href}
                        className={`block px-4 py-2 text-neutral-900 hover:bg-primary-100 hover:text-primary-500 transition-colors duration-200 ${location.pathname === sub.href ? 'text-primary-500 font-bold' : ''}`}
                        onClick={() => setOpenDropdown(null)}
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`font-medium transition-all duration-300 hover:scale-105 ${isScrolled
                    ? 'text-neutral-800 hover:text-primary-400'
                    : 'text-white hover:text-primary-400'
                    } ${location.pathname === item.href ? 'text-primary-400 font-bold underline' : ''}`}
                >
                  {item.name}
                </Link>
              )
            ))}
            {/* Contact Info (Desktop) */}
            {/* Removed phone and address for cleaner header */}
          </nav>

          {/* Reservation Button */}
          <div className="hidden md:block">
            <button className="bg-primary-400 text-white px-6 py-2 rounded-full font-medium transition-all duration-300 hover:bg-primary-500 hover:scale-105 hover:shadow-lg">
              Reserve Table
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-lg transition-colors duration-300 ${isScrolled ? 'text-neutral-900' : 'text-white'
                }`}
              aria-label="Toggle mobile menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 overflow-hidden absolute top-full left-0 right-0 bg-white shadow-xl ${isMobileMenuOpen
            ? 'max-h-96 opacity-100'
            : 'max-h-0 opacity-0'
            }`}
        >
          <div className="py-4 space-y-3 bg-white/95 backdrop-blur-md rounded-lg mt-2 shadow-lg">
            {navItems.map((item, idx) => (
              item.dropdown ? (
                <div key={item.name}>
                  <button
                    className={`flex items-center w-full text-neutral-800 font-medium px-4 py-2 hover:text-primary-400 hover:bg-primary-50 transition-colors duration-200 ${item.dropdown.some(sub => location.pathname === sub.href) ? 'text-primary-400 font-bold underline' : ''}`}
                    onClick={() => handleDropdown(idx)}
                  >
                    {item.name}
                    <ChevronDown className="ml-1 w-4 h-4" />
                  </button>
                  {openDropdown === idx && (
                    <div className="pl-4">
                      {item.dropdown.map((sub) => (
                        <Link
                          key={sub.name}
                          to={sub.href}
                          className={`block px-4 py-2 text-neutral-900 hover:bg-primary-100 hover:text-primary-500 transition-colors duration-200 ${location.pathname === sub.href ? 'text-primary-500 font-bold' : ''}`}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block w-full text-left px-4 py-2 text-neutral-800 font-medium hover:text-primary-400 hover:bg-primary-50 transition-colors duration-200 ${location.pathname === item.href ? 'text-primary-400 font-bold underline' : ''}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              )
            ))}
            {/* Contact Info (Mobile) */}
            {/* Removed phone and address for cleaner header */}
            <button className="w-full bg-primary-400 text-white py-2 rounded-full font-medium transition-all duration-300 hover:bg-primary-500 mt-2">
              Reserve Table
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;