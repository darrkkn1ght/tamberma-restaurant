```javascript
import React, { useState, useEffect, useRef } from 'react';
import { Award, Users, Clock, Star, ChefHat, Utensils } from 'lucide-react';
import Counter from '../ui/Counter';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const stats = [
    { icon: Clock, label: 'Years Experience', value: 15, suffix: '+' },
    { icon: ChefHat, label: 'Signature Dishes', value: 50, suffix: '+' },
    { icon: Users, label: 'Happy Customers', value: 10000, suffix: '+' },
    { icon: Star, label: 'Average Rating', value: 4.8, suffix: '/5' }
  ];

  const features = [
    {
      icon: Award,
      title: 'Award-Winning Chef',
      description: 'Our head chef brings 20+ years of experience from Mumbai\'s finest restaurants.'
    },
    {
      icon: Utensils,
      title: 'Authentic Recipes',
      description: 'Traditional family recipes passed down through generations, with a modern twist.'
    },
    {
      icon: Users,
      title: 'Private Dining',
      description: 'Exclusive dining rooms for special occasions and corporate events.'
    }
  ];

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

  return (
    <section id="about" ref={sectionRef} className="py-10 sm:py-16 md:py-20 bg-gradient-to-br from-neutral-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-orange-400 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-accent-400 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className={`text - center mb - 16 transform transition - all duration - 1000 ${
  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
} `}>
          <span className="inline-block px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold mb-4">
            Our Story
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
            Nature, Culture & <span className="text-orange-500">Cuisine</span>
          </h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            Tamberma Restaurant & Bar is where nature and food exist in harmony. Our serene, naturistic space is infused with African culture, offering a unique dining experience for families and individuals. We celebrate a multi-cuisine journey—Indian, Nigerian, Chinese, Continental, BBQ & Grill—crafted with passion, authenticity, and a love for quality.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Content */}
          <div className={`transform transition - all duration - 1000 delay - 300 ${
  isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
} `}>
            <h3 className="font-display text-3xl font-bold text-neutral-900 mb-6">
              A Multi-Cuisine Experience in a Naturistic Setting
            </h3>
            <p className="text-neutral-600 mb-6 leading-relaxed">
              Founded in Ibadan, Tamberma is a destination for those seeking a blend of African-inspired ambiance and a world of flavors. Our menu features Indian classics, Nigerian favorites, Chinese specialties, Continental delights, and BBQ & Grill—all prepared with the finest ingredients and a focus on quality.
            </p>
            <p className="text-neutral-600 mb-8 leading-relaxed">
              Whether you crave tandoori chicken, Singapore noodles, chicken suya pizza, or a signature cocktail, Tamberma is dedicated to delivering an unforgettable dining experience. Join us to immerse yourself in the beauty of Tamberma—where every meal is a celebration of culture, nature, and taste.
            </p>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-1 gap-6">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className={`flex items - start space - x - 4 transform transition - all duration - 700 ${
  isVisible ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
} `}
                  style={{ transitionDelay: `${ 600 + index * 200 } ms` }}
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-900 mb-1">{feature.title}</h4>
                    <p className="text-neutral-600 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Image Collage */}
          <div className={`transform transition - all duration - 1000 delay - 500 ${
  isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
} `}>
            <div className="relative">
              {/* Main Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="/images/gallery/ambiance-2.jpg" 
                  alt="Restaurant Interior"
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>

              {/* Floating Cards */}
              <div className="absolute -top-6 -right-6 bg-white rounded-2xl p-4 shadow-xl border border-gray-100">
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="font-bold text-neutral-900">4.8/5</span>
                </div>
                <p className="text-xs text-neutral-600 mt-1">Customer Rating</p>
              </div>

              <div className="absolute -bottom-6 -left-6 bg-orange-500 rounded-2xl p-4 shadow-xl text-white">
                <div className="font-bold text-2xl">
                   <Counter end={15} suffix="+" />
                </div>
                <p className="text-orange-100 text-xs">Years Experience</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className={`transform transition - all duration - 1000 delay - 700 ${
  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
} `}>
          <div className="bg-gradient-to-r from-neutral-900 to-neutral-800 rounded-3xl p-8 md:p-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                      <stat.icon className="w-6 h-6 text-orange-400" />
                    </div>
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {stat.label === 'Happy Customers' ? (
                       <Counter end={10} suffix="k+" /> // Optimized: Use 10k instead of counting 10000 1 by 1 or implement specific logic
                    ) : stat.label === 'Average Rating' ? (
                       <span>4.8/5</span>
                    ) : (
                       <Counter end={stat.value} suffix={stat.suffix} />
                    )}
                  </div>
                  <div className="text-gray-400 text-sm font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Social Media Links */}
      <div className="mt-12 text-center">
        <h3 className="text-lg font-semibold text-neutral-700 mb-2">Follow Us</h3>
        <div className="flex justify-center gap-6">
          <a href="https://instagram.com/tamberma_ibadan" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:underline font-medium">@tamberma_ibadan</a>
          <a href="https://facebook.com/TambermaRestaurant" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:underline font-medium">Facebook</a>
          <a href="https://www.tiktok.com/@helloibadan" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:underline font-medium">TikTok (featured)</a>
        </div>
      </div>
    </section>
  );
};

export default About;