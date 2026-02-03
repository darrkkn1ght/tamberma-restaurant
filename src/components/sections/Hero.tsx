"use client"
import Image from 'next/image'
import Link from 'next/link'
import { motion, HTMLMotionProps } from 'framer-motion'
import { useBooking } from '@/contexts/BookingContext'

// Workaround: Cast motion.div to avoid TypeScript compatibility issues
const MotionDiv = motion.div as React.FC<HTMLMotionProps<"div"> & { className?: string }>

export default function Hero() {
    const { openDrawer } = useBooking()

    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
            {/* Background with Luxury Gradient Overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/hero/hero-main.jpg"
                    alt="Tamberma Restaurant Interior"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-neutral-900/40" />
                <div className="absolute inset-0 bg-luxury-gradient" />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-4 max-w-3xl mx-auto mt-20">
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
                </MotionDiv>
            </div>

            {/* Scroll Indicator */}
            <MotionDiv
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 1 }}
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <span className="text-neutral-400 text-xs tracking-widest uppercase">Scroll</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent opacity-50" />
            </MotionDiv>
        </section>
    )
}
