import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import { HelmetProvider } from 'react-helmet-async';

// Layout Components (to be created in Phase 1)
import Layout from './components/layout/Layout';
import ErrorBoundary from './components/ui/ErrorBoundary';
import ScrollToTopButton from './components/ui/ScrollToTopButton';

// Lazy-loaded Section Components
const Hero = lazy(() => import('./components/sections/Hero'));
const About = lazy(() => import('./components/sections/About'));
const MenuPreview = lazy(() => import('./components/sections/MenuPreview'));
const Gallery = lazy(() => import('./components/sections/Gallery'));
const Contact = lazy(() => import('./components/sections/Contact'));
const Location = lazy(() => import('./components/sections/Location'));
const Testimonials = lazy(() => import('./components/sections/Testimonials'));
const MenuPage = lazy(() => import('./components/sections/MenuPage'));
const MenuGallery = lazy(() => import('./components/sections/MenuGallery'));
const HomePage = lazy(() => import('./components/sections/HomePage'));
const WeeklyEvents = lazy(() => import('./components/sections/WeeklyEvents'));

// Loading Component
const LoadingSpinner = () => (
  <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
    <div className="text-center">
      <div className="spinner w-16 h-16 mx-auto mb-4"></div>
      <p className="text-neutral-600 font-medium">Loading Tamberma Restaurant...</p>
    </div>
  </div>
);

// Main App Component
function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentSection, setCurrentSection] = useState('home');

  // Handle initial loading
  useEffect(() => {
    const loadApp = async () => {
      // Simulate app initialization
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsLoading(false);
    };

    loadApp();
  }, []);

  // Handle scroll-based navigation highlighting
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'menu', 'gallery', 'contact', 'location'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setCurrentSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Show loading spinner
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <HelmetProvider>
      <Router>
        <Layout currentSection={currentSection}>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<About />} />
              <Route path="/menu" element={<MenuPage />} />
              <Route path="/menu-gallery" element={<MenuGallery />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/events" element={<WeeklyEvents />} />
              {/* Add other routes as needed */}
            </Routes>
          </Suspense>
        </Layout>
        {/* Scroll to Top Button */}
        <ScrollToTopButton />
      </Router>
    </HelmetProvider>
  );
}

export default App;