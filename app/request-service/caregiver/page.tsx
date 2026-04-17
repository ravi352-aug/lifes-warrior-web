'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, CheckCircle, AlertCircle, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MainLayout } from '@/components/shared/Navigation';
import { currentUser } from '@/lib/mockData';

interface CaregiverRequest {
  careType: string;
  duration: string;
  durationValue: string;
  startDate: string;
  patientAge: string;
  specialNeeds: string;
  address: string;
}

const careTypes = ['Nurse', 'Attendant', 'Companion', 'Post-Surgery Care'];
const durations = ['Hourly', 'Daily (8 hours)', 'Daily (24 hours)', 'Weekly', 'Monthly'];

export default function CaregiverRequestPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [request, setRequest] = useState<CaregiverRequest>({
    careType: '',
    duration: '',
    durationValue: '',
    startDate: '',
    patientAge: '',
    specialNeeds: '',
    address: 'Sector 5, Faridabad',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleNext = () => {
    setErrors({});

    if (step === 1) {
      if (!request.careType) {
        setErrors({ careType: 'Please select caregiver type' });
        return;
      }
      if (!request.duration) {
        setErrors({ duration: 'Please select duration' });
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!request.startDate) {
        setErrors({ startDate: 'Please select start date' });
        return;
      }
      if (!request.patientAge.trim()) {
        setErrors({ patientAge: 'Please enter patient age' });
        return;
      }
      setStep(3);
    }
  };

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setSuccess(true);
      setTimeout(() => {
        router.push(`/compare-quotations/caregiver-001`);
      }, 2000);
    }, 1500);
  };

  if (success) {
    return (
      <MainLayout
        headerProps={{
          userName: currentUser.name,
          userAvatar: currentUser.avatar,
        }}
      >
        <div className="space-y-6 px-4 py-4 max-w-2xl mx-auto">
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-gray-900">Caregiver Request Submitted!</h2>
            <p className="text-gray-600">Verified caregivers in your area are being notified. Quotations will appear shortly...</p>
          </div>
          <div className="flex justify-center">
            <div className="animate-spin h-6 w-6 border-2 border-green-600 border-t-transparent rounded-full"></div>
          </div>
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
      <div className="space-y-6 px-4 py-4 max-w-2xl mx-auto">
        <div>
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
          <div className="flex items-center gap-3 mb-2">
            <Users className="h-8 w-8 text-green-600" />
            <h1 className="text-3xl font-bold text-gray-900">Book a Caregiver</h1>
          </div>
          <p className="mt-2 text-gray-600">Find professional caregivers for home care services</p>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-between">
          {[1, 2, 3].map((stepNum) => (
            <div key={stepNum} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  stepNum <= step
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {stepNum}
              </div>
              {stepNum < 3 && (
                <div
                  className={`w-20 h-1 mx-2 ${
                    stepNum < step ? 'bg-green-600' : 'bg-gray-200'
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>

        {/* Step 1 */}
        {step === 1 && (
          <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
            <h2 className="text-xl font-bold text-gray-900">Step 1: Select Caregiver Type</h2>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 font-medium mb-3">Caregiver Type:</p>
                <div className="space-y-2">
                  {careTypes.map((type) => (
                    <label key={type} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-green-50">
                      <input
                        type="radio"
                        name="careType"
                        value={type}
                        checked={request.careType === type}
                        onChange={(e) => setRequest((prev) => ({ ...prev, careType: e.target.value }))}
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-gray-700">{type}</span>
                    </label>
                  ))}
                </div>
                {errors.careType && (
                  <p className="text-red-600 text-sm mt-2">{errors.careType}</p>
                )}
              </div>

              <div className="border-t border-gray-200 pt-4">
                <p className="text-sm text-gray-600 font-medium mb-3">Duration Required:</p>
                <div className="space-y-2">
                  {durations.map((dur) => (
                    <label key={dur} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-green-50">
                      <input
                        type="radio"
                        name="duration"
                        value={dur}
                        checked={request.duration === dur}
                        onChange={(e) => setRequest((prev) => ({ ...prev, duration: e.target.value }))}
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-gray-700">{dur}</span>
                    </label>
                  ))}
                </div>
                {errors.duration && (
                  <p className="text-red-600 text-sm mt-2">{errors.duration}</p>
                )}
              </div>
            </div>

            <Button onClick={handleNext} className="w-full bg-green-600 hover:bg-green-700">
              Continue
            </Button>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
            <h2 className="text-xl font-bold text-gray-900">Step 2: Patient & Schedule Details</h2>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-medium text-gray-700">Start Date</Label>
                  <Input
                    type="date"
                    value={request.startDate}
                    onChange={(e) => setRequest((prev) => ({ ...prev, startDate: e.target.value }))}
                    min={new Date().toISOString().split('T')[0]}
                    className="mt-2"
                  />
                  {errors.startDate && (
                    <p className="text-red-600 text-xs mt-1">{errors.startDate}</p>
                  )}
                </div>

                <div>
                  <Label className="font-medium text-gray-700">Patient Age</Label>
                  <Input
                    type="number"
                    value={request.patientAge}
                    onChange={(e) => setRequest((prev) => ({ ...prev, patientAge: e.target.value }))}
                    placeholder="E.g., 65"
                    min="1"
                    className="mt-2"
                  />
                  {errors.patientAge && (
                    <p className="text-red-600 text-xs mt-1">{errors.patientAge}</p>
                  )}
                </div>
              </div>

              <div>
                <Label className="font-medium text-gray-700">Service Address</Label>
                <textarea
                  value={request.address}
                  onChange={(e) => setRequest((prev) => ({ ...prev, address: e.target.value }))}
                  className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none h-20"
                />
              </div>

              <div>
                <Label className="font-medium text-gray-700">Special Needs/Medical Conditions</Label>
                <textarea
                  value={request.specialNeeds}
                  onChange={(e) => setRequest((prev) => ({ ...prev, specialNeeds: e.target.value }))}
                  placeholder="E.g., diabetes, mobility issues, dementia care required"
                  className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none h-20"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                Back
              </Button>
              <Button onClick={handleNext} className="flex-1 bg-green-600 hover:bg-green-700">
                Review
              </Button>
            </div>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
            <h2 className="text-xl font-bold text-gray-900">Step 3: Review & Submit</h2>

            <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
              <div>
                <p className="text-sm text-gray-600 font-medium">Caregiver Type</p>
                <p className="text-sm text-gray-900 mt-1">{request.careType}</p>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <p className="text-sm text-gray-600 font-medium">Duration</p>
                <p className="text-sm text-gray-900 mt-1">{request.duration}</p>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <p className="text-sm text-gray-600 font-medium">Start Date</p>
                <p className="text-sm text-gray-900 mt-1">{request.startDate}</p>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <p className="text-sm text-gray-600 font-medium">Patient Age</p>
                <p className="text-sm text-gray-900 mt-1">{request.patientAge} years</p>
              </div>

              {request.specialNeeds && (
                <div className="border-t border-gray-200 pt-4">
                  <p className="text-sm text-gray-600 font-medium">Special Needs</p>
                  <p className="text-sm text-gray-900 mt-1">{request.specialNeeds}</p>
                </div>
              )}
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <p className="text-sm text-green-900">
                Your caregiver request will be sent to verified caregivers in your area. Compare qualifications and rates to choose the best match.
              </p>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                Back
              </Button>
              <Button onClick={handleSubmit} disabled={loading} className="flex-1 bg-green-600 hover:bg-green-700">
                {loading ? 'Submitting...' : 'Submit Request'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
