import { proposalData } from '@/data/proposal';
import ProposalHero from '@/components/proposal/ProposalHero';
import ScopeList from '@/components/proposal/ScopeList';
import PricingTable from '@/components/proposal/PricingTable';
import Timeline from '@/components/proposal/Timeline';
import MaintenancePlans from '@/components/proposal/MaintenancePlans';
import ProposalCTA from '@/components/proposal/ProposalCTA';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Proposal | Tamberma Restaurant',
    description: 'Digital partner proposal for Tamberma Restaurant website.',
    robots: {
        index: false,
        follow: false,
    }
}

export default function ProposalPage() {
    return (
        <div className="min-h-screen bg-background">
            <ProposalHero
                clientName={proposalData.clientName}
                projectName={proposalData.projectName}
                preparedBy={proposalData.preparedBy}
                date={proposalData.date}
                summary={proposalData.executiveSummary}
            />

            <ScopeList
                included={proposalData.scopeIncluded}
                excluded={proposalData.scopeExcluded}
            />

            <PricingTable packages={proposalData.packages} />

            <Timeline steps={proposalData.timelineSteps} />

            <MaintenancePlans plans={proposalData.maintenancePlans} />

            <ProposalCTA
                whatsappNumber={proposalData.contact.whatsapp}
                email={proposalData.contact.email}
            />

            <footer className="py-8 text-center text-sm text-muted-foreground border-t border-border/30">
                <p>&copy; {new Date().getFullYear()} NCC Digital. Confidential Proposal.</p>
                <div className="mt-2 text-xs opacity-50 space-x-4">
                    <span>Live Demo</span>
                    <span>•</span>
                    <span>Asset List</span>
                </div>
            </footer>
        </div>
    );
}
