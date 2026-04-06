import { ChevronDown } from 'lucide-react';
import React, { useState } from 'react';

const faqs = [
  {
    id: 'faq-1',
    question: 'How quickly can I set up BotBridge?',
    answer:
      'Most customers are live within 5 minutes. Simply sign up, add your knowledge base content, and embed our widget snippet into your website. No coding required for basic setup.',
  },
  {
    id: 'faq-2',
    question: 'Do I need a credit card to start the free trial?',
    answer:
      'No credit card is required for the 14-day free trial. You only need to provide payment details when you decide to upgrade to a paid plan.',
  },
  {
    id: 'faq-3',
    question: 'Can the chatbot handle multiple languages?',
    answer:
      'Yes! BotBridge supports over 95 languages out of the box. The AI automatically detects the customer\'s language and responds accordingly.',
  },
  {
    id: 'faq-4',
    question: 'How does the human handoff work?',
    answer:
      'When the AI determines it cannot adequately help a customer—or when the customer requests a human—it seamlessly transfers the conversation to an available agent through our real-time Handoff Center dashboard.',
  },
  {
    id: 'faq-5',
    question: 'Is my data secure with BotBridge?',
    answer:
      'Absolutely. We use enterprise-grade security including data encryption at rest and in transit, tenant isolation, JWT authentication, and are compliant with GDPR and SOC 2 standards.',
  },
  {
    id: 'faq-6',
    question: 'Can I integrate BotBridge with my existing CRM?',
    answer:
      'Yes, BotBridge offers native integrations with popular CRMs like Salesforce, HubSpot, and Zendesk, plus a REST API and webhook support for custom integrations.',
  },
];

const FAQItem = ({ faq }) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      id={faq.id}
      className={`border rounded-xl overflow-hidden transition-all duration-300 ${
        open ? 'border-blue-300 shadow-md' : 'border-gray-200'
      }`}
    >
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex items-center justify-between px-6 py-5 text-left bg-white hover:bg-gray-50 transition-colors"
        aria-expanded={open}
      >
        <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
        <ChevronDown
          className={`h-5 w-5 text-blue-600 flex-shrink-0 transition-transform duration-300 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`px-6 overflow-hidden transition-all duration-300 ${
          open ? 'max-h-96 pb-5' : 'max-h-0'
        }`}
      >
        <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
      </div>
    </div>
  );
};

const ContactFAQ = () => {
  return (
    <section id="contact-faq" className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600 text-lg">
            Find quick answers to common questions. Still need help?{' '}
            <a href="#contact-form" className="text-blue-600 hover:underline font-medium">
              Ask us directly.
            </a>
          </p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <FAQItem key={faq.id} faq={faq} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactFAQ;
