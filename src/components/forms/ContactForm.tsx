"use client"

import React from 'react'
import Button from '@/components/ui/Button'

interface ContactFormProps {
    className?: string;
}

export default function ContactForm({ className }: ContactFormProps) {
    return (
        <form className={`space-y-6 ${className}`}>
            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-700">Name</label>
                    <input
                        type="text"
                        className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-3 text-neutral-900 placeholder:text-neutral-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                        placeholder="John Doe"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-700">Email</label>
                    <input
                        type="email"
                        className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-3 text-neutral-900 placeholder:text-neutral-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                        placeholder="john@example.com"
                    />
                </div>
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-700">Message / Special Requests</label>
                <textarea
                    rows={4}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-3 text-neutral-900 placeholder:text-neutral-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                    placeholder="Dietary restrictions, special occasion..."
                />
            </div>
            <Button className="w-full md:w-auto shadow-luxury hover:shadow-luxury-hover">
                Request Reservation
            </Button>
        </form>
    )
}
