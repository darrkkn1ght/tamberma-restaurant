import React, { useState, useEffect } from 'react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Menu', href: '#menu' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
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
              {/* Optionally keep the subtitle below, or remove for a cleaner look */}
              {/* <div>
                <p className={`text-sm font-medium transition-colors duration-300 ${
                  isScrolled ? 'text-accent-400' : 'text-primary-400'
                }`}>
                  Restaurant
                </p>
              </div> */}
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={`font-medium transition-all duration-300 hover:scale-105 ${
                  isScrolled 
                    ? 'text-neutral-800 hover:text-primary-400' 
                    : 'text-white hover:text-primary-400'
                }`}
              >
                {item.name}
              </button>
            ))}
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
              className={`p-2 rounded-lg transition-colors duration-300 ${
                isScrolled ? 'text-neutral-900' : 'text-white'
              }`}
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
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            isMobileMenuOpen 
              ? 'max-h-96 opacity-100' 
              : 'max-h-0 opacity-0'
          }`}
        >
          <div className="py-4 space-y-3 bg-white/95 backdrop-blur-md rounded-lg mt-2 shadow-lg">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="block w-full text-left px-4 py-2 text-neutral-800 font-medium hover:text-primary-400 hover:bg-primary-50 transition-colors duration-200"
              >
                {item.name}
              </button>
            ))}
            <div className="px-4 pt-2">
              <button className="w-full bg-primary-400 text-white py-2 rounded-full font-medium transition-all duration-300 hover:bg-primary-500">
                Reserve Table
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;