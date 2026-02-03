import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { Calendar, Clock, Users, MessageSquare } from 'lucide-react';
import Button from '../ui/Button';

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

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.phone) newErrors.phone = 'Phone is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.time) newErrors.time = 'Time is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    if (!validate()) {
      setIsSubmitting(false);
      return;
    }

    try {
      // START: EmailJS Integration
      // NOTE: Replace these with your actual EmailJS Service ID, Template ID, and Public Key
      const SERVICE_ID = 'service_placeholder'; // e.g., service_gmail
      const TEMPLATE_ID = 'template_reservation'; // Create a template in EmailJS
      const PUBLIC_KEY = 'user_placeholder';   // Your Public Key

      const templateParams = {
        to_name: 'Tamberma Reservations',
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        date: formData.date,
        time: formData.time,
        guests: formData.guests,
        occasion: formData.occasion,
        special_requests: formData.specialRequests,
        message: `Reservation for ${formData.guests} people on ${formData.date} at ${formData.time}.`
      };

      // In a real env, use process.env.REACT_APP_EMAILJS_SERVICE_ID etc.
      // await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);

      // For MVP Demo purposes (if no keys provided), we will simulate a network request 
      // but warn the developer.
      console.warn("EmailJS keys are placeholders. Add actual keys to enable sending.");

      // Simulating a realistic network delay for EmailJS
      await new Promise(resolve => setTimeout(resolve, 1000));

      // END: EmailJS Integration

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
      setErrors({});

      // Auto-clear success message
      setTimeout(() => setSubmitStatus(null), 5000);

    } catch (error) {
      console.error('Reservation Error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Input */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Full Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-neutral-800 border ${errors.name ? 'border-red-500' : 'border-neutral-700'} rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent text-white placeholder-gray-500 transition-all duration-300`}
            placeholder="John Doe"
          />
          {errors.name && <span className="text-red-500 text-xs mt-1">{errors.name}</span>}
        </div>

        {/* Contact Info Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email Address *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-neutral-800 border ${errors.email ? 'border-red-500' : 'border-neutral-700'} rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent text-white placeholder-gray-500 transition-all duration-300`}
              placeholder="john@example.com"
            />
            {errors.email && <span className="text-red-500 text-xs mt-1">{errors.email}</span>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-neutral-800 border ${errors.phone ? 'border-red-500' : 'border-neutral-700'} rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent text-white placeholder-gray-500 transition-all duration-300`}
              placeholder="+234..."
            />
            {errors.phone && <span className="text-red-500 text-xs mt-1">{errors.phone}</span>}
          </div>
        </div>

        {/* Date & Time Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Date *</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                className={`w-full pl-10 pr-4 py-3 bg-neutral-800 border ${errors.date ? 'border-red-500' : 'border-neutral-700'} rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent text-white placeholder-gray-500 transition-all duration-300 [color-scheme:dark]`}
              />
            </div>
            {errors.date && <span className="text-red-500 text-xs mt-1">{errors.date}</span>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Time *</label>
            <div className="relative">
              <Clock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <select
                name="time"
                value={formData.time}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-3 bg-neutral-800 border ${errors.time ? 'border-red-500' : 'border-neutral-700'} rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent text-white placeholder-gray-500 transition-all duration-300 appearance-none`}
              >
                <option value="">Select Time</option>
                <option value="12:00">12:00 PM</option>
                <option value="13:00">1:00 PM</option>
                <option value="14:00">2:00 PM</option>
                <option value="15:00">3:00 PM</option>
                <option value="16:00">4:00 PM</option>
                <option value="17:00">5:00 PM</option>
                <option value="18:00">6:00 PM</option>
                <option value="19:00">7:00 PM</option>
                <option value="20:00">8:00 PM</option>
                <option value="21:00">9:00 PM</option>
                <option value="22:00">10:00 PM</option>
              </select>
            </div>
            {errors.time && <span className="text-red-500 text-xs mt-1">{errors.time}</span>}
          </div>
        </div>

        {/* Guests & Occasion Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Guests</label>
            <div className="relative">
              <Users className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <select
                name="guests"
                value={formData.guests}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent text-white placeholder-gray-500 transition-all duration-300 appearance-none"
              >
                {[...Array(20)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1} {i === 0 ? 'Person' : 'People'}</option>
                ))}
                <option value="20+">20+ People</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Occasion (Optional)</label>
            <select
              name="occasion"
              value={formData.occasion}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent text-white placeholder-gray-500 transition-all duration-300 appearance-none"
            >
              <option value="">Select Occasion</option>
              <option value="birthday">Birthday</option>
              <option value="anniversary">Anniversary</option>
              <option value="date">Date Night</option>
              <option value="business">Business Meal</option>
              <option value="gathering">Casual Gathering</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        {/* Special Requests */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Special Requests</label>
          <div className="relative">
            <MessageSquare className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
            <textarea
              name="specialRequests"
              value={formData.specialRequests}
              onChange={handleChange}
              rows="3"
              className="w-full pl-10 pr-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent text-white placeholder-gray-500 transition-all duration-300 resize-none"
              placeholder="Allergies, dietary restrictions, or seating preferences..."
            />
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          className="w-full py-4 text-lg font-semibold"
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Confirming Reservation...' : 'Confirm Reservation'}
        </Button>

        {/* Status Messages */}
        {submitStatus === 'success' && (
          <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 text-center animate-fade-in">
            <p className="font-medium">Reservation Sent!</p>
            <p className="text-sm mt-1">We'll confirm via email/phone shortly.</p>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-center animate-fade-in">
            <p className="font-medium">Submission Failed</p>
            <p className="text-sm mt-1">Please try again or call us directly.</p>
          </div>
        )}

      </form>

      {/* Policy Note */}
      <div className="mt-6 text-center">
        <p className="text-xs text-gray-500">
          By making a reservation, you agree to our booking policy.
          For groups larger than 20, please contact us directly.
        </p>
      </div>
    </div>
  );
};

export default ReservationForm;