'use client';

import { useRouter } from 'next/navigation';
import { Star, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MainLayout } from '@/components/shared/Navigation';
import { currentUser, medicineStores } from '@/lib/mockData';
import { useState } from 'react';

export default function MedicineOrderingPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const commonMedicines = [
    { id: 1, name: 'Aspirin 500mg', price: 45 },
    { id: 2, name: 'Paracetamol 500mg', price: 35 },
    { id: 3, name: 'Cough Syrup', price: 120 },
    { id: 4, name: 'Multivitamin', price: 200 },
    { id: 5, name: 'Antibiotic Cream', price: 150 },
    { id: 6, name: 'Calcium Tablet', price: 180 },
  ];

  const handleOrderMedicine = (storeId: string, medicineName: string) => {
    router.push(
      `/booking-confirmation?store=${storeId}&service=medicine&medicine=${encodeURIComponent(
        medicineName
      )}`
    );
  };

  return (
    <MainLayout
      headerProps={{
        userName: currentUser.name,
        userAvatar: currentUser.avatar,
      }}
    >
      <div className="space-y-6 px-4 py-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Order Medicines</h1>
          <p className="mt-1 text-gray-600">Find medicines with home delivery</p>
        </div>

        {/* Search */}
        <Input
          type="text"
          placeholder="Search for medicines..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="rounded-lg border border-gray-300"
        />

        {/* Popular Medicines */}
        <div>
          <h2 className="mb-3 text-lg font-bold text-gray-900">
            Popular Medicines
          </h2>
          <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
            {commonMedicines.map((medicine) => (
              <div
                key={medicine.id}
                className="rounded-lg border border-gray-200 bg-white p-3 hover:shadow-md"
              >
                <p className="font-medium text-gray-900">{medicine.name}</p>
                <div className="mt-2 flex items-center justify-between">
                  <p className="text-sm text-green-600">₹{medicine.price}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      handleOrderMedicine('store_001', medicine.name)
                    }
                  >
                    Add
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Available Pharmacies */}
        <div>
          <h2 className="mb-3 text-lg font-bold text-gray-900">
            Nearby Pharmacies
          </h2>
          <div className="space-y-4">
            {medicineStores.map((store) => (
              <div
                key={store.id}
                className="overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow hover:shadow-lg"
              >
                <div className="p-4">
                  <div className="mb-3 flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-gray-900">{store.name}</h3>
                      <p className="text-sm text-gray-600">{store.description}</p>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{store.rating}</span>
                    </div>
                  </div>

                  <div className="mb-4 grid grid-cols-3 gap-2 text-sm text-gray-600 md:grid-cols-4">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{store.responseTime} min</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{store.distance} km</span>
                    </div>
                    <div className="font-medium text-green-600">
                      {store.availability}
                    </div>
                  </div>

                  <Button
                    onClick={() =>
                      router.push(`/services/medicine/${store.id}`)
                    }
                    className="w-full bg-orange-600 hover:bg-orange-700"
                  >
                    Browse Store
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
