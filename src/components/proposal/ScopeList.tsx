'use client';
import { Check, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface ScopeListProps {
    included: string[];
    excluded: string[];
}

export default function ScopeList({ included, excluded }: ScopeListProps) {
    return (
        <section className="py-20 px-6 md:px-12 bg-background">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl font-playfair text-foreground mb-16 text-center">Scope & Deliverables</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
                    {/* Included */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <div className="flex items-center gap-4 mb-8 border-b border-border/50 pb-4">
                            <div className="w-10 h-10 rounded-full bg-green-900/10 flex items-center justify-center text-green-700">
                                <Check size={20} />
                            </div>
                            <h3 className="text-2xl font-playfair text-foreground">What's Included</h3>
                        </div>

                        <ul className="grid grid-cols-1 gap-4">
                            {included.map((item, i) => (
                                <li key={i} className="flex items-center gap-4 p-3 rounded-lg hover:bg-secondary/5 transition-colors">
                                    <Check size={18} className="text-green-700/80 shrink-0" />
                                    <span className="text-foreground/80 font-light">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Excluded */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8 opacity-70"
                    >
                        <div className="flex items-center gap-4 mb-8 border-b border-border/50 pb-4">
                            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                                <X size={20} />
                            </div>
                            <h3 className="text-2xl font-playfair text-muted-foreground">Out of Scope</h3>
                        </div>

                        <ul className="grid grid-cols-1 gap-4">
                            {excluded.map((item, i) => (
                                <li key={i} className="flex items-center gap-4 p-3">
                                    <X size={18} className="text-muted-foreground/60 shrink-0" />
                                    <span className="text-muted-foreground font-light">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
