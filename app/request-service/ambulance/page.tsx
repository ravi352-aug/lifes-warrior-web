'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, CheckCircle, AlertCircle, Ambulance } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MainLayout } from '@/components/shared/Navigation';
import { currentUser } from '@/lib/mockData';

interface AmbulanceRequest {
  emergencyType: string;
  patientCondition: string;
  pickupLocation: string;
  destination: string;
  pickupDate: string;
  pickupTime: string;
  notes: string;
}

const emergencyTypes = [
  'Critical - Immediate',
  'Urgent - Within 30 minutes',
  'Non-urgent - Within 2 hours',
  'Hospital Transfer',
];

export default function AmbulanceRequestPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [request, setRequest] = useState<AmbulanceRequest>({
    emergencyType: '',
    patientCondition: '',
    pickupLocation: 'Sector 5, Faridabad',
    destination: '',
    pickupDate: '',
    pickupTime: '',
    notes: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleNext = () => {
    setErrors({});

    if (step === 1) {
      if (!request.emergencyType) {
        setErrors({ emergencyType: 'Please select emergency type' });
        return;
      }
      if (!request.patientCondition.trim()) {
        setErrors({ patientCondition: 'Please describe patient condition' });
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!request.destination.trim()) {
        setErrors({ destination: 'Please enter destination' });
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
        router.push(`/compare-quotations/ambulance-001`);
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
            <h2 className="text-2xl font-bold text-gray-900">Ambulance Request Submitted!</h2>
            <p className="text-gray-600">Ambulances in your area are being notified. Quotations will appear shortly...</p>
          </div>
          <div className="flex justify-center">
            <div className="animate-spin h-6 w-6 border-2 border-red-600 border-t-transparent rounded-full"></div>
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
            className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
          <div className="flex items-center gap-3 mb-2">
            <Ambulance className="h-8 w-8 text-red-600" />
            <h1 className="text-3xl font-bold text-gray-900">Request Ambulance</h1>
          </div>
          <p className="mt-2 text-gray-600">Get emergency or non-emergency ambulance service</p>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-between">
          {[1, 2, 3].map((stepNum) => (
            <div key={stepNum} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  stepNum <= step
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {stepNum}
              </div>
              {stepNum < 3 && (
                <div
                  className={`w-20 h-1 mx-2 ${
                    stepNum < step ? 'bg-red-600' : 'bg-gray-200'
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>

        {/* Step 1 */}
        {step === 1 && (
          <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
            <h2 className="text-xl font-bold text-gray-900">Step 1: Emergency Details</h2>

            <div className="space-y-4">
              <div>
                <Label className="font-medium text-gray-700">Emergency Type</Label>
                <div className="space-y-2 mt-3">
                  {emergencyTypes.map((type) => (
                    <label key={type} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-red-50">
                      <input
                        type="radio"
                        name="emergencyType"
                        value={type}
                        checked={request.emergencyType === type}
                        onChange={(e) => setRequest((prev) => ({ ...prev, emergencyType: e.target.value }))}
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-gray-700">{type}</span>
                    </label>
                  ))}
                </div>
                {errors.emergencyType && (
                  <p className="text-red-600 text-sm mt-2">{errors.emergencyType}</p>
                )}
              </div>

              <div>
                <Label className="font-medium text-gray-700">Patient Condition</Label>
                <textarea
                  value={request.patientCondition}
                  onChange={(e) => setRequest((prev) => ({ ...prev, patientCondition: e.target.value }))}
                  placeholder="Describe patient's medical condition briefly"
                  className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 resize-none h-24"
                />
                {errors.patientCondition && (
                  <p className="text-red-600 text-sm mt-1">{errors.patientCondition}</p>
                )}
              </div>
            </div>

            <Button onClick={handleNext} className="w-full bg-red-600 hover:bg-red-700">
              Continue
            </Button>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
            <h2 className="text-xl font-bold text-gray-900">Step 2: Location & Route</h2>

            <div className="space-y-4">
              <div>
                <Label className="font-medium text-gray-700">Pickup Location</Label>
                <Input
                  value={request.pickupLocation}
                  onChange={(e) => setRequest((prev) => ({ ...prev, pickupLocation: e.target.value }))}
                  className="mt-2"
                />
              </div>

              <div>
                <Label className="font-medium text-gray-700">Destination</Label>
                <Input
                  value={request.destination}
                  onChange={(e) => setRequest((prev) => ({ ...prev, destination: e.target.value }))}
                  placeholder="Hospital name or address"
                  className="mt-2"
                />
                {errors.destination && (
                  <p className="text-red-600 text-sm mt-1">{errors.destination}</p>
                )}
              </div>

              <div>
                <Label className="font-medium text-gray-700">Additional Notes</Label>
                <textarea
                  value={request.notes}
                  onChange={(e) => setRequest((prev) => ({ ...prev, notes: e.target.value }))}
                  placeholder="E.g., patient allergies, special equipment needed, contact person"
                  className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 resize-none h-20"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                Back
              </Button>
              <Button onClick={handleNext} className="flex-1 bg-red-600 hover:bg-red-700">
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
                <p className="text-sm text-gray-600 font-medium">Emergency Type</p>
                <p className="text-sm text-gray-900 mt-1">{request.emergencyType}</p>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <p className="text-sm text-gray-600 font-medium">Patient Condition</p>
                <p className="text-sm text-gray-900 mt-1">{request.patientCondition}</p>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <p className="text-sm text-gray-600 font-medium">Route</p>
                <p className="text-sm text-gray-900">
                  <strong>From:</strong> {request.pickupLocation}
                </p>
                <p className="text-sm text-gray-900">
                  <strong>To:</strong> {request.destination}
                </p>
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-sm text-red-900">
                Your ambulance request will be sent to all available ambulances in your area. Choose the one that best meets your needs.
              </p>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                Back
              </Button>
              <Button onClick={handleSubmit} disabled={loading} className="flex-1 bg-red-600 hover:bg-red-700">
                {loading ? 'Submitting...' : 'Submit Request'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
