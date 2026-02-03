"use client"
import React from 'react'
import Link from 'next/link'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    href?: string
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
    size?: 'sm' | 'md' | 'lg'
    children: React.ReactNode
    className?: string
}

export default function Button({
    href,
    variant = 'primary',
    size = 'md',
    children,
    className,
    ...props
}: ButtonProps) {
    const baseStyles = "inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500/50 disabled:opacity-50 disabled:cursor-not-allowed"

    const variants = {
        primary: "bg-primary text-white shadow-luxury hover:bg-primary-600 hover:shadow-luxury-hover hover:-translate-y-px",
        secondary: "bg-neutral-100 text-neutral-900 hover:bg-neutral-200 border border-transparent",
        outline: "bg-transparent border border-neutral-300 text-neutral-900 hover:bg-neutral-50 hover:border-neutral-900",
        ghost: "bg-transparent text-neutral-600 hover:text-primary hover:bg-neutral-50",
    }

    const sizes = {
        sm: "text-sm px-4 py-2",
        md: "text-base px-6 py-3",
        lg: "text-lg px-8 py-4",
    }

    const combinedClassName = cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
    )

    if (href) {
        return (
            <Link href={href} className={combinedClassName}>
                {children}
            </Link>
        )
    }

    return (
        <button className={combinedClassName} {...props}>
            {children}
        </button>
    )
}
