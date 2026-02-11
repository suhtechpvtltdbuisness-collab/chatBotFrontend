import React, { useEffect, useState } from 'react';
import { Save, Globe, Link as LinkIcon, Shield, Zap } from 'lucide-react';
import toast from 'react-hot-toast';
import { tenantAPI } from '../lib/api.js';

const TenantSettings = () => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [tenant, setTenant] = useState(null);
  const [industryDropdownOpen, setIndustryDropdownOpen] = useState(false);
  const [form, setForm] = useState({
    name: '',
    domain: '',
    industry: 'other',
    settings: {
      data: {
        externalContextEnabled: false,
        externalContextUrl: '',
        externalContextAuthHeader: '',
        externalContextTimeoutMs: 2500,
        orderStatusUrl: '',
        billingUrl: '',
        accountLookupUrl: '',
        ticketCreateUrl: ''
      }
    }
  });

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const { data } = await tenantAPI.getSettings();
        setTenant(data.tenant);
        setForm({
          name: data.tenant.name,
          domain: data.tenant.domain || '',
          industry: data.tenant.industry || 'other',
          settings: {
            data: {
              externalContextEnabled: data.tenant.settings?.data?.externalContextEnabled || false,
              externalContextUrl: data.tenant.settings?.data?.externalContextUrl || '',
              externalContextAuthHeader: data.tenant.settings?.data?.externalContextAuthHeader || '',
              externalContextTimeoutMs: data.tenant.settings?.data?.externalContextTimeoutMs || 2500,
              orderStatusUrl: data.tenant.settings?.data?.orderStatusUrl || '',
              billingUrl: data.tenant.settings?.data?.billingUrl || '',
              accountLookupUrl: data.tenant.settings?.data?.accountLookupUrl || '',
              ticketCreateUrl: data.tenant.settings?.data?.ticketCreateUrl || ''
            }
          }
        });
      } catch (e) {
        toast.error('Failed to load tenant settings');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const updateField = (path, value) => {
    setForm(prev => {
      const clone = JSON.parse(JSON.stringify(prev));
      const keys = path.split('.');
      let ref = clone;
      for (let i = 0; i < keys.length - 1; i++) {
        if (!ref[keys[i]]) ref[keys[i]] = {};
        ref = ref[keys[i]];
      }
      ref[keys[keys.length - 1]] = value;
      return clone;
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await tenantAPI.updateSettings({
        name: form.name,
        domain: form.domain,
        industry: form.industry,
        settings: form.settings
      });
      toast.success('Settings saved');
    } catch (e) {
      // Error handled by global interceptor
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6 pb-60">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Tenant Settings</h1>
        <p className="mt-2 text-gray-600">Configure data integrations for industry-grade support</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6 max-w-4xl">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Globe className="h-5 w-5 mr-2 text-primary-600" />
            General
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input className="input-field" value={form.name} onChange={e => updateField('name', e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Domain</label>
              <input className="input-field" value={form.domain} onChange={e => updateField('domain', e.target.value)} placeholder="https://example.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIndustryDropdownOpen(!industryDropdownOpen)}
                  onBlur={() => setTimeout(() => setIndustryDropdownOpen(false), 200)}
                  className="input-field w-full text-left flex items-center justify-between"
                >
                  <span>
                    {form.industry === 'ecommerce' ? 'Ecommerce' :
                     form.industry === 'saas' ? 'SaaS' :
                     form.industry === 'healthcare' ? 'Healthcare' :
                     form.industry === 'education' ? 'Education' :
                     form.industry === 'finance' ? 'Finance' :
                     form.industry === 'real-estate' ? 'Real Estate' : 'Other'}
                  </span>
                  <svg 
                    className={`h-4 w-4 text-gray-500 transition-transform ${industryDropdownOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {industryDropdownOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    <button
                      type="button"
                      onClick={() => {
                        updateField('industry', 'ecommerce');
                        setIndustryDropdownOpen(false);
                      }}
                      className={`w-full px-3 py-2 text-left hover:bg-gray-100 rounded-t-lg ${form.industry === 'ecommerce' ? 'bg-blue-50 text-blue-600' : 'text-gray-900'}`}
                    >
                      Ecommerce
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        updateField('industry', 'saas');
                        setIndustryDropdownOpen(false);
                      }}
                      className={`w-full px-3 py-2 text-left hover:bg-gray-100 ${form.industry === 'saas' ? 'bg-blue-50 text-blue-600' : 'text-gray-900'}`}
                    >
                      SaaS
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        updateField('industry', 'healthcare');
                        setIndustryDropdownOpen(false);
                      }}
                      className={`w-full px-3 py-2 text-left hover:bg-gray-100 ${form.industry === 'healthcare' ? 'bg-blue-50 text-blue-600' : 'text-gray-900'}`}
                    >
                      Healthcare
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        updateField('industry', 'education');
                        setIndustryDropdownOpen(false);
                      }}
                      className={`w-full px-3 py-2 text-left hover:bg-gray-100 ${form.industry === 'education' ? 'bg-blue-50 text-blue-600' : 'text-gray-900'}`}
                    >
                      Education
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        updateField('industry', 'finance');
                        setIndustryDropdownOpen(false);
                      }}
                      className={`w-full px-3 py-2 text-left hover:bg-gray-100 ${form.industry === 'finance' ? 'bg-blue-50 text-blue-600' : 'text-gray-900'}`}
                    >
                      Finance
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        updateField('industry', 'real-estate');
                        setIndustryDropdownOpen(false);
                      }}
                      className={`w-full px-3 py-2 text-left hover:bg-gray-100 ${form.industry === 'real-estate' ? 'bg-blue-50 text-blue-600' : 'text-gray-900'}`}
                    >
                      Real Estate
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        updateField('industry', 'other');
                        setIndustryDropdownOpen(false);
                      }}
                      className={`w-full px-3 py-2 text-left hover:bg-gray-100 rounded-b-lg ${form.industry === 'other' ? 'bg-blue-50 text-blue-600' : 'text-gray-900'}`}
                    >
                      Other
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-1 flex items-center">
            <LinkIcon className="h-5 w-5 mr-2 text-primary-600" />
            Data Integrations
          </h3>
          <p className="text-sm text-gray-600 mb-4">Set URLs for your systems. We POST on each message with {`{ query, sessionId, visitor, tenantId, action }`}.</p>
          <div className="grid grid-cols-1 gap-4">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-0 focus:ring-offset-0" checked={form.settings.data.externalContextEnabled}
                     onChange={e => updateField('settings.data.externalContextEnabled', e.target.checked)} />
              <span className="text-sm text-gray-700">Enable external context</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">General Context URL</label>
                <input className="input-field" value={form.settings.data.externalContextUrl} onChange={e => updateField('settings.data.externalContextUrl', e.target.value)} placeholder="https://api.example.com/support/context" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Auth Header</label>
                <input className="input-field" value={form.settings.data.externalContextAuthHeader} onChange={e => updateField('settings.data.externalContextAuthHeader', e.target.value)} placeholder="Authorization: Bearer sk_..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Timeout (ms)</label>
                <input type="number" className="input-field" value={form.settings.data.externalContextTimeoutMs}
                       onChange={e => updateField('settings.data.externalContextTimeoutMs', Number(e.target.value))} />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Order Status URL</label>
                <input className="input-field" value={form.settings.data.orderStatusUrl} onChange={e => updateField('settings.data.orderStatusUrl', e.target.value)} placeholder="https://api.example.com/support/order" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Billing URL</label>
                <input className="input-field" value={form.settings.data.billingUrl} onChange={e => updateField('settings.data.billingUrl', e.target.value)} placeholder="https://api.example.com/support/billing" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Account Lookup URL</label>
                <input className="input-field" value={form.settings.data.accountLookupUrl} onChange={e => updateField('settings.data.accountLookupUrl', e.target.value)} placeholder="https://api.example.com/support/account" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ticket Create/Triage URL</label>
                <input className="input-field" value={form.settings.data.ticketCreateUrl} onChange={e => updateField('settings.data.ticketCreateUrl', e.target.value)} placeholder="https://api.example.com/support/ticket" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button type="submit" disabled={saving} className="btn-primary flex items-center space-x-2">
            {saving ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            ) : (
              <Save className="h-4 w-4" />
            )}
            <span>{saving ? 'Saving...' : 'Save Settings'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default TenantSettings;