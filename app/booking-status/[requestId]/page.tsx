'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  MessageCircle,
  AlertCircle,
  ChevronRight,
  ArrowLeft,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MainLayout } from '@/components/shared/Navigation';
import { currentUser } from '@/lib/mockData';

interface StatusStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  completedAt?: string;
  icon: any;
}

interface BookingStatus {
  requestId: string;
  serviceType: string;
  providerName: string;
  providerPhone: string;
  providerRating: number;
  amount: number;
  estimatedCompletionTime: string;
  steps: StatusStep[];
  isLiveUpdate: boolean;
}

const mockBookingStatuses: Record<string, BookingStatus> = {
  lab_001: {
    requestId: 'lab_001',
    serviceType: 'Lab Test Collection',
    providerName: 'Dr. Labs Collection Center',
    providerPhone: '+91-9876543210',
    providerRating: 4.8,
    amount: 1200,
    estimatedCompletionTime: '45 mins',
    steps: [
      {
        id: 'confirmed',
        title: 'Booking Confirmed',
        description: 'Your booking has been confirmed',
        completed: true,
        completedAt: '10:15 AM',
        icon: CheckCircle2,
      },
      {
        id: 'on_way',
        title: 'On the Way',
        description: 'Phlebotomist is heading to your location',
        completed: true,
        completedAt: '10:22 AM',
        icon: CheckCircle2,
      },
      {
        id: 'sample_collection',
        title: 'Sample Collection',
        description: 'Collecting blood sample',
        completed: false,
        icon: Clock,
      },
      {
        id: 'sample_transit',
        title: 'Sample in Transit',
        description: 'Sample being transported to lab',
        completed: false,
        icon: Clock,
      },
      {
        id: 'testing',
        title: 'Testing in Progress',
        description: 'Lab is analyzing your sample',
        completed: false,
        icon: Clock,
      },
      {
        id: 'report_ready',
        title: 'Report Ready',
        description: 'Your report is ready for download',
        completed: false,
        icon: Clock,
      },
    ],
    isLiveUpdate: true,
  },
  medicine_001: {
    requestId: 'medicine_001',
    serviceType: 'Medicine Delivery',
    providerName: 'Apollo Pharmacy',
    providerPhone: '+91-9876543211',
    providerRating: 4.9,
    amount: 450,
    estimatedCompletionTime: '20 mins',
    steps: [
      {
        id: 'confirmed',
        title: 'Order Confirmed',
        description: 'Your medicine order is confirmed',
        completed: true,
        completedAt: '2:45 PM',
        icon: CheckCircle2,
      },
      {
        id: 'prepared',
        title: 'Order Prepared',
        description: 'Pharmacist is preparing your medicines',
        completed: true,
        completedAt: '2:48 PM',
        icon: CheckCircle2,
      },
      {
        id: 'dispatched',
        title: 'Dispatched',
        description: 'Order has been dispatched for delivery',
        completed: true,
        completedAt: '2:52 PM',
        icon: CheckCircle2,
      },
      {
        id: 'on_way',
        title: 'On the Way',
        description: 'Delivery agent is heading to your location',
        completed: false,
        icon: Clock,
      },
      {
        id: 'delivered',
        title: 'Delivered',
        description: 'Medicines delivered to you',
        completed: false,
        icon: Clock,
      },
    ],
    isLiveUpdate: true,
  },
  ambulance_001: {
    requestId: 'ambulance_001',
    serviceType: 'Ambulance Service',
    providerName: 'MedCare Ambulance',
    providerPhone: '+91-9876543212',
    providerRating: 4.6,
    amount: 500,
    estimatedCompletionTime: '15 mins',
    steps: [
      {
        id: 'confirmed',
        title: 'Ambulance Confirmed',
        description: 'Your ambulance request is confirmed',
        completed: true,
        completedAt: '3:00 PM',
        icon: CheckCircle2,
      },
      {
        id: 'dispatched',
        title: 'Ambulance Dispatched',
        description: 'Ambulance is being dispatched',
        completed: true,
        completedAt: '3:02 PM',
        icon: CheckCircle2,
      },
      {
        id: 'on_way',
        title: 'On the Way',
        description: 'Ambulance is heading to pickup location',
        completed: false,
        icon: Clock,
      },
      {
        id: 'arrived',
        title: 'Arrived at Pickup',
        description: 'Ambulance has arrived at your location',
        completed: false,
        icon: Clock,
      },
      {
        id: 'in_transit',
        title: 'In Transit to Hospital',
        description: 'Patient is being transported safely',
        completed: false,
        icon: Clock,
      },
    ],
    isLiveUpdate: true,
  },
};

