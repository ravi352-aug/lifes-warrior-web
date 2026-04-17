'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Star, MapPin, Clock, Check, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MainLayout } from '@/components/shared/Navigation';
import { currentUser } from '@/lib/mockData';

interface Provider {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  quote: number;
  estimatedTime: number;
  distance: number;
  badge: string;
  responseTime: string;
}

const mockQuotes: Record<string, Provider[]> = {
  'lab-test-001': [
    {
      id: 'lab1',
      name: 'City Diagnostic Lab',
      rating: 4.8,
      reviews: 245,
      quote: 1200,
      estimatedTime: 24,
      distance: 2.5,
      badge: 'Verified',
      responseTime: 'Within 2 hours',
    },
    {
      id: 'lab2',
      name: 'Health Plus Laboratory',
      rating: 4.6,
      reviews: 189,
      quote: 950,
      estimatedTime: 24,
      distance: 3.2,
      badge: 'Popular',
      responseTime: 'Within 3 hours',
    },
    {
      id: 'lab3',
      name: 'Advanced Diagnostics',
      rating: 4.9,
      reviews: 312,
      quote: 1400,
      estimatedTime: 24,
      distance: 1.8,
      badge: 'Top Rated',
      responseTime: 'Within 1 hour',
    },
  ],
  'medicine-001': [
    {
      id: 'phar1',
      name: 'Apollo Pharmacy',
      rating: 4.7,
      reviews: 156,
      quote: 450,
      estimatedTime: 30,
      distance: 1.2,
      badge: 'Fast Delivery',
      responseTime: 'Within 30 mins',
    },
    {
      id: 'phar2',
      name: 'MediCare Pharmacy',
      rating: 4.5,
      reviews: 98,
      quote: 420,
      estimatedTime: 45,
      distance: 2.1,
      badge: 'Verified',
      responseTime: 'Within 45 mins',
    },
  ],
  'ambulance-001': [
    {
      id: 'amb1',
      name: 'Emergency Response Team',
      rating: 4.9,
      reviews: 421,
      quote: 800,
      estimatedTime: 8,
      distance: 1.5,
      badge: 'Verified',
      responseTime: 'Within 5 mins',
    },
    {
      id: 'amb2',
      name: 'Swift Ambulance Services',
      rating: 4.6,
      reviews: 267,
      quote: 700,
      estimatedTime: 10,
      distance: 2.8,
      badge: 'Popular',
      responseTime: 'Within 10 mins',
    },
  ],
  'caregiver-001': [
    {
      id: 'care1',
      name: 'Dr. Sharma - RN Nurse',
      rating: 4.9,
      reviews: 87,
      quote: 1200,
      estimatedTime: 0,
      distance: 2.3,
      badge: 'Top Rated',
      responseTime: 'Can start today',
    },
    {
      id: 'care2',
      name: 'Sister Priya - Caregiver',
      rating: 4.7,
      reviews: 64,
      quote: 900,
      estimatedTime: 0,
      distance: 3.1,
      badge: 'Experienced',
      responseTime: 'Can start tomorrow',
    },
  ],
};

export default function CompareQuotationsPage() {
  const router = useRouter();
  const params = useParams();
  const requestId = params.requestId as string;
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState<'price' | 'rating' | 'distance'>('price');

  const quotes = mockQuotes[requestId] || mockQuotes['lab-test-001'];

  const sortedQuotes = [...quotes].sort((a, b) => {
    if (sortBy === 'price') return a.quote - b.quote;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'distance') return a.distance - b.distance;
    return 0;
  });

  const handleSelectProvider = (providerId: string) => {
    setSelectedProvider(providerId);
    setLoading(true);
    setTimeout(() => {
      // Redirect to booking status page where provider can update progress
      router.push(`/booking-status/${requestId}`);
    }, 1500);
  };

  const getServiceType = () => {
    if (requestId.includes('lab')) return 'Lab Tests';
    if (requestId.includes('medicine')) return 'Medicine Delivery';
    if (requestId.includes('ambulance')) return 'Ambulance';
    if (requestId.includes('caregiver')) return 'Caregiver';
    return 'Service';
  };

  return (
    <MainLayout
      headerProps={{
        userName: currentUser.name,
        userAvatar: currentUser.avatar,
      }}
    >
      <div className="space-y-6 px-4 py-4 max-w-4xl mx-auto">
        {/* Header */}
        <div>
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Available Quotations</h1>
          <p className="mt-2 text-gray-600">
            {quotes.length} providers have sent quotations for your {getServiceType()} request
          </p>
        </div>

        {/* Sort Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm text-gray-600 font-medium">Sort by:</span>
          <div className="flex gap-2">
            {[
              { value: 'price' as const, label: 'Lowest Price' },
              { value: 'rating' as const, label: 'Highest Rating' },
              { value: 'distance' as const, label: 'Nearest' },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setSortBy(option.value)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  sortBy === option.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Quotations List */}
        <div className="space-y-4">
          {sortedQuotes.map((provider, index) => (
            <div
              key={provider.id}
              className={`border-2 rounded-lg p-6 transition-all cursor-pointer ${
                selectedProvider === provider.id
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => !loading && handleSelectProvider(provider.id)}
            >
              <div className="flex items-start justify-between">
                {/* Provider Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-gray-900 text-lg">{provider.name}</h3>
                        <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                          {provider.badge}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mt-1">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                          <span className="text-sm font-medium text-gray-900">{provider.rating}</span>
                          <span className="text-xs text-gray-600">({provider.reviews} reviews)</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Details Row */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    {provider.distance > 0 && (
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-700">{provider.distance} km away</span>
                      </div>
                    )}

                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-700">{provider.responseTime}</span>
                    </div>

                    {provider.estimatedTime > 0 && (
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-700">Completes in {provider.estimatedTime}h</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Quote & Button */}
                <div className="flex flex-col items-end gap-3">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Quote Amount</p>
                    <p className="text-3xl font-bold text-blue-600">₹{provider.quote}</p>
                  </div>

                  <Button
                    onClick={() => handleSelectProvider(provider.id)}
                    disabled={loading && selectedProvider === provider.id}
                    className={`${
                      selectedProvider === provider.id
                        ? 'bg-blue-600 hover:bg-blue-700'
                        : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                  >
                    {loading && selectedProvider === provider.id ? (
                      <>
                        <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                        Booking...
                      </>
                    ) : (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Select
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* Divider */}
              {index < sortedQuotes.length - 1 && <div className="border-t border-gray-200 mt-4"></div>}
            </div>
          ))}
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-900">
            <strong>How to choose:</strong> Compare prices, ratings, and response times. All providers are verified and insured.
          </p>
        </div>
      </div>
    </MainLayout>
  );
}
