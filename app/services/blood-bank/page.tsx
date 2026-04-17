'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, MapPin, Star, Clock, Droplet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MainLayout } from '@/components/shared/Navigation';
import { currentUser } from '@/lib/mockData';

export default function BloodBankPage() {
  const router = useRouter();

  const bloodBanks = [
    {
      id: 1,
      name: 'City Blood Bank',
      type: 'Blood Bank',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=bloodbank1',
      rating: 4.8,
      reviewCount: 245,
      distance: 2.5,
      bloodTypes: ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'],
      priceRange: { min: 500, max: 1000 },
      responseTime: 15,
      availability: '24/7 Open',
    },
    {
      id: 2,
      name: 'Central Blood Station',
      type: 'Blood Bank',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=bloodbank2',
      rating: 4.6,
      reviewCount: 189,
      distance: 3.8,
      bloodTypes: ['O+', 'O-', 'A+', 'B+', 'AB+'],
      priceRange: { min: 600, max: 900 },
      responseTime: 20,
      availability: '6 AM - 10 PM',
    },
    {
      id: 3,
      name: 'Red Cross Blood Bank',
      type: 'Blood Bank',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=bloodbank3',
      rating: 4.7,
      reviewCount: 312,
      distance: 1.9,
      bloodTypes: ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'],
      priceRange: { min: 550, max: 950 },
      responseTime: 10,
      availability: '24/7 Open',
    },
    {
      id: 4,
      name: 'Medical Care Blood Center',
      type: 'Blood Bank',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=bloodbank4',
      rating: 4.5,
      reviewCount: 156,
      distance: 4.2,
      bloodTypes: ['O+', 'O-', 'A+', 'B+'],
      priceRange: { min: 500, max: 850 },
      responseTime: 25,
      availability: '7 AM - 9 PM',
    },
    {
      id: 5,
      name: 'Emergency Blood Bank',
      type: 'Blood Bank',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=bloodbank5',
      rating: 4.9,
      reviewCount: 428,
      distance: 2.1,
      bloodTypes: ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'],
      priceRange: { min: 700, max: 1100 },
      responseTime: 5,
      availability: '24/7 Open',
    },
    {
      id: 6,
      name: 'Community Blood Donation',
      type: 'Blood Bank',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=bloodbank6',
      rating: 4.4,
      reviewCount: 134,
      distance: 5.6,
      bloodTypes: ['O+', 'A+', 'B+'],
      priceRange: { min: 450, max: 750 },
      responseTime: 30,
      availability: '8 AM - 8 PM',
    },
  ];

  return (
    <MainLayout
      headerProps={{
        userName: currentUser.name,
        userAvatar: currentUser.avatar,
        notificationCount: 2,
      }}
    >
      <div className="space-y-4 md:space-y-6 px-4 py-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="rounded-lg p-2 hover:bg-gray-100"
          >
            <ArrowLeft className="h-5 w-5 text-gray-700" />
          </button>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Blood Bank</h1>
        </div>

        {/* Blood Type Filter */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <p className="text-sm font-semibold text-gray-700 mb-3">Select Blood Type</p>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
            {['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'].map((type) => (
              <button
                key={type}
                className="h-10 rounded-lg border border-red-300 bg-red-50 text-red-600 font-semibold hover:bg-red-100 transition-colors text-sm"
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Blood Banks List */}
        <div className="space-y-3">
          <p className="text-lg font-bold text-gray-900">Available Blood Banks</p>
          {bloodBanks.map((bank) => (
            <div
              key={bank.id}
              onClick={() => router.push('/booking-confirmation')}
              className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-start gap-3 mb-3">
                <img
                  src={bank.image}
                  alt={bank.name}
                  className="h-12 w-12 md:h-14 md:w-14 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 text-sm md:text-base">
                    {bank.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 md:h-4 md:w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs md:text-sm font-semibold text-gray-900">
                        {bank.rating}
                      </span>
                      <span className="text-xs text-gray-500">({bank.reviewCount})</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-500 flex-shrink-0" />
                  <span className="text-xs md:text-sm text-gray-600">{bank.distance} km away</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500 flex-shrink-0" />
                  <span className="text-xs md:text-sm text-gray-600">{bank.responseTime} min</span>
                </div>
                <div className="flex items-center gap-2">
                  <Droplet className="h-4 w-4 text-red-600 flex-shrink-0" />
                  <span className="text-xs md:text-sm text-gray-600">{bank.availability}</span>
                </div>
                <div className="text-xs md:text-sm font-semibold text-blue-600">
                  ₹{bank.priceRange.min} - ₹{bank.priceRange.max}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-3">
                {bank.bloodTypes.slice(0, 4).map((type) => (
                  <span
                    key={type}
                    className="inline-block px-2 py-1 text-xs bg-red-100 text-red-700 rounded-full font-semibold"
                  >
                    {type}
                  </span>
                ))}
                {bank.bloodTypes.length > 4 && (
                  <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full font-semibold">
                    +{bank.bloodTypes.length - 4} more
                  </span>
                )}
              </div>

              <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                Book Now
              </Button>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