export default function BookingStatusPage() {
  const params = useParams();
  const router = useRouter();
  const requestId = params.requestId as string;
  
  const [booking, setBooking] = useState<BookingStatus | null>(null);
  const [simulatingUpdate, setSimulatingUpdate] = useState(false);

  useEffect(() => {
    const bookingData = mockBookingStatuses[requestId] || mockBookingStatuses.lab_001;
    setBooking(bookingData);

    // Simulate provider updates every 8 seconds
    const interval = setInterval(() => {
      setBooking((prev) => {
        if (!prev) return prev;
        
        const incompleteStepIndex = prev.steps.findIndex((s) => !s.completed);
        if (incompleteStepIndex === -1) return prev;

        const updatedSteps = [...prev.steps];
        updatedSteps[incompleteStepIndex] = {
          ...updatedSteps[incompleteStepIndex],
          completed: true,
          completedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        return { ...prev, steps: updatedSteps };
      });
    }, 8000);

    return () => clearInterval(interval);
  }, [requestId]);

  if (!booking) return null;

  const completedCount = booking.steps.filter((s) => s.completed).length;
  const progressPercentage = (completedCount / booking.steps.length) * 100;

  return (
    <MainLayout
      headerProps={{
        userName: currentUser.name,
        userAvatar: currentUser.avatar,
      }}
    >
      <div className="space-y-6 px-4 py-4 max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Booking Status</h1>
          <p className="mt-1 text-gray-600">{booking.serviceType}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Status Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900">Service Progress</h2>
                <span className="text-2xl font-bold text-blue-600">{completedCount}/{booking.steps.length}</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>

              {/* Status Info */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Estimated Completion</p>
                  <p className="font-medium text-gray-900">{booking.estimatedCompletionTime}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Amount</p>
                  <p className="text-2xl font-bold text-green-600">₹{booking.amount}</p>
                </div>
              </div>
            </div>

            {/* Steps Timeline */}
            <div className="space-y-4">
              {booking.steps.map((step, index) => {
                const Icon = step.icon;
                const isLast = index === booking.steps.length - 1;

                return (
                  <div key={step.id} className="relative">
                    {/* Connector Line */}
                    {!isLast && (
                      <div
                        className={`absolute left-6 top-12 w-0.5 h-12 ${
                          step.completed ? 'bg-green-500' : 'bg-gray-300'
                        }`}
                      ></div>
                    )}

                    {/* Step Card */}
                    <div
                      className={`flex gap-4 p-4 rounded-lg border ${
                        step.completed
                          ? 'bg-green-50 border-green-200'
                          : 'bg-white border-gray-200'
                      }`}
                    >
                      {/* Icon */}
                      <div className="flex-shrink-0">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            step.completed
                              ? 'bg-green-500'
                              : 'bg-gray-200'
                          }`}
                        >
                          <Icon
                            className={`h-6 w-6 ${
                              step.completed
                                ? 'text-white'
                                : 'text-gray-600 animate-pulse'
                            }`}
                          />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 pt-1">
                        <h3 className="font-bold text-gray-900">{step.title}</h3>
                        <p className="text-sm text-gray-600">{step.description}</p>
                        {step.completedAt && (
                          <p className="text-xs text-green-600 font-medium mt-1">
                            ✓ Completed at {step.completedAt}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Real-time Update Notice */}
            {booking.isLiveUpdate && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-900">Live Updates Enabled</p>
                  <p className="text-xs text-blue-800 mt-1">
                    Status updates automatically as provider progresses through service steps
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Provider Info Sidebar */}
          <div className="space-y-4">
            {/* Provider Card */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
              <h3 className="font-bold text-gray-900">Service Provider</h3>

              <div className="space-y-4">
                {/* Provider Name & Rating */}
                <div>
                  <p className="text-sm text-gray-600 mb-1">Provider</p>
                  <p className="font-medium text-gray-900">{booking.providerName}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <svg
                          key={i}
                          className={`w-3 h-3 ${
                            i <= Math.round(booking.providerRating)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm font-medium text-gray-700 ml-1">
                      {booking.providerRating}
                    </span>
                  </div>
                </div>

                {/* Contact Buttons */}
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2">
                  <Phone className="h-4 w-4" />
                  Call Provider
                </Button>

                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2"
                >
                  <MessageCircle className="h-4 w-4" />
                  Message
                </Button>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200"></div>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <p className="text-sm text-gray-700">{booking.providerPhone}</p>
                </div>
              </div>
            </div>

            {/* Next Actions */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-3">
              <h3 className="font-bold text-gray-900 text-sm">What Happens Next?</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-0.5">1.</span>
                  <span>Provider completes each service step</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-0.5">2.</span>
                  <span>Status updates in real-time</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-0.5">3.</span>
                  <span>You'll receive notifications</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-0.5">4.</span>
                  <span>Rate the service when completed</span>
                </li>
              </ul>
            </div>

            {/* Rate Service Button */}
            {completedCount === booking.steps.length && (
              <Button
                onClick={() => router.push('/rate-service')}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                Rate Service
              </Button>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
