import React from 'react';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter } from 'lucide-react';
import { SITE_CONFIG } from '../../config';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Menu', href: '/menu' },
    { name: 'About', href: '/about' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Contact', href: '/contact' },
    { name: 'Reservations', href: '/contact' }
  ];

  const socialLinks = SITE_CONFIG.socials.filter(s => s.icon);

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Location',
      content: SITE_CONFIG.contact.address
    },
    {
      icon: Phone,
      title: 'Phone',
      content: SITE_CONFIG.contact.phone
    },
    {
      icon: Mail,
      title: 'Email',
      content: SITE_CONFIG.contact.email
    },
    {
      icon: Clock,
      title: 'Hours',
      content: SITE_CONFIG.contact.hours
    }
  ];

  return (
    <footer className="bg-neutral-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-400/20 to-accent-400/20"></div>
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-accent-400/10 rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="mb-6">
                <h3 className="font-display text-2xl font-bold text-primary-400 mb-2">
                  {SITE_CONFIG.name}
                </h3>
                <p className="text-neutral-300 text-sm leading-relaxed">
                  Premium Indian cuisine meets craft cocktails in an atmosphere of modern elegance.
                  Experience the art of fine dining with authentic flavors and innovative presentations.
                </p>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map(({ icon: Icon, url, label }) => (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center 
                             text-neutral-400 hover:text-primary-400 hover:bg-primary-400/10 
                             transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary-400/25"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-1">
              <h4 className="font-display text-lg font-semibold text-white mb-6">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-neutral-300 hover:text-primary-400 transition-colors duration-300
                               text-sm flex items-center group"
                    >
                      <span className="w-1 h-1 bg-primary-400 rounded-full mr-3 opacity-0 
                                     group-hover:opacity-100 transition-opacity duration-300"></span>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-2">
              <h4 className="font-display text-lg font-semibold text-white mb-6">
                Contact Information
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {contactInfo.map(({ icon: Icon, title, content }) => (
                  <div key={title} className="flex items-start space-x-3 p-3 rounded-lg 
                                           bg-neutral-800/50 hover:bg-neutral-800/70 
                                           transition-colors duration-300">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary-400/20 rounded-lg 
                                  flex items-center justify-center mt-0.5">
                      <Icon size={16} className="text-primary-400" />
                    </div>
                    <div>
                      <h5 className="text-white text-sm font-medium mb-1">{title}</h5>
                      <p className="text-neutral-300 text-xs leading-relaxed">{content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-neutral-800">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div className="text-center md:text-left">
                <h4 className="font-display text-lg font-semibold text-white mb-2">
                  Stay Updated
                </h4>
                <p className="text-neutral-300 text-sm">
                  Subscribe for exclusive offers and culinary updates
                </p>
              </div>

              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 w-full md:w-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg 
                           text-white placeholder-neutral-400 focus:outline-none focus:border-primary-400
                           focus:ring-1 focus:ring-primary-400 transition-colors duration-300
                           w-full sm:w-64"
                />
                <button className="px-6 py-2 bg-primary-400 hover:bg-primary-500 text-white 
                                 rounded-lg font-medium transition-all duration-300 
                                 hover:shadow-lg hover:shadow-primary-400/25 hover:scale-105
                                 w-full sm:w-auto">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-800">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div className="text-neutral-400 text-sm text-center md:text-left">
                © {currentYear} {SITE_CONFIG.name}. All rights reserved.
              </div>

              <div className="flex items-center space-x-6 text-sm">
                <a href="#" className="text-neutral-400 hover:text-primary-400 transition-colors duration-300">
                  Privacy Policy
                </a>
                <a href="#" className="text-neutral-400 hover:text-primary-400 transition-colors duration-300">
                  Terms of Service
                </a>
                <a href="#" className="text-neutral-400 hover:text-primary-400 transition-colors duration-300">
                  Accessibility
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;