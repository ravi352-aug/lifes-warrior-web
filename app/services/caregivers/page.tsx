'use client';

import { useRouter } from 'next/navigation';
import { Star, MapPin, Clock, Badge } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MainLayout } from '@/components/shared/Navigation';
import { currentUser, caregivers } from '@/lib/mockData';

export default function CaregiversPage() {
  const router = useRouter();

  const caregiverTypes = [
    { id: 1, type: 'Elderly Care', icon: '👴' },
    { id: 2, type: 'Post-operative Care', icon: '🏥' },
    { id: 3, type: 'Child Care', icon: '👶' },
    { id: 4, type: 'Disability Support', icon: '🦽' },
  ];

  const handleBookCaregiver = (caregiverId: string) => {
    router.push(
      `/booking-confirmation?caregiver=${caregiverId}&service=caregiver`
    );
  };

  return (
    <MainLayout
      headerProps={{
        userName: currentUser.name,
        userAvatar: currentUser.avatar,
      }}
    >
      <div className="space-y-6 px-4 py-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Caregiver Services</h1>
          <p className="mt-1 text-gray-600">
            Find professional caregivers for home care and support
          </p>
        </div>

        {/* Caregiver Types */}
        <div>
          <h2 className="mb-3 text-lg font-bold text-gray-900">Type of Care Needed</h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {caregiverTypes.map((type) => (
              <button
                key={type.id}
                className="rounded-lg border border-gray-200 bg-white p-4 text-center transition-all hover:shadow-md hover:border-teal-300"
              >
                <div className="mb-2 text-2xl">{type.icon}</div>
                <p className="text-sm font-medium text-gray-900">{type.type}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Available Caregivers */}
        <div>
          <h2 className="mb-3 text-lg font-bold text-gray-900">
            Experienced Caregivers Near You
          </h2>
          <div className="space-y-4">
            {caregivers.map((caregiver) => (
              <div
                key={caregiver.id}
                className="overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow hover:shadow-lg"
              >
                <div className="p-4">
                  <div className="mb-3 flex items-start justify-between">
                    <div className="flex gap-3">
                      <img
                        src={caregiver.image}
                        alt={caregiver.name}
                        className="h-12 w-12 rounded-full"
                      />
                      <div>
                        <h3 className="font-bold text-gray-900">{caregiver.name}</h3>
                        <p className="text-sm text-gray-600">
                          {caregiver.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{caregiver.rating}</span>
                    </div>
                  </div>

                  {/* Credentials */}
                  {caregiver.credentials && (
                    <div className="mb-3 flex flex-wrap gap-2">
                      {caregiver.credentials.split(', ').map((cred, idx) => (
                        <Badge
                          key={idx}
                          variant="outline"
                          className="text-xs"
                        >
                          {cred}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <div className="mb-4 grid grid-cols-2 gap-2 text-sm text-gray-600 md:grid-cols-4">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{caregiver.responseTime} min</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{caregiver.distance} km</span>
                    </div>
                    <div className="font-medium text-green-600">
                      {caregiver.availability}
                    </div>
                    <div className="font-medium text-teal-600">
                      ₹{caregiver.priceRange.min}/day
                    </div>
                  </div>

                  <Button
                    onClick={() => handleBookCaregiver(caregiver.id)}
                    className="w-full bg-teal-600 hover:bg-teal-700"
                  >
                    Book Caregiver
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
