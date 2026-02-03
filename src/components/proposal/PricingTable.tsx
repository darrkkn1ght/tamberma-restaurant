'use client';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

interface Package {
    name: string;
    price: string;
    description: string;
    deliverables: string[];
    bestFor?: string;
    recommended?: boolean;
}

interface PricingTableProps {
    packages: Package[];
}

export default function PricingTable({ packages }: PricingTableProps) {
    return (
        <section className="py-24 px-6 md:px-12 bg-secondary/5 border-t border-b border-border/30">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-playfair text-foreground mb-4">Investment Packages</h2>
                    <div className="w-24 h-1 bg-primary/20 mx-auto rounded-full mb-6" />
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg font-light">
                        Transparent pricing tailored to Tamberma's goals in the Nigerian market.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                    {packages.map((pkg, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.15, duration: 0.6 }}
                            className={`relative flex flex-col bg-background rounded-xl p-8 transition-all duration-300 hover:-translate-y-2
                ${pkg.recommended
                                    ? 'border-2 border-primary/20 shadow-2xl z-10 scale-105 md:-mt-4 md:-mb-4'
                                    : 'border border-border/60 shadow-lg opacity-90 hover:opacity-100 hover:shadow-xl'
                                }`}
                        >
                            {pkg.recommended && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                    <span className="bg-primary text-primary-foreground px-6 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-md">
                                        Recommended
                                    </span>
                                </div>
                            )}

                            <div className="mb-8 text-center border-b border-dashed border-border/50 pb-8">
                                <h3 className="text-xl font-playfair font-semibold mb-2 text-foreground">{pkg.name}</h3>
                                <div className="text-3xl md:text-4xl font-playfair text-foreground mb-3">
                                    {pkg.price}
                                </div>
                                <p className="text-sm text-muted-foreground/80 italic">{pkg.description}</p>
                            </div>

                            <div className="space-y-4 mb-8 flex-grow">
                                {pkg.deliverables.map((item, idx) => (
                                    <div key={idx} className="flex items-start gap-4">
                                        <div className={`mt-1 shrink-0 p-0.5 rounded-full ${pkg.recommended ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                                            <Check size={12} strokeWidth={3} />
                                        </div>
                                        <span className="text-sm text-foreground/80 font-light">{item}</span>
                                    </div>
                                ))}
                            </div>

                            {pkg.bestFor && (
                                <div className="pt-6 mt-auto bg-secondary/5 -mx-8 -mb-8 p-6 text-center border-t border-border/30">
                                    <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground block mb-2">Best For</span>
                                    <p className="font-playfair font-medium text-foreground">{pkg.bestFor}</p>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
