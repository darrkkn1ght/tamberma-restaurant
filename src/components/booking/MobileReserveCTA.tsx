"use client"
import { useState, useEffect } from 'react'
import { motion, AnimatePresence, HTMLMotionProps } from 'framer-motion'
import { Calendar } from 'lucide-react'
import { useBooking } from '@/contexts/BookingContext'

const MotionDiv = motion.div as React.FC<HTMLMotionProps<"div"> & { className?: string }>

export default function MobileReserveCTA() {
    const { openDrawer } = useBooking()
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 120)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <AnimatePresence>
            {isVisible && (
                <MotionDiv
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    className="fixed bottom-6 right-6 z-40 md:hidden"
                >
                    <button
                        onClick={openDrawer}
                        className="bg-primary text-white px-5 py-3 rounded-full shadow-lg hover:bg-primary-600 transition-colors flex items-center gap-2 font-medium"
                    >
                        <Calendar size={18} />
                        Reserve
                    </button>
                </MotionDiv>
            )}
        </AnimatePresence>
    )
}
