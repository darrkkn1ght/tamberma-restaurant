import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';

// Layout Components (to be created in Phase 1)
import Layout from './components/layout/Layout';

// Section Components (to be created in Phase 2+)
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import MenuPreview from './components/sections/MenuPreview';
import Gallery from './components/sections/Gallery';
import Contact from './components/sections/Contact';
import Location from './components/sections/Location';
import Testimonials from './components/sections/Testimonials';
import MenuPage from './components/sections/MenuPage';
import MenuGallery from './components/sections/MenuGallery';
import HomePage from './components/sections/HomePage';

// Loading Component
const LoadingSpinner = () => (
  <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
    <div className="text-center">
      <div className="spinner w-16 h-16 mx-auto mb-4"></div>
      <p className="text-neutral-600 font-medium">Loading Tamberma Restaurant...</p>
    </div>
  </div>
);

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('App Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-50">
          <div className="text-center p-8">
            <h1 className="text-3xl font-display text-neutral-900 mb-4">
              Oops! Something went wrong
            </h1>
            <p className="text-neutral-600 mb-6">
              We're having trouble loading the page. Please refresh to try again.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="btn-primary"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

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
    <Router>
      <Layout currentSection={currentSection}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/menu-gallery" element={<MenuGallery />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          {/* Add other routes as needed */}
        </Routes>
      </Layout>

      {/* Scroll to Top Button */}
      <ScrollToTopButton />
    </Router>
  );
}

// Scroll to Top Button Component
const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      className={`fixed bottom-8 right-8 z-50 p-3 rounded-full bg-primary-400 text-white shadow-lg hover:bg-primary-500 transition-all duration-300 transform hover:scale-110 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  );
};

export default App;