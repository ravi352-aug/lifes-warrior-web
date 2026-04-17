'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check, Zap, Shield, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MainLayout } from '@/components/shared/Navigation';
import { useAuth } from '@/lib/hooks/useAuth';

interface Plan {
  id: string;
  name: string;
  price: number;
  billing: 'monthly' | 'yearly';
  benefits: string[];
  featured?: boolean;
  icon: React.ReactNode;
}

const PLANS: Plan[] = [
  {
    id: 'free',
    name: 'Basic',
    price: 0,
    billing: 'monthly',
    benefits: [
      'Unlimited requests',
      'Basic support',
      'Standard providers',
      'Simple booking',
      'Email notifications',
    ],
    icon: <Gift className="h-6 w-6" />,
  },
  {
    id: 'pro',
    name: 'Premium',
    price: 199,
    billing: 'monthly',
    benefits: [
      'Everything in Basic',
      'Priority booking',
      'Expert providers only',
      'Real-time GPS tracking',
      'Video consultation',
      'SMS + Email notifications',
      '24/7 support',
      '10% discount on services',
    ],
    featured: true,
    icon: <Zap className="h-6 w-6 text-yellow-500" />,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 499,
    billing: 'monthly',
    benefits: [
      'Everything in Premium',
      'Dedicated account manager',
      'Bulk booking discounts',
      'Custom integrations',
      'Advanced analytics',
      'White-label options',
      'Priority emergency support',
      '20% discount on all services',
    ],
    icon: <Shield className="h-6 w-6 text-blue-600" />,
  },
];

interface Wallet {
  balance: number;
  cashback: number;
  totalSpent: number;
}

export default function Subscriptions() {
  const router = useRouter();
  const { user } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState('free');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [wallet, setWallet] = useState<Wallet>({
    balance: 2500,
    cashback: 450,
    totalSpent: 8950,
  });

  if (!user) {
    return null;
  }

  const handleSubscribe = (planId: string) => {
    if (planId === 'free') {
      alert('You are already on the free plan');
      return;
    }

    alert(`Redirecting to payment for ${planId} plan...`);
    // In production, integrate with Stripe or other payment gateway
  };

  const handleAddMoney = (amount: number) => {
    setWallet({
      ...wallet,
      balance: wallet.balance + amount,
    });
    alert(`₹${amount} added to your wallet!`);
  };

  const displayedPlans = billingCycle === 'yearly'
    ? PLANS.map((p) => ({ ...p, price: Math.floor(p.price * 10) }))
    : PLANS;

  return (
    <MainLayout headerProps={{ userName: user.name }}>
      <div className="space-y-8 px-4 py-4">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Subscriptions & Wallet</h1>
          <p className="mt-1 text-gray-600">Manage your subscription and payment methods</p>
        </div>

        {/* Wallet Section */}
        <div className="rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 text-white p-6">
          <h2 className="text-lg font-bold mb-6">Your Wallet</h2>
          <div className="grid gap-4 mb-6 md:grid-cols-3">
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <p className="text-sm text-blue-100">Total Balance</p>
              <p className="text-2xl font-bold">₹{wallet.balance}</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <p className="text-sm text-blue-100">Cashback</p>
              <p className="text-2xl font-bold">₹{wallet.cashback}</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <p className="text-sm text-blue-100">Total Spent</p>
              <p className="text-2xl font-bold">₹{wallet.totalSpent}</p>
            </div>
          </div>

          <div className="grid gap-2 md:grid-cols-4">
            {[500, 1000, 2000, 5000].map((amount) => (
              <Button
                key={amount}
                onClick={() => handleAddMoney(amount)}
                className="bg-white text-blue-600 hover:bg-blue-50 font-medium"
              >
                Add ₹{amount}
              </Button>
            ))}
          </div>
        </div>

        {/* Current Plan */}
        <div className="rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 p-6">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Current Plan: Basic (Free)</h3>
              <p className="text-sm text-gray-600 mt-1">Active since Jan 15, 2024</p>
            </div>
            <span className="px-3 py-1 bg-green-200 text-green-800 rounded-full text-sm font-medium">
              Active
            </span>
          </div>
          <p className="mt-4 text-sm text-gray-700">
            Upgrade to Premium to unlock priority booking, expert providers, and exclusive discounts.
          </p>
        </div>

        {/* Subscription Plans */}
        <div>
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Choose Your Plan</h2>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  checked={billingCycle === 'monthly'}
                  onChange={() => setBillingCycle('monthly')}
                  className="rounded"
                />
                <span className="text-gray-700">Monthly</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  checked={billingCycle === 'yearly'}
                  onChange={() => setBillingCycle('yearly')}
                  className="rounded"
                />
                <span className="text-gray-700">Yearly (Save 20%)</span>
              </label>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {displayedPlans.map((plan) => (
              <div
                key={plan.id}
                className={`rounded-lg border-2 p-6 transition-all ${
                  plan.featured
                    ? 'border-blue-600 bg-blue-50 shadow-lg scale-105'
                    : selectedPlan === plan.id
                    ? 'border-blue-400 bg-white shadow-md'
                    : 'border-gray-200 bg-white'
                }`}
              >
                {plan.featured && (
                  <div className="mb-3 inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                    MOST POPULAR
                  </div>
                )}

                <div className="flex items-center gap-2 mb-3">
                  {plan.icon}
                  <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                </div>

                <div className="mb-6">
                  <span className="text-3xl font-bold text-gray-900">₹{plan.price}</span>
                  {plan.price > 0 && (
                    <span className="text-gray-600">/{billingCycle === 'yearly' ? 'year' : 'month'}</span>
                  )}
                </div>

                <Button
                  onClick={() => handleSubscribe(plan.id)}
                  className={`w-full mb-6 ${
                    plan.featured
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : selectedPlan === plan.id
                      ? 'bg-gray-800 hover:bg-gray-900 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                  }`}
                >
                  {selectedPlan === plan.id ? 'Current Plan' : plan.price === 0 ? 'Current Plan' : 'Upgrade'}
                </Button>

                <div className="space-y-3">
                  {plan.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {[
              {
                q: 'Can I change my plan anytime?',
                a: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.',
              },
              {
                q: 'Is my wallet balance secure?',
                a: 'Yes, all transactions are encrypted and secured with industry-standard security protocols.',
              },
              {
                q: 'Can I get a refund?',
                a: 'We offer a 7-day money-back guarantee for premium plans if you\'re not satisfied.',
              },
              {
                q: 'Do you offer discounts for annual subscription?',
                a: 'Yes, save 20% when you subscribe to an annual plan compared to monthly billing.',
              },
            ].map((faq, idx) => (
              <div key={idx} className="rounded-lg border border-gray-200 p-4">
                <h4 className="font-bold text-gray-900">{faq.q}</h4>
                <p className="text-sm text-gray-600 mt-2">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
