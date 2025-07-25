import React from 'react';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      <main className="relative">
        {children}
      </main>
      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
        <a
          href="/contact"
          className="block w-full bg-primary-500 text-white text-center py-4 font-bold text-lg shadow-lg rounded-t-2xl transition-all duration-300 hover:bg-primary-600"
          style={{ borderTopLeftRadius: '1.25rem', borderTopRightRadius: '1.25rem' }}
        >
          Reserve Table
        </a>
      </div>
      {/* Footer will be added in Phase 4 */}
    </div>
  );
};

export default Layout;