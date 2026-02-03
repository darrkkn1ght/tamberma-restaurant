"use client"
import { useEffect, useCallback, useState } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { GalleryImage } from '@/data/gallery'

interface GalleryLightboxProps {
    images: GalleryImage[]
    currentIndex: number
    isOpen: boolean
    onClose: () => void
    onNavigate: (index: number) => void
}

export default function GalleryLightbox({
    images,
    currentIndex,
    isOpen,
    onClose,
    onNavigate
}: GalleryLightboxProps) {
    const [touchStart, setTouchStart] = useState<number | null>(null)
    const [touchEnd, setTouchEnd] = useState<number | null>(null)

    const currentImage = images[currentIndex]
    const hasNext = currentIndex < images.length - 1
    const hasPrev = currentIndex > 0

    const goNext = useCallback(() => {
        if (hasNext) onNavigate(currentIndex + 1)
    }, [currentIndex, hasNext, onNavigate])

    const goPrev = useCallback(() => {
        if (hasPrev) onNavigate(currentIndex - 1)
    }, [currentIndex, hasPrev, onNavigate])

    // Keyboard navigation
    useEffect(() => {
        if (!isOpen) return

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
            if (e.key === 'ArrowRight') goNext()
            if (e.key === 'ArrowLeft') goPrev()
        }

        document.addEventListener('keydown', handleKeyDown)
        document.body.style.overflow = 'hidden'

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
            document.body.style.overflow = ''
        }
    }, [isOpen, onClose, goNext, goPrev])

    // Touch swipe handling
    const minSwipeDistance = 50

    const onTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null)
        setTouchStart(e.targetTouches[0].clientX)
    }

    const onTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX)
    }

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return
        const distance = touchStart - touchEnd
        const isLeftSwipe = distance > minSwipeDistance
        const isRightSwipe = distance < -minSwipeDistance

        if (isLeftSwipe) goNext()
        if (isRightSwipe) goPrev()
    }

    if (!isOpen || !currentImage) return null

    return (
        <div
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center"
            onClick={onClose}
        >
            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-6 right-6 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Close lightbox"
            >
                <X className="w-6 h-6 text-white" />
            </button>

            {/* Navigation - Previous */}
            {hasPrev && (
                <button
                    onClick={(e) => { e.stopPropagation(); goPrev() }}
                    className="absolute left-4 md:left-8 z-10 p-3 md:p-4 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                    aria-label="Previous image"
                >
                    <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </button>
            )}

            {/* Navigation - Next */}
            {hasNext && (
                <button
                    onClick={(e) => { e.stopPropagation(); goNext() }}
                    className="absolute right-4 md:right-8 z-10 p-3 md:p-4 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                    aria-label="Next image"
                >
                    <ChevronRight className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </button>
            )}

            {/* Main Image */}
            <div
                className="relative w-full h-full max-w-6xl max-h-[85vh] mx-4 md:mx-16"
                onClick={(e) => e.stopPropagation()}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
            >
                <Image
                    src={currentImage.imageUrl}
                    alt={currentImage.caption}
                    fill
                    className="object-contain"
                    sizes="100vw"
                    priority
                />
            </div>

            {/* Caption & Counter */}
            <div className="absolute bottom-6 left-0 right-0 text-center">
                <p className="text-white font-medium text-lg mb-1">
                    {currentImage.caption}
                </p>
                <p className="text-white/50 text-sm">
                    {currentIndex + 1} / {images.length}
                </p>
            </div>
        </div>
    )
}
