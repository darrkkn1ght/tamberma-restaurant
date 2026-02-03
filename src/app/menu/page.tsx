"use client"
import { useState, useMemo, useEffect } from 'react'
import { Sparkles } from 'lucide-react'
import { menuData, getAllMenuItems, getFeaturedItems, MenuItem, MenuCategory } from '@/data/menu'
import { useBooking } from '@/contexts/BookingContext'
import CategoryTabs from '@/components/menu/CategoryTabs'
import MenuItemRow from '@/components/menu/MenuItemRow'
import MenuSearch from '@/components/menu/MenuSearch'
import FeaturedMenuCard from '@/components/menu/FeaturedMenuCard'

export default function MenuPage() {
    const { openDrawer } = useBooking()
    const [searchQuery, setSearchQuery] = useState('')
    const [activeFilters, setActiveFilters] = useState<string[]>([])
    const [activeCategory, setActiveCategory] = useState(menuData.menu[0]?.category || '')
    const [isTabsSticky, setIsTabsSticky] = useState(false)

    // Get all items for search
    const allItems = useMemo(() => getAllMenuItems(), [])

    // Get featured items (max 6 for cleaner display)
    const featuredItems = useMemo(() => getFeaturedItems().slice(0, 6), [])

    // Category names
    const categoryNames = useMemo(() => menuData.menu.map(cat => cat.category), [])

    // Filter items based on search and filters
    const filteredResults = useMemo(() => {
        if (!searchQuery && activeFilters.length === 0) return null

        let results = allItems

        // Search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase()
            results = results.filter(item =>
                item.name.toLowerCase().includes(query) ||
                item.tags.some(tag => tag.toLowerCase().includes(query))
            )
        }

        // Tag filters
        if (activeFilters.length > 0) {
            results = results.filter(item =>
                activeFilters.some(filter => item.tags.includes(filter))
            )
        }

        return results
    }, [searchQuery, activeFilters, allItems])

    // Toggle filter
    const handleFilterToggle = (filter: string) => {
        setActiveFilters(prev =>
            prev.includes(filter)
                ? prev.filter(f => f !== filter)
                : [...prev, filter]
        )
    }

    // Track active category and sticky state on scroll
    useEffect(() => {
        const handleScroll = () => {
            // Check if tabs should be sticky
            setIsTabsSticky(window.scrollY > 400)

            if (filteredResults) return // Don't track when filtering

            const sections = categoryNames.map(name => ({
                name,
                element: document.getElementById(`menu-section-${name.replace(/[^a-zA-Z0-9]/g, '-')}`)
            }))

            for (const section of sections.reverse()) {
                if (section.element) {
                    const rect = section.element.getBoundingClientRect()
                    if (rect.top <= 200) {
                        setActiveCategory(section.name)
                        break
                    }
                }
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [categoryNames, filteredResults])

    // Get items from a category (handles subcategories)
    const getCategoryItems = (category: MenuCategory): MenuItem[] => {
        const items: MenuItem[] = []
        if (category.items) items.push(...category.items)
        if (category.subcategories) {
            for (const sub of category.subcategories) {
                items.push(...sub.items)
            }
        }
        if (category.plain_rice_options) items.push(...category.plain_rice_options)
        return items
    }

    return (
        <main className="min-h-screen bg-white pt-20">
            {/* Hero Section */}
            <section className="text-center px-4 pt-16 pb-12 max-w-3xl mx-auto">
                <span className="text-primary text-xs uppercase tracking-[0.25em] font-medium">Our Menu</span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display text-neutral-900 mt-4 mb-5">
                    Curated Culinary Excellence
                </h1>
                <p className="text-neutral-500 text-lg max-w-xl mx-auto leading-relaxed">
                    From authentic Indian curries to beloved Nigerian classics — every dish tells a story.
                </p>
            </section>

            {/* Search & Filter */}
            <MenuSearch
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                activeFilters={activeFilters}
                onFilterToggle={handleFilterToggle}
            />

            {/* Show filtered results or full menu */}
            {filteredResults ? (
                <section className="max-w-5xl mx-auto px-4 py-12">
                    <p className="text-neutral-400 text-sm mb-8">
                        {filteredResults.length} result{filteredResults.length !== 1 ? 's' : ''} found
                    </p>
                    {filteredResults.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
                            {filteredResults.map(item => (
                                <MenuItemRow key={item.id} item={item} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <p className="text-neutral-400 text-lg">No items match your search.</p>
                            <button
                                onClick={() => { setSearchQuery(''); setActiveFilters([]) }}
                                className="mt-4 text-primary hover:underline text-sm"
                            >
                                Clear filters
                            </button>
                        </div>
                    )}
                </section>
            ) : (
                <>
                    {/* Featured Section */}
                    {featuredItems.length > 0 && (
                        <section className="py-16 bg-neutral-50/50">
                            <div className="max-w-5xl mx-auto px-4">
                                <div className="flex items-center gap-3 mb-8">
                                    <Sparkles className="text-primary" size={18} />
                                    <h2 className="text-2xl font-display text-neutral-900">Signature Selections</h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {featuredItems.map(item => (
                                        <FeaturedMenuCard key={item.id} item={item} />
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Category Tabs */}
                    <CategoryTabs
                        categories={categoryNames}
                        activeCategory={activeCategory}
                        onCategoryChange={setActiveCategory}
                        isSticky={isTabsSticky}
                    />

                    {/* Menu Sections */}
                    <section className="max-w-5xl mx-auto px-4 py-12">
                        {menuData.menu.map((category) => {
                            const items = getCategoryItems(category)
                            const sectionId = `menu-section-${category.category.replace(/[^a-zA-Z0-9]/g, '-')}`

                            return (
                                <div key={category.category} id={sectionId} className="mb-20 scroll-mt-40">
                                    {/* Category Header with Divider */}
                                    <div className="flex items-center gap-4 mb-10">
                                        <h2 className="text-3xl md:text-4xl font-display text-neutral-900 whitespace-nowrap">
                                            {category.category}
                                        </h2>
                                        <div className="flex-1 h-px bg-gradient-to-r from-neutral-200 to-transparent" />
                                    </div>

                                    {/* If has subcategories, show them grouped */}
                                    {category.subcategories ? (
                                        <div className="space-y-14">
                                            {category.subcategories.map(sub => (
                                                <div key={sub.subcategory}>
                                                    <h3 className="text-lg font-medium text-neutral-600 mb-4 pb-2 border-b border-neutral-100">
                                                        {sub.subcategory}
                                                        {sub.price_ngn && (
                                                            <span className="text-sm text-neutral-400 ml-3 font-normal">
                                                                All ₦{sub.price_ngn.toLocaleString()}
                                                            </span>
                                                        )}
                                                    </h3>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
                                                        {sub.items.map(item => (
                                                            <MenuItemRow key={item.id} item={item} />
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
                                            {items.map(item => (
                                                <MenuItemRow key={item.id} item={item} />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </section>
                </>
            )}

            {/* Bottom CTA */}
            <section className="bg-neutral-50 border-t border-neutral-100 text-center px-4 py-24">
                <div className="max-w-xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-display text-neutral-900 mb-5">
                        Ready to dine with us?
                    </h2>
                    <p className="text-neutral-500 text-sm mb-8">
                        {menuData.restaurant.pricing_note}
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
