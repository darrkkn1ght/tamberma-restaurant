import { NextRequest, NextResponse } from 'next/server'

interface ReservationData {
    name: string
    phone: string
    email?: string
    date: string
    time: string
    guests: string
    notes?: string
}

export async function POST(request: NextRequest) {
    try {
        const data: ReservationData = await request.json()

        // Validate required fields
        if (!data.name || !data.phone || !data.date || !data.time || !data.guests) {
            return NextResponse.json(
                { ok: false, error: 'Missing required fields' },
                { status: 400 }
            )
        }

        // Log reservation (in production, this would send email or save to database)
        console.log('📅 New Reservation Request:', {
            name: data.name,
            phone: data.phone,
            email: data.email || 'Not provided',
            date: data.date,
            time: data.time,
            guests: data.guests,
            notes: data.notes || 'None',
            submittedAt: new Date().toISOString()
        })

        // Return success - WhatsApp fallback will be handled on frontend
        return NextResponse.json({
            ok: true,
            message: 'Reservation request received. Please confirm via WhatsApp.',
            whatsappNumber: process.env.NEXT_PUBLIC_TAMBERMA_WHATSAPP || '2348075590939'
        })

    } catch (error) {
        console.error('Reservation API Error:', error)
        return NextResponse.json(
            { ok: false, error: 'Failed to process reservation' },
            { status: 500 }
        )
    }
}
