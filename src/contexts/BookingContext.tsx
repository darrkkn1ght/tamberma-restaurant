"use client"
import { createContext, useContext, useState, ReactNode } from 'react'

interface BookingContextType {
    isDrawerOpen: boolean
    openDrawer: () => void
    closeDrawer: () => void
}

const BookingContext = createContext<BookingContextType | undefined>(undefined)

export function BookingProvider({ children }: { children: ReactNode }) {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    const openDrawer = () => setIsDrawerOpen(true)
    const closeDrawer = () => setIsDrawerOpen(false)

    return (
        <BookingContext.Provider value={{ isDrawerOpen, openDrawer, closeDrawer }}>
            {children}
        </BookingContext.Provider>
    )
}

export function useBooking() {
    const context = useContext(BookingContext)
    if (!context) {
        throw new Error('useBooking must be used within a BookingProvider')
    }
    return context
}
