import { Bot } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../lib/auth';

const ContactPageNav = () => {
  const { isAuthenticated } = useAuth();

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-sm bg-white/80 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl">
              <Bot className="h-8 w-8 text-white" />
            </div>
            <div>
              <div className="text-xl font-bold text-gray-900">BotBridge</div>
              <div className="text-xs text-gray-500">AI-Powered Support Platform</div>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6">
            <a href="/#features" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
              Features
            </a>
            <a href="/#pricing" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
              Pricing
            </a>
            <Link to="/docs" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
              Docs
            </Link>
            <Link to="/contact" className="text-blue-600 font-semibold border-b-2 border-blue-600 pb-0.5">
              Contact
            </Link>
            {!isAuthenticated && (
              <Link to="/login" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                Sign in
              </Link>
            )}
            <Link
              to={isAuthenticated ? '/dashboard' : '/signup'}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
            >
              {isAuthenticated ? 'Go to Dashboard' : 'Get Started Free'}
            </Link>
          </div>

          {/* Mobile menu */}
          <div className="md:hidden">
            <input id="contact-menu-toggle" type="checkbox" className="hidden peer" />
            <label
              htmlFor="contact-menu-toggle"
              className="p-2 rounded-lg border border-gray-200 text-gray-700 cursor-pointer"
            >
              <span className="sr-only">Open menu</span>
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </label>
            <div className="peer-checked:block hidden absolute left-0 right-0 top-full bg-white border-b border-gray-200 shadow-lg">
              <div className="max-w-7xl mx-auto px-6 py-3 flex flex-col gap-2">
                <a href="/#features" className="py-2 text-gray-700 hover:text-gray-900">Features</a>
                <a href="/#pricing" className="py-2 text-gray-700 hover:text-gray-900">Pricing</a>
                <Link to="/docs" className="py-2 text-gray-700 hover:text-gray-900">Docs</Link>
                <Link to="/contact" className="py-2 text-blue-600 font-semibold">Contact</Link>
                {!isAuthenticated && (
                  <Link to="/login" className="py-2 text-gray-700 hover:text-gray-900">Sign in</Link>
                )}
                <Link
                  to={isAuthenticated ? '/dashboard' : '/signup'}
                  className="py-2 text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-center"
                >
                  {isAuthenticated ? 'Dashboard' : 'Get Started Free'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default ContactPageNav;
