'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  ArrowLeft,
  Save,
  Phone,
  MapPin,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MainLayout } from '@/components/shared/Navigation';

interface ServiceStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

interface ActiveBooking {
  requestId: string;
  serviceType: string;
  customerName: string;
  customerPhone: string;
  amount: number;
  location: string;
  steps: ServiceStep[];
}

const mockActiveBookings: Record<string, ActiveBooking> = {
  lab_001: {
    requestId: 'lab_001',
    serviceType: 'Lab Test Collection',
    customerName: 'Rajesh Kumar',
    customerPhone: '+91-9876543210',
    amount: 1200,
    location: 'Sector 5, Faridabad',
    steps: [
      {
        id: 'confirmed',
        title: 'Booking Confirmed',
        description: 'Booking confirmed with customer',
        completed: true,
      },
      {
        id: 'on_way',
        title: 'On the Way',
        description: 'Heading to customer location',
        completed: true,
      },
      {
        id: 'sample_collection',
        title: 'Sample Collection',
        description: 'Collecting blood sample from customer',
        completed: false,
      },
      {
        id: 'sample_transit',
        title: 'Sample in Transit',
        description: 'Transporting sample to lab',
        completed: false,
      },
      {
        id: 'testing',
        title: 'Testing in Progress',
        description: 'Lab analyzing sample',
        completed: false,
      },
      {
        id: 'report_ready',
        title: 'Report Ready',
        description: 'Report generated and ready',
        completed: false,
      },
    ],
  },
  medicine_001: {
    requestId: 'medicine_001',
    serviceType: 'Medicine Delivery',
    customerName: 'Priya Sharma',
    customerPhone: '+91-9876543211',
    amount: 450,
    location: 'Sector 3, Faridabad',
    steps: [
      {
        id: 'confirmed',
        title: 'Order Confirmed',
        description: 'Order confirmed with pharmacy',
        completed: true,
      },
      {
        id: 'prepared',
        title: 'Order Prepared',
        description: 'Medicines prepared by pharmacist',
        completed: true,
      },
      {
        id: 'dispatched',
        title: 'Dispatched',
        description: 'Order dispatched for delivery',
        completed: true,
      },
      {
        id: 'on_way',
        title: 'On the Way',
        description: 'Delivery agent heading to customer',
        completed: false,
      },
      {
        id: 'delivered',
        title: 'Delivered',
        description: 'Medicines delivered to customer',
        completed: false,
      },
    ],
  },
  ambulance_001: {
    requestId: 'ambulance_001',
    serviceType: 'Ambulance Service',
    customerName: 'Dr. Desai',
    customerPhone: '+91-9876543212',
    amount: 500,
    location: 'Sector 7, Faridabad',
    steps: [
      {
        id: 'confirmed',
        title: 'Ambulance Confirmed',
        description: 'Ambulance service confirmed',
        completed: true,
      },
      {
        id: 'dispatched',
        title: 'Dispatched',
        description: 'Ambulance dispatched to location',
        completed: true,
      },
      {
        id: 'on_way',
        title: 'On the Way',
        description: 'Ambulance heading to pickup',
        completed: false,
      },
      {
        id: 'arrived',
        title: 'Arrived at Pickup',
        description: 'Ambulance arrived at customer location',
        completed: false,
      },
      {
        id: 'in_transit',
        title: 'In Transit to Hospital',
        description: 'Patient being transported',
        completed: false,
      },
    ],
  },
};

