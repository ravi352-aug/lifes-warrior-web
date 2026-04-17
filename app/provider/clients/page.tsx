'use client';

import { useState } from 'react';
import { Star, MapPin, Phone, Mail, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Client {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  totalBookings: number;
  rating: number;
  lastBooking: string;
  status: 'active' | 'inactive';
}

const mockClients: Client[] = [
  {
    id: 'c_001',
    name: 'Rajesh Kumar',
    phone: '+91-9876543456',
    email: 'rajesh@email.com',
    address: 'Sector 5, Faridabad',
    totalBookings: 5,
    rating: 4.8,
    lastBooking: '2 days ago',
    status: 'active',
  },
  {
    id: 'c_002',
    name: 'Priya Sharma',
    phone: '+91-9876543457',
    email: 'priya@email.com',
    address: 'Sector 3, Faridabad',
    totalBookings: 12,
    rating: 4.9,
    lastBooking: 'Today',
    status: 'active',
  },
  {
    id: 'c_003',
    name: 'Amit Patel',
    phone: '+91-9876543458',
    email: 'amit@email.com',
    address: 'Civil Lines, Faridabad',
    totalBookings: 3,
    rating: 4.5,
    lastBooking: '1 week ago',
    status: 'inactive',
  },
];

export default function ProvidersClientsPage() {
  const [clients] = useState<Client[]>(mockClients);
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all');

  const filteredClients = clients.filter((c) => {
    if (filter === 'all') return true;
    return c.status === filter;
  });

  return (
    <div className="space-y-6 px-4 py-4 max-w-6xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Clients</h1>
        <p className="mt-2 text-gray-600">View and manage your client relationships</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Total Clients', value: clients.length, color: 'bg-blue-100 text-blue-700' },
          { label: 'Active', value: clients.filter((c) => c.status === 'active').length, color: 'bg-green-100 text-green-700' },
          { label: 'Avg Rating', value: (clients.reduce((sum, c) => sum + c.rating, 0) / clients.length).toFixed(1), color: 'bg-yellow-100 text-yellow-700' },
        ].map((stat, idx) => (
          <div key={idx} className={`rounded-lg ${stat.color} p-4`}>
            <p className="text-sm font-medium opacity-90">{stat.label}</p>
            <p className="text-3xl font-bold mt-2">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {['all', 'active', 'inactive'].map((f) => (
          <Button
            key={f}
            onClick={() => setFilter(f as any)}
            className={`${
              filter === f
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300'
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </Button>
        ))}
      </div>

      {/* Clients List */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {filteredClients.length === 0 ? (
          <div className="p-8 text-center">
            <AlertCircle className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-600">No clients found</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredClients.map((client) => (
              <div key={client.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-bold text-gray-900">{client.name}</h3>
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          client.status === 'active'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {client.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center gap-1">
                        <Phone className="h-4 w-4" />
                        {client.phone}
                      </div>
                      <div className="flex items-center gap-1">
                        <Mail className="h-4 w-4" />
                        {client.email}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {client.address}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        {client.rating} ({client.totalBookings} bookings)
                      </div>
                    </div>

                    <p className="text-xs text-gray-500">Last booking: {client.lastBooking}</p>
                  </div>

                  <Button className="bg-blue-600 hover:bg-blue-700 text-white ml-4">
                    View Profile
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
