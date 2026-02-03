"use client"
import { Search, X } from 'lucide-react'

interface MenuSearchProps {
    searchQuery: string
    onSearchChange: (query: string) => void
    activeFilters: string[]
    onFilterToggle: (filter: string) => void
}

const filterOptions = [
    { id: 'veg', label: 'Vegetarian', color: 'bg-green-100 text-green-700 border-green-200' },
    { id: 'chicken', label: 'Chicken', color: 'bg-amber-100 text-amber-700 border-amber-200' },
    { id: 'seafood', label: 'Seafood', color: 'bg-blue-100 text-blue-700 border-blue-200' },
    { id: 'beef', label: 'Beef', color: 'bg-red-100 text-red-700 border-red-200' },
]

export default function MenuSearch({ searchQuery, onSearchChange, activeFilters, onFilterToggle }: MenuSearchProps) {
    return (
        <div className="bg-white border-b border-neutral-100">
            <div className="max-w-7xl mx-auto px-4 py-6">
                {/* Search Input */}
                <div className="relative max-w-md mx-auto mb-4">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search our menu..."
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full pl-12 pr-10 py-3 bg-neutral-50 border border-neutral-200 rounded-full text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => onSearchChange('')}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                        >
                            <X size={18} />
                        </button>
                    )}
                </div>

                {/* Filter Chips */}
                <div className="flex flex-wrap justify-center gap-2">
                    {filterOptions.map((filter) => (
                        <button
                            key={filter.id}
                            onClick={() => onFilterToggle(filter.id)}
                            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${activeFilters.includes(filter.id)
                                    ? `${filter.color} shadow-sm`
                                    : 'bg-white text-neutral-500 border-neutral-200 hover:border-neutral-300'
                                }`}
                        >
                            {filter.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}
