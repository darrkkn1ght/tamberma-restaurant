"use client"
import { useEffect, useState } from 'react'
import { motion, AnimatePresence, HTMLMotionProps } from 'framer-motion'
import { X, Calendar, Clock, Users, Phone, Mail, User, MessageSquare, Check, MessageCircle, Copy } from 'lucide-react'
import { useBooking } from '@/contexts/BookingContext'

// Workaround for Framer Motion TypeScript
const MotionDiv = motion.div as React.FC<HTMLMotionProps<"div"> & { className?: string; onClick?: () => void }>

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_TAMBERMA_WHATSAPP || '2348075590939'

interface FormData {
    name: string
    phone: string
    email: string
    date: string
    time: string
    guests: string
    notes: string
}

interface FormErrors {
    [key: string]: string
}

// Format date to readable string: "Tue, 24 Dec 2026"
const formatDate = (dateStr: string): string => {
    if (!dateStr) return ''
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-GB', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    })
}

// Format time to 12-hour with AM/PM: "7:30 PM"
const formatTime = (timeStr: string): string => {
    if (!timeStr) return ''
    const [hours, minutes] = timeStr.split(':')
    const hour = parseInt(hours, 10)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const hour12 = hour % 12 || 12
    return `${hour12}:${minutes} ${ampm}`
}

