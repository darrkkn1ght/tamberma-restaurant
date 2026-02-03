import React, { useState } from 'react';

const menuImages = [
  '/images/menu/bar-menu-1.jpg',
  '/images/menu/bar-menu-2.jpg',
  '/images/menu/bar-menu-3.jpg',
  '/images/menu/bar-menu-4.jpg',
  '/images/menu/indian-menu-1.jpg',
  '/images/menu/indian-menu-2.jpg',
];

const MenuGallery = () => {
  const [selected, setSelected] = useState(null);

  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
              <h1 className="text-4xl font-display font-bold text-center text-primary-500 mb-10">Menu Gallery</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {menuImages.map((src, idx) => (
          <button
            key={src}
            className="focus:outline-none"
            onClick={() => setSelected(src)}
          >
            <img
              src={src}
              alt={`Menu ${idx + 1}`}
              className="rounded-xl shadow-lg border border-neutral-200 w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
            />
          </button>
        ))}
      </div>
      {/* Lightbox Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50" onClick={() => setSelected(null)}>
          <img
            src={selected}
            alt="Menu Large"
            className="max-w-full max-h-[90vh] rounded-2xl shadow-2xl border-4 border-white"
          />
          <button
            className="absolute top-8 right-8 text-white text-3xl font-bold bg-black/50 rounded-full px-4 py-2 hover:bg-black/80"
            onClick={e => { e.stopPropagation(); setSelected(null); }}
            aria-label="Close"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
};

export default MenuGallery; 