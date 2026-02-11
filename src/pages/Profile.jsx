import { ChevronDown, Save, User } from 'lucide-react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '../lib/auth.jsx';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [timezoneDropdownOpen, setTimezoneDropdownOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    preferences: user?.preferences || {
      notifications: {
        email: true,
        browser: true
      },
      timezone: 'UTC'
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await updateProfile(formData);
      if (result.success) {
        // Success handled by AuthProvider
      }
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  return (
    <div className="p-6 pb-60">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
        <p className="mt-2 text-gray-600">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <User className="h-5 w-5 mr-2 text-primary-600" />
              Basic Information
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={user?.email || ''}
                  disabled
                  className="input-field bg-gray-50 text-gray-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Email cannot be changed. Contact support if needed.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <input
                  type="text"
                  value={user?.role || ''}
                  disabled
                  className="input-field bg-gray-50 text-gray-500 capitalize"
                />
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Preferences
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notifications
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.preferences.notifications.email}
                      onChange={(e) => handleInputChange('preferences.notifications.email', e.target.checked)}
                      className="rounded border-gray-300 text-primary-600 focus:ring-0 focus:ring-offset-0"
                    />
                    <span className="ml-2 text-sm text-gray-700">Email notifications</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.preferences.notifications.browser}
                      onChange={(e) => handleInputChange('preferences.notifications.browser', e.target.checked)}
                      className="rounded border-gray-300 text-primary-600 focus:ring-0 focus:ring-offset-0"
                    />
                    <span className="ml-2 text-sm text-gray-700">Browser notifications</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Timezone
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setTimezoneDropdownOpen(!timezoneDropdownOpen)}
                    className="input-field w-full text-left flex items-center justify-between"
                  >
                    <span>
                      {formData.preferences.timezone === 'UTC' && 'UTC'}
                      {formData.preferences.timezone === 'America/New_York' && 'Eastern Time'}
                      {formData.preferences.timezone === 'America/Chicago' && 'Central Time'}
                      {formData.preferences.timezone === 'America/Denver' && 'Mountain Time'}
                      {formData.preferences.timezone === 'America/Los_Angeles' && 'Pacific Time'}
                      {formData.preferences.timezone === 'Europe/London' && 'London'}
                      {formData.preferences.timezone === 'Europe/Paris' && 'Paris'}
                      {formData.preferences.timezone === 'Asia/Tokyo' && 'Tokyo'}
                      {formData.preferences.timezone === 'Asia/Shanghai' && 'Shanghai'}
                    </span>
                    <ChevronDown className={`h-4 w-4 transition-transform ${timezoneDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {timezoneDropdownOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      <button
                        type="button"
                        onClick={() => {
                          handleInputChange('preferences.timezone', 'UTC');
                          setTimezoneDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 ${formData.preferences.timezone === 'UTC' ? 'bg-primary-50 text-primary-700' : 'text-gray-900'}`}
                      >
                        UTC
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          handleInputChange('preferences.timezone', 'America/New_York');
                          setTimezoneDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 ${formData.preferences.timezone === 'America/New_York' ? 'bg-primary-50 text-primary-700' : 'text-gray-900'}`}
                      >
                        Eastern Time
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          handleInputChange('preferences.timezone', 'America/Chicago');
                          setTimezoneDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 ${formData.preferences.timezone === 'America/Chicago' ? 'bg-primary-50 text-primary-700' : 'text-gray-900'}`}
                      >
                        Central Time
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          handleInputChange('preferences.timezone', 'America/Denver');
                          setTimezoneDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 ${formData.preferences.timezone === 'America/Denver' ? 'bg-primary-50 text-primary-700' : 'text-gray-900'}`}
                      >
                        Mountain Time
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          handleInputChange('preferences.timezone', 'America/Los_Angeles');
                          setTimezoneDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 ${formData.preferences.timezone === 'America/Los_Angeles' ? 'bg-primary-50 text-primary-700' : 'text-gray-900'}`}
                      >
                        Pacific Time
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          handleInputChange('preferences.timezone', 'Europe/London');
                          setTimezoneDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 ${formData.preferences.timezone === 'Europe/London' ? 'bg-primary-50 text-primary-700' : 'text-gray-900'}`}
                      >
                        London
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          handleInputChange('preferences.timezone', 'Europe/Paris');
                          setTimezoneDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 ${formData.preferences.timezone === 'Europe/Paris' ? 'bg-primary-50 text-primary-700' : 'text-gray-900'}`}
                      >
                        Paris
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          handleInputChange('preferences.timezone', 'Asia/Tokyo');
                          setTimezoneDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 ${formData.preferences.timezone === 'Asia/Tokyo' ? 'bg-primary-50 text-primary-700' : 'text-gray-900'}`}
                      >
                        Tokyo
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          handleInputChange('preferences.timezone', 'Asia/Shanghai');
                          setTimezoneDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 ${formData.preferences.timezone === 'Asia/Shanghai' ? 'bg-primary-50 text-primary-700' : 'text-gray-900'}`}
                      >
                        Shanghai
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Account Information */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Account Information
            </h3>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Member Since
                  </label>
                  <input
                    type="text"
                    value={user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                    disabled
                    className="input-field bg-gray-50 text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Login
                  </label>
                  <input
                    type="text"
                    value={user?.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'}
                    disabled
                    className="input-field bg-gray-50 text-gray-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary flex items-center space-x-2"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <Save className="h-4 w-4" />
              )}
              <span>{loading ? 'Saving...' : 'Save Changes'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;