import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ReservationDrawer from '@/components/booking/ReservationDrawer'
import MobileReserveCTA from '@/components/booking/MobileReserveCTA'

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <Header />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
            <ReservationDrawer />
            <MobileReserveCTA />
        </>
    )
}
