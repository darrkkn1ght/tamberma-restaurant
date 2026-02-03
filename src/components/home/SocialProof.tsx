"use client"
import { Star, Users, Calendar, Instagram } from 'lucide-react'

const stats = [
    {
        id: 1,
        label: "Google Rating",
        value: "4.3",
        icon: Star,
        caption: "Based on 1,575+ reviews",
        color: "text-amber-500"
    },
    {
        id: 2,
        label: "Happy Guests",
        value: "20k+",
        icon: Users,
        caption: "Served annually",
        color: "text-primary"
    },
    {
        id: 3,
        label: "Events Hosted",
        value: "500+",
        icon: Calendar,
        caption: "Memorable celebrations",
        color: "text-blue-500"
    },
    {
        id: 4,
        label: "Community",
        value: "10k+",
        icon: Instagram,
        caption: "Followers across socials",
        color: "text-pink-600"
    }
]

export default function SocialProof() {
    return (
        <section className="py-12 md:py-20 bg-neutral-50 border-b border-neutral-200/60 relative overflow-hidden">
            {/* Subtle Texture */}
            <div className="absolute inset-0 opacity-[0.03] bg-[url('/images/texture/noise.png')] mix-blend-multiply"></div>

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="text-center mb-10 md:mb-14">
                    <span className="text-xs font-bold tracking-[0.2em] text-primary uppercase mb-3 block">Excellence in Hospitality</span>
                    <h2 className="text-3xl md:text-4xl font-display text-neutral-900">Experience the Difference</h2>
                </div>

                <div className="bg-white rounded-[2rem] shadow-xl shadow-neutral-200/40 border border-neutral-100 p-8 md:p-12 relative overflow-hidden">
                    {/* Decorative Top Accent */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-neutral-100">
                        {stats.map((stat) => (
                            <div
                                key={stat.id}
                                className="flex flex-col items-center text-center px-4 py-4 md:py-0 group"
                            >
                                <div className="mb-4 p-3 rounded-full bg-neutral-50 text-neutral-400 group-hover:text-primary group-hover:bg-primary/5 transition-colors duration-300">
                                    <stat.icon size={24} strokeWidth={1.5} />
                                </div>
                                <h3 className="text-4xl md:text-5xl font-display font-medium text-neutral-900 mb-2 tracking-tight group-hover:transform group-hover:-translate-y-1 transition-transform duration-300">
                                    {stat.value}
                                </h3>
                                <p className="font-bold text-neutral-800 text-sm uppercase tracking-wide mb-1">{stat.label}</p>
                                <p className="text-xs text-neutral-400 font-light">{stat.caption}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
