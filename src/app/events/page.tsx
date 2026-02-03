"use client"
import { useState } from 'react'
import Image from 'next/image'
import { Calendar, Users, PartyPopper, Briefcase, Heart, Utensils, Send, Phone, User, MessageSquare } from 'lucide-react'

// Event types data
const eventTypes = [
    {
        id: 'birthday',
        title: 'Birthday Parties',
        description: 'Celebrate your special day with exquisite cuisine and impeccable service.',
        icon: PartyPopper,
        image: '/images/menu/grill-house-menu-2.jpg'
    },
    {
        id: 'corporate',
        title: 'Corporate Events',
        description: 'Impress clients and colleagues with our elegant private dining spaces.',
        icon: Briefcase,
        image: '/images/interior/interior-01.jpg'
    },
    {
        id: 'private',
        title: 'Private Dining',
        description: 'Exclusive dining experiences for intimate gatherings and special occasions.',
        icon: Utensils,
        image: '/images/interior/interior-02.jpg'
    },
    {
        id: 'anniversary',
        title: 'Anniversaries',
        description: 'Mark milestones with romantic ambience and world-class gastronomy.',
        icon: Heart,
        image: '/images/hero/hero-alt-01.jpg'
    }
]

// Gallery images for social proof
const eventGalleryImages = [
    '/images/interior/interior-01.jpg',
    '/images/interior/interior-02.jpg',
    '/images/interior/interior-03.jpg',
    '/images/hero/hero-main.jpg',
    '/images/menu/indian-menu-1.jpg',
    '/images/menu/grill-house-menu-1.jpg',
]

