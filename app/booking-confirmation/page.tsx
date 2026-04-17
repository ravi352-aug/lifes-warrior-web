'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle, MapPin, Clock, Phone, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MainLayout } from '@/components/shared/Navigation';
import { currentUser, doctors, labs, medicineStores, ambulances, caregivers } from '@/lib/mockData';
import { Suspense } from 'react';

function BookingConfirmationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const serviceType = searchParams.get('service');
  const providerId = searchParams.get('doctor') || searchParams.get('lab') || searchParams.get('store') || searchParams.get('ambulance') || searchParams.get('caregiver');

  let provider: any = null;
  let serviceTitle = '';
  let bookingDetails: any = {};

  // Find the provider based on service type and ID
  if (serviceType === 'appointment' && searchParams.get('doctor')) {
    provider = doctors.find((d) => d.id === providerId);
    serviceTitle = 'Doctor Appointment';
    bookingDetails = {
      date: '2024-03-25',
      time: '2:30 PM',
      duration: '30 minutes',
    };
  } else if (serviceType === 'lab-test' && searchParams.get('lab')) {
    provider = labs.find((l) => l.id === providerId);
    serviceTitle = 'Lab Test';
    bookingDetails = {
      test: searchParams.get('test'),
      collection: 'Home Collection',
      date: '2024-03-24',
    };
  } else if (serviceType === 'medicine' && searchParams.get('store')) {
    provider = medicineStores.find((s) => s.id === providerId);
    serviceTitle = 'Medicine Order';
    bookingDetails = {
      medicine: searchParams.get('medicine'),
      delivery: 'Within 2 hours',
    };
  } else if (serviceType === 'ambulance' && searchParams.get('ambulance')) {
    provider = ambulances.find((a) => a.id === providerId);
    serviceTitle = 'Ambulance Booking';
    bookingDetails = {
      eta: '5 minutes',
      equipment: 'ALS Equipped',
    };
  } else if (serviceType === 'caregiver' && searchParams.get('caregiver')) {
    provider = caregivers.find((c) => c.id === providerId);
    serviceTitle = 'Caregiver Booking';
    bookingDetails = {
      startDate: '2024-03-24',
      shift: 'Full time',
    };
  }

  if (!provider) {
    return (
      <MainLayout
        headerProps={{
          userName: currentUser.name,
          userAvatar: currentUser.avatar,
        }}
      >
        <div className="px-4 py-8 text-center">
          <p className="text-gray-600">Booking details not found</p>
          <Button onClick={() => router.push('/')} className="mt-4">
            Go Home
          </Button>
        </div>
      </MainLayout>
    );
  }

  const bookingId = `BK${Date.now()}`;

  return (
    <MainLayout
      headerProps={{
        userName: currentUser.name,
        userAvatar: currentUser.avatar,
      }}
    >
      <div className="mx-auto max-w-2xl space-y-6 px-4 py-4">
        {/* Success Message */}
        <div className="rounded-lg bg-green-50 p-6 text-center">
          <CheckCircle className="mx-auto mb-3 h-12 w-12 text-green-600" />
          <h1 className="text-2xl font-bold text-green-900">
            Booking Confirmed!
          </h1>
          <p className="mt-1 text-green-700">
            Your {serviceTitle.toLowerCase()} has been successfully booked
          </p>
        </div>

        {/* Booking Reference */}
        <div className="rounded-lg border border-gray-200 bg-white p-4 text-center">
          <p className="text-sm text-gray-600">Booking Reference</p>
          <p className="text-2xl font-bold text-gray-900">{bookingId}</p>
          <p className="mt-1 text-xs text-gray-500">
            Save this reference for future correspondence
          </p>
        </div>

        {/* Provider Details */}
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="mb-4 font-bold text-gray-900">Service Provider</h2>

          <div className="mb-4 flex gap-4">
            <img
              src={provider.image}
              alt={provider.name}
              className="h-16 w-16 rounded-full"
            />
            <div>
              <h3 className="font-bold text-gray-900">{provider.name}</h3>
              <p className="text-sm text-gray-600">{provider.description}</p>
              <p className="mt-1 text-xs text-gray-500">{provider.availability}</p>
            </div>
          </div>

          <div className="space-y-2 border-t border-gray-200 pt-4">
            <div className="flex items-center gap-2 text-gray-700">
              <MapPin className="h-4 w-4 text-gray-400" />
              <span className="text-sm">{provider.location}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Clock className="h-4 w-4 text-gray-400" />
              <span className="text-sm">{provider.responseTime} minutes response time</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Phone className="h-4 w-4 text-gray-400" />
              <span className="text-sm">{provider.phone}</span>
            </div>
          </div>
        </div>

        {/* Booking Details */}
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="mb-4 font-bold text-gray-900">Booking Details</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {Object.entries(bookingDetails).map(([key, value]) => (
              <div key={key}>
                <p className="text-sm capitalize text-gray-600">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                <p className="mt-1 font-medium text-gray-900">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Cost Summary */}
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="mb-4 font-bold text-gray-900">Cost Summary</h2>
          <div className="space-y-2 border-b border-gray-200 pb-4">
            <div className="flex justify-between text-gray-700">
              <span>Service Charge</span>
              <span>₹{provider.priceRange.min}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Taxes & Fees</span>
              <span>₹100</span>
            </div>
          </div>
          <div className="mt-4 flex justify-between">
            <span className="font-bold text-gray-900">Total Amount</span>
            <span className="text-2xl font-bold text-blue-600">
              ₹{provider.priceRange.min + 100}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Button
            onClick={() => router.push('/profile?tab=bookings')}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            View My Bookings
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button
            onClick={() => router.push('/')}
            variant="outline"
            className="w-full"
          >
            Back to Home
          </Button>
        </div>

        {/* Additional Info */}
        <div className="rounded-lg bg-blue-50 p-4 text-sm text-blue-800">
          <p className="font-medium">Important Notes:</p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-xs">
            <li>A confirmation message has been sent to your registered mobile and email</li>
            <li>The service provider will contact you shortly</li>
            <li>You can cancel this booking within 1 hour for a full refund</li>
          </ul>
        </div>
      </div>
    </MainLayout>
  );
}

export default function BookingConfirmationPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookingConfirmationContent />
    </Suspense>
  );
}
