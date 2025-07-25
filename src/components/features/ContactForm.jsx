import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

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
        subject: '',
        message: ''
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name and Email Row */}
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

        {/* Phone and Subject Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="group">
            <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all duration-300 bg-white hover:border-neutral-400 group-hover:shadow-sm"
              placeholder="Enter your phone number"
            />
          </div>
          
          <div className="group">
            <label htmlFor="subject" className="block text-sm font-medium text-neutral-700 mb-2">
              Subject *
            </label>
            <select
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all duration-300 bg-white hover:border-neutral-400 group-hover:shadow-sm"
            >
              <option value="">Select a subject</option>
              <option value="general">General Inquiry</option>
              <option value="reservation">Reservation</option>
              <option value="catering">Catering Services</option>
              <option value="events">Private Events</option>
              <option value="feedback">Feedback</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        {/* Message */}
        <div className="group">
          <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-2">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            required
            rows="6"
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all duration-300 bg-white hover:border-neutral-400 group-hover:shadow-sm resize-vertical"
            placeholder="Tell us how we can help you..."
          />
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
                  Thank you! Your message has been sent successfully. We'll get back to you soon.
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
                  Sorry, there was an error sending your message. Please try again.
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
                Sending Message...
              </div>
            ) : (
              'Send Message'
            )}
          </button>
        </div>
      </form>

      {/* Additional Info */}
      <div className="mt-8 p-6 bg-neutral-50 rounded-lg border border-neutral-200">
        <h3 className="text-lg font-medium text-neutral-900 mb-3">Need Immediate Assistance?</h3>
        <div className="space-y-2 text-sm text-neutral-600">
          <p>📞 <span className="font-medium">Phone:</span> +234 803 123 4567</p>
          <p>📧 <span className="font-medium">Email:</span> hello@tambermarestaurant.com</p>
          <p>⏰ <span className="font-medium">Response Time:</span> We typically respond within 2-4 hours during business hours</p>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;