export default function EventsPage() {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        eventType: '',
        date: '',
        guests: '',
        requests: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitSuccess, setSubmitSuccess] = useState(false)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Build WhatsApp message
        const message = `*Event Booking Request*%0A%0A` +
            `*Name:* ${formData.name}%0A` +
            `*Phone:* ${formData.phone}%0A` +
            `*Event Type:* ${formData.eventType}%0A` +
            `*Date:* ${formData.date}%0A` +
            `*Guests:* ${formData.guests}%0A` +
            `*Special Requests:* ${formData.requests || 'None'}`

        // Open WhatsApp
        window.open(`https://wa.me/2348000000000?text=${message}`, '_blank')

        setTimeout(() => {
            setIsSubmitting(false)
            setSubmitSuccess(true)
            setFormData({ name: '', phone: '', eventType: '', date: '', guests: '', requests: '' })
        }, 1000)
    }

    return (
        <main className="min-h-screen bg-white pt-20">
            {/* Hero Section */}
            <section className="text-center px-4 pt-16 pb-20 max-w-3xl mx-auto">
                <div className="flex items-center justify-center gap-2 mb-4">
                    <Calendar className="w-5 h-5 text-primary" />
                    <span className="text-primary text-xs uppercase tracking-[0.25em] font-medium">
                        Private Events
                    </span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display text-neutral-900 mb-6">
                    Private Dining & Events
                </h1>
                <p className="text-neutral-500 text-lg max-w-xl mx-auto leading-relaxed mb-10">
                    From corporate dinners to birthday celebrations — create unforgettable moments in our elegant spaces.
                </p>
                <a
                    href="#booking-form"
                    className="inline-block bg-primary text-white px-10 py-4 rounded-lg font-medium hover:bg-primary-600 transition-colors"
                >
                    Book an Event
                </a>
            </section>

            {/* Event Types */}
            <section className="bg-neutral-50/50 py-20">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-3xl font-display text-neutral-900 text-center mb-12">
                        Perfect For Every Occasion
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {eventTypes.map((event) => {
                            const Icon = event.icon
                            return (
                                <div
                                    key={event.id}
                                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500 group"
                                >
                                    <div className="relative h-48 overflow-hidden">
                                        <Image
                                            src={event.image}
                                            alt={event.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                        <div className="absolute bottom-4 left-5">
                                            <div className="flex items-center gap-2">
                                                <Icon className="w-5 h-5 text-white" />
                                                <h3 className="text-white font-display text-xl">{event.title}</h3>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-5">
                                        <p className="text-neutral-500 text-sm leading-relaxed">
                                            {event.description}
                                        </p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Booking Form */}
            <section id="booking-form" className="py-20 scroll-mt-20">
                <div className="max-w-2xl mx-auto px-4">
                    <h2 className="text-3xl font-display text-neutral-900 text-center mb-4">
                        Request a Booking
                    </h2>
                    <p className="text-neutral-500 text-center mb-10">
                        Fill out the form below and we'll get back to you within 24 hours.
                    </p>

                    {submitSuccess ? (
                        <div className="text-center py-12 bg-green-50 rounded-2xl">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Send className="w-7 h-7 text-green-600" />
                            </div>
                            <h3 className="text-xl font-medium text-green-800 mb-2">Request Sent!</h3>
                            <p className="text-green-600">We'll contact you shortly to confirm your event.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Name */}
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-2">
                                    Your Name
                                </label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="John Doe"
                                        className="w-full pl-12 pr-4 py-4 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                    />
                                </div>
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-2">
                                    Phone Number
                                </label>
                                <div className="relative">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="+234 800 000 0000"
                                        className="w-full pl-12 pr-4 py-4 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                    />
                                </div>
                            </div>

                            {/* Event Type & Date Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                                        Event Type
                                    </label>
                                    <select
                                        name="eventType"
                                        value={formData.eventType}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-4 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none"
                                    >
                                        <option value="">Select type</option>
                                        <option value="birthday">Birthday Party</option>
                                        <option value="corporate">Corporate Event</option>
                                        <option value="private">Private Dining</option>
                                        <option value="anniversary">Anniversary</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                                        Preferred Date
                                    </label>
                                    <div className="relative">
                                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                                        <input
                                            type="date"
                                            name="date"
                                            value={formData.date}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full pl-12 pr-4 py-4 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Guests */}
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-2">
                                    Number of Guests
                                </label>
                                <div className="relative">
                                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                                    <input
                                        type="number"
                                        name="guests"
                                        value={formData.guests}
                                        onChange={handleInputChange}
                                        required
                                        min="1"
                                        placeholder="10"
                                        className="w-full pl-12 pr-4 py-4 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                    />
                                </div>
                            </div>

                            {/* Special Requests */}
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-2">
                                    Special Requests (Optional)
                                </label>
                                <div className="relative">
                                    <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-neutral-400" />
                                    <textarea
                                        name="requests"
                                        value={formData.requests}
                                        onChange={handleInputChange}
                                        rows={4}
                                        placeholder="Any dietary requirements, decorations, or special arrangements..."
                                        className="w-full pl-12 pr-4 py-4 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                                    />
                                </div>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-primary text-white py-4 rounded-xl font-medium hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? (
                                    'Sending...'
                                ) : (
                                    <>
                                        <Send className="w-5 h-5" />
                                        Submit Request
                                    </>
                                )}
                            </button>
                        </form>
                    )}
                </div>
            </section>

            {/* Gallery Strip */}
            <section className="py-16 bg-neutral-50/50">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-2xl font-display text-neutral-900 text-center mb-10">
                        Moments at Tamberma
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                        {eventGalleryImages.map((src, index) => (
                            <div key={index} className="relative aspect-square rounded-xl overflow-hidden group">
                                <Image
                                    src={src}
                                    alt={`Event moment ${index + 1}`}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Footer */}
            <section className="bg-neutral-800 text-center px-4 py-24">
                <div className="max-w-xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-display text-white mb-5">
                        Plan Your Event With Us
                    </h2>
                    <p className="text-neutral-400 text-sm mb-8">
                        Let our team create a bespoke experience tailored to your celebration.
                    </p>
                    <a
                        href="#booking-form"
                        className="inline-block bg-primary text-white px-12 py-4 rounded-lg font-medium hover:bg-primary-600 transition-colors"
                    >
                        Get Started
                    </a>
                </div>
            </section>
        </main>
    )
}
