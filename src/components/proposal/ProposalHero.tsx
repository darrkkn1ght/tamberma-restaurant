'use client';
import { motion } from 'framer-motion';

interface ProposalHeroProps {
    clientName: string;
    projectName: string;
    preparedBy: string;
    date: string;
    summary: string[];
}

export default function ProposalHero({ clientName, projectName, preparedBy, date, summary }: ProposalHeroProps) {
    return (
        <section className="relative py-24 px-6 md:px-12 bg-background border-b border-border/40 overflow-hidden">
            {/* Background Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.03] bg-[url('/images/texture/noise.png')] mix-blend-multiply pointer-events-none" />

            <div className="max-w-4xl mx-auto text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mb-16"
                >
                    <div className="inline-block mb-6 px-4 py-1.5 border border-primary/20 rounded-full bg-primary/5">
                        <span className="text-primary text-xs uppercase tracking-[0.2em] font-medium">
                            Official Proposal
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-playfair text-foreground mb-8 leading-[1.1]">
                        {projectName}
                    </h1>

                    <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 text-muted-foreground/80 font-light">
                        <div className="text-center">
                            <p className="text-xs uppercase tracking-widest mb-1 opacity-60">Prepared For</p>
                            <p className="text-lg text-foreground font-playfair italic">{clientName}</p>
                        </div>
                        <div className="w-px h-8 bg-border hidden md:block" />
                        <div className="text-center">
                            <p className="text-xs uppercase tracking-widest mb-1 opacity-60">Prepared By</p>
                            <p className="text-lg text-foreground font-playfair italic">{preparedBy}</p>
                        </div>
                        <div className="w-px h-8 bg-border hidden md:block" />
                        <div className="text-center">
                            <p className="text-xs uppercase tracking-widest mb-1 opacity-60">Date</p>
                            <p className="text-lg text-foreground font-playfair italic">{date}</p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="bg-white/40 dark:bg-black/20 backdrop-blur-sm p-8 md:p-12 rounded-3xl border border-secondary/10 shadow-sm"
                >
                    <h2 className="text-2xl font-playfair text-foreground mb-6 italic">Executive Summary</h2>
                    <div className="space-y-4 text-left max-w-2xl mx-auto">
                        {summary.map((item, i) => (
                            <div key={i} className="flex items-start gap-4 group">
                                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary/60 group-hover:bg-primary transition-colors shrink-0" />
                                <span className="text-muted-foreground leading-relaxed">{item}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
