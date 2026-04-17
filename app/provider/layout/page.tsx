'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, Settings, Bell, User, BarChart3, Calendar, DollarSign, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ProviderLayoutPage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { icon: BarChart3, label: 'Dashboard', href: '/provider/dashboard' },
    { icon: Users, label: 'My Clients', href: '/provider/clients' },
    { icon: Calendar, label: 'Schedule', href: '/provider/schedule' },
    { icon: DollarSign, label: 'Earnings', href: '/provider/earnings' },
    { icon: User, label: 'Profile', href: '/provider/profile' },
    { icon: Bell, label: 'Notifications', href: '/provider/notifications' },
    { icon: Settings, label: 'Settings', href: '/provider/settings' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('providerAuth');
    router.push('/provider-login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`bg-white border-r border-gray-200 transition-all ${sidebarOpen ? 'w-64' : 'w-0'} overflow-hidden`}>
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
              HC
            </div>
            <span className="font-bold text-gray-900">HealthCare+</span>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <button
                  key={idx}
                  onClick={() => router.push(item.href)}
                  className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200 bg-white">
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            ☰
          </button>
          <div className="flex items-center gap-4">
            <Bell className="h-5 w-5 text-gray-600 cursor-pointer hover:text-gray-900" />
            <User className="h-5 w-5 text-gray-600 cursor-pointer hover:text-gray-900" />
          </div>
        </div>
        <div className="p-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
            <h1 className="text-2xl font-bold text-gray-900">Provider Portal</h1>
            <p className="text-gray-600 mt-2">Select an option from the sidebar to manage your services</p>
          </div>
        </div>
      </div>
    </div>
  );
}
