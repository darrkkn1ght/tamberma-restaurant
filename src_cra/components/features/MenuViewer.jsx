import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const tabVariants = {
  active: 'bg-white/70 shadow-lg text-primary-500',
  inactive: 'bg-neutral-100/60 text-neutral-800 hover:bg-white/80',
};

const MenuViewer = () => {
  const [menuData, setMenuData] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/menu.json')
      .then(res => res.json())
      .then(data => {
        setMenuData(data);
        const cats = Object.keys(data);
        if (cats.length > 0) setActiveCategory(cats[0]);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load menu", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center py-10">Loading menu...</div>;
  if (!menuData) return <div className="text-center py-10 text-red-500">Failed to load menu data.</div>;

  // Format category names for display (e.g. "beerAndSpirits" -> "Beer & Spirits")
  // For now, we use keys as is or map them if needed. 
  // Given the JSON keys are camelCase, a formatter would be nice, but let's stick to simple first.
  const categories = Object.keys(menuData);

  // Helper to format camelCase to Title Case
  const formatCategory = (key) => key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());

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
            {formatCategory(cat)}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        {activeCategory && menuData[activeCategory] && (
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="grid gap-6 sm:grid-cols-2"
          >
            {/* Handle structure variation: some items are inside sections array, some direct? */}
            {/* Based on extraction script, menuData[key] is an ARRAY of SECTIONS */}
            {/* Each section has an 'items' array. We need to flatten them for this simple viewer or just show first section? */}
            {/* The original MenuViewer expected menuData[activeCategory] to be an array of items directly. */}
            {/* BUT the original menuData.js had arrays of sections. */}
            {/* So MenuViewer.jsx was likely ALREADY BROKEN or compatible with a different structure. */}
            {/* Let's assume we want to show all items in all sections of the category. */}

            {menuData[activeCategory].flatMap(section => section.items).map((item, idx) => (
              <motion.div
                key={item.id || idx}
                whileHover={{ scale: 1.03, boxShadow: '0 8px 32px 0 rgba(230,126,34,0.10)' }}
                className="bg-white/90 rounded-xl p-5 shadow-md border border-neutral-100 flex flex-col gap-2 transition-all duration-200 group hover:bg-primary-50/60"
              >
                <div className="flex items-center gap-2">
                  <h3 className="font-display text-lg text-neutral-900 font-semibold flex-1">{item.name}</h3>
                  {item.vegetarian && (
                    <span className="ml-2 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">Veg</span>
                  )}
                </div>
                {item.description && <p className="text-neutral-700 font-sans text-sm leading-relaxed flex-1">{item.description}</p>}
                <div className="flex items-center justify-between mt-2">
                  <span className="text-primary-500 font-medium font-sans text-base">
                    {typeof item.price === 'object'
                      ? Object.entries(item.price).map(([k, v]) => `${k}:${v}`).join(' ')
                      : `₦${item.price?.toLocaleString()}`}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default MenuViewer;
