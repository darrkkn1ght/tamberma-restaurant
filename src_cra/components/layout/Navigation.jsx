import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, MapPin, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Menu', dropdown: [
        { name: 'Menu', href: '/menu' },
        { name: 'Menu Gallery', href: '/menu-gallery' },
      ]
    },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Contact', href: '/contact' }
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-neutral-900/95 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <img 
                src="/images/logo/tamberma-logo.jpg" 
                alt="Tamberma Restaurant" 
                className="h-12 w-auto"
              />
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {navItems.map((item) => (
                  item.dropdown ? (
                    <div key={item.name} className="relative group">
                      <button className={`flex items-center text-neutral-100 hover:text-primary-400 px-3 py-2 text-sm font-medium transition-colors duration-200 ${item.dropdown.some(sub => location.pathname === sub.href) ? 'text-primary-400 font-bold underline' : ''}`}
                      >
                        {item.name}
                        <ChevronDown className="ml-1 w-4 h-4" />
                      </button>
                      <div className="absolute left-0 mt-2 w-40 bg-white rounded-lg shadow-lg opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto pointer-events-none transition-opacity duration-200 z-50">
                        {item.dropdown.map((sub) => (
                          <Link
                            key={sub.name}
                            to={sub.href}
                            className={`block px-4 py-2 text-neutral-900 hover:bg-primary-100 hover:text-primary-500 transition-colors duration-200 ${location.pathname === sub.href ? 'text-primary-500 font-bold' : ''}`}
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
                      onClick={() => scrollToSection(item.href)}
                      className={`text-neutral-100 hover:text-primary-400 px-3 py-2 text-sm font-medium transition-colors duration-200 relative group ${location.pathname === item.href ? 'text-primary-400 font-bold underline' : ''}`}
                    >
                      {item.name}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-400 transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  )
                ))}
              </div>
            </div>

            {/* Contact Info & CTA */}
            <div className="hidden lg:flex items-center space-x-6">
              <div className="flex items-center space-x-4 text-neutral-300 text-sm">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>(555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>Downtown District</span>
                </div>
              </div>
              <button className="bg-primary-400 hover:bg-primary-500 text-white px-6 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                Reserve Table
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-neutral-100 hover:text-primary-400 p-2 transition-colors duration-200"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="bg-neutral-900/98 backdrop-blur-md border-t border-neutral-800">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item, idx) => (
                item.dropdown ? (
                  <div key={item.name}>
                    <button
                      className={`flex items-center w-full text-neutral-100 hover:text-primary-400 hover:bg-neutral-800/50 px-3 py-2 text-base font-medium text-left transition-colors duration-200 ${item.dropdown.some(sub => location.pathname === sub.href) ? 'text-primary-400 font-bold underline' : ''}`}
                      onClick={() => setIsOpen(isOpen === idx ? null : idx)}
                    >
                      {item.name}
                      <ChevronDown className="ml-1 w-4 h-4" />
                    </button>
                    {isOpen === idx && (
                      <div className="pl-4">
                        {item.dropdown.map((sub) => (
                          <Link
                            key={sub.name}
                            to={sub.href}
                            className={`block px-4 py-2 text-neutral-900 hover:bg-primary-100 hover:text-primary-500 transition-colors duration-200 ${location.pathname === sub.href ? 'text-primary-500 font-bold' : ''}`}
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
                    onClick={() => scrollToSection(item.href)}
                    className={`text-neutral-100 hover:text-primary-400 hover:bg-neutral-800/50 block px-3 py-2 text-base font-medium w-full text-left transition-colors duration-200 ${location.pathname === item.href ? 'text-primary-400 font-bold underline' : ''}`}
                  >
                    {item.name}
                  </Link>
                )
              ))}
              
              {/* Mobile Contact & CTA */}
              <div className="pt-4 pb-2 border-t border-neutral-800 mt-4">
                <div className="px-3 py-2 text-neutral-300 text-sm space-y-2">
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4" />
                    <span>(555) 123-4567</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>Downtown District</span>
                  </div>
                </div>
                <div className="px-3 mt-3">
                  <button className="w-full bg-primary-400 hover:bg-primary-500 text-white px-6 py-3 rounded-md text-sm font-medium transition-colors duration-200">
                    Reserve Table
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content from hiding under fixed nav */}
      <div className="h-20"></div>
    </>
  );
};

export default Navigation;