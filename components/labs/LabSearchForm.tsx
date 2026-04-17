'use client';

import { useState } from 'react';
import { Search, MapPin, Star, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface Lab {
  id: string;
  name: string;
  location: string;
  rating: number;
  reviews: number;
  responseTime: string;
  tests: string[];
  image?: string;
}

interface LabSearchFormProps {
  labs: Lab[];
  onSelectLab: (lab: Lab) => void;
}

export function LabSearchForm({ labs, onSelectLab }: LabSearchFormProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredLabs, setFilteredLabs] = useState<Lab[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (query.trim().length === 0) {
      setFilteredLabs([]);
      setShowResults(false);
      return;
    }

    const results = labs.filter(lab =>
      lab.name.toLowerCase().includes(query.toLowerCase()) ||
      lab.location.toLowerCase().includes(query.toLowerCase())
    );
    
    setFilteredLabs(results);
    setShowResults(true);
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-900 mb-3">
          Search Lab by Name or Location
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Enter lab name or location..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>
      </div>

      {showResults && (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {filteredLabs.length > 0 ? (
            filteredLabs.map((lab) => (
              <div
                key={lab.id}
                className="rounded-lg border border-gray-200 p-4 hover:border-blue-500 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">{lab.name}</h3>
                    
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span>{lab.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        <span>{lab.rating.toFixed(1)}</span>
                        <span className="text-gray-400">({lab.reviews})</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span>{lab.responseTime}</span>
                      </div>
                    </div>

                    <div className="mt-2 flex flex-wrap gap-1">
                      {lab.tests.slice(0, 3).map((test, idx) => (
                        <span
                          key={idx}
                          className="inline-block bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded"
                        >
                          {test}
                        </span>
                      ))}
                      {lab.tests.length > 3 && (
                        <span className="inline-block bg-gray-50 text-gray-700 text-xs px-2 py-1 rounded">
                          +{lab.tests.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  <Button
                    onClick={() => onSelectLab(lab)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium"
                  >
                    Select
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>No labs found matching "{searchQuery}"</p>
              <p className="text-sm mt-2">Try searching for a different lab name or location</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
