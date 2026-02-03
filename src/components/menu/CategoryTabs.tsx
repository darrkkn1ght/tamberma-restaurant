"use client"
import { useEffect, useRef } from 'react'

interface CategoryTabsProps {
    categories: string[]
    activeCategory: string
    onCategoryChange: (category: string) => void
    isSticky?: boolean
}

export default function CategoryTabs({ categories, activeCategory, onCategoryChange, isSticky = false }: CategoryTabsProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null)

    // Scroll active tab into view
    useEffect(() => {
        if (scrollContainerRef.current) {
            const activeButton = scrollContainerRef.current.querySelector(`[data-category="${activeCategory}"]`)
            if (activeButton) {
                activeButton.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
            }
        }
    }, [activeCategory])

    const handleCategoryClick = (category: string) => {
        onCategoryChange(category)
        // Scroll to section
        const element = document.getElementById(`menu-section-${category.replace(/[^a-zA-Z0-9]/g, '-')}`)
        if (element) {
            const offset = 160 // Header + tabs height
            const elementPosition = element.getBoundingClientRect().top + window.scrollY
            window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' })
        }
    }

    return (
        <div
            className={`sticky top-[68px] z-40 transition-all duration-500 ${isSticky
                    ? 'bg-white/90 backdrop-blur-xl shadow-md border-b border-neutral-100'
                    : 'bg-white/80 backdrop-blur-sm'
                }`}
        >
            <div className="max-w-5xl mx-auto px-4">
                <div
                    ref={scrollContainerRef}
                    className="flex gap-1 py-5 overflow-x-auto scrollbar-hide"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {categories.map((category) => {
                        const isActive = activeCategory === category
                        return (
                            <button
                                key={category}
                                data-category={category}
                                onClick={() => handleCategoryClick(category)}
                                className={`relative whitespace-nowrap px-5 py-2.5 text-sm font-medium transition-all duration-300 rounded-lg ${isActive
                                        ? 'text-neutral-900'
                                        : 'text-neutral-400 hover:text-neutral-600 hover:bg-neutral-50'
                                    }`}
                            >
                                {category}
                                {/* Animated underline */}
                                <span
                                    className={`absolute bottom-1 left-3 right-3 h-0.5 bg-primary rounded-full transition-all duration-500 ease-out ${isActive
                                            ? 'opacity-100 scale-x-100'
                                            : 'opacity-0 scale-x-0'
                                        }`}
                                    style={{ transformOrigin: 'center' }}
                                />
                            </button>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
