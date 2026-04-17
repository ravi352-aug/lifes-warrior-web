'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Upload, CheckCircle, AlertCircle, Beaker } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MainLayout } from '@/components/shared/Navigation';
import { currentUser } from '@/lib/mockData';
import { useAuth } from '@/lib/hooks/useAuth';

interface LabTestRequest {
  tests: string[];
  prescriptionFile: string | null;
  collectionDate: string;
  collectionTime: string;
  collectionType: 'home' | 'clinic';
  address: string;
  notes: string;
}

const availableTests = [
  'Complete Blood Count (CBC)',
  'Blood Sugar Test',
  'Thyroid Profile (TSH)',
  'Lipid Profile',
  'Liver Function Test',
  'Kidney Function Test',
  'COVID-19 RT-PCR',
  'Typhoid Test',
  'Malaria Test',
];

export default function LabTestRequestPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [request, setRequest] = useState<LabTestRequest>({
    tests: [],
    prescriptionFile: null,
    collectionDate: '',
    collectionTime: '',
    collectionType: 'home',
    address: 'Sector 5, Faridabad',
    notes: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleToggleTest = (test: string) => {
    setRequest((prev) => ({
      ...prev,
      tests: prev.tests.includes(test)
        ? prev.tests.filter((t) => t !== test)
        : [...prev.tests, test],
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setRequest((prev) => ({
        ...prev,
        prescriptionFile: file.name,
      }));
    }
  };

  const handleNext = () => {
    setErrors({});

    if (step === 1) {
      if (request.tests.length === 0 && !request.prescriptionFile) {
        setErrors({ tests: 'Select at least one test or upload a prescription' });
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!request.collectionDate) {
        setErrors({ collectionDate: 'Please select collection date' });
        return;
      }
      if (!request.collectionTime) {
        setErrors({ collectionTime: 'Please select collection time' });
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
        router.push(`/compare-quotations/lab-test-001`);
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
            <h2 className="text-2xl font-bold text-gray-900">Lab Request Submitted!</h2>
            <p className="text-gray-600">
              Your lab test request has been sent to nearby labs. You will see quotations in a moment...
            </p>
          </div>

          <div className="flex justify-center">
            <div className="animate-spin h-6 w-6 border-2 border-blue-600 border-t-transparent rounded-full"></div>
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
        {/* Header */}
        <div>
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
          <div className="flex items-center gap-3 mb-2">
            <Beaker className="h-8 w-8 text-purple-600" />
            <h1 className="text-3xl font-bold text-gray-900">Book Lab Tests</h1>
          </div>
          <p className="mt-2 text-gray-600">Request lab tests and get quotations from nearby labs</p>
        </div>

        {/* Progress Indicators */}
        <div className="flex items-center justify-between">
          {[1, 2, 3].map((stepNum) => (
            <div key={stepNum} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  stepNum <= step
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {stepNum}
              </div>
              {stepNum < 3 && (
                <div
                  className={`w-20 h-1 mx-2 ${
                    stepNum < step ? 'bg-purple-600' : 'bg-gray-200'
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Select Tests */}
        {step === 1 && (
          <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
            <h2 className="text-xl font-bold text-gray-900">Step 1: Select Tests</h2>

            <div className="space-y-3">
              <p className="text-sm text-gray-600 font-medium">Select tests you need:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {availableTests.map((test) => (
                  <label
                    key={test}
                    className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-purple-50"
                  >
                    <input
                      type="checkbox"
                      checked={request.tests.includes(test)}
                      onChange={() => handleToggleTest(test)}
                      className="w-4 h-4 text-purple-600 rounded"
                    />
                    <span className="text-sm text-gray-700">{test}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <p className="text-sm text-gray-600 font-medium mb-3">Or upload prescription:</p>
              <label className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-purple-300 rounded-lg cursor-pointer hover:bg-purple-50">
                <Upload className="h-5 w-5 text-purple-600" />
                <span className="text-sm text-gray-700">
                  {request.prescriptionFile ? `Uploaded: ${request.prescriptionFile}` : 'Upload prescription image (PDF/JPG)'}
                </span>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            {errors.tests && (
              <div className="flex items-center gap-2 text-red-600 text-sm">
                <AlertCircle className="h-4 w-4" />
                {errors.tests}
              </div>
            )}

            <Button onClick={handleNext} className="w-full bg-purple-600 hover:bg-purple-700">
              Continue
            </Button>
          </div>
        )}

        {/* Step 2: Schedule Collection */}
        {step === 2 && (
          <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
            <h2 className="text-xl font-bold text-gray-900">Step 2: Schedule Collection</h2>

            <div className="space-y-4">
              <div>
                <Label className="font-medium text-gray-700">Collection Type</Label>
                <div className="flex gap-4 mt-3">
                  {['home', 'clinic'].map((type) => (
                    <label
                      key={type}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="collectionType"
                        value={type}
                        checked={request.collectionType === type}
                        onChange={(e) =>
                          setRequest((prev) => ({
                            ...prev,
                            collectionType: e.target.value as 'home' | 'clinic',
                          }))
                        }
                        className="w-4 h-4"
                      />
                      <span className="text-gray-700 capitalize">{type === 'home' ? 'Home Collection' : 'Visit Clinic'}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-medium text-gray-700">Preferred Date</Label>
                  <Input
                    type="date"
                    value={request.collectionDate}
                    onChange={(e) =>
                      setRequest((prev) => ({
                        ...prev,
                        collectionDate: e.target.value,
                      }))
                    }
                    min={new Date().toISOString().split('T')[0]}
                    className="mt-2"
                  />
                  {errors.collectionDate && (
                    <p className="text-red-600 text-xs mt-1">{errors.collectionDate}</p>
                  )}
                </div>

                <div>
                  <Label className="font-medium text-gray-700">Preferred Time</Label>
                  <Input
                    type="time"
                    value={request.collectionTime}
                    onChange={(e) =>
                      setRequest((prev) => ({
                        ...prev,
                        collectionTime: e.target.value,
                      }))
                    }
                    className="mt-2"
                  />
                  {errors.collectionTime && (
                    <p className="text-red-600 text-xs mt-1">{errors.collectionTime}</p>
                  )}
                </div>
              </div>

              {request.collectionType === 'home' && (
                <div>
                  <Label className="font-medium text-gray-700">Collection Address</Label>
                  <textarea
                    value={request.address}
                    onChange={(e) =>
                      setRequest((prev) => ({
                        ...prev,
                        address: e.target.value,
                      }))
                    }
                    className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none h-20"
                  />
                </div>
              )}

              <div>
                <Label className="font-medium text-gray-700">Additional Notes</Label>
                <textarea
                  value={request.notes}
                  onChange={(e) =>
                    setRequest((prev) => ({
                      ...prev,
                      notes: e.target.value,
                    }))
                  }
                  placeholder="E.g., I am diabetic, fasting required, etc."
                  className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none h-20"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setStep(1)}
                className="flex-1"
              >
                Back
              </Button>
              <Button
                onClick={handleNext}
                className="flex-1 bg-purple-600 hover:bg-purple-700"
              >
                Review
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Review & Submit */}
        {step === 3 && (
          <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
            <h2 className="text-xl font-bold text-gray-900">Step 3: Review & Submit</h2>

            <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
              <div>
                <p className="text-sm text-gray-600 font-medium">Tests Selected</p>
                <div className="mt-2 space-y-1">
                  {request.tests.map((test) => (
                    <p key={test} className="text-sm text-gray-900">• {test}</p>
                  ))}
                </div>
                {request.prescriptionFile && (
                  <p className="text-sm text-gray-900 mt-2">• Prescription: {request.prescriptionFile}</p>
                )}
              </div>

              <div className="border-t border-gray-200 pt-4">
                <p className="text-sm text-gray-600 font-medium">Collection Details</p>
                <p className="text-sm text-gray-900 mt-1">
                  <strong>Type:</strong> {request.collectionType === 'home' ? 'Home Collection' : 'Visit Clinic'}
                </p>
                <p className="text-sm text-gray-900">
                  <strong>Date & Time:</strong> {request.collectionDate} at {request.collectionTime}
                </p>
                {request.collectionType === 'home' && (
                  <p className="text-sm text-gray-900">
                    <strong>Address:</strong> {request.address}
                  </p>
                )}
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-sm text-blue-900">
                After submission, nearby labs will receive your request and send quotations. You can view all quotes and book with your preferred lab.
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setStep(2)}
                className="flex-1"
              >
                Back
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1 bg-purple-600 hover:bg-purple-700"
              >
                {loading ? 'Submitting...' : 'Submit Request'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
