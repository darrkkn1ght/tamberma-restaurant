// 🎨 Brand Colors (Exact values from master prompt)
export const COLORS = {
    primary: {
      400: '#e67e22', // Main orange
      500: '#d35400', // Darker orange
      600: '#b7471d'  // Deep orange
    },
    accent: {
      400: '#8b5a3c', // Earth brown
      500: '#6b4423', // Dark brown
    },
    neutral: {
      900: '#1a1a1a', // Almost black
      800: '#2c2c2c', // Dark gray
      100: '#f5f5f5', // Light gray
      50: '#fafafa'   // Off white
    }
  };
  
  // 🏢 Restaurant Information
  export const RESTAURANT_INFO = {
    name: 'Tamberma Restaurant & Bar, Ibadan',
    tagline: 'Where Culture Meets Taste',
    description: 'A rustic open-air restaurant and bar in the heart of Ibadan, offering a fusion of African, Indian, and Continental delights with vibrant cocktails and soulful ambiance.',
    contact: {
      phone: '0807 559 0939 / 0805 409 0607',
      email: 'tambermang@gmail.com',
      address: {
        street: "894 Rev'd Oyebode Crescent",
        city: 'Iyaganku GRA',
        state: 'Ibadan',
        zip: '',
        full: "894 Rev'd Oyebode Crescent, Iyaganku GRA, Ibadan"
      }
    },
    hours: {
      monday: { open: '11:00', close: '00:00', label: '11:00 AM – 12:00 AM' },
      tuesday: { open: '11:00', close: '00:00', label: '11:00 AM – 12:00 AM' },
      wednesday: { open: '11:00', close: '00:00', label: '11:00 AM – 12:00 AM' },
      thursday: { open: '11:00', close: '00:00', label: '11:00 AM – 12:00 AM' },
      friday: { open: '11:00', close: '00:00', label: '11:00 AM – 12:00 AM' },
      saturday: { open: '11:00', close: '00:00', label: '11:00 AM – 12:00 AM' },
      sunday: { open: '11:00', close: '00:00', label: '11:00 AM – 12:00 AM' }
    },
    social: {
      instagram: 'https://instagram.com/tambermarestaurant',
      facebook: 'https://facebook.com/tambermarestaurant',
      linktree: 'https://linktr.ee/tamberma'
    }
  };
  
  // 🎯 Navigation Items
  export const NAV_ITEMS = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Menu', href: '#menu', id: 'menu' },
    { name: 'Gallery', href: '#gallery', id: 'gallery' },
    { name: 'Contact', href: '#contact', id: 'contact' }
  ];
  
  // 📱 Responsive Breakpoints
  export const BREAKPOINTS = {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  };
  
  // ⚡ Animation Durations
  export const ANIMATIONS = {
    fast: 150,
    normal: 300,
    slow: 500,
    extraSlow: 800
  };
  
  // 🖼️ Image Paths
  export const IMAGES = {
    logo: {
      main: '/images/logo/tamberma-logo.jpg',
      white: '/images/logo/tamberma-logo-white.png',
      icon: '/images/logo/tamberma-icon.svg'
    },
    gallery: {
      hero: '/images/gallery/hero-bg.jpg',
      ambiance1: '/images/gallery/ambiance-1.jpg',
      ambiance2: '/images/gallery/ambiance-2.jpg',
      food1: '/images/gallery/food-1.jpg',
      cocktails1: '/images/gallery/cocktails-1.jpg',
      outdoor: '/images/gallery/outdoor.jpg'
    },
    menu: {
      bar1: '/images/menu/bar-menu-1.jpg',
      bar2: '/images/menu/bar-menu-2.jpg',
      bar3: '/images/menu/bar-menu-3.jpg',
      bar4: '/images/menu/bar-menu-4.jpg',
      indian1: '/images/menu/indian-menu-1.jpg',
      indian2: '/images/menu/indian-menu-2.jpg'
    },
    ui: {
      heroOverlay: '/images/ui/hero-overlay.png'
    }
  };
  
  // 🍽️ Menu Categories
  export const MENU_CATEGORIES = [
    {
      id: 'appetizers',
      name: 'Appetizers',
      description: 'Start your culinary journey'
    },
    {
      id: 'mains',
      name: 'Main Courses',
      description: 'Signature dishes crafted to perfection'
    },
    {
      id: 'desserts',
      name: 'Desserts',
      description: 'Sweet endings to remember'
    },
    {
      id: 'cocktails',
      name: 'Craft Cocktails',
      description: 'Expertly mixed with premium spirits'
    },
    {
      id: 'wines',
      name: 'Wine Selection',
      description: 'Curated wines from around the world'
    },
    {
      id: 'mocktails',
      name: 'Mocktails',
      description: 'Refreshing non-alcoholic creations'
    }
  ];
  
  // 📝 Form Validation Rules
  export const VALIDATION = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^[\+]?[1-9][\d]{0,15}$/,
    minNameLength: 2,
    maxNameLength: 50,
    minMessageLength: 10,
    maxMessageLength: 500
  };
  
  // 🎨 Theme Configuration
  export const THEME = {
    fonts: {
      display: 'Playfair Display, serif',
      sans: 'Inter, sans-serif'
    },
    shadows: {
      soft: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      medium: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      large: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
    },
    blur: {
      sm: 'blur(4px)',
      md: 'blur(8px)',
      lg: 'blur(16px)'
    }
  };
  
  // 🚀 Feature Flags
  export const FEATURES = {
    reservationSystem: true,
    onlineOrdering: false,
    loyaltyProgram: false,
    eventBooking: true,
    newsletter: true,
    liveChat: false
  };
  
  // 📍 Location Data
  export const LOCATION = {
    coordinates: {
      lat: 40.7589,
      lng: -73.9851
    },
    mapZoom: 15,
    mapStyle: 'roadmap'
  };
  
  // 🎭 Testimonials Data Structure
  export const TESTIMONIAL_STRUCTURE = {
    maxRating: 5,
    platforms: ['Google', 'Yelp', 'OpenTable', 'TripAdvisor']
  };
  
  // 🔧 API Endpoints (for future backend integration)
  export const API_ENDPOINTS = {
    base: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
    reservations: '/reservations',
    contact: '/contact',
    newsletter: '/newsletter',
    menu: '/menu'
  };
  
  // 📊 Analytics Events
  export const ANALYTICS_EVENTS = {
    reservation: 'reservation_attempt',
    menuView: 'menu_view',
    contactForm: 'contact_form_submit',
    phoneClick: 'phone_click',
    directionClick: 'direction_click'
  };
  
  export default {
    COLORS,
    RESTAURANT_INFO,
    NAV_ITEMS,
    BREAKPOINTS,
    ANIMATIONS,
    IMAGES,
    MENU_CATEGORIES,
    VALIDATION,
    THEME,
    FEATURES,
    LOCATION,
    TESTIMONIAL_STRUCTURE,
    API_ENDPOINTS,
    ANALYTICS_EVENTS
  };