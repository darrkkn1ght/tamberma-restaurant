"use client"
import { Star, Users, Calendar, Instagram } from 'lucide-react'

const stats = [
    {
        id: 1,
        label: "Google Rating",
        value: "4.8",
        icon: Star,
        caption: "Based on 500+ reviews",
        color: "text-amber-500"
    },
    {
        id: 2,
        label: "Happy Guests",
        value: "15k+",
        icon: Users,
        caption: "Served annually",
        color: "text-primary"
    },
    {
        id: 3,
        label: "Events Hosted",
        value: "200+",
        icon: Calendar,
        caption: "Memorable celebrations",
        color: "text-blue-500"
    },
    {
        id: 4,
        label: "Community",
        value: "10k",
        icon: Instagram,
        caption: "Followers on Instagram",
        color: "text-pink-600"
    }
]

export default function SocialProof() {
    return (
        <section className="py-12 bg-neutral-50 border-b border-neutral-100">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-8">
                    <p className="text-xs font-semibold tracking-widest text-neutral-500 uppercase">Loved by Guests</p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                    {stats.map((stat) => (
                        <div
                            key={stat.id}
                            className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100 flex flex-col items-center text-center hover:shadow-md transition-shadow duration-300"
                        >
                            <div className={`mb-3 p-3 rounded-full bg-neutral-50 ${stat.color}`}>
                                <stat.icon size={24} />
                            </div>
                            <h3 className="text-2xl md:text-3xl font-display font-bold text-neutral-900 mb-1">
                                {stat.value}
                            </h3>
                            <p className="font-medium text-neutral-900 text-sm mb-1">{stat.label}</p>
                            <p className="text-xs text-neutral-500">{stat.caption}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
