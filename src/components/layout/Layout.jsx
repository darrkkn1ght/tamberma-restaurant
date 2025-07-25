import React from 'react';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      <main className="relative">
        {children}
      </main>
      {/* Footer will be added in Phase 4 */}
    </div>
  );
};

export default Layout;