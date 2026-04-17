'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, MapPin, Phone, MessageCircle, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MainLayout } from '@/components/shared/Navigation';
import { currentUser } from '@/lib/mockData';

interface TrackingStep {
  status: string;
  title: string;
  description: string;
  time: string;
  completed: boolean;
}

interface TrackingData {
  id: string;
  serviceType: string;
  providerName: string;
  providerPhone: string;
  providerRating: number;
  currentStatus: 'confirmed' | 'provider-heading' | 'arrived' | 'in-progress' | 'completed';
  providerLocation: { lat: number; lng: number; distance: number };
  estimatedArrival: number;
  steps: TrackingStep[];
}

const mockTracking: Record<string, TrackingData> = {
  'lab_001': {
    id: 'book_001',
    serviceType: 'Lab Test Collection',
    providerName: 'City Diagnostic Lab',
    providerPhone: '+91-9876543210',
    providerRating: 4.8,
    currentStatus: 'provider-heading',
    providerLocation: { lat: 28.614, lng: 77.21, distance: 1.8 },
    estimatedArrival: 12,
    steps: [
      { status: 'confirmed', title: 'Booking Confirmed', description: 'Your lab test collection is confirmed', time: '10:30 AM', completed: true },
      { status: 'heading', title: 'On the Way', description: 'Lab technician is heading to your location', time: 'Now', completed: true },
      { status: 'arrived', title: 'Technician Arrived', description: 'Lab technician will arrive at your location', time: 'Estimated 12 mins', completed: false },
      { status: 'collection', title: 'Sample Collection', description: 'Blood/sample collection in progress', time: 'Pending', completed: false },
      { status: 'completed', title: 'Collection Complete', description: 'Your test collection is complete', time: 'Pending', completed: false },
    ],
  },
  'medicine_001': {
    id: 'book_002',
    serviceType: 'Medicine Delivery',
    providerName: 'Apollo Pharmacy',
    providerPhone: '+91-9876543211',
    providerRating: 4.7,
    currentStatus: 'in-progress',
    providerLocation: { lat: 28.612, lng: 77.208, distance: 0.8 },
    estimatedArrival: 5,
    steps: [
      { status: 'confirmed', title: 'Order Confirmed', description: 'Your medicine order is confirmed', time: '10:45 AM', completed: true },
      { status: 'prepared', title: 'Order Prepared', description: 'Your medicines are being prepared', time: '10:48 AM', completed: true },
      { status: 'heading', title: 'On the Way', description: 'Delivery agent is heading to your location', time: '10:52 AM', completed: true },
      { status: 'arrived', title: 'Arrived', description: 'Delivery agent has arrived at your location', time: 'Estimated 5 mins', completed: false },
      { status: 'delivered', title: 'Delivered', description: 'Medicines delivered successfully', time: 'Pending', completed: false },
    ],
  },
  'ambulance_001': {
    id: 'book_003',
    serviceType: 'Ambulance Service',
    providerName: 'Emergency Response Team',
    providerPhone: '+91-9876543212',
    providerRating: 4.9,
    currentStatus: 'confirmed',
    providerLocation: { lat: 28.615, lng: 77.212, distance: 2.2 },
    estimatedArrival: 8,
    steps: [
      { status: 'confirmed', title: 'Ambulance Confirmed', description: 'Ambulance is assigned and confirmed', time: 'Now', completed: true },
      { status: 'dispatch', title: 'Dispatched', description: 'Ambulance has been dispatched', time: 'Estimated 2 mins', completed: false },
      { status: 'arrived', title: 'Arrived', description: 'Ambulance will arrive at your location', time: 'Estimated 8 mins', completed: false },
      { status: 'pickup', title: 'Patient Pickup', description: 'Patient picked up and heading to hospital', time: 'Pending', completed: false },
      { status: 'hospital', title: 'Reached Hospital', description: 'Patient safely delivered to hospital', time: 'Pending', completed: false },
    ],
  },
};

