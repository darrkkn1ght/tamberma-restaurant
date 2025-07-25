// Restaurant information and configuration for Tamberma Restaurant

export const restaurantInfo = {
    name: 'Tamberma Restaurant & Bar, Ibadan',
    tagline: 'Where Culture Meets Taste',
    description: 'A rustic open-air restaurant and bar in the heart of Ibadan, offering a fusion of African, Indian, and Continental delights with vibrant cocktails and soulful ambiance.',
    
    // Contact Information
    contact: {
      phone: '0807 559 0939 / 0805 409 0607',
      email: 'tambermaibadan@gmail.com',
      website: 'https://linktr.ee/tamberma'
    },
    
    // Location Details
    location: {
      address: {
        street: "894 Rev'd Oyebode Crescent",
        area: 'Iyaganku GRA',
        city: 'Ibadan',
        state: 'Oyo',
        pincode: '',
        country: 'Nigeria'
      },
      coordinates: {},
      landmarks: ''
    },
    
    // Operating Hours
    hours: {
      monday: { open: '11:00', close: '00:00', isOpen: true },
      tuesday: { open: '11:00', close: '00:00', isOpen: true },
      wednesday: { open: '11:00', close: '00:00', isOpen: true },
      thursday: { open: '11:00', close: '00:00', isOpen: true },
      friday: { open: '11:00', close: '00:00', isOpen: true },
      saturday: { open: '11:00', close: '00:00', isOpen: true },
      sunday: { open: '11:00', close: '00:00', isOpen: true }
    },
    
    // Special Hours
    specialHours: {
      happyHour: {
        days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
        time: '17:00 - 19:00',
        discount: '25% off on cocktails'
      },
      lunchSpecial: {
        days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
        time: '12:00 - 15:00',
        offer: 'Express lunch menu available'
      }
    },
    
    // Social Media
    socialMedia: {
      instagram: 'https://instagram.com/tambermarestaurant',
      facebook: 'https://facebook.com/tambermarestaurant',
      twitter: '@tamberma_blr',
      youtube: 'TambermaRestaurant',
      linktree: 'https://linktr.ee/tamberma'
    },
    
    // Restaurant Features
    features: [
      'Private Dining Rooms',
      'Live Kitchen Experience',
      'Craft Cocktail Bar',
      'Outdoor Terrace Seating',
      'Wine Cellar',
      'Valet Parking',
      'Free WiFi',
      'Air Conditioned'
    ],
    
    // Capacity & Seating
    capacity: {
      indoor: 120,
      outdoor: 40,
      privateRooms: 24,
      total: 184
    },
    
    // Dining Options
    diningOptions: [
      'Dine-in',
      'Takeaway',
      'Home Delivery',
      'Corporate Catering',
      'Private Events',
      'Wedding Catering'
    ],
    
    // Payment Methods
    paymentMethods: [
      'Cash',
      'Credit Cards',
      'Debit Cards',
      'UPI',
      'Digital Wallets',
      'Net Banking'
    ],
    
    // Awards & Recognition
    awards: [
      {
        year: '2024',
        title: 'Best Indian Restaurant',
        organization: 'Bangalore Food Awards'
      },
      {
        year: '2023',
        title: 'Excellence in Cocktails',
        organization: 'Indian Bar Awards'
      },
      {
        year: '2023',
        title: 'Top 50 Restaurants',
        organization: 'Times Food Guide'
      }
    ],
    
    // Chef Information
    chefInfo: {
      headChef: {
        name: 'Chef Rajesh Kumar',
        experience: '15+ years',
        speciality: 'North Indian & Mughlai Cuisine',
        bio: 'Trained at the prestigious Culinary Institute of India, Chef Rajesh brings authentic flavors with modern presentation techniques.'
      },
      mixologist: {
        name: 'Priya Sharma',
        experience: '8+ years',
        speciality: 'Indian-inspired Craft Cocktails',
        bio: 'Award-winning mixologist known for her innovative use of Indian spices and herbs in cocktail creation.'
      }
    }
  };
  
  // Business Configuration
  export const businessConfig = {
    // Reservation Settings
    reservations: {
      enabled: true,
      advanceBooking: 30, // days
      minimumPartySize: 1,
      maximumPartySize: 12,
      timeSlots: [
        '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
        '18:00', '18:30', '19:00', '19:30', '20:00', '20:30',
        '21:00', '21:30', '22:00'
      ]
    },
    
    // Delivery Settings
    delivery: {
      enabled: true,
      radius: 15, // km
      minimumOrder: 500, // INR
      deliveryFee: 50, // INR
      estimatedTime: '45-60 minutes',
      partnerApps: ['Zomato', 'Swiggy', 'Uber Eats']
    },
    
    // Event Hosting
    events: {
      privateParties: true,
      corporateEvents: true,
      weddings: true,
      birthdays: true,
      minimumGuests: 20,
      maximumGuests: 150,
      advanceBooking: 7 // days minimum
    }
  };
  
  // Testimonials & Reviews
  export const testimonials = [
    {
      id: 'test-001',
      name: 'Arjun Mehta',
      rating: 5,
      text: 'Exceptional dining experience! The Masala Old Fashioned is a masterpiece, and the Butter Chicken was perfectly balanced. Highly recommended!',
      date: '2024-01-15',
      verified: true
    },
    {
      id: 'test-002',
      name: 'Priya Nair',
      rating: 5,
      text: 'Beautiful ambiance and outstanding service. The fusion desserts are incredibly creative. Perfect for special occasions.',
      date: '2024-01-10',
      verified: true
    },
    {
      id: 'test-003',
      name: 'Vikash Singh',
      rating: 5,
      text: 'Best Indian restaurant in Bangalore! The cocktail menu is innovative and the food quality is consistently excellent.',
      date: '2024-01-08',
      verified: true
    },
    {
      id: 'test-004',
      name: 'Anita Sharma',
      rating: 4,
      text: 'Loved the live kitchen experience and the attentive staff. The Rogan Josh was authentic and flavorful.',
      date: '2024-01-05',
      verified: true
    },
    {
      id: 'test-005',
      name: 'Rohit Gupta',
      rating: 5,
      text: 'Perfect venue for our corporate dinner. Professional service, excellent food, and great atmosphere.',
      date: '2024-01-03',
      verified: true
    }
  ];
  
  // FAQ Section
  export const faq = [
    {
      question: 'Do you accept reservations?',
      answer: 'Yes, we accept reservations up to 30 days in advance. You can book online through our website or call us directly.'
    },
    {
      question: 'Do you offer vegan options?',
      answer: 'Yes, we have several vegan options available. Please inform our staff about your dietary preferences and we\'ll be happy to accommodate.'
    },
    {
      question: 'Is there parking available?',
      answer: 'Yes, we offer complimentary valet parking for our guests. Street parking is also available nearby.'
    },
    {
      question: 'Can you accommodate large groups?',
      answer: 'Absolutely! We have private dining rooms that can accommodate groups of 20-50 people. Please contact us for group bookings.'
    },
    {
      question: 'Do you provide catering services?',
      answer: 'Yes, we offer catering services for corporate events, weddings, and private parties. Contact us for customized menus and pricing.'
    },
    {
      question: 'What safety measures do you have in place?',
      answer: 'We follow all health and safety guidelines including regular sanitization, temperature checks, and proper ventilation systems.'
    }
  ];
  
  export default {
    restaurantInfo,
    businessConfig,
    testimonials,
    faq
  };