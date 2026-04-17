'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Star, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MainLayout } from '@/components/shared/Navigation';
import { currentUser } from '@/lib/mockData';

interface Rating {
  cleanliness: number;
  professionalism: number;
  punctuality: number;
  communication: number;
  value: number;
  overall: number;
}

export default function RateServicePage() {
  const router = useRouter();
  const [rating, setRating] = useState<Rating>({
    cleanliness: 0,
    professionalism: 0,
    punctuality: 0,
    communication: 0,
    value: 0,
    overall: 0,
  });
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const categories = [
    { key: 'professionalism', label: 'Professionalism', description: 'How professional was the service?' },
    { key: 'punctuality', label: 'Punctuality', description: 'Did they arrive on time?' },
    { key: 'communication', label: 'Communication', description: 'How clear was their communication?' },
    { key: 'cleanliness', label: 'Cleanliness', description: 'How clean and hygienic was the service?' },
    { key: 'value', label: 'Value for Money', description: 'Was it worth the price?' },
  ];

  const calculateOverall = () => {
    const values = Object.values(rating).filter((v, i) => v > 0 && i !== 5);
    if (values.length === 0) return 0;
    return Math.round((values.reduce((a, b) => a + b) / values.length) * 10) / 10;
  };

  const handleStarClick = (category: string, value: number) => {
    setRating((prev) => ({
      ...prev,
      [category]: value,
      overall: calculateOverall(),
    }));
  };

  const handleSubmit = () => {
    if (calculateOverall() === 0) {
      alert('Please rate at least one category');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setSubmitted(true);
      setTimeout(() => {
        router.push('/my-requests');
      }, 3000);
    }, 1500);
  };

  if (submitted) {
    return (
      <MainLayout
        headerProps={{
          userName: currentUser.name,
          userAvatar: currentUser.avatar,
        }}
      >
        <div className="space-y-6 px-4 py-4 max-w-2xl mx-auto flex flex-col items-center justify-center min-h-screen">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-gray-900">Thank You for Rating!</h2>
            <p className="text-gray-600">Your rating helps other users find the best service providers</p>
            <p className="text-sm text-gray-500">Redirecting to your requests...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  const overallRating = calculateOverall();

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
          <h1 className="text-3xl font-bold text-gray-900">Rate Your Experience</h1>
          <p className="mt-2 text-gray-600">Help us improve by sharing your feedback</p>
        </div>

        {/* Overall Rating Display */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200 p-6 text-center">
          <p className="text-sm text-gray-600 font-medium mb-2">Overall Rating</p>
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="text-4xl font-bold text-blue-600">{overallRating.toFixed(1)}</div>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  className={`h-6 w-6 ${
                    i <= Math.round(overallRating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
          <p className="text-xs text-gray-600">Rate each category below</p>
        </div>

        {/* Rating Categories */}
        <div className="space-y-6">
          {categories.map((category) => (
            <div key={category.key} className="bg-white rounded-lg border border-gray-200 p-4 space-y-3">
              <div>
                <h3 className="font-bold text-gray-900">{category.label}</h3>
                <p className="text-sm text-gray-600">{category.description}</p>
              </div>

              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    onClick={() => handleStarClick(category.key, value)}
                    className="focus:outline-none transition-transform hover:scale-110"
                  >
                    <Star
                      className={`h-8 w-8 cursor-pointer transition-colors ${
                        (rating[category.key as keyof Rating] || 0) >= value
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300 hover:text-yellow-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Review Text */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-3">
          <label className="font-bold text-gray-900">Write a Review (Optional)</label>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Share your experience with this service provider. What was good? What could be improved?"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-24"
          />
          <p className="text-xs text-gray-500">{review.length}/500 characters</p>
        </div>

        {/* Benefits of Rating */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 space-y-2">
          <p className="text-sm text-green-900 font-medium">Why rate?</p>
          <ul className="text-sm text-green-800 space-y-1">
            <li>• Help other users find quality service providers</li>
            <li>• Give feedback to improve services</li>
            <li>• Earn loyalty rewards with your ratings</li>
          </ul>
        </div>

        {/* Submit Button */}
        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 py-3"
        >
          {loading ? (
            <>
              <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
              Submitting Rating...
            </>
          ) : (
            'Submit Rating'
          )}
        </Button>
      </div>
    </MainLayout>
  );
}
