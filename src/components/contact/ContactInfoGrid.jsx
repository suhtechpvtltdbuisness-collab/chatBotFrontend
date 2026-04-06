import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import React from 'react';

const contactInfoItems = [
  {
    id: 'contact-email',
    icon: Mail,
    iconBg: 'from-blue-500 to-blue-600',
    iconColor: 'text-white',
    title: 'Email Us',
    subtitle: 'We typically respond within 2 hours',
    value: 'info@suhtech.top',
    link: 'mailto:support@botbridge.io',
    linkLabel: 'Send an email',
  },
  {
    id: 'contact-phone',
    icon: Phone,
    iconBg: 'from-purple-500 to-purple-600',
    iconColor: 'text-white',
    title: 'Call Us',
    subtitle: 'Mon–Fri, 9am–6pm IST',
    value: '+91 8298252909',
    link: 'tel:+919876543210',
    linkLabel: 'Make a call',
  },
  {
    id: 'contact-chat',
    icon: MessageCircle,
    iconBg: 'from-indigo-500 to-blue-500',
    iconColor: 'text-white',
    title: 'Live Chat',
    subtitle: 'Available 24/7 via the widget',
    value: 'Start a conversation right now',
    link: '#chat-widget',
    linkLabel: 'Open chat',
  },
  {
    id: 'contact-address',
    icon: MapPin,
    iconBg: 'from-pink-500 to-purple-500',
    iconColor: 'text-white',
    title: 'Visit Us',
    subtitle: 'Drop by our HQ',
    value: 'Ithums Galleria Alpha 2 Floor 8th-40 201310',
    link: 'https://maps.google.com',
    linkLabel: 'Get directions',
  },
];

const ContactInfoCard = ({ item }) => {
  const Icon = item.icon;
  return (
    <div
      id={item.id}
      className="group bg-white p-6 rounded-2xl border border-gray-200 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
    >
      <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${item.iconBg} mb-4 shadow-md`}>
        <Icon className={`h-6 w-6 ${item.iconColor}`} />
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-1">{item.title}</h3>
      <p className="text-sm text-gray-500 mb-3">{item.subtitle}</p>
      <p className="text-gray-700 font-medium mb-3">{item.value}</p>
      <a
        href={item.link}
        target={item.link.startsWith('http') ? '_blank' : undefined}
        rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
        className="inline-flex items-center text-sm text-blue-600 font-semibold group-hover:text-purple-600 transition-colors"
      >
        {item.linkLabel}
        <svg className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </a>
    </div>
  );
};

const ContactInfoGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {contactInfoItems.map((item) => (
        <ContactInfoCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default ContactInfoGrid;
