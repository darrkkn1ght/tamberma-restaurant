'use client';
import { motion } from 'framer-motion';

interface TimelineStep {
    title: string;
    description: string;
    duration: string;
    status: string;
}

interface TimelineProps {
    steps: TimelineStep[];
}

export default function Timeline({ steps }: TimelineProps) {
    return (
        <section className="py-16 px-6 md:px-12 bg-background">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-playfair text-foreground mb-12 text-center">Project Timeline</h2>

                <div className="relative border-l-2 border-border ml-4 md:ml-0 space-y-12">
                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="relative pl-12 md:pl-0"
                        >
                            {/* Dot */}
                            <div className={`
                absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 
                ${step.status === 'completed' ? 'bg-primary border-primary' :
                                    step.status === 'in-progress' ? 'bg-background border-primary animate-pulse' :
                                        'bg-background border-border'}
              `} />

                            <div className="md:grid md:grid-cols-5 md:gap-8 items-start">
                                <div className="hidden md:block md:col-span-2 text-right pt-0.5">
                                    <span className="block font-medium text-foreground">{step.duration}</span>
                                    <span className={`text-xs uppercase tracking-wider ${step.status === 'completed' ? 'text-green-600' :
                                            step.status === 'in-progress' ? 'text-primary' :
                                                'text-muted-foreground'
                                        }`}>
                                        {step.status}
                                    </span>
                                </div>

                                <div className="md:col-span-3">
                                    <span className="md:hidden text-sm text-primary font-medium mb-1 block">{step.duration}</span>
                                    <h3 className="text-xl font-playfair text-foreground mb-2">{step.title}</h3>
                                    <p className="text-muted-foreground">{step.description}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
