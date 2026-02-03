"use client"
import Link from 'next/link'
import { useBooking } from '@/contexts/BookingContext'

export default function HomeCTA() {
    const { openDrawer } = useBooking()

    return (
        <section className="py-24 bg-neutral-900 text-center px-4 relative overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-20">
                {/* Abstract pattern or noise if needed */}
            </div>

            <div className="relative z-10 max-w-2xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-display text-white mb-6">
                    Ready to Dine With Us?
                </h2>
                <p className="text-neutral-400 text-lg mb-10 font-light">
                    Whether it's a casual dinner or a special celebration, we have the perfect table for you.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={openDrawer}
                        className="bg-primary text-white px-8 py-4 rounded-full font-medium shadow-luxury hover:bg-primary-600 transition-all hover:shadow-primary/20 transform hover:-translate-y-1"
                    >
                        Make a Reservation
                    </button>

                    <Link
                        href="/contact"
                        className="px-8 py-4 rounded-full font-medium text-white border border-neutral-700 hover:bg-neutral-800 transition-colors"
                    >
                        Contact Us
                    </Link>
                </div>
            </div>
        </section>
    )
}
