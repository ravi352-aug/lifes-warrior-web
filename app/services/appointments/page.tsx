'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Star, MapPin, Clock, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MainLayout } from '@/components/shared/Navigation';
import { ProviderCard, QuoteComparison } from '@/components/shared/ServiceCard';
import { currentUser, doctors } from '@/lib/mockData';

export default function AppointmentsPage() {
  const router = useRouter();
  const [view, setView] = useState<'list' | 'comparison'>('list');
  const [selectedDoctors, setSelectedDoctors] = useState<string[]>([]);

  const handleSelectDoctor = (doctorId: string) => {
    setSelectedDoctors([...selectedDoctors, doctorId]);
    setView('comparison');
  };

  const handleBookNow = (doctorId: string) => {
    // Navigate to booking confirmation
    router.push(`/booking-confirmation?doctor=${doctorId}&service=appointment`);
  };

  if (view === 'comparison' && selectedDoctors.length > 0) {
    const selectedProviders = doctors.filter((d) =>
      selectedDoctors.includes(d.id)
    );
    return (
      <MainLayout
        headerProps={{
          userName: currentUser.name,
          userAvatar: currentUser.avatar,
        }}
      >
        <div className="space-y-6 px-4 py-4">
          <Button
            variant="outline"
            onClick={() => {
              setView('list');
              setSelectedDoctors([]);
            }}
          >
            ← Back to Doctors
          </Button>

          <QuoteComparison
            providers={selectedProviders}
            onSelect={handleBookNow}
          />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout
      headerProps={{
        userName: currentUser.name,
        userAvatar: currentUser.avatar,
      }}
    >
      <div className="space-y-6 px-4 py-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Doctor Appointments
          </h1>
          <p className="mt-1 text-gray-600">Select a doctor and book your appointment</p>
        </div>

        <div className="rounded-lg bg-blue-50 p-4 text-sm text-blue-800">
          <p className="font-medium">Available doctors near you:</p>
          <p className="mt-1">{doctors.length} doctors found</p>
        </div>

        <div className="space-y-4">
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className="overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow hover:shadow-lg"
            >
              <div className="p-4">
                <div className="mb-3 flex items-start justify-between">
                  <div className="flex gap-3">
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="h-12 w-12 rounded-full"
                    />
                    <div>
                      <h3 className="font-bold text-gray-900">{doctor.name}</h3>
                      <p className="text-sm text-gray-600">
                        {doctor.specialization}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{doctor.rating}</span>
                  </div>
                </div>

                <div className="mb-4 grid grid-cols-2 gap-2 text-sm text-gray-600 md:grid-cols-4">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{doctor.responseTime} min</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{doctor.distance} km</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Phone className="h-4 w-4" />
                    <span>₹{doctor.priceRange.min}</span>
                  </div>
                  <div className="font-medium text-green-600">
                    {doctor.availability}
                  </div>
                </div>

                <p className="mb-4 text-sm text-gray-600">{doctor.description}</p>

                <Button
                  onClick={() => handleSelectDoctor(doctor.id)}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  View & Compare
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
