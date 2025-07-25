import React, { useState, useEffect, useRef } from 'react';
import { Award, Users, Clock, Star, ChefHat, Utensils } from 'lucide-react';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState({
    experience: 0,
    dishes: 0,
    customers: 0,
    rating: 0
  });
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
          // Animate counters
          animateCounters();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const animateCounters = () => {
    const duration = 2000;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      setCounters({
        experience: Math.floor(15 * progress),
        dishes: Math.floor(50 * progress),
        customers: Math.floor(10000 * progress),
        rating: parseFloat((4.8 * progress).toFixed(1))
      });

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  };

  return (
    <section id="about" ref={sectionRef} className="py-20 bg-gradient-to-br from-neutral-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-orange-400 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-accent-400 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <span className="inline-block px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold mb-4">
            Our Story
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
            Tradition Meets <span className="text-orange-500">Innovation</span>
          </h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            At Tamberma Restaurant, we celebrate the rich culinary heritage of India while embracing 
            contemporary dining experiences. Every dish tells a story of passion, authenticity, and innovation.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Content */}
          <div className={`transform transition-all duration-1000 delay-300 ${
            isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
          }`}>
            <h3 className="font-display text-3xl font-bold text-neutral-900 mb-6">
              A Journey Through India's Flavors
            </h3>
            <p className="text-neutral-600 mb-6 leading-relaxed">
              Founded in 2010, Tamberma Restaurant has been a cornerstone of authentic Indian cuisine 
              in the city. Our journey began with a simple mission: to bring the diverse and vibrant 
              flavors of India to our community while creating an atmosphere of warmth and hospitality.
            </p>
            <p className="text-neutral-600 mb-8 leading-relaxed">
              From our signature tandoor dishes to our carefully crafted cocktail menu, every element 
              of our restaurant reflects our commitment to quality, authenticity, and exceptional service. 
              We source the finest ingredients and spices directly from India to ensure every bite 
              transports you to the heart of Indian culinary tradition.
            </p>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-1 gap-6">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className={`flex items-start space-x-4 transform transition-all duration-700 ${
                    isVisible ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
                  }`}
                  style={{ transitionDelay: `${600 + index * 200}ms` }}
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
          <div className={`transform transition-all duration-1000 delay-500 ${
            isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
          }`}>
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
                <div className="font-bold text-2xl">15+</div>
                <p className="text-orange-100 text-xs">Years Experience</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className={`transform transition-all duration-1000 delay-700 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
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
                    {stat.label === 'Happy Customers' 
                      ? `${(counters.customers / 1000).toFixed(0)}k` 
                      : stat.label === 'Average Rating'
                      ? counters.rating
                      : stat.label === 'Years Experience'
                      ? counters.experience
                      : counters.dishes
                    }{stat.suffix}
                  </div>
                  <div className="text-gray-400 text-sm font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;