'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function ProfileSetupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    location: '',
    medicalHistory: '',
  });
  const [avatar, setAvatar] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGenerateAvatar = () => {
    const randomSeed = Math.random().toString(36).substring(7);
    setAvatar(
      `https://api.dicebear.com/7.x/avataaars/svg?seed=${randomSeed}`
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      localStorage.setItem('user_profile', JSON.stringify(formData));
      localStorage.setItem('user_avatar', avatar);
      setLoading(false);
      router.push('/');
    }, 1500);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 px-4 py-8">
      <div className="w-full max-w-md">
        <div className="rounded-lg bg-white p-8 shadow-lg">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-blue-600">Complete Your Profile</h1>
            <p className="mt-2 text-sm text-gray-600">
              Help us personalize your healthcare experience
            </p>
          </div>

          {/* Avatar Selection */}
          <div className="mb-6 text-center">
            <div className="mb-4 flex justify-center">
              {avatar ? (
                <img
                  src={avatar}
                  alt="Avatar"
                  className="h-20 w-20 rounded-full border-4 border-blue-200"
                />
              ) : (
                <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-gray-200 bg-gray-100">
                  <span className="text-gray-400">No avatar</span>
                </div>
              )}
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={handleGenerateAvatar}
              className="w-full"
            >
              {avatar ? 'Change Avatar' : 'Generate Avatar'}
            </Button>
          </div>

          {/* Profile Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-700">
                Full Name
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
                className="rounded-lg border border-gray-300"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dob" className="text-gray-700">
                Date of Birth
              </Label>
              <Input
                id="dob"
                name="dob"
                type="date"
                value={formData.dob}
                onChange={handleChange}
                required
                className="rounded-lg border border-gray-300"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="text-gray-700">
                City/Location
              </Label>
              <Input
                id="location"
                name="location"
                type="text"
                placeholder="Enter your city"
                value={formData.location}
                onChange={handleChange}
                required
                className="rounded-lg border border-gray-300"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="medicalHistory" className="text-gray-700">
                Medical History (Optional)
              </Label>
              <Textarea
                id="medicalHistory"
                name="medicalHistory"
                placeholder="Any allergies or medical conditions?"
                value={formData.medicalHistory}
                onChange={handleChange}
                className="rounded-lg border border-gray-300"
                rows={3}
              />
            </div>

            <Button
              type="submit"
              disabled={loading || !avatar || !formData.name}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              {loading ? 'Setting up...' : 'Complete Setup'}
            </Button>
          </form>

          <p className="mt-4 text-center text-xs text-gray-500">
            You can update your profile anytime from settings
          </p>
        </div>
      </div>
    </div>
  );
}
