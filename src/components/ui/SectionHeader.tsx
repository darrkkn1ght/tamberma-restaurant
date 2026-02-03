import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

interface SectionHeaderProps {
    title: string
    subtitle?: string
    align?: 'left' | 'center'
    className?: string
    light?: boolean
}

export default function SectionHeader({
    title,
    subtitle,
    align = 'center',
    className,
    light = false
}: SectionHeaderProps) {
    return (
        <div className={cn(
            "mb-12 md:mb-16 space-y-4",
            align === 'center' ? 'text-center' : 'text-left',
            className
        )}>
            <h2 className={cn(
                "text-3xl md:text-5xl font-display font-medium leading-tight",
                light ? "text-white" : "text-neutral-900"
            )}>
                {title}
            </h2>
            {subtitle && (
                <p className={cn(
                    "text-lg md:text-xl text-muted-foreground font-light max-w-2xl",
                    align === 'center' ? 'mx-auto' : ''
                )}>
                    {subtitle}
                </p>
            )}
            <div className={cn(
                "h-1 w-20 bg-primary mx-auto mt-6 rounded-full",
                align === 'left' ? 'mx-0' : ''
            )} />
        </div>
    )
}
