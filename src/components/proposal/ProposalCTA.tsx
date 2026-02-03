'use client';
import { Send, MessageCircle, CheckCircle } from 'lucide-react';

interface ProposalCTAProps {
    whatsappNumber: string;
    email: string;
}

export default function ProposalCTA({ whatsappNumber, email }: ProposalCTAProps) {

    const handleApprove = () => {
        const text = encodeURIComponent("Hi, I've reviewed the Tamberma Website Proposal and I'd like to approve it to move forward.");
        window.open(`https://wa.me/${whatsappNumber}?text=${text}`, '_blank');
    };

    const handleChanges = () => {
        const text = encodeURIComponent("Hi, I've reviewed the proposal. I have some questions/requests for changes.");
        window.open(`https://wa.me/${whatsappNumber}?text=${text}`, '_blank');
    };

    return (
        <section className="py-32 px-6 md:px-12 bg-[#1C1917] text-[#FAF9F6] text-center relative overflow-hidden">
            {/* Texture */}
            <div className="absolute inset-0 opacity-10 bg-[url('/images/texture/noise.png')] mix-blend-overlay pointer-events-none" />

            <div className="max-w-3xl mx-auto relative z-10">
                <h2 className="text-4xl md:text-6xl font-playfair mb-8 tracking-tight">Ready to begin?</h2>
                <p className="text-white/60 mb-12 text-xl font-light leading-relaxed">
                    Let's transform Tamberma's digital presence into an asset that drives <span className="text-primary italic">real growth</span>.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                    <button
                        onClick={handleApprove}
                        className="group relative bg-primary hover:bg-[#D66A51] text-white font-medium px-10 py-5 rounded-full flex items-center justify-center gap-4 transition-all duration-300 shadow-[0_10px_30px_-10px_rgba(200,85,61,0.5)] hover:shadow-[0_20px_40px_-10px_rgba(200,85,61,0.6)] hover:-translate-y-1"
                    >
                        <span className="font-playfair text-lg tracking-wide">Approve Proposal</span>
                        <CheckCircleIcon className="group-hover:scale-110 transition-transform" />
                    </button>

                    <button
                        onClick={handleChanges}
                        className="group text-white/80 hover:text-white font-medium px-8 py-5 flex items-center gap-3 transition-colors border-b border-transparent hover:border-white/30"
                    >
                        <MessageCircle size={20} />
                        <span className="tracking-wide">Discuss / Request Changes</span>
                    </button>
                </div>

                <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-center gap-8 text-xs text-white/30 uppercase tracking-widest">
                    <span>Valid for 14 Days</span>
                    <span className="hidden md:inline">•</span>
                    <span>Secured via WhatsApp</span>
                    <span className="hidden md:inline">•</span>
                    <span>Initial Deposit: 50%</span>
                </div>
            </div>
        </section>
    );
}

function CheckCircleIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
    )
}
