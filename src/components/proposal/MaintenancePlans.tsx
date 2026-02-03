'use client';

interface Plan {
    name: string;
    price: string;
    features: string[];
}

interface MaintenancePlansProps {
    plans: Plan[];
}

export default function MaintenancePlans({ plans }: MaintenancePlansProps) {
    return (
        <section className="py-16 px-6 md:px-12 bg-background border-t border-border/50">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-playfair text-foreground mb-8 text-center">Ongoing Support & Maintenance</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {plans.map((plan, i) => (
                        <div key={i} className="bg-muted/30 p-6 rounded-xl border border-border">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="font-bold text-lg">{plan.name}</h3>
                                <span className="bg-background px-3 py-1 rounded-full text-sm font-medium border border-border">
                                    {plan.price}
                                </span>
                            </div>
                            <ul className="space-y-2">
                                {plan.features.map((feature, idx) => (
                                    <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-primary/50 rounded-full" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
