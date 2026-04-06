import { ArrowRight, Bot, Headphones } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

const ContactFooter = () => {
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="text-xl font-bold">BotBridge</div>
                <div className="text-sm text-gray-400">AI-Powered Support Platform</div>
              </div>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Transforming customer support with intelligent AI chatbots and seamless human handoff capabilities.
            </p>
            <div className="text-sm text-gray-500">© 2025 BotBridge. All rights reserved.</div>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <div className="space-y-2 text-gray-400">
              <a href="/#features" className="block hover:text-white cursor-pointer transition-colors">Features</a>
              <Link to="/docs" className="block hover:text-white cursor-pointer transition-colors">API Documentation</Link>
              <a href="/#integrations" className="block hover:text-white cursor-pointer transition-colors">Integrations</a>
              <a href="/#pricing" className="block hover:text-white cursor-pointer transition-colors">Pricing</a>
            </div>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <div className="space-y-2 text-gray-400">
              <Link to="/docs" className="block hover:text-white cursor-pointer transition-colors">Help Center</Link>
              <Link to="/contact" className="block hover:text-white cursor-pointer font-medium text-blue-400 transition-colors">Contact Us</Link>
              <a href="#status" className="block hover:text-white cursor-pointer transition-colors">Status Page</a>
              <a href="#community" className="block hover:text-white cursor-pointer transition-colors">Community</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ContactFooter;
