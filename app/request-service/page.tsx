'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Beaker, Pill, Ambulance, Users, ChevronRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MainLayout } from '@/components/shared/Navigation';
import { currentUser } from '@/lib/mockData';

export default function RequestServicePage() {
  const router = useRouter();
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const services = [
    {
      id: 'lab-test',
      name: 'Lab Test',
      description: 'Blood tests, X-ray, Ultrasound, and other diagnostic tests',
      icon: Beaker,
      color: 'bg-purple-500',
      route: '/request-service/lab-test',
    },
    {
      id: 'medicine',
      name: 'Medicine Delivery',
      description: 'Get medicines delivered from nearby pharmacies',
      icon: Pill,
      color: 'bg-blue-500',
      route: '/request-service/medicine',
    },
    {
      id: 'ambulance',
      name: 'Ambulance',
      description: 'Emergency and non-emergency ambulance services',
      icon: Ambulance,
      color: 'bg-red-500',
      route: '/request-service/ambulance',
    },
    {
      id: 'caregiver',
      name: 'Caregiver',
      description: 'Professional nurses and caregivers for home care',
      icon: Users,
      color: 'bg-green-500',
      route: '/request-service/caregiver',
    },
  ];

  const handleSelectService = (service: (typeof services)[0]) => {
    setSelectedService(service.id);
    setTimeout(() => {
      router.push(service.route);
    }, 300);
  };

  return (
    <MainLayout
      headerProps={{
        userName: currentUser.name,
        userAvatar: currentUser.avatar,
      }}
    >
      <div className="space-y-6 px-4 py-4 max-w-4xl mx-auto">
        {/* Header */}
        <div>
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Request a Service</h1>
          <p className="mt-2 text-gray-600">
            Choose a service, submit your request, and get quotes from nearby providers
          </p>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-900">
            <strong>How it works:</strong> Select a service → Submit your requirements → Get quotes from nearby providers → Compare and choose → Book
          </p>
        </div>

        {/* Service Selection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <button
                key={service.id}
                onClick={() => handleSelectService(service)}
                disabled={selectedService === service.id}
                className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white p-6 transition-all hover:shadow-lg hover:border-gray-300 disabled:opacity-75"
              >
                <div className="space-y-3">
                  <div className={`w-12 h-12 rounded-lg ${service.color} flex items-center justify-center text-white`}>
                    <Icon className="h-6 w-6" />
                  </div>

                  <div className="text-left">
                    <h3 className="font-bold text-gray-900 text-lg">{service.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                  </div>

                  <div className="flex items-center gap-2 text-blue-600 font-medium text-sm pt-2">
                    {selectedService === service.id ? (
                      <>
                        <span>Opening...</span>
                        <div className="animate-spin h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full"></div>
                      </>
                    ) : (
                      <>
                        <span>Select</span>
                        <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Benefits */}
        <div className="space-y-3 mt-8">
          <h2 className="font-bold text-gray-900 text-lg">Why use our service?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: 'Compare Quotes', desc: 'Get multiple quotes from nearby providers' },
              { title: 'Best Prices', desc: 'Choose the best deal that fits your budget' },
              { title: 'Quick Service', desc: 'Fast response times from verified providers' },
            ].map((benefit, idx) => (
              <div key={idx} className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-gray-900">{benefit.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
