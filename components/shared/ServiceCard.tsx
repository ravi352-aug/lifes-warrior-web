'use client';

import { Provider } from '@/types';
import { Star, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ServiceCardProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  onClick: () => void;
  bgColor: string;
  textColor?: string;
}

export function ServiceCard({
  title,
  icon,
  description,
  onClick,
  bgColor,
  textColor = 'text-white',
}: ServiceCardProps) {
  return (
    <button
      onClick={onClick}
      className={`rounded-lg p-6 text-left transition-transform hover:scale-105 active:scale-95 ${bgColor} ${textColor}`}
    >
      <div className="mb-4 text-4xl">{icon}</div>
      <h3 className="mb-1 text-lg font-bold">{title}</h3>
      <p className="text-sm opacity-90">{description}</p>
    </button>
  );
}

interface ProviderCardProps {
  provider: Provider;
  onSelect: () => void;
}

export function ProviderCard({ provider, onSelect }: ProviderCardProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 transition-shadow hover:shadow-lg">
      <div className="mb-3 flex items-start justify-between">
        <div>
          <h3 className="font-bold text-gray-900">{provider.name}</h3>
          <p className="text-sm text-gray-600">{provider.description}</p>
        </div>
        <img
          src={provider.image}
          alt={provider.name}
          className="h-10 w-10 rounded-full"
        />
      </div>

      <div className="mb-3 grid grid-cols-2 gap-2 text-sm">
        <div className="flex items-center gap-1 text-gray-700">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span>{provider.rating}</span>
          <span className="text-gray-500">({provider.reviewCount})</span>
        </div>
        <div className="flex items-center gap-1 text-gray-700">
          <MapPin className="h-4 w-4 text-gray-500" />
          <span>{provider.distance}km</span>
        </div>
        <div className="flex items-center gap-1 text-gray-700">
          <Clock className="h-4 w-4 text-gray-500" />
          <span>{provider.responseTime}min</span>
        </div>
        <div className="font-semibold text-blue-600">
          ₹{provider.priceRange.min} - ₹{provider.priceRange.max}
        </div>
      </div>

      <Button onClick={onSelect} className="w-full" size="sm">
        Select
      </Button>
    </div>
  );
}

interface QuoteComparisonProps {
  providers: Provider[];
  onSelect: (providerId: string) => void;
}

export function QuoteComparison({ providers, onSelect }: QuoteComparisonProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold">Available Quotations</h3>
      <div className="grid gap-4 md:grid-cols-2">
        {providers.map((provider) => (
          <div
            key={provider.id}
            className="rounded-lg border border-gray-200 bg-gray-50 p-4"
          >
            <div className="mb-3 flex items-center justify-between">
              <h4 className="font-bold">{provider.name}</h4>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{provider.rating}</span>
              </div>
            </div>

            <div className="mb-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Price:</span>
                <span className="font-semibold text-green-600">
                  ₹{provider.priceRange.min} - ₹{provider.priceRange.max}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Response Time:</span>
                <span className="font-semibold">{provider.responseTime} min</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Availability:</span>
                <span className="font-semibold">{provider.availability}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Distance:</span>
                <span className="font-semibold">{provider.distance} km</span>
              </div>
            </div>

            <Button
              onClick={() => onSelect(provider.id)}
              className="w-full"
              size="sm"
            >
              Book Now
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  valueColor?: string;
}

export function StatCard({
  label,
  value,
  icon,
  valueColor = 'text-blue-600',
}: StatCardProps) {
  return (
    <div className="rounded-lg bg-white p-4 shadow-sm">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-sm text-gray-600">{label}</p>
        <div className="text-xl">{icon}</div>
      </div>
      <p className={`text-2xl font-bold ${valueColor}`}>{value}</p>
    </div>
  );
}
