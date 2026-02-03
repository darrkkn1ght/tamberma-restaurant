"use client"
import { useState, useMemo } from 'react'
import Image from 'next/image'
import { GalleryImage } from '@/data/gallery'

interface GalleryGridProps {
    images: GalleryImage[]
    onImageClick: (index: number) => void
}

export default function GalleryGrid({ images, onImageClick }: GalleryGridProps) {
    const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set())

    const handleImageLoad = (id: string) => {
        setLoadedImages(prev => new Set(prev).add(id))
    }

    return (
        <div className="columns-1 md:columns-2 lg:columns-3 gap-5 md:gap-6 space-y-5 md:space-y-6">
            {images.map((image, index) => {
                const isLoaded = loadedImages.has(image.id)

                return (
                    <div
                        key={image.id}
                        onClick={() => onImageClick(index)}
                        className={`break-inside-avoid group cursor-pointer relative overflow-hidden rounded-xl transition-all duration-700 ${isLoaded
                                ? 'opacity-100 translate-y-0'
                                : 'opacity-0 translate-y-4'
                            }`}
                    >
                        <div
                            className={`relative w-full ${image.aspectRatio === 'portrait'
                                    ? 'aspect-[3/4]'
                                    : image.aspectRatio === 'square'
                                        ? 'aspect-square'
                                        : 'aspect-[4/3]'
                                }`}
                        >
                            <Image
                                src={image.imageUrl}
                                alt={image.caption}
                                fill
                                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                loading="lazy"
                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                onLoad={() => handleImageLoad(image.id)}
                            />

                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            {/* Soft shadow on hover */}
                            <div className="absolute inset-0 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                            {/* Caption */}
                            <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                                <p className="text-white font-medium text-sm md:text-base leading-snug">
                                    {image.caption}
                                </p>
                                <p className="text-white/60 text-xs mt-1.5 uppercase tracking-wider">
                                    {image.category}
                                </p>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
