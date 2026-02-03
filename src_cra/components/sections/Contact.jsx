import React, { useState } from 'react';
import ContactForm from '../features/ContactForm';
import ReservationForm from '../features/ReservationForm';

const Contact = () => {
  const [activeTab, setActiveTab] = useState('contact');

  const contactInfo = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: 'Location',
      content: ["Quarters 894, Rev'd Oyebode Crescent, Iyaganku, Ibadan", 'Nigeria', 'Alternative: Tamberma Ringroad (delivery only)'],
      action: 'Get Directions'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      title: 'Phone',
      content: ['+234 805 409 0607'],
      action: 'Call Now'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Email',
      content: ['tambermang@gmail.com'],
      action: 'Send Email'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Hours',
      content: ['Contact for current operating hours'],
      action: 'View Menu'
    }
  ];

  const socialLinks = [
    {
      name: 'Instagram',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.004 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.348-1.051-2.348-2.348s1.051-2.348 2.348-2.348 2.348 1.051 2.348 2.348-1.051 2.348-2.348 2.348zm7.718 0c-1.297 0-2.348-1.051-2.348-2.348s1.051-2.348 2.348-2.348 2.348 1.051 2.348 2.348-1.051 2.348-2.348 2.348z"/>
        </svg>
      ),
      url: 'https://instagram.com/tamberma_ibadan',
      handle: '@tamberma_ibadan'
    },
    {
      name: 'Facebook',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      url: 'https://facebook.com/TambermaRestaurant',
      handle: 'Tamberma Restaurant & Bar'
    },
    {
      name: 'TikTok',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm2.5 7.5V15a3.5 3.5 0 11-3.5-3.5h1V8.5h2.5z"/>
        </svg>
      ),
      url: 'https://www.tiktok.com/@helloibadan',
      handle: '@helloibadan (featured)'
    }
  ];

  return (
    <section id="contact" className="py-10 sm:py-16 md:py-20 bg-neutral-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-400/10 rounded-full mb-6">
            <svg className="w-8 h-8 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h2 className="text-4xl md:text-5xl font-display text-white mb-6">
            Get In <span className="text-primary-400">Touch</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Ready to experience exceptional Indian cuisine? Whether you have questions, 
            special requests, or want to make a reservation, we're here to help.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Contact Information */}
          <div className="lg:col-span-2">
            <div className="space-y-8">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="group bg-neutral-800/50 backdrop-blur-sm rounded-2xl p-6 border border-neutral-700/50 hover:border-primary-400/30 transition-all duration-300 hover:bg-neutral-800/70"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary-400/10 rounded-xl flex items-center justify-center text-primary-400 group-hover:bg-primary-400/20 transition-colors duration-300">
                      {info.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {info.title}
                      </h3>
                      <div className="space-y-1">
                        {info.content.map((line, lineIndex) => (
                          <p key={lineIndex} className="text-gray-300 text-sm">
                            {line}
                          </p>
                        ))}
                      </div>
                      <button className="mt-3 text-primary-400 text-sm font-medium hover:text-primary-300 transition-colors duration-300 flex items-center group-hover:translate-x-1 transform transition-transform">
                        {info.action}
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Social Media */}
              <div className="bg-neutral-800/50 backdrop-blur-sm rounded-2xl p-6 border border-neutral-700/50">
                <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
                <div className="space-y-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 text-gray-300 hover:text-primary-400 transition-colors duration-300 group"
                    >
                      <div className="w-8 h-8 bg-neutral-700 rounded-lg flex items-center justify-center group-hover:bg-primary-400/20 transition-colors duration-300">
                        {social.icon}
                      </div>
                      <span className="text-sm">{social.handle}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Forms Section */}
          <div className="lg:col-span-3">
            <div className="bg-neutral-800/30 backdrop-blur-sm rounded-3xl border border-neutral-700/50 overflow-hidden">
              {/* Tab Navigation */}
              <div className="flex border-b border-neutral-700/50">
                <button
                  onClick={() => setActiveTab('contact')}
                  className={`flex-1 px-6 py-4 text-sm font-medium transition-all duration-300 ${
                    activeTab === 'contact'
                      ? 'text-primary-400 bg-primary-400/10 border-b-2 border-primary-400'
                      : 'text-gray-300 hover:text-white hover:bg-neutral-700/30'
                  }`}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span>Contact Us</span>
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('reservation')}
                  className={`flex-1 px-6 py-4 text-sm font-medium transition-all duration-300 ${
                    activeTab === 'reservation'
                      ? 'text-primary-400 bg-primary-400/10 border-b-2 border-primary-400'
                      : 'text-gray-300 hover:text-white hover:bg-neutral-700/30'
                  }`}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>Make Reservation</span>
                  </div>
                </button>
              </div>

              {/* Form Content */}
              <div className="p-8">
                {activeTab === 'contact' ? <ContactForm /> : <ReservationForm />}
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-20">
          <div className="bg-neutral-800/30 backdrop-blur-sm rounded-3xl border border-neutral-700/50 overflow-hidden">
            <div className="p-6 border-b border-neutral-700/50">
              <h3 className="text-xl font-display text-white mb-2">Find Us</h3>
              <p className="text-gray-300 text-sm">
                Located in the heart of Victoria Island, Lagos
              </p>
            </div>
            <div className="relative h-96 bg-neutral-700">
              {/* Placeholder for map - in real implementation, integrate with Google Maps */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-400/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h4 className="text-white font-medium mb-2">Interactive Map</h4>
                  <p className="text-gray-400 text-sm mb-4">
                    Click to view our location on Google Maps
                  </p>
                  <a
                    href="https://www.google.com/maps"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-primary-400 text-white font-medium rounded-full hover:bg-primary-500 transition-colors duration-300"
                  >
                    <span>View on Google Maps</span>
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-primary-400/5 to-transparent rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-r from-accent-400/5 to-transparent rounded-full blur-3xl pointer-events-none"></div>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23e67e22' fill-opacity='0.1'%3E%3Cpath d='m0 40l40-40h-40v40zm40 0v-40h-40l40 40z'/%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
    </section>
  );
};

export default Contact;