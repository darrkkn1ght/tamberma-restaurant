"use client"
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import BrandMark from '@/components/brand/BrandMark'
import { useBooking } from '@/contexts/BookingContext'

const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Menu', href: '/menu' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Events', href: '/events' },
    { name: 'Contact', href: '/contact' },
]

// Workaround for Framer Motion TypeScript compatibility
const MotionDiv = motion.div as React.FC<React.ComponentProps<typeof motion.div> & { className?: string }>

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const { openDrawer } = useBooking()
    const pathname = usePathname()

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
    }, [isMobileMenuOpen])

    const isActive = (href: string) => {
        if (href === '/') return pathname === '/'
        return pathname.startsWith(href)
    }

    // Determine text color based on state
    const isHome = pathname === '/'
    // Correction: Subpages like Menu have white background content, so transparent header might be hard to read if no image.
    // However, Menu/Gallery pages have top padding pt-20, so they might not have a full hero image under the header.
    // We should treat non-home pages as "always scrolled" style OR ensure they have a hero. 
    // Given the previous code had 'pt-20', subpages likely need a solid header or always-scrolled look.
    const forceScrolled = !isHome

    const effectiveScrolled = isScrolled || forceScrolled || isMobileMenuOpen

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${effectiveScrolled
                ? 'bg-white/90 backdrop-blur-md border-b border-neutral-200/50 shadow-sm py-3'
                : 'bg-transparent py-5'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    {/* Brand */}
                    <div className="relative z-50">
                        <BrandMark isScrolled={effectiveScrolled} />
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => {
                            const active = isActive(item.href)
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`relative text-sm font-medium tracking-wide transition-colors py-1 ${effectiveScrolled
                                        ? active ? 'text-primary' : 'text-neutral-600 hover:text-neutral-900'
                                        : active ? 'text-white' : 'text-white/80 hover:text-white'
                                        }`}
                                >
                                    {item.name}
                                    {/* Active Underline */}
                                    <span
                                        className={`absolute bottom-0 left-0 h-[2px] bg-primary transition-all duration-300 ${active ? 'w-full' : 'w-0'
                                            }`}
                                    />
                                </Link>
                            )
                        })}

                        <button
                            onClick={openDrawer}
                            className={`px-6 py-2.5 rounded-full font-medium text-sm transition-all shadow-sm hover:shadow-md ${effectiveScrolled
                                ? 'bg-primary text-white hover:bg-primary-600'
                                : 'bg-white text-neutral-900 hover:bg-neutral-100'
                                }`}
                        >
                            Reserve Table
                        </button>
                    </nav>

                    {/* Mobile Menu Toggle */}
                    <div className="md:hidden relative z-50">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className={`p-2 rounded-full transition-colors ${effectiveScrolled
                                ? 'text-neutral-900 hover:bg-neutral-100'
                                : 'text-white hover:bg-white/10'
                                }`}
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <MotionDiv
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 top-0 z-40 bg-white md:hidden flex flex-col pt-24 px-6"
                    >
                        <nav className="flex flex-col space-y-6">
                            {navItems.map((item) => {
                                const active = isActive(item.href)
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={`text-2xl font-display font-medium ${active ? 'text-primary' : 'text-neutral-900'
                                            }`}
                                    >
                                        {item.name}
                                    </Link>
                                )
                            })}
                        </nav>

                        <div className="mt-auto pb-10">
                            <button
                                onClick={() => {
                                    setIsMobileMenuOpen(false)
                                    openDrawer()
                                }}
                                className="w-full bg-primary text-white py-4 rounded-xl font-medium text-lg shadow-luxury"
                            >
                                Reserve a Table
                            </button>
                        </div>
                    </MotionDiv>
                )}
            </AnimatePresence>
        </header>
    )
}