export default function TrackingPage() {
  const router = useRouter();
  const params = useParams();
  const requestId = params.requestId as string;
  const [tracking, setTracking] = useState<TrackingData | null>(null);

  // Simulate real-time updates
  useEffect(() => {
    const data = mockTracking[requestId] || mockTracking['lab_001'];
    setTracking(data);

    // Simulate status updates
    const interval = setInterval(() => {
      setTracking((prev) => {
        if (!prev) return null;

        // Simulate progress through steps
        if (prev.currentStatus === 'confirmed' && Math.random() > 0.5) {
          return {
            ...prev,
            currentStatus: 'provider-heading',
            steps: prev.steps.map((s, i) => ({
              ...s,
              completed: i <= 1,
            })),
            estimatedArrival: Math.max(prev.estimatedArrival - 1, 0),
          };
        }

        if (prev.estimatedArrival > 0) {
          return { ...prev, estimatedArrival: prev.estimatedArrival - 1 };
        }

        return prev;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [requestId]);

  if (!tracking) {
    return (
      <MainLayout
        headerProps={{
          userName: currentUser.name,
          userAvatar: currentUser.avatar,
        }}
      >
        <div className="space-y-6 px-4 py-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          </div>
        </div>
      </MainLayout>
    );
  }

  const completedSteps = tracking.steps.filter((s) => s.completed).length;
  const progress = (completedSteps / tracking.steps.length) * 100;

  return (
    <MainLayout
      headerProps={{
        userName: currentUser.name,
        userAvatar: currentUser.avatar,
      }}
    >
      <div className="space-y-6 px-4 py-4 max-w-2xl mx-auto">
        {/* Header */}
        <div>
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
          <h1 className="text-3xl font-bold text-gray-900">{tracking.serviceType}</h1>
          <p className="mt-2 text-gray-600">Track your service in real-time</p>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 font-medium">Progress</span>
            <span className="text-sm text-gray-600">{completedSteps} of {tracking.steps.length} steps</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Provider Card */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold">{tracking.providerName}</h3>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-sm">★ {tracking.providerRating}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm opacity-90">Est. Arrival</div>
              <div className="text-2xl font-bold">{tracking.estimatedArrival} min</div>
            </div>
          </div>

          {/* Distance & Contact */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              <span className="text-sm">{tracking.providerLocation.distance} km away</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <span className="text-sm">Live tracking active</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 mt-4">
            <Button className="bg-white text-blue-600 hover:bg-gray-100 flex items-center justify-center gap-2">
              <Phone className="h-4 w-4" />
              Call
            </Button>
            <Button className="bg-white text-blue-600 hover:bg-gray-100 flex items-center justify-center gap-2">
              <MessageCircle className="h-4 w-4" />
              Message
            </Button>
          </div>
        </div>

        {/* Tracking Steps */}
        <div className="space-y-0">
          {tracking.steps.map((step, index) => (
            <div
              key={index}
              className={`relative pb-8 ${index !== tracking.steps.length - 1 ? 'border-l-2' : ''} ${
                step.completed ? 'border-green-500' : 'border-gray-300'
              }`}
              style={{ marginLeft: '24px' }}
            >
              {/* Timeline dot */}
              <div className="absolute -left-4 -top-1">
                <div
                  className={`w-8 h-8 rounded-full border-4 flex items-center justify-center ${
                    step.completed
                      ? 'bg-green-500 border-green-500'
                      : 'bg-white border-gray-300'
                  }`}
                >
                  {step.completed && <CheckCircle2 className="h-5 w-5 text-white" />}
                </div>
              </div>

              {/* Step Content */}
              <div className="ml-4">
                <div className="flex items-start justify-between mb-1">
                  <h4 className={`font-bold ${step.completed ? 'text-gray-900' : 'text-gray-600'}`}>
                    {step.title}
                  </h4>
                  <span className={`text-xs font-medium ${step.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                    {step.time}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-blue-900">
              <strong>Live Tracking:</strong> This page updates automatically every few seconds. You can close it anytime and reopen later.
            </p>
          </div>
        </div>

        {/* Complete Service Button (shown when completed) */}
        {tracking.steps.every((s) => s.completed) && (
          <Button
            onClick={() => router.push('/rate-service')}
            className="w-full bg-green-600 hover:bg-green-700 py-3"
          >
            Service Complete - Rate Provider
          </Button>
        )}
      </div>
    </MainLayout>
  );
}
