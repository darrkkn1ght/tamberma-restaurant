import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Flame, Leaf, Star, Wine, Coffee } from 'lucide-react';
import { Link } from 'react-router-dom';

const MenuPreview = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState('appetizers');
  const sectionRef = useRef(null);

  const categories = [
    { id: 'appetizers', name: 'Appetizers', icon: Star },
    { id: 'mains', name: 'Main Course', icon: Flame },
    { id: 'vegetarian', name: 'Vegetarian', icon: Leaf },
    { id: 'beverages', name: 'Beverages', icon: Wine },
    { id: 'desserts', name: 'Desserts', icon: Coffee }
  ];

  const menuItems = {
    appetizers: [
      {
        name: 'Tandoori Chicken Wings',
        description: 'Marinated in yogurt and spices, cooked in our traditional tandoor',
        price: '$16',
        spicy: true,
        popular: true,
        image: '/images/menu/bar-menu-1.jpg'
      },
      {
        name: 'Samosa Chaat',
        description: 'Crispy samosas topped with tangy chutneys and fresh herbs',
        price: '$12',
        vegetarian: true,
        image: '/images/menu/indian-menu-1.jpg'
      },
      {
        name: 'Seekh Kebab',
        description: 'Minced lamb skewers with aromatic spices and mint chutney',
        price: '$18',
        spicy: true,
        image: '/images/menu/bar-menu-2.jpg'
      }
    ],
    mains: [
      {
        name: 'Butter Chicken',
        description: 'Tender chicken in rich tomato-based creamy curry sauce',
        price: '$24',
        popular: true,
        image: '/images/menu/indian-menu-2.jpg'
      },
      {
        name: 'Lamb Biryani',
        description: 'Fragrant basmati rice layered with spiced lamb and saffron',
        price: '$28',
        spicy: true,
        image: '/images/menu/bar-menu-3.jpg'
      },
      {
        name: 'Fish Curry',
        description: 'Fresh catch of the day in coconut-based South Indian curry',
        price: '$26',
        spicy: true,
        image: '/images/menu/bar-menu-4.jpg'
      }
    ],
    vegetarian: [
      {
        name: 'Paneer Makhani',
        description: 'Cottage cheese cubes in silky tomato and cream sauce',
        price: '$20',
        vegetarian: true,
        popular: true,
        image: '/images/menu/indian-menu-1.jpg'
      },
      {
        name: 'Dal Tadka',
        description: 'Yellow lentils tempered with cumin and fresh herbs',
        price: '$16',
        vegetarian: true,
        image: '/images/menu/indian-menu-2.jpg'
      },
      {
        name: 'Aloo Gobi',
        description: 'Potatoes and cauliflower cooked with turmeric and spices',
        price: '$18',
        vegetarian: true,
        image: '/images/menu/bar-menu-1.jpg'
      }
    ],
    beverages: [
      {
        name: 'Mango Lassi Cocktail',
        description: 'Traditional lassi with premium vodka and fresh mango',
        price: '$14',
        popular: true,
        image: '/images/menu/bar-menu-2.jpg'
      },
      {
        name: 'Spiced Chai Martini',
        description: 'Indian spices meet premium gin in this unique creation',
        price: '$16',
        image: '/images/menu/bar-menu-3.jpg'
      },
      {
        name: 'Fresh Lime Water',
        description: 'Refreshing blend of fresh lime, mint, and sparkling water',
        price: '$8',
        vegetarian: true,
        image: '/images/menu/bar-menu-4.jpg'
      }
    ],
    desserts: [
      {
        name: 'Gulab Jamun',
        description: 'Soft milk dumplings in rose-scented sugar syrup',
        price: '$10',
        vegetarian: true,
        popular: true,
        image: '/images/menu/indian-menu-1.jpg'
      },
      {
        name: 'Kulfi',
        description: 'Traditional Indian ice cream with cardamom and pistachios',
        price: '$12',
        vegetarian: true,
        image: '/images/menu/indian-menu-2.jpg'
      },
      {
        name: 'Ras Malai',
        description: 'Delicate cheese dumplings in sweet, creamy milk sauce',
        price: '$14',
        vegetarian: true,
        image: '/images/menu/bar-menu-1.jpg'
      }
    ]
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const currentItems = menuItems[activeCategory] || [];

  return (
    <section id="menu" ref={sectionRef} className="py-20 bg-gradient-to-br from-neutral-900 to-neutral-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-64 h-64 bg-orange-400 rounded-full blur-3xl" />
        <div className="absolute bottom-32 right-32 w-80 h-80 bg-accent-400 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <span className="inline-block px-4 py-2 bg-orange-500/20 text-orange-400 rounded-full text-sm font-semibold mb-4 border border-orange-500/30">
            Our Menu
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
            Exquisite <span className="text-transparent bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text">Flavors</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover our carefully curated selection of authentic Indian dishes, 
            each prepared with the finest ingredients and traditional techniques.
          </p>
        </div>

        {/* Category Navigation */}
        <div className={`flex flex-wrap justify-center gap-4 mb-12 transform transition-all duration-1000 delay-300 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20 backdrop-blur-sm border border-white/20'
              }`}
            >
              <category.icon className="w-4 h-4" />
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {currentItems.map((item, index) => (
            <div
              key={`${activeCategory}-${index}`}
              className={`group bg-white/5 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/10 hover:border-orange-500/30 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl transform ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: `${500 + index * 150}ms` }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  {item.popular && (
                    <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      Popular
                    </span>
                  )}
                  {item.spicy && (
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                      <Flame className="w-3 h-3" />
                      Spicy
                    </span>
                  )}
                  {item.vegetarian && (
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                      <Leaf className="w-3 h-3" />
                      Veg
                    </span>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-display text-xl font-bold text-white group-hover:text-orange-400 transition-colors duration-300">
                    {item.name}
                  </h3>
                  <span className="text-2xl font-bold text-orange-400">{item.price}</span>
                </div>
                
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  {item.description}
                </p>

                <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 group-hover:shadow-lg group-hover:shadow-orange-500/25">
                  <span>Order Now</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Full Menu CTA */}
        <div className={`text-center transform transition-all duration-1000 delay-700 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="bg-gradient-to-r from-orange-500/10 to-accent-400/10 backdrop-blur-sm rounded-3xl p-8 border border-orange-500/20">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">
              Explore Our Complete Menu
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Discover over 50 authentic dishes, signature cocktails, and seasonal specialties. 
              Each item crafted with passion and served with pride.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/menu" className="group bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-orange-500/25 min-w-[200px]">
                <span className="flex items-center justify-center gap-2">
                  View Full Menu
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
              
              <button className="group bg-white/10 backdrop-blur-md hover:bg-white/20 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 border border-white/30 hover:border-white/50 min-w-[200px]">
                <span className="flex items-center justify-center gap-2">
                  <Wine className="w-4 h-4" />
                  Wine Pairing Guide
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Special Offers Banner */}
        <div className={`mt-12 transform transition-all duration-1000 delay-900 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="bg-gradient-to-r from-accent-500 to-accent-400 rounded-3xl p-6 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('/images/ui/hero-overlay.png')" }} />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
              <div className="text-center md:text-left mb-4 md:mb-0">
                <h4 className="font-display text-2xl font-bold text-white mb-2">
                  Chef's Special Tonight
                </h4>
                <p className="text-accent-100">
                  Experience our signature tasting menu with wine pairing
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-accent-100 text-sm line-through">$89</div>
                  <div className="text-white text-2xl font-bold">$69</div>
                </div>
                <button className="bg-white text-accent-600 px-6 py-3 rounded-full font-semibold hover:bg-accent-50 transition-colors duration-300">
                  Reserve Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MenuPreview;