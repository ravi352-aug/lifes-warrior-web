'use client';

import { useRouter } from 'next/navigation';
import {
  Calendar,
  Beaker,
  Pill,
  Ambulance,
  Users,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MainLayout } from '@/components/shared/Navigation';
import { currentUser } from '@/lib/mockData';

export default function ServicesPage() {
  const router = useRouter();

  const services = [
    {
      id: 'appointments',
      title: 'Doctor Appointments',
      description: 'Book appointments with qualified doctors and specialists',
      icon: Calendar,
      color: 'bg-blue-100 text-blue-600',
      route: '/services/appointments',
    },
    {
      id: 'lab-tests',
      title: 'Lab Tests',
      description: 'Get home sample collection and online reports',
      icon: Beaker,
      color: 'bg-purple-100 text-purple-600',
      route: '/services/lab-tests',
    },
    {
      id: 'medicine',
      title: 'Medicine Ordering',
      description: 'Order medicines with home delivery',
      icon: Pill,
      color: 'bg-orange-100 text-orange-600',
      route: '/services/medicine',
    },
    {
      id: 'ambulance',
      title: 'Ambulance Service',
      description: '24/7 emergency ambulance and medical transport',
      icon: Ambulance,
      color: 'bg-red-100 text-red-600',
      route: '/services/ambulance',
    },
    {
      id: 'caregivers',
      title: 'Caregivers',
      description: 'Find professional caregivers for home care',
      icon: Users,
      color: 'bg-teal-100 text-teal-600',
      route: '/services/caregivers',
    },
  ];

  return (
    <MainLayout
      headerProps={{
        userName: currentUser.name,
        userAvatar: currentUser.avatar,
      }}
    >
      <div className="space-y-6 px-4 py-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Our Services</h1>
          <p className="mt-1 text-gray-600">
            Browse and book healthcare services near you
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="flex items-start justify-between rounded-lg border border-gray-200 bg-white p-5 transition-shadow hover:shadow-lg"
              >
                <div className="flex-1">
                  <div className={`mb-3 w-fit rounded-lg p-3 ${service.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold text-gray-900">{service.title}</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    {service.description}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => router.push(service.route)}
                  className="ml-2"
                >
                  <ArrowRight className="h-5 w-5 text-blue-600" />
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </MainLayout>
  );
}
