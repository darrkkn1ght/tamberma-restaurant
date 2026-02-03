import Link from 'next/link'
import Image from 'next/image'

interface BrandMarkProps {
    className?: string
    isScrolled?: boolean
}

export default function BrandMark({ className = '', isScrolled = false }: BrandMarkProps) {
    return (
        <Link
            href="/"
            aria-label="Tamberma Home"
            className={`flex items-center gap-2.5 ${className}`}
        >
            {/* Logo Icon - Adaptive coloring based on scroll */}
            <div className="relative w-8 h-8 flex-shrink-0">
                <Image
                    src="/images/logo/tamberma-logo.png"
                    alt="Tamberma Logo"
                    fill
                    className={`object-contain transition-all duration-300 ${isScrolled ? '' : 'brightness-0 invert'
                        }`}
                    priority
                />
            </div>

            {/* Wordmark - Adaptive color */}
            {/* Hidden on mobile, visible on md+ */}
            <span className={`hidden md:block text-lg font-display italic tracking-wide leading-none transition-colors duration-300 ${isScrolled ? 'text-black' : 'text-white'
                }`}>
                Tamberma
            </span>
        </Link>
    )
}
