import React, { useState, useEffect } from 'react';
import { ChevronDown, Play, MapPin, Clock, Phone } from 'lucide-react';

const heroMedia = [
  { type: 'video', src: '/images/gallery/hero-bg.mp4' },
  { type: 'image', src: '/images/gallery/outdoor.jpg' },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroMedia.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const scrollToNext = () => {
    const nextSection = document.getElementById('about');
    nextSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const isOutdoor = heroMedia[current].src.includes('outdoor.jpg');
  const isVideo = heroMedia[current].type === 'video';

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background slideshow/video */}
      <div className="absolute inset-0 z-0">
        {heroMedia.map((media, idx) => (
          <div
            key={media.src}
            className={`absolute inset-0 transition-opacity duration-1000 ${idx === current ? 'opacity-100' : 'opacity-0'}`}
            style={{ pointerEvents: 'none' }}
          >
            {media.type === 'video' ? (
              <video
                src={media.src}
                poster="/images/gallery/outdoor.jpg"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
                style={{ aspectRatio: '16/9', maxWidth: '100vw', maxHeight: '100vh' }}
              />
            ) : (
              <img
                src={media.src}
                alt="Tamberma Hero"
                className="w-full h-full object-cover"
                style={{ aspectRatio: '16/9', maxWidth: '100vw', maxHeight: '100vh', objectPosition: 'center' }}
              />
            )}
          </div>
        ))}
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-black/30" />
      </div>
      {/* Main Content */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center text-center min-h-[70vh] md:min-h-screen pt-10 md:pt-24">
        {/* Logo and main content here */}
        <div className="transform transition-all duration-1500 translate-y-0 opacity-100 w-full flex flex-col items-center justify-center">
          {/* Main Heading */}
          <h1 className="font-display font-bold text-white mb-6 leading-tight text-3xl md:text-5xl lg:text-7xl">
            <span className="block">Authentic Indian</span>
            <span className="block text-transparent bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-3xl md:text-5xl lg:text-7xl">
              Culinary Experience
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto leading-relaxed">
            Where traditional flavors meet modern elegance. Discover premium Indian cuisine
            paired with handcrafted cocktails in the heart of the city.
          </p>

          {/* Quick Info Cards */}
          {/* Removed the grid with MapPin, Clock, Phone cards */}

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="group bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-orange-500/25 min-w-[200px]"
            >
              <span className="flex items-center justify-center gap-2">
                Make Reservation
                <div className="w-2 h-2 bg-white rounded-full group-hover:animate-pulse" />
              </span>
            </button>

            <button
              onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
              className="group bg-white/10 backdrop-blur-md hover:bg-white/20 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 border border-white/30 hover:border-white/50 min-w-[200px]"
            >
              <span className="flex items-center justify-center gap-2">
                <Play className="w-4 h-4" />
                Virtual Tour
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white hover:text-orange-400 transition-colors duration-300 animate-bounce z-10"
      >
        <ChevronDown className="w-8 h-8" />
      </button>

      {/* Image Dots Indicator */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {heroMedia.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${index === current
                ? 'bg-orange-400 w-8'
                : 'bg-white/40 hover:bg-white/60'
              }`}
          />
        ))}
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-10 w-4 h-4 bg-orange-400/30 rounded-full animate-pulse hidden lg:block" />
      <div className="absolute top-1/3 right-20 w-6 h-6 border border-orange-400/30 rounded-full animate-pulse hidden lg:block" />
      <div className="absolute bottom-1/4 right-10 w-3 h-3 bg-white/20 rounded-full animate-pulse hidden lg:block" />
    </section>
  );
};