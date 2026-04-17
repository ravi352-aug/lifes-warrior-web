'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ProviderOnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    clinicName: '',
    clinicAddress: '',
    operatingHours: '',
    servicesOffered: [] as string[],
    documents: [],
  });

  const serviceOptions = ['Lab Tests', 'Medicine', 'Ambulance', 'Caregiver'];

  const toggleService = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      servicesOffered: prev.servicesOffered.includes(service)
        ? prev.servicesOffered.filter((s) => s !== service)
        : [...prev.servicesOffered, service],
    }));
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const handleComplete = () => {
    setLoading(true);
    setTimeout(() => {
      router.push('/provider/dashboard');
    }, 1500);
  };

  const completionSteps = [
    { num: 1, title: 'Clinic Details', desc: 'Add your clinic information' },
    { num: 2, title: 'Services', desc: 'Select services you offer' },
    { num: 3, title: 'Schedule', desc: 'Set your working hours' },
    { num: 4, title: 'Verification', desc: 'Complete and submit' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Complete Your Profile</h1>
          <p className="text-gray-600 mt-2">Step {step} of 4</p>
        </div>

        {/* Progress */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {completionSteps.map((s) => (
            <div key={s.num} className="text-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mx-auto mb-2 transition-all ${
                  s.num <= step
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {s.num < step ? <CheckCircle2 className="h-5 w-5" /> : s.num}
              </div>
              <p className="text-xs font-medium text-gray-900">{s.title}</p>
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
          {/* Step 1: Clinic Details */}
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900">Clinic Information</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Clinic/Business Name
                </label>
                <input
                  type="text"
                  placeholder="Health Plus Clinic"
                  value={formData.clinicName}
                  onChange={(e) =>
                    setFormData({ ...formData, clinicName: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <textarea
                  placeholder="Clinic address"
                  value={formData.clinicAddress}
                  onChange={(e) =>
                    setFormData({ ...formData, clinicAddress: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none h-24"
                />
              </div>
            </div>
          )}

          {/* Step 2: Services */}
          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900">Services You Offer</h2>
              <div className="grid grid-cols-2 gap-3">
                {serviceOptions.map((service) => (
                  <button
                    key={service}
                    onClick={() => toggleService(service)}
                    className={`p-4 rounded-lg border-2 transition-all text-center font-medium ${
                      formData.servicesOffered.includes(service)
                        ? 'border-blue-600 bg-blue-50 text-blue-900'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {service}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Schedule */}
          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900">Operating Hours</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Working Hours
                </label>
                <input
                  type="text"
                  placeholder="e.g., 9:00 AM - 6:00 PM"
                  value={formData.operatingHours}
                  onChange={(e) =>
                    setFormData({ ...formData, operatingHours: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div className="bg-blue-50 rounded-lg p-4 space-y-2">
                <p className="font-medium text-gray-900">You can update these later</p>
                <p className="text-sm text-gray-600">Schedule specific hours for each day</p>
              </div>
            </div>
          )}

          {/* Step 4: Verification */}
          {step === 4 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900">Ready to Go!</h2>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 space-y-2">
                <CheckCircle2 className="h-8 w-8 text-green-600 mb-2" />
                <p className="font-medium text-green-900">Your profile is complete</p>
                <p className="text-sm text-green-800">
                  You're all set to start accepting requests and growing your business.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium text-gray-900">Next Steps:</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    View incoming service requests
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    Accept or decline requests
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    Update service status in real-time
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    Get customer reviews and ratings
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-2 pt-4 border-t border-gray-200">
            {step > 1 && (
              <Button
                onClick={() => setStep(step - 1)}
                variant="outline"
                className="flex-1"
              >
                Back
              </Button>
            )}
            {step < 4 ? (
              <Button
                onClick={handleNext}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2"
              >
                Next <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={handleComplete}
                disabled={loading}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              >
                {loading ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                    Starting...
                  </>
                ) : (
                  'Go to Dashboard'
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
