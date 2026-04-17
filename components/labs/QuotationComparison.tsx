'use client';

import { useState } from 'react';
import { Star, MapPin, Clock, DollarSign, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Quotation } from '@/types';

interface QuotationComparisonProps {
  quotations: Quotation[];
  onBookQuotation: (quotation: Quotation) => void;
  loading?: boolean;
}

type SortOption = 'price' | 'rating' | 'responseTime';

export function QuotationComparison({
  quotations,
  onBookQuotation,
  loading = false,
}: QuotationComparisonProps) {
  const [sortBy, setSortBy] = useState<SortOption>('price');
  const [priceFilter, setPriceFilter] = useState({ min: 0, max: 10000 });
  const [ratingFilter, setRatingFilter] = useState(3);

  const sortedQuotations = [...quotations].sort((a, b) => {
    if (sortBy === 'price') {
      return a.price - b.price;
    } else if (sortBy === 'rating') {
      return parseFloat(b.rating) - parseFloat(a.rating);
    } else {
      const aHours = parseInt(a.responseTime);
      const bHours = parseInt(b.responseTime);
      return aHours - bHours;
    }
  });

  const filteredQuotations = sortedQuotations.filter(
    (q) =>
      q.price >= priceFilter.min &&
      q.price <= priceFilter.max &&
      parseFloat(q.rating) >= ratingFilter
  );

  const maxPrice = Math.max(...quotations.map((q) => q.price), 10000);

  return (
    <div className="w-full space-y-6">
      {/* Filters and Sort */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Sort */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-900 flex items-center gap-2">
              <ArrowUpDown className="h-4 w-4" />
              Sort By
            </label>
            <div className="flex gap-2">
              {(['price', 'rating', 'responseTime'] as SortOption[]).map((option) => (
                <button
                  key={option}
                  onClick={() => setSortBy(option)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    sortBy === option
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {option === 'price' ? '💰' : option === 'rating' ? '⭐' : '⏱️'}{' '}
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Price Filter */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-900 flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Price Range
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                min="0"
                max={maxPrice}
                value={priceFilter.min}
                onChange={(e) =>
                  setPriceFilter({ ...priceFilter, min: parseInt(e.target.value) || 0 })
                }
                className="w-20 px-2 py-1.5 border border-gray-300 rounded text-sm"
                placeholder="Min"
              />
              <span className="text-gray-400">-</span>
              <input
                type="number"
                min="0"
                max={maxPrice}
                value={priceFilter.max}
                onChange={(e) =>
                  setPriceFilter({ ...priceFilter, max: parseInt(e.target.value) || maxPrice })
                }
                className="w-20 px-2 py-1.5 border border-gray-300 rounded text-sm"
                placeholder="Max"
              />
            </div>
          </div>

          {/* Rating Filter */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-900 flex items-center gap-2">
              <Star className="h-4 w-4" />
              Min Rating
            </label>
            <select
              value={ratingFilter}
              onChange={(e) => setRatingFilter(parseFloat(e.target.value))}
              className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm"
            >
              <option value="0">All Ratings</option>
              <option value="3">3.0+</option>
              <option value="3.5">3.5+</option>
              <option value="4">4.0+</option>
              <option value="4.5">4.5+</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-gray-600">
        Showing {filteredQuotations.length} of {quotations.length} quotations
      </div>

      {/* Quotations List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {filteredQuotations.length > 0 ? (
          filteredQuotations.map((quotation) => (
            <div
              key={quotation.id}
              className="rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Lab Info */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900">{quotation.labName}</h3>
                  <div className="flex items-center gap-2 text-sm">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    <span className="font-medium">{quotation.rating}</span>
                    <span className="text-gray-600">({quotation.reviewCount} reviews)</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>Response: {quotation.responseTime}</span>
                  </div>
                </div>

                {/* Pricing and Availability */}
                <div className="space-y-2">
                  <div>
                    <p className="text-xs text-gray-600">Price per test</p>
                    <p className="text-2xl font-bold text-blue-600">₹{quotation.price}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Availability</p>
                    <p className="font-medium text-gray-900">{quotation.availability}</p>
                  </div>
                </div>

                {/* Action */}
                <div className="flex items-end">
                  <Button
                    onClick={() => onBookQuotation(quotation)}
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium"
                  >
                    {loading ? 'Booking...' : 'Book Now'}
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 text-gray-500">
            <p>No quotations match your filters</p>
            <p className="text-sm mt-2">Try adjusting your price or rating filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
