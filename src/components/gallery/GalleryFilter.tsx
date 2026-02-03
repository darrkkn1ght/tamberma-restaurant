"use client"
import { galleryCategories, GalleryCategory } from '@/data/gallery'

interface GalleryFilterProps {
    activeCategory: GalleryCategory
    onCategoryChange: (category: GalleryCategory) => void
}

export default function GalleryFilter({ activeCategory, onCategoryChange }: GalleryFilterProps) {
    return (
        <div className="flex flex-wrap justify-center gap-3">
            {galleryCategories.map((cat) => {
                const isActive = activeCategory === cat.id
                return (
                    <button
                        key={cat.id}
                        onClick={() => onCategoryChange(cat.id as GalleryCategory)}
                        className={`relative px-6 py-3 text-sm font-medium rounded-full transition-all duration-300 transform ${isActive
                                ? 'bg-neutral-900 text-white shadow-lg scale-105'
                                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:scale-[1.02]'
                            }`}
                    >
                        {cat.label}
                    </button>
                )
            })}
        </div>
    )
}
