import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { Send, User, Mail, Phone, MessageSquare } from 'lucide-react';
import Button from '../ui/Button';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.message) newErrors.message = 'Message is required';
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
      const SERVICE_ID = 'service_placeholder';
      const TEMPLATE_ID = 'template_contact';
      const PUBLIC_KEY = 'user_placeholder';

      const templateParams = {
        to_name: 'Tamberma Support',
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message
      };

      // In a real env, use process.env.REACT_APP_EMAILJS_SERVICE_ID etc.
      // await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);

      console.warn("EmailJS keys are placeholders. Add actual keys to enable sending.");

      // Simulating a realistic network delay for EmailJS
      await new Promise(resolve => setTimeout(resolve, 1000));

      // END: EmailJS Integration

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      setErrors({});

      setTimeout(() => setSubmitStatus(null), 5000);

    } catch (error) {
      console.error('Contact Error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Name *</label>
            <div className="relative">
              <User className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-3 bg-neutral-800 border ${errors.name ? 'border-red-500' : 'border-neutral-700'} rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent text-white placeholder-gray-500 transition-all duration-300`}
                placeholder="Your Name"
              />
            </div>
            {errors.name && <span className="text-red-500 text-xs mt-1">{errors.name}</span>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
            <div className="relative">
              <Phone className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent text-white placeholder-gray-500 transition-all duration-300"
                placeholder="+234..."
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Email *</label>
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-3 bg-neutral-800 border ${errors.email ? 'border-red-500' : 'border-neutral-700'} rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent text-white placeholder-gray-500 transition-all duration-300`}
              placeholder="you@example.com"
            />
          </div>
          {errors.email && <span className="text-red-500 text-xs mt-1">{errors.email}</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent text-white placeholder-gray-500 transition-all duration-300"
            placeholder="Inquiry about private dining..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Message *</label>
          <div className="relative">
            <MessageSquare className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className={`w-full pl-10 pr-4 py-3 bg-neutral-800 border ${errors.message ? 'border-red-500' : 'border-neutral-700'} rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent text-white placeholder-gray-500 transition-all duration-300 resize-none`}
              placeholder="How can we help you?"
            />
          </div>
          {errors.message && <span className="text-red-500 text-xs mt-1">{errors.message}</span>}
        </div>

        <Button
          type="submit"
          variant="primary"
          className="w-full py-4 text-lg font-semibold"
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </Button>

        {submitStatus === 'success' && (
          <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 text-center animate-fade-in">
            <p className="font-medium">Message Sent!</p>
            <p className="text-sm mt-1">We'll get back to you as soon as possible.</p>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-center animate-fade-in">
            <p className="font-medium">Failed to send message</p>
            <p className="text-sm mt-1">Please try again or contact us directly.</p>
          </div>
        )}

      </form>
    </div>
  );
};

export default ContactForm;