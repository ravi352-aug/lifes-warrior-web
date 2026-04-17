'use client';

import { useState } from 'react';
import { Bell, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Notification {
  id: string;
  type: 'request' | 'booking' | 'review' | 'system';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: 'n_001',
    type: 'request',
    title: 'New Service Request',
    message: 'Lab test collection requested by Rajesh Kumar in Sector 5',
    timestamp: '5 minutes ago',
    read: false,
  },
  {
    id: 'n_002',
    type: 'booking',
    title: 'Booking Confirmed',
    message: 'Your booking with Priya Sharma has been confirmed for tomorrow',
    timestamp: '30 minutes ago',
    read: false,
  },
  {
    id: 'n_003',
    type: 'review',
    title: 'New Review',
    message: 'You received a 5-star review from Amit Patel',
    timestamp: '2 hours ago',
    read: true,
  },
  {
    id: 'n_004',
    type: 'system',
    title: 'Payment Received',
    message: 'Payment of ₹5,400 has been credited to your account',
    timestamp: '1 day ago',
    read: true,
  },
];

export default function ProviderNotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const filteredNotifications = notifications.filter((n) => {
    if (filter === 'unread') return !n.read;
    return true;
  });

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'request':
        return <AlertCircle className="h-5 w-5 text-blue-600" />;
      case 'booking':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'review':
        return <Bell className="h-5 w-5 text-yellow-600" />;
      case 'system':
        return <Clock className="h-5 w-5 text-purple-600" />;
    }
  };

  return (
    <div className="space-y-6 px-4 py-4 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
          <p className="mt-2 text-gray-600">Stay updated with all your activities</p>
        </div>
        {notifications.some((n) => !n.read) && (
          <Button
            onClick={() =>
              setNotifications(notifications.map((n) => ({ ...n, read: true })))
            }
            variant="outline"
          >
            Mark All as Read
          </Button>
        )}
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {['all', 'unread'].map((f) => (
          <Button
            key={f}
            onClick={() => setFilter(f as any)}
            className={`${
              filter === f
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-200'
            }`}
          >
            {f === 'all' ? 'All Notifications' : 'Unread'}
            {f === 'unread' && ` (${notifications.filter((n) => !n.read).length})`}
          </Button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
            <Bell className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-600">No notifications</p>
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              onClick={() => markAsRead(notification.id)}
              className={`rounded-lg border p-4 cursor-pointer transition-colors ${
                notification.read
                  ? 'bg-white border-gray-200 hover:bg-gray-50'
                  : 'bg-blue-50 border-blue-200 hover:bg-blue-100'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="mt-1">{getIcon(notification.type)}</div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {notification.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        {notification.timestamp}
                      </p>
                    </div>
                    {!notification.read && (
                      <div className="w-2 h-2 rounded-full bg-blue-600 mt-1"></div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
