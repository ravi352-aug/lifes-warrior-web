'use client';

import { useState } from 'react';
import { Lock, Bell, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ProviderSettingsPage() {
  const [settings, setSettings] = useState({
    twoFactorAuth: false,
    emailNotifications: true,
    smsNotifications: true,
    marketingEmails: false,
    profileVisibility: 'public',
  });

  const handleToggle = (key: string) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="space-y-6 px-4 py-4 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="mt-2 text-gray-600">Manage your account preferences and security</p>
      </div>

      {/* Security Settings */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Lock className="h-5 w-5" />
          Security
        </h2>
        <div className="space-y-4">
          {/* Password */}
          <div className="flex items-center justify-between pb-4 border-b border-gray-200">
            <div>
              <p className="font-medium text-gray-900">Change Password</p>
              <p className="text-sm text-gray-600">Update your password regularly</p>
            </div>
            <Button variant="outline">Change</Button>
          </div>

          {/* Two Factor Auth */}
          <div className="flex items-center justify-between pb-4 border-b border-gray-200">
            <div>
              <p className="font-medium text-gray-900">Two-Factor Authentication</p>
              <p className="text-sm text-gray-600">
                {settings.twoFactorAuth
                  ? 'Enabled - Your account is secure'
                  : 'Disabled - Enhance your security'}
              </p>
            </div>
            <button
              onClick={() => handleToggle('twoFactorAuth')}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                settings.twoFactorAuth ? 'bg-green-600' : 'bg-gray-300'
              }`}
            >
              <div
                className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                  settings.twoFactorAuth ? 'translate-x-6' : ''
                }`}
              />
            </button>
          </div>

          {/* Sessions */}
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Active Sessions</p>
              <p className="text-sm text-gray-600">Manage devices with access</p>
            </div>
            <Button variant="outline">View Sessions</Button>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Notifications
        </h2>
        <div className="space-y-4">
          {[
            {
              key: 'emailNotifications',
              label: 'Email Notifications',
              desc: 'Receive updates via email',
            },
            {
              key: 'smsNotifications',
              label: 'SMS Notifications',
              desc: 'Receive urgent updates via SMS',
            },
            {
              key: 'marketingEmails',
              label: 'Marketing Emails',
              desc: 'Receive promotional content',
            },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between pb-4 border-b border-gray-200">
              <div>
                <p className="font-medium text-gray-900">{item.label}</p>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
              <button
                onClick={() => handleToggle(item.key)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  settings[item.key as keyof typeof settings] ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                    settings[item.key as keyof typeof settings] ? 'translate-x-6' : ''
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Privacy Settings */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Eye className="h-5 w-5" />
          Privacy
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Profile Visibility
            </label>
            <select
              value={settings.profileVisibility}
              onChange={(e) =>
                setSettings({ ...settings, profileVisibility: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="public">Public - Visible to everyone</option>
              <option value="private">Private - Only visible to booked clients</option>
              <option value="hidden">Hidden - Not visible in searches</option>
            </select>
          </div>
        </div>
      </div>

      {/* Dangerous Zone */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <h2 className="text-xl font-bold text-red-900 mb-4">Danger Zone</h2>
        <div className="space-y-2">
          <Button variant="outline" className="w-full text-left justify-start text-red-600 border-red-200 hover:bg-red-50">
            Deactivate Account
          </Button>
          <Button variant="outline" className="w-full text-left justify-start text-red-600 border-red-200 hover:bg-red-50">
            Delete Account & Data
          </Button>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex gap-2 justify-end">
        <Button variant="outline">Cancel</Button>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">Save Changes</Button>
      </div>
    </div>
  );
}
