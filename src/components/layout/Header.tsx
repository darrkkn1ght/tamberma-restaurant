"use client"
import { useState, useEffect, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'
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
    const [mounted, setMounted] = useState(false)
    const { openDrawer } = useBooking()
    const pathname = usePathname()
    const menuRef = useRef<HTMLDivElement>(null)
    const firstFocusableRef = useRef<HTMLButtonElement>(null)
    const scrollPositionRef = useRef(0)

    // Mount check for portal
    useEffect(() => {
        setMounted(true)
    }, [])

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Lock body scroll and manage scroll position when menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            // Save current scroll position
            scrollPositionRef.current = window.scrollY
            // Add class to lock body
            document.body.classList.add('menu-open')
            document.body.style.top = `-${scrollPositionRef.current}px`
            // Focus first focusable element
            setTimeout(() => firstFocusableRef.current?.focus(), 100)
        } else {
            // Remove lock class
            document.body.classList.remove('menu-open')
            document.body.style.top = ''
            // Restore scroll position
            window.scrollTo(0, scrollPositionRef.current)
        }

        return () => {
            document.body.classList.remove('menu-open')
            document.body.style.top = ''
        }
    }, [isMobileMenuOpen])

    // ESC key handler
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isMobileMenuOpen) {
                setIsMobileMenuOpen(false)
            }
        }
        document.addEventListener('keydown', handleEscape)
        return () => document.removeEventListener('keydown', handleEscape)
    }, [isMobileMenuOpen])

    const closeMobileMenu = useCallback(() => {
        setIsMobileMenuOpen(false)
    }, [])

    const isActive = (href: string) => {
        if (href === '/') return pathname === '/'
        return pathname.startsWith(href)
    }

    // Determine text color based on state
    const isHome = pathname === '/'
    const forceScrolled = !isHome
    const effectiveScrolled = isScrolled || forceScrolled || isMobileMenuOpen

    // Mobile Menu Portal Content
    const MobileMenuPortal = () => {
        if (!mounted) return null

        return createPortal(
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        {/* Backdrop - dark translucent with blur */}
                        <MotionDiv
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 md:hidden"
                            style={{
                                zIndex: 'var(--z-modal-backdrop, 9998)',
                                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                                backdropFilter: 'blur(8px)',
                                WebkitBackdropFilter: 'blur(8px)',
                            }}
                            onClick={closeMobileMenu}
                            aria-hidden="true"
                        />

                        {/* Menu Panel - Compact Drawer */}
                        <MotionDiv
                            ref={menuRef}
                            initial={{ opacity: 0, x: '100%' }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: '100%' }}
                            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                            className="fixed top-0 right-0 bottom-0 md:hidden flex flex-col border-l border-neutral-200"
                            style={{
                                zIndex: 'var(--z-modal, 9999)',
                                backgroundColor: 'hsl(var(--background))',
                                width: 'min(85vw, 320px)',
                            }}
                            role="dialog"
                            aria-modal="true"
                            aria-label="Mobile navigation menu"
                        >
                            {/* Menu Header */}
                            <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200">
                                <BrandMark isScrolled={true} />
                                <button
                                    ref={firstFocusableRef}
                                    onClick={closeMobileMenu}
                                    className="p-2 rounded-lg text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
                                    aria-label="Close menu"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Navigation Links */}
                            <nav className="flex flex-col px-4 py-5 space-y-1 flex-1 overflow-y-auto">
                                {navItems.map((item) => {
                                    const active = isActive(item.href)
                                    return (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            onClick={closeMobileMenu}
                                            className={`text-lg font-medium transition-colors py-2.5 px-2 rounded-lg ${active
                                                ? 'text-primary bg-primary/5'
                                                : 'text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50'
                                                }`}
                                        >
                                            {item.name}
                                        </Link>
                                    )
                                })}
                            </nav>

                            {/* Reserve CTA */}
                            <div className="px-4 py-4 border-t border-neutral-100">
                                <button
                                    onClick={() => {
                                        closeMobileMenu()
                                        setTimeout(() => openDrawer(), 100)
                                    }}
                                    className="w-full bg-primary text-white py-3 rounded-lg font-semibold text-base shadow-sm hover:bg-primary-600 transition-colors"
                                >
                                    Reserve a Table
                                </button>
                            </div>
                        </MotionDiv>
                    </>
                )}
            </AnimatePresence>,
            document.body
        )
    }

    return (
        <>
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
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className={`p-2 rounded-full transition-colors ${effectiveScrolled
                                    ? 'text-neutral-900 hover:bg-neutral-100'
                                    : 'text-white hover:bg-white/10'
                                    }`}
                                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                                aria-expanded={isMobileMenuOpen}
                                aria-controls="mobile-menu"
                            >
                                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Menu rendered via Portal */}
            <MobileMenuPortal />
        </>
    )
}
