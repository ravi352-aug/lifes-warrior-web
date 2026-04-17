'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Upload, CheckCircle, AlertCircle, Pill } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MainLayout } from '@/components/shared/Navigation';
import { currentUser } from '@/lib/mockData';

interface MedicineRequest {
  prescriptionFile: string | null;
  medicines: string;
  deliveryDate: string;
  deliveryTime: string;
  address: string;
  notes: string;
}

export default function MedicineRequestPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [request, setRequest] = useState<MedicineRequest>({
    prescriptionFile: null,
    medicines: '',
    deliveryDate: '',
    deliveryTime: '',
    address: 'Sector 5, Faridabad',
    notes: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

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
      if (!request.prescriptionFile && !request.medicines.trim()) {
        setErrors({ medicines: 'Upload prescription or enter medicine names' });
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!request.deliveryDate) {
        setErrors({ deliveryDate: 'Please select delivery date' });
        return;
      }
      if (!request.deliveryTime) {
        setErrors({ deliveryTime: 'Please select delivery time' });
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
        router.push(`/compare-quotations/medicine-001`);
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
            <h2 className="text-2xl font-bold text-gray-900">Medicine Request Submitted!</h2>
            <p className="text-gray-600">Nearby pharmacies are being notified. Quotations will appear shortly...</p>
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
        <div>
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
          <div className="flex items-center gap-3 mb-2">
            <Pill className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Order Medicines</h1>
          </div>
          <p className="mt-2 text-gray-600">Get medicines delivered from nearby pharmacies</p>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-between">
          {[1, 2, 3].map((stepNum) => (
            <div key={stepNum} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  stepNum <= step
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {stepNum}
              </div>
              {stepNum < 3 && (
                <div
                  className={`w-20 h-1 mx-2 ${
                    stepNum < step ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>

        {/* Step 1 */}
        {step === 1 && (
          <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
            <h2 className="text-xl font-bold text-gray-900">Step 1: Add Medicines</h2>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 font-medium mb-3">Upload Prescription:</p>
                <label className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-blue-300 rounded-lg cursor-pointer hover:bg-blue-50">
                  <Upload className="h-5 w-5 text-blue-600" />
                  <span className="text-sm text-gray-700">
                    {request.prescriptionFile ? `Uploaded: ${request.prescriptionFile}` : 'Upload prescription (PDF/JPG)'}
                  </span>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="text-center text-gray-500 text-sm">OR</div>

              <div>
                <Label className="font-medium text-gray-700">Enter Medicine Names</Label>
                <textarea
                  value={request.medicines}
                  onChange={(e) => setRequest((prev) => ({ ...prev, medicines: e.target.value }))}
                  placeholder="Enter medicine names and dosages&#10;e.g., Amoxicillin 500mg - 1 tablet twice daily&#10;Cough Syrup - 2 teaspoons thrice daily"
                  className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-24"
                />
              </div>

              {errors.medicines && (
                <div className="flex items-center gap-2 text-red-600 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  {errors.medicines}
                </div>
              )}
            </div>

            <Button onClick={handleNext} className="w-full bg-blue-600 hover:bg-blue-700">
              Continue
            </Button>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
            <h2 className="text-xl font-bold text-gray-900">Step 2: Schedule Delivery</h2>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-medium text-gray-700">Delivery Date</Label>
                  <Input
                    type="date"
                    value={request.deliveryDate}
                    onChange={(e) => setRequest((prev) => ({ ...prev, deliveryDate: e.target.value }))}
                    min={new Date().toISOString().split('T')[0]}
                    className="mt-2"
                  />
                  {errors.deliveryDate && <p className="text-red-600 text-xs mt-1">{errors.deliveryDate}</p>}
                </div>

                <div>
                  <Label className="font-medium text-gray-700">Delivery Time Window</Label>
                  <select
                    value={request.deliveryTime}
                    onChange={(e) => setRequest((prev) => ({ ...prev, deliveryTime: e.target.value }))}
                    className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select time</option>
                    <option value="8-10">8:00 AM - 10:00 AM</option>
                    <option value="10-12">10:00 AM - 12:00 PM</option>
                    <option value="12-14">12:00 PM - 2:00 PM</option>
                    <option value="14-16">2:00 PM - 4:00 PM</option>
                    <option value="16-18">4:00 PM - 6:00 PM</option>
                  </select>
                  {errors.deliveryTime && <p className="text-red-600 text-xs mt-1">{errors.deliveryTime}</p>}
                </div>
              </div>

              <div>
                <Label className="font-medium text-gray-700">Delivery Address</Label>
                <textarea
                  value={request.address}
                  onChange={(e) => setRequest((prev) => ({ ...prev, address: e.target.value }))}
                  className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-20"
                />
              </div>

              <div>
                <Label className="font-medium text-gray-700">Additional Notes</Label>
                <textarea
                  value={request.notes}
                  onChange={(e) => setRequest((prev) => ({ ...prev, notes: e.target.value }))}
                  placeholder="E.g., allergies, preferences, special instructions"
                  className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-20"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                Back
              </Button>
              <Button onClick={handleNext} className="flex-1 bg-blue-600 hover:bg-blue-700">
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
                <p className="text-sm text-gray-600 font-medium">Medicines</p>
                <p className="text-sm text-gray-900 mt-1">
                  {request.prescriptionFile ? `Prescription: ${request.prescriptionFile}` : request.medicines}
                </p>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <p className="text-sm text-gray-600 font-medium">Delivery Details</p>
                <p className="text-sm text-gray-900">
                  <strong>Date:</strong> {request.deliveryDate}
                </p>
                <p className="text-sm text-gray-900">
                  <strong>Time:</strong> {request.deliveryTime}
                </p>
                <p className="text-sm text-gray-900">
                  <strong>Address:</strong> {request.address}
                </p>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-sm text-blue-900">
                Pharmacies near you will receive this request and send quotations with prices. Compare and choose your preferred pharmacy.
              </p>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                Back
              </Button>
              <Button onClick={handleSubmit} disabled={loading} className="flex-1 bg-blue-600 hover:bg-blue-700">
                {loading ? 'Submitting...' : 'Submit Request'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
