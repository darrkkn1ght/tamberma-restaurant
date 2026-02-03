"use client"
import Link from 'next/link'
import Image from 'next/image'
import { Users, UtensilsCrossed, Sparkles } from 'lucide-react'

export default function PrivateDining() {
    return (
        <section className="py-24 bg-neutral-50 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 opacity-[0.03] pointer-events-none">
                <svg width="400" height="400" viewBox="0 0 100 100">
                    <path d="M50 0 C20 0 0 20 0 50 C0 80 20 100 50 100 C80 100 100 80 100 50 C100 20 80 0 50 0 Z" fill="currentColor" />
                </svg>
            </div>

            <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">

                {/* Visual Side */}
                <div className="relative">
                    <div className="relative h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl">
                        <Image
                            src="/images/interior/interior-02.jpg" // Assuming this exists from gallery data
                            alt="Private Dining"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-6 left-6 text-white">
                            <p className="text-sm font-medium tracking-wider uppercase mb-1">The VIP Lounge</p>
                            <p className="text-xs text-white/80">Seating for up to 20 guests</p>
                        </div>
                    </div>
                </div>

                {/* Content Side */}
                <div className="space-y-8">
                    <div>
                        <span className="text-primary text-xs font-bold tracking-widest uppercase mb-2 block">Events & Gatherings</span>
                        <h2 className="text-4xl md:text-5xl font-display text-neutral-900 mb-6">
                            Private Dining & <br />Celebrations
                        </h2>
                        <p className="text-neutral-600 text-lg leading-relaxed font-light">
                            From intimate birthdays to corporate dinners, elevate your gathering with our dedicated private spaces.
                            We offer bespoke menus tailored to your preferences, ensuring a memorable experience for you and your guests.
                        </p>
                    </div>

                    <div className="space-y-6">
                        {[
                            { icon: Users, title: "Groups of All Sizes", desc: "Intimate tables for 2 or banquet setups for 50+ guests." },
                            { icon: UtensilsCrossed, title: "Custom Curated Menus", desc: "Work with our chef to design a menu that suits your palate." },
                            { icon: Sparkles, title: "Dedicated Service", desc: "Private waitstaff to attend to your group's every need." }
                        ].map((feature, idx) => (
                            <div key={idx} className="flex gap-4">
                                <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center flex-shrink-0 text-primary">
                                    <feature.icon size={20} />
                                </div>
                                <div>
                                    <h4 className="font-display font-medium text-lg text-neutral-900">{feature.title}</h4>
                                    <p className="text-neutral-500 text-sm">{feature.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="pt-4">
                        <Link
                            href="/contact"
                            className="bg-primary text-white px-8 py-3.5 rounded-full font-medium shadow-luxury hover:bg-primary-600 transition-colors inline-block"
                        >
                            Plan an Event
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
