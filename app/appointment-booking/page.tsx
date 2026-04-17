'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronRight, Calendar, User, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MainLayout } from '@/components/shared/Navigation';
import { currentUser, doctors } from '@/lib/mockData';
import { useAuth } from '@/lib/hooks/useAuth';

type Step = 1 | 2 | 3 | 4 | 5;

interface AppointmentRequest {
  step: Step;
  doctorId: string | null;
  specialty: string;
  symptoms: string;
  preferredDate: string;
  preferredTime: string;
  assignedDate: string;
  assignedTime: string;
  status: 'REQUESTED' | 'TIME_ASSIGNED' | 'AWAITING_CONFIRMATION' | 'CONFIRMED' | 'IN_PROGRESS';
}

export default function AppointmentBookingPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [appointment, setAppointment] = useState<AppointmentRequest>({
    step: 1,
    doctorId: null,
    specialty: 'General',
    symptoms: '',
    preferredDate: '',
    preferredTime: '',
    assignedDate: '',
    assignedTime: '',
    status: 'REQUESTED',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleNext = () => {
    setErrors({});

    // Validation for Step 1
    if (appointment.step === 1) {
      if (!appointment.specialty.trim()) {
        setErrors({ specialty: 'Please select specialty' });
        return;
      }
      if (!appointment.symptoms.trim()) {
        setErrors({ symptoms: 'Please describe your symptoms' });
        return;
      }
    }

    // Validation for Step 2 - Simulate Admin Assignment
    if (appointment.step === 2) {
      setLoading(true);
      setTimeout(() => {
        setAppointment((prev) => ({
          ...prev,
          assignedDate: '2026-03-25',
          assignedTime: '10:30 AM',
          status: 'TIME_ASSIGNED',
          step: 3,
        }));
        setLoading(false);
      }, 1500);
      return;
    }

    // Move to next step
    if (appointment.step < 5) {
      setAppointment((prev) => ({
        ...prev,
        step: (prev.step + 1) as Step,
      }));
    }
  };

  const handleConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      setAppointment((prev) => ({
        ...prev,
        status: 'CONFIRMED',
        step: 5,
      }));
      setLoading(false);
    }, 1000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'REQUESTED':
        return 'bg-green-100 text-green-800';
      case 'TIME_ASSIGNED':
        return 'bg-yellow-100 text-yellow-800';
      case 'AWAITING_CONFIRMATION':
        return 'bg-yellow-100 text-yellow-800';
      case 'CONFIRMED':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

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
          <h1 className="text-3xl font-bold text-gray-900">Book Your Appointment</h1>
          <p className="mt-2 text-gray-600">Follow the steps to request and confirm your doctor consultation</p>
        </div>

        {/* Step Indicators */}
        <div className="flex items-center justify-between mb-8">
          {[1, 2, 3, 4, 5].map((stepNum) => (
            <div key={stepNum} className="flex flex-col items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white mb-2 ${
                  stepNum <= appointment.step ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                {stepNum}
              </div>
              <span className="text-xs text-gray-600 text-center">
                {stepNum === 1 && 'Request'}
                {stepNum === 2 && 'Assign Slot'}
                {stepNum === 3 && 'Notify'}
                {stepNum === 4 && 'Confirm'}
                {stepNum === 5 && 'Complete'}
              </span>
              {stepNum < 5 && (
                <div className="absolute w-12 h-0.5 bg-gray-300 mt-5 ml-16"></div>
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Request */}
        {appointment.step === 1 && (
          <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-green-700 font-bold">1</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Step 1: Submit Appointment Request</h2>
                <p className="text-sm text-gray-600">Share your symptoms and preferred consultation time</p>
              </div>
              <span className={`ml-auto px-3 py-1 rounded-full text-xs font-medium ${getStatusColor('REQUESTED')}`}>
                REQUESTED
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="font-medium text-gray-700">Specialty Needed</Label>
                <select
                  value={appointment.specialty}
                  onChange={(e) => setAppointment({ ...appointment, specialty: e.target.value })}
                  className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="General">General Medicine</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Dermatology">Dermatology</option>
                  <option value="Orthopedics">Orthopedics</option>
                  <option value="Pediatrics">Pediatrics</option>
                </select>
                {errors.specialty && <p className="text-red-600 text-sm mt-1">{errors.specialty}</p>}
              </div>

              <div>
                <Label className="font-medium text-gray-700">Describe Your Symptoms</Label>
                <textarea
                  value={appointment.symptoms}
                  onChange={(e) => setAppointment({ ...appointment, symptoms: e.target.value })}
                  placeholder="E.g., experiencing headaches and fever for 2 days"
                  className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-24"
                />
                {errors.symptoms && <p className="text-red-600 text-sm mt-1">{errors.symptoms}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-medium text-gray-700">Preferred Date</Label>
                  <Input
                    type="date"
                    value={appointment.preferredDate}
                    onChange={(e) => setAppointment({ ...appointment, preferredDate: e.target.value })}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label className="font-medium text-gray-700">Preferred Time</Label>
                  <Input
                    type="time"
                    value={appointment.preferredTime}
                    onChange={(e) => setAppointment({ ...appointment, preferredTime: e.target.value })}
                    className="mt-2"
                  />
                </div>
              </div>

              <Button onClick={handleNext} className="w-full bg-blue-600 hover:bg-blue-700 py-2">
                Continue <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Admin Assigns Time Slot */}
        {appointment.step === 2 && (
          <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b">
              <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                <span className="text-yellow-700 font-bold">2</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Step 2: Admin Assigns Time Slot</h2>
                <p className="text-sm text-gray-600">Doctor's schedule is being checked...</p>
              </div>
              <span className={`ml-auto px-3 py-1 rounded-full text-xs font-medium ${getStatusColor('TIME_ASSIGNED')}`}>
                ASSIGNING...
              </span>
            </div>

            <div className="flex flex-col items-center justify-center py-8 space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="text-gray-600 text-center">Finding available slot with doctor...</p>
              <p className="text-sm text-gray-500">This usually takes 1-2 minutes</p>
            </div>

            <Button onClick={handleNext} disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 py-2">
              {loading ? 'Checking availability...' : 'Manual Slot Assign (Demo)'}
            </Button>
          </div>
        )}

        {/* Step 3: User Receives Notification */}
        {appointment.step === 3 && (
          <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b">
              <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                <span className="text-yellow-700 font-bold">3</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Step 3: Slot Assigned - Awaiting Confirmation</h2>
                <p className="text-sm text-gray-600">Please review and confirm your appointment</p>
              </div>
              <span className={`ml-auto px-3 py-1 rounded-full text-xs font-medium ${getStatusColor('AWAITING_CONFIRMATION')}`}>
                AWAITING CONFIRMATION
              </span>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-3">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-900">Time slot assigned successfully!</p>
                  <p className="text-sm text-blue-800 mt-1">A slot has been reserved for you based on doctor availability</p>
                </div>
              </div>
            </div>

            <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-gray-600" />
                <div>
                  <p className="text-sm text-gray-600">Assigned Date & Time</p>
                  <p className="font-bold text-gray-900">{appointment.assignedDate} at {appointment.assignedTime}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-gray-600" />
                <div>
                  <p className="text-sm text-gray-600">Duration</p>
                  <p className="font-bold text-gray-900">30 minutes</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-gray-600" />
                <div>
                  <p className="text-sm text-gray-600">Consultation Type</p>
                  <p className="font-bold text-gray-900">Video Call</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setAppointment((prev) => ({ ...prev, step: 1 }))}
                className="flex-1"
              >
                Back
              </Button>
              <Button
                onClick={() => setAppointment((prev) => ({ ...prev, step: 4, status: 'AWAITING_CONFIRMATION' }))}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                Continue
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: User Confirms */}
        {appointment.step === 4 && (
          <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-green-700 font-bold">4</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Step 4: Confirm Your Appointment</h2>
                <p className="text-sm text-gray-600">Review details and confirm your booking</p>
              </div>
              <span className={`ml-auto px-3 py-1 rounded-full text-xs font-medium ${getStatusColor('AWAITING_CONFIRMATION')}`}>
                AWAITING CONFIRMATION
              </span>
            </div>

            <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
              <h3 className="font-bold text-gray-900">Appointment Summary</h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Specialty</p>
                  <p className="font-medium text-gray-900">{appointment.specialty}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Date & Time</p>
                  <p className="font-medium text-gray-900">{appointment.assignedDate} {appointment.assignedTime}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-600">Symptoms</p>
                  <p className="font-medium text-gray-900">{appointment.symptoms}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Consultation Fee</p>
                  <p className="font-bold text-blue-600">₹500</p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm text-green-800">
                By confirming, you acknowledge the appointment details and agree to the consultation terms.
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setAppointment((prev) => ({ ...prev, step: 3 }))}
                className="flex-1"
              >
                Back
              </Button>
              <Button
                onClick={handleConfirm}
                disabled={loading}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                {loading ? 'Confirming...' : 'Confirm Appointment'}
              </Button>
            </div>
          </div>
        )}

        {/* Step 5: Confirmation Complete */}
        {appointment.step === 5 && (
          <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-green-700 font-bold">5</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Step 5: Appointment Confirmed!</h2>
                <p className="text-sm text-gray-600">Your consultation is all set</p>
              </div>
              <span className={`ml-auto px-3 py-1 rounded-full text-xs font-medium ${getStatusColor('CONFIRMED')}`}>
                CONFIRMED
              </span>
            </div>

            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </div>

            <div className="text-center space-y-2">
              <h3 className="text-2xl font-bold text-gray-900">Appointment Confirmed</h3>
              <p className="text-gray-600">Your doctor consultation is confirmed for the assigned date and time</p>
            </div>

            <div className="space-y-4 bg-green-50 p-4 rounded-lg">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm text-green-700">Date & Time</p>
                  <p className="font-bold text-green-900">{appointment.assignedDate} at {appointment.assignedTime}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm text-green-700">Consultation Type</p>
                  <p className="font-bold text-green-900">Video Call</p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-yellow-800">
                  <strong>Join 5 minutes early.</strong> You will receive a confirmation email with video call link 1 hour before your appointment.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => router.push('/my-requests')}
                className="flex-1"
              >
                View My Appointments
              </Button>
              <Button
                onClick={() => router.push('/')}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                Back to Home
              </Button>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
