'use client';

import { useRouter } from 'next/navigation';
import { CreditCard, TrendingUp, History } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MainLayout } from '@/components/shared/Navigation';
import { currentUser, bookings } from '@/lib/mockData';

export default function WalletPage() {
  const router = useRouter();

  const transactions = [
    {
      id: 1,
      type: 'debit',
      amount: 500,
      description: 'Doctor Appointment - Dr. Priya Sharma',
      date: '2024-03-20',
      icon: '🏥',
    },
    {
      id: 2,
      type: 'debit',
      amount: 800,
      description: 'Lab Tests - HealthCare Labs',
      date: '2024-03-18',
      icon: '🧪',
    },
    {
      id: 3,
      type: 'credit',
      amount: 500,
      description: 'Cashback Reward',
      date: '2024-03-15',
      icon: '🎁',
    },
    {
      id: 4,
      type: 'debit',
      amount: 250,
      description: 'Medicine Order',
      date: '2024-03-12',
      icon: '💊',
    },
  ];

  return (
    <MainLayout
      headerProps={{
        userName: currentUser.name,
        userAvatar: currentUser.avatar,
      }}
    >
      <div className="space-y-6 px-4 py-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Wallet</h1>
          <p className="mt-1 text-gray-600">Manage your balance and transactions</p>
        </div>

        {/* Wallet Balance Card */}
        <div className="rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 p-6 text-white shadow-lg">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <p className="text-blue-100">Total Balance</p>
              <p className="text-4xl font-bold">₹{currentUser.walletBalance}</p>
            </div>
            <CreditCard className="h-12 w-12 opacity-50" />
          </div>

          <div className="flex gap-3">
            <Button className="flex-1 bg-white text-blue-600 hover:bg-blue-50">
              Add Money
            </Button>
            <Button
              variant="outline"
              className="flex-1 border-white text-white hover:bg-blue-700"
            >
              Transfer
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-gray-200 bg-white p-4 text-center">
            <TrendingUp className="mx-auto mb-2 h-6 w-6 text-green-600" />
            <p className="text-xs text-gray-600">Total Spent</p>
            <p className="font-bold text-gray-900">₹2,550</p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-4 text-center">
            <span className="text-2xl">💳</span>
            <p className="mt-2 text-xs text-gray-600">Transactions</p>
            <p className="font-bold text-gray-900">12</p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-4 text-center">
            <span className="text-2xl">🎁</span>
            <p className="mt-2 text-xs text-gray-600">Cashback</p>
            <p className="font-bold text-gray-900">₹500</p>
          </div>
        </div>

        {/* Transactions */}
        <div>
          <div className="mb-4 flex items-center gap-2">
            <History className="h-5 w-5 text-gray-600" />
            <h2 className="text-lg font-bold text-gray-900">Recent Transactions</h2>
          </div>

          <div className="space-y-3">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{transaction.icon}</div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {transaction.description}
                    </p>
                    <p className="text-xs text-gray-500">{transaction.date}</p>
                  </div>
                </div>
                <div
                  className={`font-semibold ${
                    transaction.type === 'credit'
                      ? 'text-green-600'
                      : 'text-gray-900'
                  }`}
                >
                  {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
