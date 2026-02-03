import React, { useState, useEffect } from 'react';
import ImageGallery from '../features/ImageGallery';
import { galleryData } from '../../data/galleryData';
import { SkeletonCard } from '../ui/LoadingSpinner';
import Modal, { ImageModal } from '../ui/Modal';

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [showAllModal, setShowAllModal] = useState(false);
  const [zoomIndex, setZoomIndex] = useState(null); // index of zoomed image

  const categories = galleryData.categories;
  const galleryItems = galleryData.featured;

  const filteredItems = selectedCategory === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === selectedCategory);

  // Optimize filter switching - remove artificial delay
  useEffect(() => {
    // Immediate filter switch
    setLoading(false);
  }, [selectedCategory]);

  return (
    <section id="gallery" className="py-10 sm:py-16 md:py-20 bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-400/10 rounded-full mb-6">
            <svg className="w-8 h-8 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-4xl md:text-5xl font-display text-white mb-6">
            Our <span className="text-primary-400">Gallery</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Step into our world of culinary artistry and sophisticated ambiance.
            Every corner tells a story of passion, tradition, and excellence.<br />
            <span className="block mt-4 text-primary-400 font-medium">
              For more photos, follow us on <a href="https://instagram.com/tamberma_ibadan" target="_blank" rel="noopener noreferrer" className="underline">Instagram @tamberma_ibadan</a>.
            </span>
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 border-2 ${selectedCategory === category.id
                  ? 'bg-primary-400 text-white border-primary-400 shadow-lg shadow-primary-400/25'
                  : 'bg-transparent text-gray-300 border-gray-600 hover:border-primary-400 hover:text-primary-400'
                }`}
            >
              {category.label}
              <span className="ml-2 px-2 py-1 text-xs rounded-full bg-white/10">
                {category.count}
              </span>
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        {(() => {
          const maxToShow = 4;
          const items = loading ? [] : filteredItems.slice(0, maxToShow);
          const extraCount = loading ? 0 : filteredItems.length - maxToShow;
          return (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {loading
                ? Array.from({ length: maxToShow }).map((_, i) => (
                  <SkeletonCard key={i} className="h-40 sm:h-48 md:h-56" />
                ))
                : items.map((item, index) => (
                  <div
                    key={item.id}
                    className="group relative bg-neutral-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Image Container */}
                    <div className="relative h-40 sm:h-48 md:h-56 overflow-hidden">
                      <img
                        src={item.src}
                        alt={item.alt}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                      {/* +N Overlay for last image if extra */}
                      {extraCount > 0 && index === maxToShow - 1 && (
                        <button
                          className="absolute inset-0 bg-black/60 flex items-center justify-center focus:outline-none"
                          onClick={() => setShowAllModal(true)}
                          aria-label={`Show all ${filteredItems.length} images`}
                        >
                          <span className="text-3xl font-bold text-white">+{extraCount}</span>
                        </button>
                      )}
                    </div>
                    {/* Category Badge */}
                    <div className="absolute top-2 right-2">
                      <span className="px-2 py-1 bg-white/90 backdrop-blur-sm text-neutral-900 text-xs font-medium rounded-full">
                        {categories.find(cat => cat.id === item.category)?.label}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          );
        })()}

        {/* Modal for all images */}
        <Modal isOpen={showAllModal} onClose={() => setShowAllModal(false)} size="xlarge" title="Gallery">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-h-[70vh] overflow-y-auto">
            {filteredItems.map((item, idx) => (
              <div key={item.id} className="relative rounded-xl overflow-hidden cursor-zoom-in" onClick={() => setZoomIndex(idx)}>
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  className="w-full h-32 sm:h-40 md:h-48 object-cover"
                />
                <div className="absolute bottom-1 left-1 bg-white/80 text-xs text-neutral-900 px-2 py-1 rounded">
                  {categories.find(cat => cat.id === item.category)?.label}
                </div>
              </div>
            ))}
          </div>
        </Modal>

        {/* Image Zoom Modal with navigation */}
        <ImageModal
          isOpen={zoomIndex !== null}
          onClose={() => setZoomIndex(null)}
          src={zoomIndex !== null ? filteredItems[zoomIndex].src : ''}
          alt={zoomIndex !== null ? filteredItems[zoomIndex].alt : ''}
          title={zoomIndex !== null ? filteredItems[zoomIndex].title : ''}
        >
          {zoomIndex !== null && (
            <div className="absolute inset-y-0 left-0 flex items-center">
              <button
                className="p-2 bg-black/40 text-white rounded-full hover:bg-black/70 focus:outline-none"
                onClick={e => { e.stopPropagation(); setZoomIndex((zoomIndex - 1 + filteredItems.length) % filteredItems.length); }}
                aria-label="Previous image"
                disabled={filteredItems.length <= 1}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </button>
            </div>
          )}
          {zoomIndex !== null && (
            <div className="absolute inset-y-0 right-0 flex items-center">
              <button
                className="p-2 bg-black/40 text-white rounded-full hover:bg-black/70 focus:outline-none"
                onClick={e => { e.stopPropagation(); setZoomIndex((zoomIndex + 1) % filteredItems.length); }}
                aria-label="Next image"
                disabled={filteredItems.length <= 1}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          )}
        </ImageModal>

        {/* Load More Button */}
        <div className="text-center mt-16">
          <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-400 to-primary-500 text-white font-medium rounded-full hover:from-primary-500 hover:to-primary-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 group">
            <span>View Full Gallery</span>
            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e67e22' fill-opacity='0.1'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
    </section>
  );
};

export default Gallery;