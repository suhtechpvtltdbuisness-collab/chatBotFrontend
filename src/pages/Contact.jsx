import { ArrowRight, Clock, Headphones, MessageSquare, Zap } from 'lucide-react';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ContactFAQ from '../components/contact/ContactFAQ';
import ContactFooter from '../components/contact/ContactFooter';
import ContactForm from '../components/contact/ContactForm';
import ContactInfoGrid from '../components/contact/ContactInfoGrid';
import ContactPageNav from '../components/contact/ContactPageNav';

// ----- Hero badge data -----
const HERO_BADGES = [
  { icon: Clock, text: 'Avg. reply in 2 hrs' },
  { icon: Headphones, text: '24/7 live support' },
  { icon: Zap, text: 'Expert team ready' },
];

// ----- Social proof strip -----
const TRUSTED_BY = ['Google', 'Stripe', 'Notion', 'Shopify', 'Figma'];

const Contact = () => {
  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* ── Nav ─────────────────────────────────────── */}
      <ContactPageNav />

      {/* ── Hero ────────────────────────────────────── */}
      <header className="relative overflow-hidden">
        {/* Background glow blobs */}
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-purple-400/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-12 text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 ring-1 ring-inset ring-blue-600/20 mb-6">
            <MessageSquare className="h-4 w-4 mr-2" />
            We'd love to hear from you
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent leading-tight pb-2">
            Get in Touch with<br className="hidden sm:block" /> Our Team
          </h1>

          <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Have a question, need a demo, or ready to scale your support?
            Our experts are here to help — no bots, just real people.
          </p>

          {/* Hero badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            {HERO_BADGES.map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-200 shadow-sm text-sm font-medium text-gray-700"
              >
                <Icon className="h-4 w-4 text-blue-600" />
                {text}
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* ── Contact Info Cards ──────────────────────── */}
      <section id="contact-info" className="max-w-7xl mx-auto px-6 py-12">
        <ContactInfoGrid />
      </section>

      {/* ── Divider ─────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6">
        <hr className="border-gray-200" />
      </div>

      {/* ── Contact Form + Side Panel ────────────────── */}
      <section id="contact-form-section" className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">

          {/* Left: Form (3/5 width) */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-xl p-8 md:p-10">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Send Us a Message</h2>
                <p className="text-gray-500">
                  Fill in the form below and we'll get back to you within one business day.
                </p>
              </div>
              <ContactForm />
            </div>
          </div>

          {/* Right: Side panel (2/5 width) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Response Promise */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-white/20 rounded-xl">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">Our Response Promise</h3>
              </div>
              <ul className="space-y-4 text-blue-100">
                <li className="flex items-start gap-3">
                  <div className="mt-0.5 w-5 h-5 bg-white/20 rounded-full flex-shrink-0 flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                  <span>Sales inquiries replied within <strong className="text-white">2 hours</strong></span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-0.5 w-5 h-5 bg-white/20 rounded-full flex-shrink-0 flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                  <span>Technical support available <strong className="text-white">24/7</strong></span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-0.5 w-5 h-5 bg-white/20 rounded-full flex-shrink-0 flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                  <span>Dedicated account manager for <strong className="text-white">Enterprise</strong> plans</span>
                </li>
              </ul>
            </div>

            {/* Book a Demo CTA */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Prefer a Live Demo?</h3>
              <p className="text-gray-600 text-sm mb-5">
                See BotBridge in action with a personalised 30-minute walkthrough from our product experts.
              </p>
              <Link
                id="contact-demo-btn"
                to="/signup"
                className="group flex items-center justify-center gap-2 w-full bg-gray-900 text-white py-3 px-6 rounded-xl font-semibold hover:bg-gray-800 transition-all shadow-md hover:shadow-lg"
              >
                Book a Free Demo
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Trusted by strip */}
            <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl border border-gray-200 p-6">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4 text-center">
                Trusted by teams at
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                {TRUSTED_BY.map((name) => (
                  <span
                    key={name}
                    className="px-3 py-1.5 bg-white rounded-lg border border-gray-200 text-xs font-bold text-gray-700 shadow-sm"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────── */}
      <ContactFAQ />

      {/* ── CTA Banner ──────────────────────────────── */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-6 text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Customer Support?</h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Join hundreds of companies already using BotBridge to deliver exceptional experiences.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
            <Link
              id="contact-cta-trial-btn"
              to="/signup"
              className="group bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center"
            >
              Start Free Trial
              <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              id="contact-cta-sales-btn"
              href="mailto:sales@botbridge.io"
              className="px-8 py-4 rounded-xl font-semibold text-lg text-white border border-white/30 hover:bg-white/10 transition-colors"
            >
              Email Sales Team
            </a>
          </div>
          <p className="mt-6 text-sm text-blue-200">
            <Headphones className="inline h-4 w-4 mr-1" />
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────── */}
      <ContactFooter />
    </div>
  );
};

export default Contact;
