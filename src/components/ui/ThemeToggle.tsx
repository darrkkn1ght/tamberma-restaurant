"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"

// Workaround for Framer Motion TypeScript compatibility
const MotionDiv = motion.div as React.FC<React.ComponentProps<typeof motion.div> & { className?: string }>

export function ThemeToggle({ className, isScrolled }: { className?: string, isScrolled?: boolean }) {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    // Avoid hydration mismatch
    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <button className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${className}`}>
                <span className="sr-only">Toggle theme</span>
            </button>
        )
    }

    const isDark = theme === 'dark'

    return (
        <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className={`relative w-9 h-9 rounded-full flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 ${className
                    ? className
                    : isScrolled
                        ? 'hover:bg-neutral-100 text-neutral-900 shadow-sm border border-neutral-200'
                        : 'hover:bg-white/10 text-white'
                }`}
            aria-label="Toggle theme"
        >
            <div className="relative w-5 h-5">
                <MotionDiv
                    initial={false}
                    animate={{ scale: isDark ? 1 : 0, rotate: isDark ? 0 : 90, opacity: isDark ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 flex items-center justify-center"
                >
                    <Moon size={20} />
                </MotionDiv>

                <MotionDiv
                    initial={false}
                    animate={{ scale: isDark ? 0 : 1, rotate: isDark ? -90 : 0, opacity: isDark ? 0 : 1 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 flex items-center justify-center"
                >
                    <Sun size={20} />
                </MotionDiv>
            </div>
        </button>
    )
}
