// Restaurant information and configuration for Tamberma Restaurant

export const restaurantInfo = {
    name: 'Tamberma Restaurant & Bar, Ibadan',
    tagline: 'Where Culture Meets Taste',
    description: 'A rustic open-air restaurant and bar in the heart of Ibadan, offering a fusion of African, Indian, and Continental delights with vibrant cocktails and soulful ambiance.',
    
    // Contact Information
    contact: {
      phone: '+234 805 409 0607',
      email: 'tambermang@gmail.com',
      website: 'https://linktr.ee/tamberma'
    },
    
    // Location Details
    location: {
      address: {
        street: "Quarters 894, Rev'd Oyebode Crescent",
        area: 'Iyaganku',
        city: 'Ibadan',
        state: 'Oyo',
        pincode: '',
        country: 'Nigeria',
        alternative: 'Tamberma Ringroad (delivery only)'
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
      instagram: 'https://instagram.com/tamberma_ibadan',
      facebook: 'https://facebook.com/TambermaRestaurant',
      twitter: '@tamberma_blr',
      youtube: 'TambermaRestaurant',
      tiktok: 'https://www.tiktok.com/@helloibadan',
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
        year: '2023',
        title: 'Top Multi-Cuisine Restaurant in Ibadan',
        organization: 'Ibadan Food Awards'
      },
      {
        year: '2022',
        title: 'Best Nature-Infused Dining Experience',
        organization: 'Oyo State Hospitality Awards'
      },
      {
        year: '2022',
        title: 'Most Family-Friendly Restaurant',
        organization: 'Ibadan Lifestyle Magazine'
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
  
  export default restaurantInfo;