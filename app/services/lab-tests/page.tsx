'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Star, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MainLayout } from '@/components/shared/Navigation';
import { LabSearchForm } from '@/components/labs/LabSearchForm';
import { TestRequestForm } from '@/components/labs/TestRequestForm';
import { QuotationComparison } from '@/components/labs/QuotationComparison';
import { currentUser, labs } from '@/lib/mockData';
import {
  createServiceRequest,
  generateMockQuotations,
  getQuotations,
  getNearbyLabs,
  createBooking,
} from '@/lib/utils/labBookingUtils';
import { useAuth } from '@/lib/hooks/useAuth';

type BookingMethod = 'search' | 'request' | 'quotations';

const AVAILABLE_TESTS = [
  'Complete Blood Count (CBC)',
  'Blood Sugar Test',
  'Thyroid Profile (TSH)',
  'Lipid Profile',
  'Liver Function Test (LFT)',
  'Kidney Function Test (KFT)',
  'COVID-19 RT-PCR',
  'X-Ray Chest',
  'Ultrasound Abdomen',
  'ECG',
];

export default function LabTestsPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [method, setMethod] = useState<BookingMethod>('search');
  const [loading, setLoading] = useState(false);
  const [selectedLab, setSelectedLab] = useState<any | null>(null);
  const [currentRequestId, setCurrentRequestId] = useState<string | null>(null);
  const [quotations, setQuotations] = useState<any[]>([]);

  const commonTests = [
    { id: 1, name: 'Complete Blood Count (CBC)', price: 300 },
    { id: 2, name: 'Blood Sugar Test', price: 150 },
    { id: 3, name: 'Thyroid Profile (TSH)', price: 450 },
    { id: 4, name: 'Lipid Profile', price: 500 },
    { id: 5, name: 'Liver Function Test (LFT)', price: 600 },
    { id: 6, name: 'Kidney Function Test (KFT)', price: 550 },
  ];

  // Convert mock labs to correct format for search
  const labsForSearch = labs.map((lab) => ({
    id: lab.id,
    name: lab.name,
    location: lab.description || 'Nearby',
    rating: lab.rating,
    reviews: 120,
    responseTime: `${lab.responseTime} min`,
    tests: AVAILABLE_TESTS.slice(0, 4),
    image: lab.image,
  }));

  const handleSearchSelect = (lab: any) => {
    setSelectedLab(lab);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push(`/services/lab-tests/${lab.id}?method=direct`);
    }, 500);
  };

  const handleTestRequest = async (
    tests: string[],
    document?: string,
    date?: string
  ) => {
    if (!user) {
      router.push('/login');
      return;
    }

    setLoading(true);

    try {
      // Create service request
      const request = createServiceRequest(user.id, tests, document, 'Sector 5, Faridabad', date);
      setCurrentRequestId(request.id);

      // Generate mock quotations from nearby labs
      const nearbyLabs = getNearbyLabs('Faridabad', labs);
      const mockQuotations = generateMockQuotations(request.id, nearbyLabs);
      setQuotations(mockQuotations);

      // Move to quotations view
      setMethod('quotations');
    } finally {
      setLoading(false);
    }
  };

  const handleBookQuotation = async (quotation: any) => {
    if (!user) {
      router.push('/login');
      return;
    }

    setLoading(true);

    try {
      const booking = createBooking(
        user.id,
        quotation.labId,
        quotation.id,
        currentRequestId
      );

      router.push(`/booking-confirmation?bookingId=${booking.id}&type=lab-test`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout
      headerProps={{
        userName: currentUser.name,
        userAvatar: currentUser.avatar,
      }}
    >
      <div className="space-y-6 px-4 py-4">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Book Lab Tests</h1>
          <p className="mt-1 text-gray-600">
            Get home sample collection and online reports
          </p>
        </div>

        {/* Method Selection Tabs */}
        <div className="flex gap-2 border-b border-gray-200">
          <button
            onClick={() => setMethod('search')}
            className={`px-4 py-2 font-medium text-sm transition-colors border-b-2 ${
              method === 'search'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Method 1: Search Lab
          </button>
          <button
            onClick={() => setMethod('request')}
            className={`px-4 py-2 font-medium text-sm transition-colors border-b-2 ${
              method === 'request'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Method 2: Request & Compare
          </button>
        </div>

        {/* Method 1: Search Lab */}
        {method === 'search' && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Search and Book Directly</h2>
            <LabSearchForm labs={labsForSearch} onSelectLab={handleSearchSelect} />
          </div>
        )}

        {/* Method 2: Test Request */}
        {method === 'request' && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Submit Request & Get Quotations
            </h2>
            <TestRequestForm
              availableTests={AVAILABLE_TESTS}
              onSubmitRequest={handleTestRequest}
              loading={loading}
            />
          </div>
        )}

        {/* Quotations Comparison */}
        {method === 'quotations' && quotations.length > 0 && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Lab Quotations ({quotations.length})
            </h2>
            <QuotationComparison
              quotations={quotations}
              onBookQuotation={handleBookQuotation}
              loading={loading}
            />
          </div>
        )}

        {/* Popular Tests */}
        {method === 'search' && (
          <div>
            <h2 className="mb-3 text-lg font-bold text-gray-900">Popular Tests</h2>
            <div className="grid gap-2 md:grid-cols-2">
              {commonTests.map((test) => (
                <div
                  key={test.id}
                  className="rounded-lg border border-gray-200 bg-white p-3 hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{test.name}</p>
                      <p className="text-sm text-green-600">₹{test.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Available Labs */}
        {method === 'search' && (
          <div>
            <h2 className="mb-3 text-lg font-bold text-gray-900">
              Available Labs Near You
            </h2>
            <div className="space-y-4">
              {labs.map((lab) => (
                <div
                  key={lab.id}
                  className="overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow hover:shadow-lg"
                >
                  <div className="p-4">
                    <div className="mb-3 flex items-start justify-between">
                      <div>
                        <h3 className="font-bold text-gray-900">{lab.name}</h3>
                        <p className="text-sm text-gray-600">{lab.description}</p>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{lab.rating}</span>
                      </div>
                    </div>

                    <div className="mb-4 grid grid-cols-3 gap-2 text-sm text-gray-600 md:grid-cols-4">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{lab.responseTime} min</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{lab.distance} km</span>
                      </div>
                      <div className="font-medium text-green-600">
                        {lab.availability}
                      </div>
                      <div className="font-medium text-blue-600">
                        ₹{lab.priceRange.min}+
                      </div>
                    </div>

                    <Button
                      onClick={() =>
                        router.push(`/services/lab-tests/${lab.id}`)
                      }
                      className="w-full bg-purple-600 hover:bg-purple-700"
                    >
                      View Tests
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
