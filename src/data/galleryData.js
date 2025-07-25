// Gallery data for Tamberma Restaurant
// Contains organized image data for different gallery sections

export const galleryData = {
    // Hero and main gallery images
    hero: {
      main: '/images/gallery/hero-bg.jpg',
      overlay: '/images/ui/hero-overlay.png'
    },
  
    // Restaurant ambiance and interior photos
    ambiance: [
      {
        id: 'amb-1',
        src: '/images/gallery/ambiance-1.jpg',
        alt: 'Tamberma Restaurant elegant dining room with warm lighting',
        category: 'interior',
        title: 'Elegant Dining Room',
        description: 'Our sophisticated dining space with warm ambient lighting'
      },
      {
        id: 'amb-2',
        src: '/images/gallery/ambiance-2.jpg',
        alt: 'Tamberma Restaurant cozy seating area',
        category: 'interior',
        title: 'Intimate Seating',
        description: 'Perfect for romantic dinners and special occasions'
      },
      {
        id: 'outdoor-1',
        src: '/images/gallery/outdoor.jpg',
        alt: 'Tamberma Restaurant outdoor terrace dining',
        category: 'exterior',
        title: 'Outdoor Terrace',
        description: 'Al fresco dining with city views'
      }
    ],
  
    // Food photography
    cuisine: [
      {
        id: 'food-1',
        src: '/images/gallery/food-1.jpg',
        alt: 'Premium Indian curry dishes at Tamberma Restaurant',
        category: 'food',
        title: 'Signature Curries',
        description: 'Authentic Indian flavors crafted with premium ingredients'
      }
    ],
  
    // Cocktail and beverage photos
    beverages: [
      {
        id: 'cocktail-1',
        src: '/images/gallery/cocktails-1.jpg',
        alt: 'Craft cocktails at Tamberma Restaurant bar',
        category: 'beverages',
        title: 'Craft Cocktails',
        description: 'Handcrafted cocktails with premium spirits and fresh ingredients'
      }
    ],
  
    // Combined gallery for main gallery component
    featured: [
      {
        id: 'featured-1',
        src: '/images/gallery/ambiance-1.jpg',
        alt: 'Tamberma Restaurant elegant dining room',
        category: 'interior',
        title: 'Elegant Dining',
        featured: true
      },
      {
        id: 'featured-2',
        src: '/images/gallery/food-1.jpg',
        alt: 'Premium Indian cuisine',
        category: 'food',
        title: 'Authentic Flavors',
        featured: true
      },
      {
        id: 'featured-3',
        src: '/images/gallery/cocktails-1.jpg',
        alt: 'Craft cocktails and premium beverages',
        category: 'beverages',
        title: 'Craft Cocktails',
        featured: true
      },
      {
        id: 'featured-4',
        src: '/images/gallery/ambiance-2.jpg',
        alt: 'Intimate dining atmosphere',
        category: 'interior',
        title: 'Intimate Setting',
        featured: true
      },
      {
        id: 'featured-5',
        src: '/images/gallery/outdoor.jpg',
        alt: 'Outdoor terrace dining',
        category: 'exterior',
        title: 'Outdoor Dining',
        featured: true
      }
    ],
  
    // Gallery categories for filtering
    categories: [
      {
        id: 'all',
        name: 'All',
        slug: 'all'
      },
      {
        id: 'interior',
        name: 'Interior',
        slug: 'interior'
      },
      {
        id: 'food',
        name: 'Cuisine',
        slug: 'food'
      },
      {
        id: 'beverages',
        name: 'Cocktails',
        slug: 'beverages'
      },
      {
        id: 'exterior',
        name: 'Outdoor',
        slug: 'exterior'
      }
    ]
  };
  
  // Helper function to get images by category
  export const getImagesByCategory = (category) => {
    if (category === 'all') {
      return galleryData.featured;
    }
    
    return galleryData.featured.filter(image => image.category === category);
  };
  
  // Helper function to get featured images for homepage
  export const getFeaturedImages = (limit = 6) => {
    return galleryData.featured.slice(0, limit);
  };
  
  // Helper function to get random images
  export const getRandomImages = (count = 3) => {
    const shuffled = [...galleryData.featured].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };