// Business Configuration for Tamberma Restaurant

export const businessConfig = {
  // Reservation Settings
  reservations: {
    enabled: true,
    advanceBooking: 30, // days
    minimumPartySize: 1,
    maximumPartySize: 12,
    timeSlots: [
      '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
      '18:00', '18:30', '19:00', '19:30', '20:00', '20:30',
      '21:00', '21:30', '22:00'
    ]
  },
  // Delivery Settings
  delivery: {
    enabled: true,
    radius: 15, // km
    minimumOrder: 500, // INR
    deliveryFee: 50, // INR
    estimatedTime: '45-60 minutes',
    partnerApps: ['Zomato', 'Swiggy', 'Uber Eats']
  },
  // Event Hosting
  events: {
    privateParties: true,
    corporateEvents: true,
    weddings: true,
    birthdays: true,
    minimumGuests: 20,
    maximumGuests: 150,
    advanceBooking: 7 // days minimum
  }
};

export default businessConfig; 