export default function ProviderStatusManagementPage() {
  const params = useParams();
  const router = useRouter();
  const requestId = params.requestId as string;

  const [booking, setBooking] = useState<ActiveBooking | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    const bookingData = mockActiveBookings[requestId] || mockActiveBookings.lab_001;
    setBooking(bookingData);
  }, [requestId]);

  const handleStepToggle = (stepId: string) => {
    if (!booking) return;

    setBooking((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        steps: prev.steps.map((step) =>
          step.id === stepId ? { ...step, completed: !step.completed } : step
        ),
      };
    });
  };

  const handleSaveProgress = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1200);
  };

  if (!booking) return null;

  const completedCount = booking.steps.filter((s) => s.completed).length;
  const progressPercentage = (completedCount / booking.steps.length) * 100;

  return (
    <MainLayout
      headerProps={{
        userName: 'Dr. Sharma (Provider)',
        userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=provider',
      }}
    >
      <div className="space-y-6 px-4 py-4 max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </button>

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Update Service Status</h1>
          <p className="mt-1 text-gray-600">Mark service steps as completed</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Service Info Card */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
              <h2 className="text-lg font-bold text-gray-900">{booking.serviceType}</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600 font-medium">Customer</p>
                  <p className="text-gray-900 font-semibold">{booking.customerName}</p>
                </div>
                <div>
                  <p className="text-gray-600 font-medium">Booking Amount</p>
                  <p className="text-green-600 font-bold text-lg">₹{booking.amount}</p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <p className="text-gray-600 text-sm">{booking.customerPhone}</p>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <p className="text-gray-600 text-sm">{booking.location}</p>
                </div>
              </div>
            </div>

            {/* Progress Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-gray-900">Service Progress</h3>
                <span className="text-2xl font-bold text-blue-600">
                  {completedCount}/{booking.steps.length}
                </span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-green-500 to-green-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>

              <p className="text-sm text-gray-600">
                {progressPercentage.toFixed(0)}% Complete
              </p>
            </div>

            {/* Steps Checklist */}
            <div className="space-y-3">
              <h3 className="font-bold text-gray-900 mb-4">Service Steps - Tick as You Complete</h3>

              {booking.steps.map((step, index) => (
                <div
                  key={step.id}
                  onClick={() => handleStepToggle(step.id)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    step.completed
                      ? 'bg-green-50 border-green-300'
                      : 'bg-white border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Checkbox */}
                    <div className="flex-shrink-0 pt-1">
                      <div
                        className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors ${
                          step.completed
                            ? 'bg-green-500 border-green-500'
                            : 'border-gray-300 hover:border-blue-500'
                        }`}
                      >
                        {step.completed && (
                          <CheckCircle2 className="h-5 w-5 text-white" />
                        )}
                      </div>
                    </div>

                    {/* Step Content */}
                    <div className="flex-1 min-w-0">
                      <div
                        className={`font-bold ${
                          step.completed ? 'text-green-700 line-through' : 'text-gray-900'
                        }`}
                      >
                        {index + 1}. {step.title}
                      </div>
                      <p
                        className={`text-sm mt-1 ${
                          step.completed ? 'text-green-600' : 'text-gray-600'
                        }`}
                      >
                        {step.description}
                      </p>
                    </div>

                    {/* Status Icon */}
                    <div className="flex-shrink-0">
                      {step.completed ? (
                        <div className="flex items-center gap-1 text-green-600">
                          <CheckCircle2 className="h-5 w-5" />
                          <span className="text-xs font-medium">Done</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-gray-400">
                          <Clock className="h-5 w-5" />
                          <span className="text-xs font-medium">Pending</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Save Success Message */}
            {saveSuccess && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-green-900">Status Updated</p>
                  <p className="text-xs text-green-800 mt-1">
                    Customer will receive live updates of service progress
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Instructions Card */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-3">
              <h4 className="font-bold text-blue-900">How It Works</h4>
              <ol className="text-sm text-blue-900 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-blue-600">1.</span>
                  <span>Click on each step as you complete it</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-blue-600">2.</span>
                  <span>The checkmark shows on your list</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-blue-600">3.</span>
                  <span>Click "Update Status" to save</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-blue-600">4.</span>
                  <span>Customer sees live updates instantly</span>
                </li>
              </ol>
            </div>

            {/* Stats Card */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-3">
              <h4 className="font-bold text-gray-900 text-sm">Progress Stats</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">Completed</span>
                  <span className="text-sm font-bold text-green-600">{completedCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">Remaining</span>
                  <span className="text-sm font-bold text-gray-600">
                    {booking.steps.length - completedCount}
                  </span>
                </div>
              </div>
            </div>

            {/* Important Notice */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-medium text-yellow-900">Important</p>
                <p className="text-xs text-yellow-800 mt-1">
                  Only mark steps as complete when you actually finish them. Honest updates build customer trust.
                </p>
              </div>
            </div>

            {/* Save Button */}
            <Button
              onClick={handleSaveProgress}
              disabled={saving}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-6"
            >
              {saving ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                  Updating...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Update Status
                </>
              )}
            </Button>

            {/* Complete Service Button */}
            {completedCount === booking.steps.length && (
              <Button
                onClick={() => router.push(`/provider/earnings`)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                Complete & Finish
              </Button>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
