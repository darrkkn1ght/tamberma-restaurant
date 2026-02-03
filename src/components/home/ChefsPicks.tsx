"use client"
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { getFeaturedItems, formatPrice } from '@/data/menu'
import SectionHeader from '@/components/ui/SectionHeader'

export default function ChefsPicks() {
    // Get top 4 featured items
    const featuredItems = getFeaturedItems().slice(0, 4)

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4">
                <SectionHeader
                    title="Chef's Picks"
                    subtitle="A selection of our most beloved dishes, crafted to perfection."
                />

                <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mt-12">
                    {featuredItems.map((item) => (
                        <div
                            key={item.id}
                            className="group flex gap-4 md:gap-6 items-start p-4 rounded-2xl hover:bg-neutral-50 transition-colors border border-transparent hover:border-neutral-100"
                        >
                            {/* Image Placeholder or Actual Image if available */}
                            <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0 bg-neutral-100 rounded-xl overflow-hidden">
                                {item.imageUrl ? (
                                    <Image
                                        src={item.imageUrl}
                                        alt={item.name}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-neutral-300 text-xs">
                                        No Image
                                    </div>
                                )}
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start gap-4 mb-2">
                                    <h3 className="text-lg md:text-xl font-display font-medium text-neutral-900 truncate group-hover:text-primary transition-colors">
                                        {item.name}
                                    </h3>
                                    <span className="font-semibold text-primary whitespace-nowrap">
                                        {formatPrice(item.price_ngn)}
                                    </span>
                                </div>
                                <p className="text-neutral-500 text-sm leading-relaxed line-clamp-2 mb-3">
                                    {item.tags.map(t => t.replace('_', ' ')).join(' • ')}
                                </p>
                                <Link
                                    href="/menu"
                                    className="inline-flex items-center text-xs font-medium text-neutral-900 border-b border-neutral-300 hover:border-primary pb-0.5 transition-all"
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Link
                        href="/menu"
                        className="inline-flex items-center gap-2 px-8 py-3 bg-neutral-900 text-white rounded-full font-medium hover:bg-neutral-800 transition-colors"
                    >
                        Explore Full Menu <ArrowRight size={16} />
                    </Link>
                </div>
            </div>
        </section>
    )
}
