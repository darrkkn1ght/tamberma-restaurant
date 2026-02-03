"use client"
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { galleryImages } from '@/data/gallery'
import SectionHeader from '@/components/ui/SectionHeader'

export default function GalleryPreview() {
    // Get distinct images, prioritizing nice ones.
    const displayImages = galleryImages.slice(0, 6)

    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div className="w-full md:w-auto">
                        <SectionHeader
                            title="A Peek Inside"
                            subtitle="Expertly designed spaces that blend comfort with luxury."
                            align="left"
                            className="mb-0"
                        />
                    </div>
                    <Link
                        href="/gallery"
                        className="hidden md:flex items-center gap-2 text-neutral-900 font-medium hover:text-primary transition-colors pb-8"
                    >
                        View Full Gallery <ArrowRight size={18} />
                    </Link>
                </div>

                {/* Masonry-style Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 h-[600px] md:h-[500px]">
                    {displayImages.map((img, idx) => (
                        <div
                            key={img.id}
                            className={`relative rounded-xl overflow-hidden group ${idx === 0 ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1'}`}
                        >
                            <Image
                                src={img.imageUrl}
                                alt={img.caption}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                    ))}
                </div>

                <div className="mt-8 text-center md:hidden">
                    <Link
                        href="/gallery"
                        className="inline-flex items-center gap-2 text-neutral-900 font-medium hover:text-primary transition-colors"
                    >
                        View Full Gallery <ArrowRight size={18} />
                    </Link>
                </div>
            </div>
        </section>
    )
}
