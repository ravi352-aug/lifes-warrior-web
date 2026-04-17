'use client';

import { useState } from 'react';
import { Upload, X, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface TestRequestFormProps {
  availableTests: string[];
  onSubmitRequest: (tests: string[], document?: string, date?: string) => void;
  loading?: boolean;
}

export function TestRequestForm({
  availableTests,
  onSubmitRequest,
  loading = false,
}: TestRequestFormProps) {
  const [selectedTests, setSelectedTests] = useState<string[]>([]);
  const [uploadedDocument, setUploadedDocument] = useState<string | null>(null);
  const [preferredDate, setPreferredDate] = useState('');
  const [useDocument, setUseDocument] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleTestToggle = (test: string) => {
    setSelectedTests((prev) =>
      prev.includes(test) ? prev.filter((t) => t !== test) : [...prev, test]
    );
    setError('');
  };

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('File size must be less than 5MB');
        return;
      }
      // Mock: store filename instead of actual file
      setUploadedDocument(file.name);
      setError('');
    }
  };

  const handleSubmit = () => {
    setError('');
    setSuccess('');

    if (!useDocument && selectedTests.length === 0) {
      setError('Please select at least one test or upload a document');
      return;
    }

    if (!preferredDate) {
      setError('Please select a preferred date');
      return;
    }

    if (useDocument && !uploadedDocument) {
      setError('Please upload a document');
      return;
    }

    onSubmitRequest(selectedTests, uploadedDocument || undefined, preferredDate);
    
    setSuccess('Request submitted! Nearby labs will send quotations shortly.');
    setTimeout(() => {
      setSelectedTests([]);
      setUploadedDocument(null);
      setPreferredDate('');
      setSuccess('');
    }, 3000);
  };

  return (
    <div className="w-full space-y-6">
      {/* Method Selection */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold text-gray-900">How would you like to request?</Label>
        <div className="flex gap-3">
          <button
            onClick={() => {
              setUseDocument(false);
              setUploadedDocument(null);
              setError('');
            }}
            className={`flex-1 rounded-lg border-2 p-3 text-center transition-all ${
              !useDocument
                ? 'border-blue-500 bg-blue-50 text-blue-900 font-medium'
                : 'border-gray-300 text-gray-700 hover:border-gray-400'
            }`}
          >
            Select Tests
          </button>
          <button
            onClick={() => {
              setUseDocument(true);
              setSelectedTests([]);
              setError('');
            }}
            className={`flex-1 rounded-lg border-2 p-3 text-center transition-all ${
              useDocument
                ? 'border-blue-500 bg-blue-50 text-blue-900 font-medium'
                : 'border-gray-300 text-gray-700 hover:border-gray-400'
            }`}
          >
            Upload Document
          </button>
        </div>
      </div>

      {/* Error and Success Messages */}
      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 p-3 flex items-start gap-2">
          <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {success && (
        <div className="rounded-lg bg-green-50 border border-green-200 p-3 flex items-start gap-2">
          <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-green-700">{success}</p>
        </div>
      )}

      {/* Select Tests */}
      {!useDocument && (
        <div className="space-y-3">
          <Label className="text-sm font-semibold text-gray-900">
            Select Tests ({selectedTests.length} selected)
          </Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-64 overflow-y-auto">
            {availableTests.map((test) => (
              <label
                key={test}
                className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-gray-50"
              >
                <input
                  type="checkbox"
                  checked={selectedTests.includes(test)}
                  onChange={() => handleTestToggle(test)}
                  disabled={loading}
                  className="rounded border-gray-300"
                />
                <span className="text-sm text-gray-700">{test}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Upload Document */}
      {useDocument && (
        <div className="space-y-3">
          <Label className="text-sm font-semibold text-gray-900">Upload Medical Document</Label>
          <div className="relative">
            {uploadedDocument ? (
              <div className="rounded-lg border border-green-300 bg-green-50 p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium text-green-900">{uploadedDocument}</p>
                    <p className="text-xs text-green-700">Ready to submit</p>
                  </div>
                </div>
                <button
                  onClick={() => setUploadedDocument(null)}
                  className="text-green-600 hover:text-green-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <label className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="font-medium text-gray-700">Upload medical document</p>
                <p className="text-xs text-gray-600 mt-1">PDF, JPG, PNG (Max 5MB)</p>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleDocumentUpload}
                  disabled={loading}
                  className="hidden"
                />
              </label>
            )}
          </div>
        </div>
      )}

      {/* Preferred Date */}
      <div className="space-y-3">
        <Label htmlFor="date" className="text-sm font-semibold text-gray-900">
          Preferred Test Date
        </Label>
        <Input
          id="date"
          type="date"
          value={preferredDate}
          onChange={(e) => {
            setPreferredDate(e.target.value);
            setError('');
          }}
          disabled={loading}
          className="rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />
      </div>

      {/* Submit Button */}
      <Button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg"
      >
        {loading ? 'Submitting Request...' : 'Submit Request & Get Quotations'}
      </Button>

      <p className="text-xs text-gray-600 text-center">
        Nearby labs will receive your request and submit quotations within the next 2 hours
      </p>
    </div>
  );
}
