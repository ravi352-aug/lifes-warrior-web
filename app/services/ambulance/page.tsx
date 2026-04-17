'use client';

import { useRouter } from 'next/navigation';
import { Star, MapPin, Clock, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MainLayout } from '@/components/shared/Navigation';
import { currentUser, ambulances } from '@/lib/mockData';

export default function AmbulancePage() {
  const router = useRouter();

  const emergencyTypes = [
    { id: 1, type: 'Medical Emergency', icon: '🚑' },
    { id: 2, type: 'Accident', icon: '⚠️' },
    { id: 3, type: 'Non-Emergency Transfer', icon: '🚚' },
    { id: 4, type: 'Ventilator Support', icon: '🫁' },
  ];

  const handleRequestAmbulance = (ambulanceId: string) => {
    router.push(
      `/booking-confirmation?ambulance=${ambulanceId}&service=ambulance`
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
        {/* Emergency Alert */}
        <div className="rounded-lg bg-red-50 p-4 border-l-4 border-red-600">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-red-900">Emergency?</h3>
              <p className="text-sm text-red-800">
                For immediate emergencies, call 108 or your local emergency services
              </p>
            </div>
          </div>
        </div>

        <div>
          <h1 className="text-2xl font-bold text-gray-900">Ambulance Services</h1>
          <p className="mt-1 text-gray-600">24/7 Medical and Emergency Transport</p>
        </div>

        {/* Emergency Types */}
        <div>
          <h2 className="mb-3 text-lg font-bold text-gray-900">Type of Service</h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {emergencyTypes.map((type) => (
              <button
                key={type.id}
                className="rounded-lg border border-gray-200 bg-white p-4 text-center transition-all hover:shadow-md hover:border-red-300"
              >
                <div className="mb-2 text-2xl">{type.icon}</div>
                <p className="text-sm font-medium text-gray-900">{type.type}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Available Ambulances */}
        <div>
          <h2 className="mb-3 text-lg font-bold text-gray-900">
            Available Ambulances
          </h2>
          <div className="space-y-4">
            {ambulances.map((ambulance) => (
              <div
                key={ambulance.id}
                className="overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow hover:shadow-lg"
              >
                <div className="p-4">
                  <div className="mb-3 flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-gray-900">{ambulance.name}</h3>
                      <p className="text-sm text-gray-600">
                        {ambulance.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{ambulance.rating}</span>
                    </div>
                  </div>

                  <div className="mb-4 grid grid-cols-3 gap-2 text-sm text-gray-600 md:grid-cols-4">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{ambulance.responseTime} min</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{ambulance.distance} km</span>
                    </div>
                    <div className="font-medium text-green-600">
                      {ambulance.availability}
                    </div>
                    <div className="font-medium text-red-600">
                      ₹{ambulance.priceRange.min}+
                    </div>
                  </div>

                  <Button
                    onClick={() => handleRequestAmbulance(ambulance.id)}
                    className="w-full bg-red-600 hover:bg-red-700"
                  >
                    Request Ambulance
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
