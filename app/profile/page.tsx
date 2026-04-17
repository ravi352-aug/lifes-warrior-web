'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  LogOut,
  Edit2,
  Heart,
  FileText,
  Settings,
  Bell,
  HelpCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { MainLayout } from '@/components/shared/Navigation';
import { currentUser, bookings, healthReports } from '@/lib/mockData';

export default function ProfilePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'profile' | 'bookings' | 'reports'>(
    'profile'
  );

  const handleLogout = () => {
    localStorage.removeItem('user_authenticated');
    localStorage.removeItem('user_email');
    localStorage.removeItem('user_name');
    router.push('/login');
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: Edit2 },
    { id: 'bookings', label: 'Bookings', icon: FileText },
    { id: 'reports', label: 'Reports', icon: Heart },
  ];

  return (
    <MainLayout
      headerProps={{
        userName: currentUser.name,
        userAvatar: currentUser.avatar,
      }}
    >
      <div className="mx-auto max-w-2xl space-y-6 px-4 py-4">
        {/* Profile Header */}
        <div className="rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 p-6">
          <div className="flex items-start justify-between">
            <div className="flex gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {currentUser.name}
                </h1>
                <p className="text-gray-600">{currentUser.email}</p>
                <div className="mt-2 flex gap-4 text-sm text-gray-600">
                  <span>{currentUser.phone}</span>
                  <span>•</span>
                  <span>{currentUser.location}</span>
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => router.push('/profile-setup')}
            >
              <Edit2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 border-b border-gray-200">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() =>
                  setActiveTab(tab.id as 'profile' | 'bookings' | 'reports')
                }
                className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="space-y-4">
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <h3 className="mb-4 font-bold text-gray-900">Personal Information</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm text-gray-600">Date of Birth</p>
                  <p className="font-medium text-gray-900">{currentUser.dob}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Location</p>
                  <p className="font-medium text-gray-900">{currentUser.location}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm text-gray-600">Medical History</p>
                  <p className="font-medium text-gray-900">
                    {currentUser.medicalHistory}
                  </p>
                </div>
              </div>
            </div>

            {/* Settings */}
            <div className="space-y-3">
              <h3 className="font-bold text-gray-900">Settings</h3>
              <div className="space-y-2">
                {[
                  { icon: Bell, label: 'Notifications', description: 'Manage alerts' },
                  {
                    icon: Settings,
                    label: 'Privacy Settings',
                    description: 'Control your data',
                  },
                  {
                    icon: HelpCircle,
                    label: 'Help & Support',
                    description: 'Get help',
                  },
                ].map(({ icon: Icon, label, description }) => (
                  <button
                    key={label}
                    className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4 transition-all hover:shadow-md"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5 text-gray-600" />
                      <div className="text-left">
                        <p className="font-medium text-gray-900">{label}</p>
                        <p className="text-xs text-gray-500">{description}</p>
                      </div>
                    </div>
                    <span className="text-gray-400">→</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Logout */}
            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full border-red-200 text-red-600 hover:bg-red-50"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div className="space-y-3">
            {bookings.length === 0 ? (
              <div className="rounded-lg bg-gray-50 p-8 text-center">
                <p className="text-gray-600">No bookings yet</p>
              </div>
            ) : (
              bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={booking.providerImage}
                      alt={booking.providerName}
                      className="h-10 w-10 rounded-full"
                    />
                    <div>
                      <p className="font-medium text-gray-900">
                        {booking.providerName}
                      </p>
                      <p className="text-xs text-gray-500">{booking.scheduledDate}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">₹{booking.amount}</p>
                    <p
                      className={`text-xs font-medium ${
                        booking.status === 'completed'
                          ? 'text-green-600'
                          : 'text-blue-600'
                      }`}
                    >
                      {booking.status}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Reports Tab */}
        {activeTab === 'reports' && (
          <div className="space-y-3">
            {healthReports.length === 0 ? (
              <div className="rounded-lg bg-gray-50 p-8 text-center">
                <p className="text-gray-600">No health reports yet</p>
              </div>
            ) : (
              healthReports.map((report) => (
                <div
                  key={report.id}
                  className="rounded-lg border border-gray-200 bg-white p-4"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <h4 className="font-bold text-gray-900">{report.title}</h4>
                    <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                      Completed
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{report.analysis}</p>
                  <p className="mt-2 text-xs text-gray-500">{report.createdAt}</p>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
