"use client"
import { useState, useMemo } from 'react'
import { Camera } from 'lucide-react'
import { getFilteredImages, GalleryCategory } from '@/data/gallery'
import { useBooking } from '@/contexts/BookingContext'
import GalleryFilter from '@/components/gallery/GalleryFilter'
import GalleryGrid from '@/components/gallery/GalleryGrid'
import GalleryLightbox from '@/components/gallery/GalleryLightbox'

export default function GalleryPage() {
    const { openDrawer } = useBooking()
    const [activeCategory, setActiveCategory] = useState<GalleryCategory>('all')
    const [lightboxOpen, setLightboxOpen] = useState(false)
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    // Get filtered images
    const filteredImages = useMemo(() =>
        getFilteredImages(activeCategory),
        [activeCategory]
    )

    const handleImageClick = (index: number) => {
        setCurrentImageIndex(index)
        setLightboxOpen(true)
    }

    const handleLightboxNavigate = (index: number) => {
        setCurrentImageIndex(index)
    }

    return (
        <main className="min-h-screen bg-white pt-20">
            {/* Hero Section */}
            <section className="text-center px-4 pt-16 pb-14 max-w-3xl mx-auto">
                <div className="flex items-center justify-center gap-2 mb-4">
                    <Camera className="w-5 h-5 text-primary" />
                    <span className="text-primary text-xs uppercase tracking-[0.25em] font-medium">
                        Gallery
                    </span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display text-neutral-900 mb-5">
                    Visual Journey
                </h1>
                <p className="text-neutral-500 text-lg max-w-xl mx-auto leading-relaxed">
                    Step inside Tamberma — where culinary artistry meets warm hospitality.
                </p>
            </section>

            {/* Filter Tabs */}
            <section className="px-4 pb-16">
                <GalleryFilter
                    activeCategory={activeCategory}
                    onCategoryChange={setActiveCategory}
                />
            </section>

            {/* Gallery Grid */}
            <section className="max-w-7xl mx-auto px-4 md:px-8 pb-24">
                {filteredImages.length > 0 ? (
                    <GalleryGrid
                        images={filteredImages}
                        onImageClick={handleImageClick}
                    />
                ) : (
                    <div className="text-center py-20">
                        <p className="text-neutral-400 text-lg">No images in this category yet.</p>
                    </div>
                )}
            </section>

            {/* Lightbox Modal */}
            <GalleryLightbox
                images={filteredImages}
                currentIndex={currentImageIndex}
                isOpen={lightboxOpen}
                onClose={() => setLightboxOpen(false)}
                onNavigate={handleLightboxNavigate}
            />

            {/* Bottom CTA */}
            <section className="bg-neutral-50 border-t border-neutral-100 text-center px-4 py-24">
                <div className="max-w-xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-display text-neutral-900 mb-5">
                        Experience It In Person
                    </h2>
                    <p className="text-neutral-500 text-sm mb-8">
                        Photos don&apos;t do justice to the full experience. Visit us and create your own memories.
                    </p>
                    <button
                        onClick={openDrawer}
                        className="bg-primary text-white px-12 py-4 rounded-full font-medium hover:bg-primary-600 transition-colors shadow-luxury hover:shadow-luxury-hover transform hover:-translate-y-0.5 duration-300"
                    >
                        Make a Reservation
                    </button>
                </div>
            </section>
        </main>
    )
}
