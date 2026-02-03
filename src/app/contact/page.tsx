import ContactForm from '@/components/forms/ContactForm'

export default function ContactPage() {
    return (
        <div className="pt-32 pb-24 max-w-4xl mx-auto px-4">
            <h1 className="text-5xl font-display font-bold text-center mb-16 text-neutral-900">Contact Us</h1>

            <div className="bg-white p-8 md:p-12 rounded-2xl shadow-luxury border border-neutral-100">
                <h2 className="text-2xl font-display font-bold mb-8 text-center text-neutral-900">Make a Reservation</h2>
                <ContactForm />
            </div>
        </div>
    )
}

