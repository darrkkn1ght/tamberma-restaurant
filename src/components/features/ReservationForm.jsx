import React, { useState } from 'react';

const ReservationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '2',
    specialRequests: '',
    occasion: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Generate time slots
  const timeSlots = [
    '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
    '20:00', '20:30', '21:00', '21:30', '22:00'
  ];

  // Generate guest options
  const guestOptions = Array.from({ length: 20 }, (_, i) => i + 1);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        guests: '2',
        specialRequests: '',
        occasion: ''
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get minimum date (today)
  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  // Get maximum date (3 months from now)
  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 3);
    return maxDate.toISOString().split('T')[0];
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-display font-bold text-neutral-900 mb-2">
          Reserve Your Table
        </h2>
        <p className="text-neutral-600">
          Book your perfect dining experience at Tamberma Restaurant
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="bg-white p-6 rounded-lg border border-neutral-200 shadow-sm">
          <h3 className="text-lg font-medium text-neutral-900 mb-4">Personal Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="group">
              <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all duration-300 bg-white hover:border-neutral-400 group-hover:shadow-sm"
                placeholder="Enter your full name"
              />
            </div>
            
            <div className="group">
              <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all duration-300 bg-white hover:border-neutral-400 group-hover:shadow-sm"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div className="mt-6">
            <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all duration-300 bg-white hover:border-neutral-400"
              placeholder="Enter your phone number"
            />
          </div>
        </div>

        {/* Reservation Details */}
        <div className="bg-white p-6 rounded-lg border border-neutral-200 shadow-sm">
          <h3 className="text-lg font-medium text-neutral-900 mb-4">Reservation Details</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="group">
              <label htmlFor="date" className="block text-sm font-medium text-neutral-700 mb-2">
                Date *
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                min={getMinDate()}
                max={getMaxDate()}
                required
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all duration-300 bg-white hover:border-neutral-400 group-hover:shadow-sm"
              />
            </div>
            
            <div className="group">
              <label htmlFor="time" className="block text-sm font-medium text-neutral-700 mb-2">
                Time *
              </label>
              <select
                id="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all duration-300 bg-white hover:border-neutral-400 group-hover:shadow-sm"
              >
                <option value="">Select time</option>
                {timeSlots.map(time => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="group">
              <label htmlFor="guests" className="block text-sm font-medium text-neutral-700 mb-2">
                Guests *
              </label>
              <select
                id="guests"
                name="guests"
                value={formData.guests}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all duration-300 bg-white hover:border-neutral-400 group-hover:shadow-sm"
              >
                {guestOptions.map(num => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Guest' : 'Guests'}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6">
            <label htmlFor="occasion" className="block text-sm font-medium text-neutral-700 mb-2">
              Special Occasion
            </label>
            <select
              id="occasion"
              name="occasion"
              value={formData.occasion}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all duration-300 bg-white hover:border-neutral-400"
            >
              <option value="">No special occasion</option>
              <option value="birthday">Birthday</option>
              <option value="anniversary">Anniversary</option>
              <option value="business">Business Dinner</option>
              <option value="celebration">Celebration</option>
              <option value="date">Date Night</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        {/* Special Requests */}
        <div className="bg-white p-6 rounded-lg border border-neutral-200 shadow-sm">
          <h3 className="text-lg font-medium text-neutral-900 mb-4">Additional Information</h3>
          
          <div className="group">
            <label htmlFor="specialRequests" className="block text-sm font-medium text-neutral-700 mb-2">
              Special Requests or Dietary Requirements
            </label>
            <textarea
              id="specialRequests"
              name="specialRequests"
              value={formData.specialRequests}
              onChange={handleInputChange}
              rows="4"
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all duration-300 bg-white hover:border-neutral-400 group-hover:shadow-sm resize-vertical"
              placeholder="Let us know about any dietary restrictions, allergies, or special arrangements..."
            />
          </div>
        </div>

        {/* Submit Status */}
        {submitStatus === 'success' && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg animate-fade-in">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-green-800">
                  Reservation submitted successfully! We'll confirm your booking within 30 minutes.
                </p>
              </div>
            </div>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg animate-fade-in">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-red-800">
                  Sorry, there was an error processing your reservation. Please try again or call us directly.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary-400 hover:bg-primary-500 disabled:bg-neutral-400 text-white font-medium py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing Reservation...
              </div>
            ) : (
              'Reserve Table'
            )}
          </button>
        </div>
      </form>

      {/* Reservation Policy */}
      <div className="mt-8 p-6 bg-amber-50 border border-amber-200 rounded-lg">
        <h3 className="text-lg font-medium text-amber-900 mb-3">Reservation Policy</h3>
        <div className="space-y-2 text-sm text-amber-800">
          <p>• Reservations are held for 15 minutes past the reserved time</p>
          <p>• For parties of 8 or more, please call us directly at +234 803 123 4567</p>
          <p>• Cancellations must be made at least 2 hours in advance</p>
          <p>• We'll send you a confirmation email with all the details</p>
        </div>
      </div>

      {/* Quick Contact */}
      <div className="mt-6 text-center">
        <p className="text-neutral-600 mb-2">Need help with your reservation?</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="tel:+2348031234567" 
            className="inline-flex items-center justify-center px-6 py-2 border border-primary-400 text-primary-400 rounded-lg hover:bg-primary-400 hover:text-white transition-all duration-300"
          >
            📞 Call Us
          </a>
          <a 
            href="https://wa.me/2348031234567" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-2 border border-green-500 text-green-500 rounded-lg hover:bg-green-500 hover:text-white transition-all duration-300"
          >
            💬 WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};

export default ReservationForm;