import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import '@/styles/globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { BookingProvider } from '@/contexts/BookingContext'
import ReservationDrawer from '@/components/booking/ReservationDrawer'
import MobileReserveCTA from '@/components/booking/MobileReserveCTA'
import { ThemeProvider } from '@/components/providers/ThemeProvider'

// Font Setup
const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
})

const playfair = Playfair_Display({
    subsets: ['latin'],
    variable: '--font-playfair',
    display: 'swap',
})

export const metadata: Metadata = {
    title: 'Tamberma - Premier Indian Cuisine',
    description: 'Authentic Indian culinary experience paired with handcrafted cocktails in the heart of the city.',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
            <body className="min-h-screen flex flex-col bg-background text-foreground">
                <BookingProvider>
                    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} forcedTheme="light">
                        <Header />
                        <main className="flex-grow">
                            {children}
                        </main>
                        <Footer />
                        <ReservationDrawer />
                        <MobileReserveCTA />
                    </ThemeProvider>
                </BookingProvider>
            </body>
        </html>
    )
}
