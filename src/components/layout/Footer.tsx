import Link from 'next/link'
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from 'lucide-react'

export default function Footer() {
    return (
        <footer className="bg-neutral-100 border-t border-neutral-200 pt-20 pb-12">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="space-y-6">
                        <h3 className="text-4xl font-display font-medium text-neutral-900 tracking-wider">Tamberma</h3>
                        <p className="text-neutral-600 text-sm leading-relaxed max-w-xs">
                            Authentic Indian cuisine redefining the fine dining experience in Ibadan. Where tradition meets elegance.
                        </p>
                        <div className="flex space-x-6">
                            <a href="#" className="text-neutral-500 hover:text-primary transition-colors">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="text-neutral-500 hover:text-primary transition-colors">
                                <Facebook size={20} />
                            </a>
                            <a href="#" className="text-neutral-500 hover:text-primary transition-colors">
                                <Twitter size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-sm font-sans text-neutral-900 mb-6 uppercase tracking-[0.2em] font-semibold">Explore</h4>
                        <ul className="space-y-4 text-neutral-600 text-sm">
                            <li><Link href="/menu" className="hover:text-primary transition-colors">Menu</Link></li>
                            <li><Link href="/gallery" className="hover:text-primary transition-colors">Gallery</Link></li>
                            <li><Link href="/events" className="hover:text-primary transition-colors">Events</Link></li>
                            <li><Link href="/contact" className="hover:text-primary transition-colors">Reservations</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-sm font-sans text-neutral-900 mb-6 uppercase tracking-[0.2em] font-semibold">Contact</h4>
                        <ul className="space-y-4 text-neutral-600 text-sm">
                            <li className="flex items-start space-x-3">
                                <MapPin size={18} className="text-primary mt-0.5 flex-shrink-0" />
                                <span>Rev'd Boyer Road, University of Ibadan, Ibadan, Nigeria</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Phone size={18} className="text-primary flex-shrink-0" />
                                <span>+234 800 000 0000</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Mail size={18} className="text-primary flex-shrink-0" />
                                <span>reservations@tamberma.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Hours */}
                    <div>
                        <h4 className="text-sm font-sans text-neutral-900 mb-6 uppercase tracking-[0.2em] font-semibold">Opening Hours</h4>
                        <ul className="space-y-3 text-neutral-600 text-sm">
                            <li className="flex justify-between border-b border-neutral-200 pb-2">
                                <span>Mon - Thu</span>
                                <span>12:00 PM - 10:00 PM</span>
                            </li>
                            <li className="flex justify-between text-neutral-900 border-b border-neutral-200 pb-2 font-medium">
                                <span>Fri - Sat</span>
                                <span>12:00 PM - 11:00 PM</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Sunday</span>
                                <span>11:00 AM - 10:00 PM</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-neutral-200 pt-8 text-center text-neutral-500 text-xs">
                    <p>&copy; {new Date().getFullYear()} Tamberma Restaurant. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
