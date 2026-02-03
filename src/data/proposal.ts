export const proposalData = {
    clientName: "Tamberma Restaurant",
    projectName: "Tamberma Website Proposal",
    preparedBy: "NCC Digital",
    date: "February 2026",
    executiveSummary: [
        "A premium, high-performance website reflecting Tamberma's culinary excellence.",
        "Streamlined reservation flows via WhatsApp and contact forms to increase bookings.",
        "Mobile-first design ensuring a flawless experience for customers on the go.",
        "SEO-optimized structure to improve local visibility and discovery.",
        "Scalable architecture ready for future growth (menu updates, events, payments)."
    ],
    scopeIncluded: [
        "Home, Menu, Gallery, Events, Contact Pages",
        "Reservation Drawer (WhatsApp Integration)",
        "Performance Optimization (Speed & SEO basics)",
        "Mobile Responsive Design",
        "Social Media Integration",
        "Google Maps Integration"
    ],
    scopeExcluded: [
        "Online Payments Processing",
        "Delivery Tracking System",
        "Complex Admin Dashboard (CMS)",
        "Ongoing Content Creation (Photography/Copywriting)",
        "Email Marketing System"
    ],
    timelineSteps: [
        {
            title: "Discovery & Design",
            description: "Finalizing requirements and visual direction.",
            duration: "Week 1",
            status: "completed"
        },
        {
            title: "Development (MVP)",
            description: "Building core pages, menu, and reservation flow.",
            duration: "Week 2-3",
            status: "in-progress"
        },
        {
            title: "Content & Polish",
            description: "Populating real menu items, photos, and copy adjustments.",
            duration: "Week 3",
            status: "pending"
        },
        {
            title: "Launch & Training",
            description: "Deployment to production and handover.",
            duration: "Week 4",
            status: "pending"
        }
    ],
    packages: [
        {
            name: "Starter Launch",
            price: "₦200,000",
            description: "The \"we just want to go online properly\" tier.",
            deliverables: [
                "Final website deployment",
                "Domain + hosting setup",
                "Performance optimization",
                "Mobile responsiveness QA",
                "Reservation system setup (WhatsApp)",
                "Basic SEO (Google indexing)"
            ],
            bestFor: "Getting online quickly"
        },
        {
            name: "Growth Package",
            price: "₦350,000 - ₦400,000",
            description: "Turns the website into a customer acquisition tool.",
            recommended: true,
            deliverables: [
                "Everything in Starter",
                "Advanced Menu System (categories + filtering)",
                "Google Maps + Location SEO",
                "Gallery lightbox upgrade",
                "Contact automation (routing)",
                "Conversion optimization (Sticky buttons)",
                "Analytics setup (Google Analytics)"
            ],
            bestFor: "Driving real foot traffic"
        },
        {
            name: "Premium Partner",
            price: "₦600,000 - ₦750,000",
            description: "Positions Tamberma as a premium digital brand.",
            deliverables: [
                "Everything in Growth",
                "Full booking workflow upgrade",
                "Events page system",
                "Admin-friendly content editing",
                "Monthly maintenance (1 month included)",
                "Social proof integration (Reviews)",
                "Priority Support"
            ],
            bestFor: "Long-term brand dominance"
        }
    ],
    maintenancePlans: [
        {
            name: "Monthly Retainer",
            price: "Negotiable",
            features: [
                "Regular content updates (Menu/Events)",
                "Performance monitoring",
                "Security updates",
                "Monthly traffic reports"
            ]
        },
        {
            name: "Pay-Per-Change",
            price: "Hourly Rate",
            features: [
                "Ad-hoc updates as needed",
                "Billed based on time spent",
                "Best for infrequent changes"
            ]
        }
    ],
    contact: {
        whatsapp: "2348129744447",
        email: "info@nccdigital.com"
    }
};
