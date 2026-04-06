import { CheckCircle, Loader2, Send } from 'lucide-react';
import React, { useState } from 'react';

const INQUIRY_OPTIONS = [
  'General Inquiry',
  'Sales & Pricing',
  'Technical Support',
  'Enterprise Solutions',
  'Partnership',
  'Billing',
];

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    inquiry: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required.';
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email.';
    }
    if (!formData.inquiry) newErrors.inquiry = 'Please select an inquiry type.';
    if (!formData.message.trim()) newErrors.message = 'Message is required.';
    else if (formData.message.trim().length < 20) newErrors.message = 'Message must be at least 20 characters.';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setStatus('submitting');
    // Simulate API call
    await new Promise((res) => setTimeout(res, 1800));
    setStatus('success');
  };

  if (status === 'success') {
    return (
      <div
        id="contact-form-success"
        className="flex flex-col items-center justify-center py-16 text-center animate-fade-in"
      >
        <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mb-6 shadow-lg">
          <CheckCircle className="h-10 w-10 text-blue-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">Message Sent!</h3>
        <p className="text-gray-600 max-w-sm mb-8">
          Thanks for reaching out. Our team will get back to you within 24 hours.
        </p>
        <button
          id="contact-form-reset-btn"
          onClick={() => {
            setStatus('idle');
            setFormData({ name: '', email: '', company: '', inquiry: '', message: '' });
          }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form
      id="contact-form"
      onSubmit={handleSubmit}
      noValidate
      className="space-y-6"
    >
      {/* Row: Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Full Name */}
        <div>
          <label htmlFor="contact-name" className="block text-sm font-semibold text-gray-700 mb-2">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="contact-name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            className={`w-full px-4 py-3 rounded-xl border ${
              errors.name ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white'
            } text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
          />
          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="contact-email-input" className="block text-sm font-semibold text-gray-700 mb-2">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            id="contact-email-input"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@company.com"
            className={`w-full px-4 py-3 rounded-xl border ${
              errors.email ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white'
            } text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
          />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
        </div>
      </div>

      {/* Row: Company + Inquiry Type */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Company */}
        <div>
          <label htmlFor="contact-company" className="block text-sm font-semibold text-gray-700 mb-2">
            Company <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <input
            id="contact-company"
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Acme Inc."
            className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Inquiry Type */}
        <div>
          <label htmlFor="contact-inquiry" className="block text-sm font-semibold text-gray-700 mb-2">
            Inquiry Type <span className="text-red-500">*</span>
          </label>
          <select
            id="contact-inquiry"
            name="inquiry"
            value={formData.inquiry}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-xl border ${
              errors.inquiry ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white'
            } text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none`}
          >
            <option value="">Select a topic...</option>
            {INQUIRY_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          {errors.inquiry && <p className="mt-1 text-xs text-red-500">{errors.inquiry}</p>}
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="contact-message" className="block text-sm font-semibold text-gray-700 mb-2">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          placeholder="Tell us how we can help you..."
          className={`w-full px-4 py-3 rounded-xl border ${
            errors.message ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white'
          } text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none`}
        />
        <div className="flex justify-between items-start mt-1">
          {errors.message ? (
            <p className="text-xs text-red-500">{errors.message}</p>
          ) : (
            <span />
          )}
          <span className="text-xs text-gray-400 ml-auto">{formData.message.length} chars</span>
        </div>
      </div>

      {/* Submit */}
      <button
        id="contact-submit-btn"
        type="submit"
        disabled={status === 'submitting'}
        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-8 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5 disabled:opacity-75 disabled:cursor-not-allowed disabled:hover:translate-y-0"
      >
        {status === 'submitting' ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="h-5 w-5" />
            Send Message
          </>
        )}
      </button>

      <p className="text-center text-xs text-gray-500">
        By submitting, you agree to our{' '}
        <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>.
        We'll never share your data.
      </p>
    </form>
  );
};

export default ContactForm;
