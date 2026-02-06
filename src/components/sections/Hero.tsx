"use client"
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence, HTMLMotionProps } from 'framer-motion'
import { useBooking } from '@/contexts/BookingContext'

// Workaround: Cast motion.div to avoid TypeScript compatibility issues
const MotionDiv = motion.div as React.FC<HTMLMotionProps<"div"> & { className?: string }>

// Hero media items for crossfade slideshow
const heroMedia = [
    { type: 'image', src: '/images/hero/hero-main.jpg' },
    { type: 'video', src: '/images/hero/hero-video.mp4' },
]

export default function Hero() {
    const { openDrawer } = useBooking()
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isVideoLoaded, setIsVideoLoaded] = useState(false)

    // Crossfade timer - switch every 8 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % heroMedia.length)
        }, 8000)

        return () => clearInterval(interval)
    }, [])

    const currentMedia = heroMedia[currentIndex]

    return (
        <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
            {/* Background with Crossfade Effect */}
            <div className="absolute inset-0 z-0">
                <AnimatePresence mode="wait">
                    {currentMedia.type === 'image' ? (
                        <MotionDiv
                            key="hero-image"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1.5, ease: 'easeInOut' }}
                            className="absolute inset-0"
                        >
                            <Image
                                src={currentMedia.src}
                                alt="Tamberma Restaurant Interior"
                                fill
                                className="object-cover"
                                priority
                            />
                        </MotionDiv>
                    ) : (
                        <MotionDiv
                            key="hero-video"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isVideoLoaded ? 1 : 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1.5, ease: 'easeInOut' }}
                            className="absolute inset-0"
                        >
                            <video
                                src={currentMedia.src}
                                autoPlay
                                muted
                                loop
                                playsInline
                                onLoadedData={() => setIsVideoLoaded(true)}
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                            {/* Fallback image while video loads */}
                            {!isVideoLoaded && (
                                <Image
                                    src="/images/hero/hero-main.jpg"
                                    alt="Tamberma Restaurant"
                                    fill
                                    className="object-cover"
                                />
                            )}
                        </MotionDiv>
                    )}
                </AnimatePresence>

                {/* Overlay gradients */}
                <div className="absolute inset-0 bg-neutral-900/40 z-10" />
                <div className="absolute inset-0 bg-luxury-gradient z-10" />
            </div>

            {/* Slide Indicators */}
            <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
                {heroMedia.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex
                                ? 'bg-white w-6'
                                : 'bg-white/40 hover:bg-white/60'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>

            {/* Content */}
            <div className="relative z-20 text-center px-4 max-w-3xl mx-auto mt-20">
                <MotionDiv
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <span className="block text-accent uppercase tracking-[0.2em] mb-6 text-sm md:text-base font-medium">
                        Fine Dining in Ibadan
                    </span>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-medium text-white mb-8 leading-[1.15] tracking-tight">
                        Authentic Indian <br className="hidden md:block" />
                        <span className="text-white italic">Culinary Experience</span>
                    </h1>
                    <p className="text-lg md:text-2xl text-neutral-200 mb-12 font-light max-w-2xl mx-auto leading-relaxed">
                        Where traditional flavors meet modern elegance. Experience the art of Indian cuisine.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        <button
                            onClick={openDrawer}
                            className="bg-primary text-white px-8 py-4 rounded-full font-medium shadow-md hover:bg-primary-600 hover:-translate-y-px transition-all text-base"
                        >
                            Make Reservation
                        </button>
                        <Link
                            href="/menu"
                            className="border border-white/30 text-white px-8 py-4 rounded-full font-medium hover:bg-white/10 transition-all text-base"
                        >
                            View Menu
                        </Link>
                    </div>
                    <p className="mt-6 text-xs md:text-sm text-neutral-300 font-light tracking-wide opacity-80">
                        Instant confirmation via WhatsApp
                    </p>
                </MotionDiv>
            </div>

            {/* Scroll Indicator */}
            <MotionDiv
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 1 }}
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 z-20"
            >
                <span className="text-neutral-400 text-xs tracking-widest uppercase">Scroll</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent opacity-50" />
            </MotionDiv>
        </section>
    )
}
