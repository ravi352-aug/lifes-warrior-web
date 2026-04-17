'use client';

import { useState } from 'react';
import { DollarSign, TrendingUp, Calendar, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EarningsData {
  date: string;
  services: number;
  amount: number;
  status: 'completed' | 'pending';
}

const mockEarnings: EarningsData[] = [
  { date: '2026-03-22', services: 3, amount: 4500, status: 'completed' },
  { date: '2026-03-21', services: 2, amount: 3000, status: 'completed' },
  { date: '2026-03-20', services: 4, amount: 6000, status: 'completed' },
  { date: '2026-03-19', services: 2, amount: 2800, status: 'pending' },
];

export default function ProviderEarningsPage() {
  const [earnings] = useState<EarningsData[]>(mockEarnings);

  const totalEarnings = earnings
    .filter((e) => e.status === 'completed')
    .reduce((sum, e) => sum + e.amount, 0);
  const pendingAmount = earnings
    .filter((e) => e.status === 'pending')
    .reduce((sum, e) => sum + e.amount, 0);
  const totalServices = earnings.reduce((sum, e) => sum + e.services, 0);

  return (
    <div className="space-y-6 px-4 py-4 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Earnings</h1>
          <p className="mt-2 text-gray-600">Track your income and payments</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2">
          <Download className="h-4 w-4" />
          Download Report
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Earnings', value: `₹${totalEarnings.toLocaleString()}`, icon: DollarSign, color: 'bg-green-100 text-green-700' },
          { label: 'Pending', value: `₹${pendingAmount.toLocaleString()}`, icon: Calendar, color: 'bg-yellow-100 text-yellow-700' },
          { label: 'Total Services', value: totalServices, icon: TrendingUp, color: 'bg-blue-100 text-blue-700' },
          { label: 'Avg per Service', value: `₹${Math.round(totalEarnings / totalServices)}`, icon: DollarSign, color: 'bg-purple-100 text-purple-700' },
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className={`rounded-lg ${stat.color} p-4`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium opacity-90">{stat.label}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                </div>
                <Icon className="h-8 w-8 opacity-20" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Earnings History */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <h2 className="font-bold text-gray-900">Recent Transactions</h2>
        </div>

        <div className="divide-y divide-gray-200">
          {earnings.map((entry, idx) => (
            <div key={idx} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{entry.date}</p>
                  <p className="text-sm text-gray-600">{entry.services} services completed</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">₹{entry.amount}</p>
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full inline-block mt-1 ${
                      entry.status === 'completed'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {entry.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Methods */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="font-bold text-gray-900 mb-4">Payment Method</h3>
          <div className="space-y-3">
            <div className="border-2 border-blue-600 rounded-lg p-4 bg-blue-50">
              <p className="text-sm font-medium text-gray-900">Bank Account</p>
              <p className="text-xs text-gray-600 mt-1">HDFC Bank - Account ending in 1234</p>
            </div>
            <Button variant="outline" className="w-full">
              Edit Payment Method
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="font-bold text-gray-900 mb-4">Next Payout</h3>
          <div className="space-y-3">
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-sm text-green-700">
                <span className="font-bold">₹{pendingAmount}</span> will be transferred on Mar 30
              </p>
            </div>
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
              Request Early Payout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