export default function ReservationDrawer() {
    const { isDrawerOpen, closeDrawer } = useBooking()
    const [step, setStep] = useState<'form' | 'success'>('form')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [copied, setCopied] = useState(false)
    const [formData, setFormData] = useState<FormData>({
        name: '',
        phone: '',
        email: '',
        date: '',
        time: '',
        guests: '2',
        notes: ''
    })
    const [errors, setErrors] = useState<FormErrors>({})

    // Close on ESC key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeDrawer()
        }
        if (isDrawerOpen) {
            document.addEventListener('keydown', handleEsc)
            document.body.style.overflow = 'hidden'
        }
        return () => {
            document.removeEventListener('keydown', handleEsc)
            document.body.style.overflow = ''
        }
    }, [isDrawerOpen, closeDrawer])

    // Reset form when drawer closes
    useEffect(() => {
        if (!isDrawerOpen) {
            setTimeout(() => {
                setStep('form')
                setFormData({ name: '', phone: '', email: '', date: '', time: '', guests: '2', notes: '' })
                setErrors({})
                setCopied(false)
            }, 300)
        }
    }, [isDrawerOpen])

    const validate = (): boolean => {
        const newErrors: FormErrors = {}
        if (!formData.name.trim()) newErrors.name = 'Name is required'
        if (!formData.phone.trim()) newErrors.phone = 'Phone is required'
        if (!formData.date) newErrors.date = 'Date is required'
        if (!formData.time) newErrors.time = 'Time is required'
        if (!formData.guests) newErrors.guests = 'Number of guests is required'
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }))
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!validate()) return

        setIsSubmitting(true)

        // Simulate API call for UX feeling
        setTimeout(() => {
            setIsSubmitting(false)
            setStep('success')
        }, 1500)
    }

    const getWhatsAppLink = () => {
        const message = `Hello Tamberma, I would like to reserve a table.

Name: ${formData.name}
Phone: ${formData.phone}
Date: ${formatDate(formData.date)}
Time: ${formatTime(formData.time)}
Guests: ${formData.guests}
${formData.notes ? `Notes: ${formData.notes}` : ''}`

        return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
    }

    const copyToClipboard = () => {
        const message = `Reservation Request for Tamberma

Name: ${formData.name}
Phone: ${formData.phone}
Date: ${formatDate(formData.date)}
Time: ${formatTime(formData.time)}
Guests: ${formData.guests}
${formData.notes ? `Notes: ${formData.notes}` : ''}`

        navigator.clipboard.writeText(message)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const inputClasses = "w-full bg-neutral-50 border border-neutral-200 rounded-lg px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"

    return (
        <AnimatePresence>
            {isDrawerOpen && (
                <>
                    {/* Overlay */}
                    <MotionDiv
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
                        onClick={closeDrawer}
                    />

                    {/* Drawer */}
                    <MotionDiv
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                        className="fixed top-0 right-0 z-50 h-full w-full max-w-md bg-white border-l border-neutral-100 shadow-2xl overflow-y-auto"
                    >
                        {/* Header */}
                        <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-neutral-100 px-6 py-5 flex items-center justify-between z-10">
                            <h2 className="text-xl font-display font-medium text-neutral-900">Secure Your Table</h2>
                            <button
                                onClick={closeDrawer}
                                className="p-2 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 rounded-full transition-colors"
                                aria-label="Close drawer"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-6">
                            {step === 'form' ? (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Name */}
                                    <div>
                                        <label className="flex items-center gap-2 text-sm font-medium text-neutral-600 mb-2">
                                            <User size={16} className="text-primary" /> Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Your name"
                                            className={inputClasses}
                                        />
                                        {errors.name && <p className="text-red-400/80 text-xs mt-1">{errors.name}</p>}
                                    </div>

                                    {/* Phone */}
                                    <div>
                                        <label className="flex items-center gap-2 text-sm font-medium text-neutral-600 mb-2">
                                            <Phone size={16} className="text-primary" /> Phone Number *
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="+234 800 000 0000"
                                            className={inputClasses}
                                        />
                                        {errors.phone && <p className="text-red-400/80 text-xs mt-1">{errors.phone}</p>}
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label className="flex items-center gap-2 text-sm font-medium text-neutral-600 mb-2">
                                            <Mail size={16} className="text-primary" /> Email (Optional)
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="your@email.com"
                                            className={inputClasses}
                                        />
                                    </div>

                                    {/* Date & Time */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="flex items-center gap-2 text-sm font-medium text-neutral-600 mb-2">
                                                <Calendar size={16} className="text-primary" /> Date *
                                            </label>
                                            <input
                                                type="date"
                                                name="date"
                                                value={formData.date}
                                                onChange={handleChange}
                                                min={new Date().toISOString().split('T')[0]}
                                                className={inputClasses}
                                            />
                                            {errors.date && <p className="text-red-400/80 text-xs mt-1">{errors.date}</p>}
                                        </div>
                                        <div>
                                            <label className="flex items-center gap-2 text-sm font-medium text-neutral-600 mb-2">
                                                <Clock size={16} className="text-primary" /> Time *
                                            </label>
                                            <input
                                                type="time"
                                                name="time"
                                                value={formData.time}
                                                onChange={handleChange}
                                                step="900"
                                                className={inputClasses}
                                            />
                                            {errors.time && <p className="text-red-400/80 text-xs mt-1">{errors.time}</p>}
                                        </div>
                                    </div>
                                    <p className="text-neutral-500 text-xs -mt-2">We'll confirm your booking via WhatsApp.</p>

                                    {/* Guests */}
                                    <div>
                                        <label className="flex items-center gap-2 text-sm font-medium text-neutral-600 mb-2">
                                            <Users size={16} className="text-primary" /> Number of Guests *
                                        </label>
                                        <select
                                            name="guests"
                                            value={formData.guests}
                                            onChange={handleChange}
                                            className={inputClasses}
                                        >
                                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                                                <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                                            ))}
                                            <option value="10+">10+ Guests</option>
                                        </select>
                                        {errors.guests && <p className="text-red-400/80 text-xs mt-1">{errors.guests}</p>}
                                    </div>

                                    {/* Notes */}
                                    <div>
                                        <label className="flex items-center gap-2 text-sm font-medium text-neutral-600 mb-2">
                                            <MessageSquare size={16} className="text-primary" /> Special Requests
                                        </label>
                                        <textarea
                                            name="notes"
                                            value={formData.notes}
                                            onChange={handleChange}
                                            placeholder="Birthday, allergies, seating preference..."
                                            rows={3}
                                            className={inputClasses + ' resize-none'}
                                        />
                                    </div>

                                    {/* Submit */}
                                    <div className="pt-4">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full bg-primary text-white py-4 rounded-full font-medium hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-primary/25"
                                        >
                                            {isSubmitting ? 'Processing...' : 'Continue to WhatsApp'}
                                        </button>
                                        <p className="text-center text-xs text-neutral-400 mt-3 flex items-center justify-center gap-1">
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                            Instant confirmation available
                                        </p>
                                    </div>
                                </form>
                            ) : (
                                /* Success State */
                                <div className="text-center py-8 space-y-6">
                                    <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto ring-8 ring-green-500/5">
                                        <Check size={32} className="text-green-500" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-display text-neutral-900 mb-2">Request Generated ⚡️</h3>
                                        <p className="text-neutral-500 text-sm max-w-[260px] mx-auto">
                                            <span className="font-bold text-neutral-800">Final Step:</span> Tap the button below to send your details to our team.
                                        </p>
                                    </div>

                                    <div className="bg-neutral-50 border border-neutral-100 rounded-lg p-5 text-left text-sm text-neutral-600 space-y-2">
                                        <p><span className="font-medium text-neutral-900">Name:</span> {formData.name}</p>
                                        <p><span className="font-medium text-neutral-900">Phone:</span> {formData.phone}</p>
                                        <p><span className="font-medium text-neutral-900">Date:</span> {formatDate(formData.date)}</p>
                                        <p><span className="font-medium text-neutral-900">Time:</span> {formatTime(formData.time)}</p>
                                        <p><span className="font-medium text-neutral-900">Guests:</span> {formData.guests}</p>
                                        {formData.notes && <p><span className="font-medium text-neutral-900">Notes:</span> {formData.notes}</p>}
                                    </div>

                                    <div className="space-y-3">
                                        <a
                                            href={getWhatsAppLink()}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full bg-[#25D366] text-white py-4 rounded-full font-bold hover:bg-[#20bd5a] transition-colors flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform duration-200"
                                        >
                                            <MessageCircle size={20} className="text-white" />
                                            Send via WhatsApp
                                        </a>
                                        <button
                                            onClick={copyToClipboard}
                                            className="w-full bg-white border border-neutral-200 text-neutral-600 py-3 rounded-full font-medium hover:bg-neutral-50 transition-colors flex items-center justify-center gap-2"
                                        >
                                            <Copy size={16} />
                                            {copied ? 'Copied!' : 'Copy Details'}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </MotionDiv>
                </>
            )
            }
        </AnimatePresence >
    )
}
