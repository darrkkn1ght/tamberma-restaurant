import React, { useState } from 'react';
import { menuData } from '../../data/menuData';
import { motion, AnimatePresence } from 'framer-motion';

const categories = Object.keys(menuData);

const tabVariants = {
  active: 'bg-white/70 shadow-lg text-primary-500',
  inactive: 'bg-neutral-100/60 text-neutral-800 hover:bg-white/80',
};

const MenuViewer = () => {
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  return (
    <section className="w-full max-w-3xl mx-auto my-10 p-6 rounded-2xl bg-white/80 backdrop-blur-md shadow-2xl border border-neutral-100 animate-fade-in">
      <h2 className="font-display text-3xl md:text-4xl text-primary-500 mb-6 text-center tracking-tight">Our Menu</h2>
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`px-5 py-2 rounded-full font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 ${activeCategory === cat ? tabVariants.active : tabVariants.inactive}`}
            onClick={() => setActiveCategory(cat)}
            aria-pressed={activeCategory === cat}
          >
            {cat}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="grid gap-6 sm:grid-cols-2"
        >
          {menuData[activeCategory].map((item, idx) => (
            <motion.div
              key={item.name}
              whileHover={{ scale: 1.03, boxShadow: '0 8px 32px 0 rgba(230,126,34,0.10)' }}
              className="bg-white/90 rounded-xl p-5 shadow-md border border-neutral-100 flex flex-col gap-2 transition-all duration-200 group hover:bg-primary-50/60"
            >
              <div className="flex items-center gap-2">
                <h3 className="font-display text-lg text-neutral-900 font-semibold flex-1">{item.name}</h3>
                {item.badge && (
                  <span className="ml-2 px-2 py-0.5 rounded-full text-xs font-medium bg-primary-400 text-white animate-pulse">{item.badge}</span>
                )}
              </div>
              <p className="text-neutral-700 font-sans text-sm leading-relaxed flex-1">{item.description}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-primary-500 font-medium font-sans text-base">${item.price.toFixed(2)}</span>
                {item.spicy && <span className="ml-2 text-xs text-red-500 font-bold animate-bounce">🌶️ Spicy</span>}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default MenuViewer;
