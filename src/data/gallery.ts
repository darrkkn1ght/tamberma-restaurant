// Gallery Data Types and Content

export interface GalleryImage {
    id: string
    imageUrl: string
    category: 'interior' | 'food' | 'events' | 'ambience'
    caption: string
    aspectRatio?: 'portrait' | 'landscape' | 'square'
}

export const galleryCategories = [
    { id: 'all', label: 'All' },
    { id: 'interior', label: 'Interior' },
    { id: 'food', label: 'Food' },
    { id: 'events', label: 'Events' },
    { id: 'ambience', label: 'Ambience' },
] as const

export type GalleryCategory = typeof galleryCategories[number]['id']

export const galleryImages: GalleryImage[] = [
    // Interior (Priority 1 - First Impression)
    {
        id: 'int-1',
        imageUrl: '/images/interior/interior-01.jpg',
        category: 'interior',
        caption: 'Elegant dining space',
        aspectRatio: 'landscape'
    },
    {
        id: 'int-2',
        imageUrl: '/images/interior/interior-02.jpg',
        category: 'interior',
        caption: 'Private dining area',
        aspectRatio: 'landscape'
    },
    // Ambience (Priority 2 - Mood Setting)
    {
        id: 'amb-1',
        imageUrl: '/images/hero/hero-main.jpg',
        category: 'ambience',
        caption: 'Evening ambience',
        aspectRatio: 'landscape'
    },
    {
        id: 'int-3',
        imageUrl: '/images/interior/interior-03.jpg',
        category: 'interior',
        caption: 'Bar lounge',
        aspectRatio: 'landscape'
    },
    {
        id: 'amb-2',
        imageUrl: '/images/hero/hero-alt-01.jpg',
        category: 'ambience',
        caption: 'Welcoming atmosphere',
        aspectRatio: 'landscape'
    },
    // Events (Priority 3 - Social Proof)
    {
        id: 'evt-1',
        imageUrl: '/images/menu/grill-house-menu-2.jpg',
        category: 'events',
        caption: 'Chef\'s table experience',
        aspectRatio: 'landscape'
    },
    {
        id: 'evt-2',
        imageUrl: '/images/menu/indian-menu-2.jpg',
        category: 'events',
        caption: 'Private dining events',
        aspectRatio: 'landscape'
    },
    // Food (Priority 4 - Culinary Showcase)
    {
        id: 'food-1',
        imageUrl: '/images/menu/Tandoori-Prawns.jpg',
        category: 'food',
        caption: 'Tandoori Prawns',
        aspectRatio: 'square'
    },
    {
        id: 'food-2',
        imageUrl: '/images/menu/Isi-Ewu.jpg',
        category: 'food',
        caption: 'Isi Ewu - Nigerian Delicacy',
        aspectRatio: 'square'
    },
    {
        id: 'food-3',
        imageUrl: '/images/menu/Achari-Prawns.jpg',
        category: 'food',
        caption: 'Achari Prawns',
        aspectRatio: 'square'
    },
    {
        id: 'food-4',
        imageUrl: '/images/menu/grill-house-menu-1.jpg',
        category: 'food',
        caption: 'Grill House Specialties',
        aspectRatio: 'landscape'
    },
    {
        id: 'food-5',
        imageUrl: '/images/menu/indian-menu-1.jpg',
        category: 'food',
        caption: 'Authentic Indian Cuisine',
        aspectRatio: 'landscape'
    },
    {
        id: 'food-6',
        imageUrl: '/images/menu/nigerian-menu-1.jpg',
        category: 'food',
        caption: 'Nigerian Classics',
        aspectRatio: 'landscape'
    },
]

// Helper to filter images
export function getFilteredImages(category: GalleryCategory): GalleryImage[] {
    if (category === 'all') return galleryImages
    return galleryImages.filter(img => img.category === category)
}
