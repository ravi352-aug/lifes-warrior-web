'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Calendar,
  Beaker,
  Pill,
  Ambulance,
  Users,
  Heart,
  MapPin,
  Search,
  Star,
  Clock,
  ChevronRight,
  Droplet,
  Brain,
  BookOpen,
  ChevronLeft,
  X,
  Check,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MainLayout } from '@/components/shared/Navigation';
import { ServiceCard } from '@/components/shared/ServiceCard';
import { currentUser, doctors, labs, medicineStores, hospitals, AVAILABLE_LOCATIONS, DEFAULT_LOCATION } from '@/lib/mockData';
import { useAuth } from '@/lib/hooks/useAuth';

export default function HomePage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();
  const [showAllServices, setShowAllServices] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(DEFAULT_LOCATION);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [locationSearch, setLocationSearch] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const doctorScrollRef = useRef<HTMLDivElement>(null);
  const labScrollRef = useRef<HTMLDivElement>(null);
  const medicineScrollRef = useRef<HTMLDivElement>(null);

  // Auth guard - redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render page content if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  // Filter locations by search query
  const filteredLocations = AVAILABLE_LOCATIONS.filter((location) =>
    location.name.toLowerCase().includes(locationSearch.toLowerCase())
  );

  // Filter providers by location
  const filterByLocation = (providers: any[]) => {
    return providers.filter(
      (provider) => provider.location.toLowerCase().includes(selectedLocation.city.toLowerCase())
    );
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim().length > 0) {
      // Search across doctors, labs, and services
      const searchTerm = query.toLowerCase();
      const matchingDoctors = filterByLocation(doctors).filter(
        (d) => d.name.toLowerCase().includes(searchTerm) || d.specialization.toLowerCase().includes(searchTerm)
      );
      const matchingLabs = filterByLocation(labs).filter(
        (l) => l.name.toLowerCase().includes(searchTerm)
      );
      
      // If exact match found, navigate directly
      if (matchingDoctors.length === 1) {
        router.push('/services/appointments');
      } else if (matchingLabs.length === 1) {
        router.push('/services/lab-tests');
      }
    }
  };

  const filteredDoctors = filterByLocation(doctors);
  const filteredLabs = filterByLocation(labs);
  const filteredMedicineStores = filterByLocation(medicineStores);
  const filteredHospitals = filterByLocation(hospitals);

  const serviceCategories = [
    {
      id: 'quick-request',
      title: 'Quick Request',
      description: 'Submit Request, Get Provider Offers, Compare & Book',
      icon: <ChevronRight className="h-8 w-8" />,
      bgColor: 'bg-green-500',
      route: '/request-service',
    },
    {
      id: 'appointments',
      title: 'Appointment',
      description: 'Find Doctor, Check Slots, Confirm Booking, Get Reminder',
      icon: <Calendar className="h-8 w-8" />,
      bgColor: 'bg-blue-500',
      route: '/services/appointments',
    },
    {
      id: 'lab-tests',
      title: 'Lab Tests',
      description: 'Select Test, Sample Pickup, Report Online, Consult',
      icon: <Beaker className="h-8 w-8" />,
      bgColor: 'bg-purple-500',
      route: '/services/lab-tests',
    },
    {
      id: 'medicine',
      title: 'Medicine',
      description: 'Search & Order, Price Comparison, Home Delivery',
      icon: <Pill className="h-8 w-8" />,
      bgColor: 'bg-orange-500',
      route: '/services/medicine',
    },
    {
      id: 'ambulance',
      title: 'Ambulance',
      description: 'Emergency Request, Real-time Tracking, Quick Response',
      icon: <Ambulance className="h-8 w-8" />,
      bgColor: 'bg-red-500',
      route: '/services/ambulance',
    },
    {
      id: 'caregivers',
      title: 'Caregivers',
      description: 'Find Caregiver, Schedule, Professional Care',
      icon: <Users className="h-8 w-8" />,
      bgColor: 'bg-teal-500',
      route: '/services/caregivers',
    },
    {
      id: 'blood-bank',
      title: 'Blood Bank',
      description: 'Find Donor, Book Appointment, Emergency Blood',
      icon: <Droplet className="h-8 w-8" />,
      bgColor: 'bg-red-600',
      route: '/services/blood-bank',
    },
    {
      id: 'ai-analysis',
      title: 'AI Report Analysis',
      description: 'Upload Report, AI Analysis, Get Insights',
      icon: <Brain className="h-8 w-8" />,
      bgColor: 'bg-indigo-500',
      route: '/health/ai-analysis',
    },
    {
      id: 'health-articles',
      title: 'Health Articles',
      description: 'Read Articles, Learn Tips, Health News',
      icon: <BookOpen className="h-8 w-8" />,
      bgColor: 'bg-cyan-500',
      route: '/health/articles',
    },
  ];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      if (direction === 'left') {
        scrollContainerRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  const scrollDoctor = (direction: 'left' | 'right') => {
    if (doctorScrollRef.current) {
      const scrollAmount = 300;
      if (direction === 'left') {
        doctorScrollRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        doctorScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  const scrollLab = (direction: 'left' | 'right') => {
    if (labScrollRef.current) {
      const scrollAmount = 300;
      if (direction === 'left') {
        labScrollRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        labScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  const scrollMedicine = (direction: 'left' | 'right') => {
    if (medicineScrollRef.current) {
      const scrollAmount = 300;
      if (direction === 'left') {
        medicineScrollRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        medicineScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  const renderHospitalCard = (hospital: any) => (
    <div
      key={hospital.id}
      className="flex-shrink-0 w-80 rounded-lg border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => router.push('/services/appointments')}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-start gap-3 flex-1">
          <img
            src={hospital.image}
            alt={hospital.name}
            className="h-12 w-12 rounded-lg object-cover"
          />
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-base text-gray-900 truncate">
              {hospital.name}
            </h4>
            <p className="text-xs text-gray-600 truncate">
              {hospital.location}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="font-semibold text-sm text-gray-900">
            {hospital.rating}
          </span>
        </div>
      </div>
      
      <div className="mb-3 flex flex-wrap gap-2">
        {hospital.specialization.split(', ').slice(0, 2).map((spec: string, idx: number) => (
          <span key={idx} className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
            {spec}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between text-xs text-gray-600">
        <div className="flex items-center gap-1">
          <MapPin className="h-3 w-3" />
          <span>{hospital.distance} km</span>
        </div>
        <span className="text-gray-500">({hospital.reviewCount})</span>
      </div>
    </div>
  );

  const renderDoctorCarouselCard = (doctor: any) => (
    <div
      key={doctor.id}
      className="flex-shrink-0 w-56 rounded-lg border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col items-center text-center"
      onClick={() => router.push('/services/appointments')}
    >
      <img
        src={doctor.image}
        alt={doctor.name}
        className="h-24 w-24 rounded-full object-cover mb-3"
      />
      <h4 className="font-bold text-base text-gray-900 truncate w-full">
        {doctor.name}
      </h4>
      <p className="text-sm text-gray-600 mb-3 truncate w-full">
        {doctor.specialization}
      </p>
      <div className="flex items-center justify-center gap-1">
        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
        <span className="font-semibold text-base text-gray-900">
          {doctor.rating}
        </span>
      </div>
    </div>
  );

  const renderLabCarouselCard = (lab: any) => (
    <div
      key={lab.id}
      className="flex-shrink-0 w-80 rounded-lg border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => router.push('/services/lab-tests')}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-start gap-3 flex-1">
          <img
            src={lab.image}
            alt={lab.name}
            className="h-12 w-12 rounded-lg object-cover"
          />
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-base text-gray-900 truncate">
              {lab.name}
            </h4>
            <p className="text-xs text-gray-600 truncate">
              {lab.location}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="font-semibold text-sm text-gray-900">
            {lab.rating}
          </span>
        </div>
      </div>
      
      <div className="mb-3 flex flex-wrap gap-2">
        {['Pathology', 'Screening'].map((spec: string, idx: number) => (
          <span key={idx} className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
            {spec}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between text-xs text-gray-600">
        <div className="flex items-center gap-1">
          <MapPin className="h-3 w-3" />
          <span>{lab.distance} km</span>
        </div>
        <span className="text-gray-500">({lab.reviewCount})</span>
      </div>
    </div>
  );

  const renderMedicineStoreCarouselCard = (store: any) => (
    <div
      key={store.id}
      className="flex-shrink-0 w-56 rounded-lg border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col items-center text-center"
      onClick={() => router.push('/services/medicine')}
    >
      <img
        src={store.image}
        alt={store.name}
        className="h-24 w-24 rounded-full object-cover mb-3"
      />
      <h4 className="font-bold text-base text-gray-900 truncate w-full">
        {store.name}
      </h4>
      <p className="text-sm text-gray-600 mb-3 truncate w-full">
        {store.location}
      </p>
      <div className="flex items-center justify-center gap-1">
        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
        <span className="font-semibold text-base text-gray-900">
          {store.rating}
        </span>
      </div>
    </div>
  );

  const renderProviderCard = (provider: any) => (
    <div
      key={provider.id}
      className="rounded-lg border border-gray-200 bg-white p-3 md:p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => router.push(`/services/appointments`)}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-start gap-2 flex-1">
          <img
            src={provider.image}
            alt={provider.name}
            className="h-10 w-10 md:h-12 md:w-12 rounded-full object-cover"
          />
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-sm md:text-base text-gray-900 truncate">
              {provider.name}
            </h4>
            <p className="text-xs md:text-sm text-gray-600 truncate">
              {provider.specialization || provider.type}
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 mb-2">
        <div className="flex items-center gap-1">
          <Star className="h-3 w-3 md:h-4 md:w-4 fill-yellow-400 text-yellow-400" />
          <span className="text-xs md:text-sm font-semibold text-gray-900">
            {provider.rating}
          </span>
          <span className="text-xs text-gray-500">({provider.reviewCount})</span>
        </div>
        <span className="text-xs text-gray-500">•</span>
        <div className="flex items-center gap-1">
          <MapPin className="h-3 w-3 md:h-4 md:w-4 text-gray-500" />
          <span className="text-xs text-gray-500">{provider.distance} km</span>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xs md:text-sm font-semibold text-blue-600">
          ₹{provider.priceRange.min} - ₹{provider.priceRange.max}
        </span>
        <div className="flex items-center gap-1 text-xs text-gray-600">
          <Clock className="h-3 w-3 md:h-4 md:w-4" />
          <span>{provider.responseTime} min</span>
        </div>
      </div>
    </div>
  );

  return (
    <MainLayout
      headerProps={{
        userName: currentUser.name,
        userAvatar: currentUser.avatar,
        notificationCount: 2,
      }}
    >
      <div className="space-y-4 md:space-y-6 px-4 py-6">
        {/* Quick Stats - Card Grid Layout */}
        <div className="grid grid-cols-3 gap-3 md:gap-4">
          {/* Next Appointment Card */}
          <div className="rounded-lg bg-white border border-gray-200 p-3 md:p-4 text-center hover:shadow-md transition-shadow">
            <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-red-100 mx-auto mb-2 md:mb-3">
              <Clock className="h-5 w-5 md:h-6 md:w-6 text-red-500" />
            </div>
            <p className="text-xs md:text-sm text-gray-600 font-medium">Next Appointment</p>
            <p className="text-sm md:text-base font-bold text-gray-900 mt-1 truncate">Tomorrow 2:30 PM</p>
          </div>

          {/* Health Score Card */}
          <div className="rounded-lg bg-white border border-gray-200 p-3 md:p-4 text-center hover:shadow-md transition-shadow">
            <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-green-100 mx-auto mb-2 md:mb-3">
              <Heart className="h-5 w-5 md:h-6 md:w-6 text-green-600 fill-green-600" />
            </div>
            <p className="text-xs md:text-sm text-gray-600 font-medium">Health Score</p>
            <p className="text-sm md:text-base font-bold text-green-600 mt-1">{currentUser.healthScore}/100</p>
          </div>

          {/* Wallet Balance Card */}
          <div className="rounded-lg bg-white border border-gray-200 p-3 md:p-4 text-center hover:shadow-md transition-shadow">
            <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-blue-100 mx-auto mb-2 md:mb-3">
              <svg
                className="h-5 w-5 md:h-6 md:w-6 text-blue-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                <line x1="1" y1="10" x2="23" y2="10"></line>
              </svg>
            </div>
            <p className="text-xs md:text-sm text-gray-600 font-medium">Wallet Balance</p>
            <p className="text-sm md:text-base font-bold text-blue-600 mt-1">₹{currentUser.walletBalance}</p>
          </div>
        </div>

        {/* Search Bar with Location Selector */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search doctors, services, articles..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="rounded-lg border border-gray-300 pl-10 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-sm"
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            className="rounded-lg border border-gray-300"
            onClick={() => setShowLocationModal(true)}
          >
            <MapPin className="h-5 w-5 text-blue-600" />
          </Button>
        </div>

        {/* Location Selector Modal - Right Side Panel */}
        {showLocationModal && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40 bg-black bg-opacity-30"
              onClick={() => {
                setShowLocationModal(false);
                setLocationSearch('');
              }}
            />
            
            {/* Right Side Panel */}
            <div className="fixed right-0 top-0 z-50 h-full w-full md:w-96 bg-white shadow-2xl flex flex-col overflow-hidden">
              {/* Search Input - No Header, just search */}
              <div className="p-4 md:p-6 border-b border-gray-100">
                <div className="relative">
                  <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search location..."
                    value={locationSearch}
                    onChange={(e) => setLocationSearch(e.target.value)}
                    className="pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none text-sm w-full"
                  />
                </div>
              </div>

              {/* Locations List */}
              <div className="flex-1 overflow-y-auto">
                {filteredLocations.length > 0 ? (
                  <div className="space-y-0">
                    {filteredLocations.map((location, index) => (
                      <button
                        key={location.id}
                        onClick={() => {
                          setSelectedLocation(location);
                          setShowLocationModal(false);
                          setLocationSearch('');
                        }}
                        className={`w-full px-4 md:px-6 py-3 text-left transition-colors border-b border-gray-100 last:border-b-0 flex items-center gap-3 ${
                          selectedLocation.id === location.id
                            ? 'bg-blue-100'
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        {/* Pink Pin Icon */}
                        <div className="flex-shrink-0">
                          <div className="h-6 w-6 rounded-full bg-red-500 flex items-center justify-center text-white">
                            <MapPin className="h-3.5 w-3.5" />
                          </div>
                        </div>

                        {/* Location Info */}
                        <div className="flex-1 min-w-0">
                          <p className={`font-bold text-sm ${
                            selectedLocation.id === location.id 
                              ? 'text-gray-900' 
                              : 'text-gray-900'
                          }`}>
                            {location.name}
                          </p>
                          <p className={`text-xs mt-0.5 ${
                            selectedLocation.id === location.id 
                              ? 'text-blue-600 font-medium' 
                              : 'text-gray-600'
                          }`}>
                            {location.label ? location.label : `${location.distance.toFixed(1)} km away`}
                          </p>
                        </div>

                        {/* Checkmark for selected */}
                        {selectedLocation.id === location.id && (
                          <div className="flex-shrink-0">
                            <Check className="h-5 w-5 text-blue-600" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500 text-sm">
                    No locations found matching "{locationSearch}"
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {/* Personalized Greeting */}
        <div className="rounded-lg bg-white p-3 md:p-4 shadow-sm">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">
            Good Evening, {currentUser.name.split(' ')[0]}!
          </h2>
          <p className="text-xs md:text-base text-gray-600">Let's keep you healthy today</p>
        </div>

        {/* Services Section */}
        <div>
          <div className="mb-3 md:mb-4 flex items-center justify-between">
            <h3 className="text-lg md:text-xl font-bold text-gray-900">Services</h3>
          </div>

          <div className="grid grid-cols-2 gap-3 md:gap-4">
            {serviceCategories
              .slice(0, showAllServices ? serviceCategories.length : 4)
              .map((service) => (
                <ServiceCard
                  key={service.id}
                  title={service.title}
                  description={service.description}
                  icon={service.icon}
                  bgColor={service.bgColor}
                  onClick={() => router.push(service.route)}
                />
              ))}
          </div>

          {/* See More Button */}
          {!showAllServices && serviceCategories.length > 4 && (
            <div className="mt-4 flex justify-center">
              <button
                onClick={() => setShowAllServices(true)}
                className="rounded-lg bg-blue-50 border border-blue-200 px-6 md:px-8 py-2 md:py-3 text-blue-600 font-semibold text-sm md:text-base hover:bg-blue-100 transition-colors flex items-center gap-2"
              >
                See More Services <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}

          {/* Show Less Button */}
          {showAllServices && serviceCategories.length > 4 && (
            <div className="mt-4 flex justify-center">
              <button
                onClick={() => setShowAllServices(false)}
                className="rounded-lg bg-gray-50 border border-gray-200 px-6 md:px-8 py-2 md:py-3 text-gray-700 font-semibold text-sm md:text-base hover:bg-gray-100 transition-colors flex items-center gap-2"
              >
                Show Less Services <ChevronRight className="h-4 w-4 rotate-180" />
              </button>
            </div>
          )}
        </div>

        {/* Top Hospitals Section - Horizontal Carousel */}
        <div>
          <div className="mb-3 md:mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900">Top Hospitals</h3>
              <p className="text-xs text-gray-600">in {selectedLocation.name}</p>
            </div>
            <button
              onClick={() => router.push('/services/appointments')}
              className="text-blue-600 font-medium text-xs md:text-sm hover:underline flex items-center gap-1"
            >
              See All <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          
          <div className="relative">
            {/* Scroll Container */}
            <div
              ref={scrollContainerRef}
              className="flex gap-3 overflow-x-auto pb-2 scroll-smooth"
              style={{ scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch' }}
            >
              {filteredHospitals.length > 0 ? (
                filteredHospitals.map(renderHospitalCard)
              ) : (
                <div className="w-full flex items-center justify-center py-8 text-gray-500">
                  No hospitals available in {selectedLocation.name}
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            {filteredHospitals.length > 0 && (
              <>
                <button
                  onClick={() => scroll('left')}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white border border-gray-300 shadow-md hover:bg-gray-50 transition-colors"
                >
                  <ChevronLeft className="h-5 w-5 text-gray-600" />
                </button>
                <button
                  onClick={() => scroll('right')}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white border border-gray-300 shadow-md hover:bg-gray-50 transition-colors"
                >
                  <ChevronRight className="h-5 w-5 text-gray-600" />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Top Doctors Section - Horizontal Carousel */}
        <div>
          <div className="mb-3 md:mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900">Top Doctors</h3>
              <p className="text-xs text-gray-600">in {selectedLocation.name}</p>
            </div>
            <button
              onClick={() => router.push('/services/appointments')}
              className="text-blue-600 font-medium text-xs md:text-sm hover:underline flex items-center gap-1"
            >
              See All <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          
          <div className="relative">
            {/* Scroll Container */}
            <div
              ref={doctorScrollRef}
              className="flex gap-3 overflow-x-auto pb-2 scroll-smooth"
              style={{ scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch' }}
            >
              {filteredDoctors.length > 0 ? (
                filteredDoctors.map(renderDoctorCarouselCard)
              ) : (
                <div className="w-full flex items-center justify-center py-8 text-gray-500">
                  No doctors available in {selectedLocation.name}
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            {filteredDoctors.length > 0 && (
              <>
                <button
                  onClick={() => scrollDoctor('left')}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white border border-gray-300 shadow-md hover:bg-gray-50 transition-colors"
                >
                  <ChevronLeft className="h-5 w-5 text-gray-600" />
                </button>
                <button
                  onClick={() => scrollDoctor('right')}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white border border-gray-300 shadow-md hover:bg-gray-50 transition-colors"
                >
                  <ChevronRight className="h-5 w-5 text-gray-600" />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Top Labs Section - Horizontal Carousel */}
        <div>
          <div className="mb-3 md:mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900">Top Labs</h3>
              <p className="text-xs text-gray-600">in {selectedLocation.name}</p>
            </div>
            <button
              onClick={() => router.push('/services/lab-tests')}
              className="text-blue-600 font-medium text-xs md:text-sm hover:underline flex items-center gap-1"
            >
              See All <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          
          <div className="relative">
            {/* Scroll Container */}
            <div
              ref={labScrollRef}
              className="flex gap-3 overflow-x-auto pb-2 scroll-smooth"
              style={{ scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch' }}
            >
              {filteredLabs.length > 0 ? (
                filteredLabs.map(renderLabCarouselCard)
              ) : (
                <div className="w-full flex items-center justify-center py-8 text-gray-500">
                  No labs available in {selectedLocation.name}
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            {filteredLabs.length > 0 && (
              <>
                <button
                  onClick={() => scrollLab('left')}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white border border-gray-300 shadow-md hover:bg-gray-50 transition-colors"
                >
                  <ChevronLeft className="h-5 w-5 text-gray-600" />
                </button>
                <button
                  onClick={() => scrollLab('right')}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white border border-gray-300 shadow-md hover:bg-gray-50 transition-colors"
                >
                  <ChevronRight className="h-5 w-5 text-gray-600" />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Top Medical Stores Section - Horizontal Carousel */}
        <div>
          <div className="mb-3 md:mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900">Top Medical Stores</h3>
              <p className="text-xs text-gray-600">in {selectedLocation.name}</p>
            </div>
            <button
              onClick={() => router.push('/services/medicine')}
              className="text-blue-600 font-medium text-xs md:text-sm hover:underline flex items-center gap-1"
            >
              See All <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          
          <div className="relative">
            {/* Scroll Container */}
            <div
              ref={medicineScrollRef}
              className="flex gap-3 overflow-x-auto pb-2 scroll-smooth"
              style={{ scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch' }}
            >
              {filteredMedicineStores.length > 0 ? (
                filteredMedicineStores.map(renderMedicineStoreCarouselCard)
              ) : (
                <div className="w-full flex items-center justify-center py-8 text-gray-500">
                  No medical stores available in {selectedLocation.name}
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            {filteredMedicineStores.length > 0 && (
              <>
                <button
                  onClick={() => scrollMedicine('left')}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white border border-gray-300 shadow-md hover:bg-gray-50 transition-colors"
                >
                  <ChevronLeft className="h-5 w-5 text-gray-600" />
                </button>
                <button
                  onClick={() => scrollMedicine('right')}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white border border-gray-300 shadow-md hover:bg-gray-50 transition-colors"
                >
                  <ChevronRight className="h-5 w-5 text-gray-600" />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Recent Bookings Section */}
        <div className="rounded-lg bg-white p-3 md:p-4 shadow-sm">
          <div className="mb-3 md:mb-4 flex items-center justify-between">
            <h3 className="text-lg md:text-xl font-bold text-gray-900">Recent Activity</h3>
            <button className="text-blue-600 font-medium text-xs md:text-sm hover:underline">
              View All
            </button>
          </div>
          <div className="space-y-2 md:space-y-3">
            {/* Booking 1 */}
            <div className="flex items-center justify-between rounded-lg border border-gray-200 p-3 hover:bg-gray-50 cursor-pointer transition-colors">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-lg bg-blue-100">
                  <Calendar className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm md:text-base text-gray-900 truncate">Dr. Priya Sharma - Dermatology</p>
                  <p className="text-xs md:text-sm text-gray-600">Tomorrow at 2:30 PM</p>
                </div>
              </div>
              <span className="flex-shrink-0 text-xs md:text-sm font-semibold text-green-600 bg-green-50 px-2 md:px-3 py-1 rounded">Confirmed</span>
            </div>

            {/* Booking 2 */}
            <div className="flex items-center justify-between rounded-lg border border-gray-200 p-3 hover:bg-gray-50 cursor-pointer transition-colors">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-lg bg-purple-100">
                  <Beaker className="h-5 w-5 md:h-6 md:w-6 text-purple-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm md:text-base text-gray-900 truncate">Blood Test - Complete Health Checkup</p>
                  <p className="text-xs md:text-sm text-gray-600">Mar 24, 2026 at 9:00 AM</p>
                </div>
              </div>
              <span className="flex-shrink-0 text-xs md:text-sm font-semibold text-yellow-600 bg-yellow-50 px-2 md:px-3 py-1 rounded">Pending</span>
            </div>

            {/* Booking 3 */}
            <div className="flex items-center justify-between rounded-lg border border-gray-200 p-3 hover:bg-gray-50 cursor-pointer transition-colors">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-lg bg-green-100">
                  <Pill className="h-5 w-5 md:h-6 md:w-6 text-green-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm md:text-base text-gray-900 truncate">Medicine Order - Diabetes Medications</p>
                  <p className="text-xs md:text-sm text-gray-600">Delivered on Mar 20, 2026</p>
                </div>
              </div>
              <span className="flex-shrink-0 text-xs md:text-sm font-semibold text-blue-600 bg-blue-50 px-2 md:px-3 py-1 rounded">Completed</span>
            </div>
          </div>
        </div>

        {/* Health Reminders Section */}
        <div className="rounded-lg bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 p-3 md:p-4 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-8 w-8 md:h-10 md:w-10 rounded-full bg-orange-100">
                <Clock className="h-4 w-4 md:h-5 md:w-5 text-orange-600" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-sm md:text-base text-gray-900">Health Reminders</h3>
              <div className="mt-2 space-y-1 md:space-y-2">
                <p className="text-xs md:text-sm text-gray-700">
                  <span className="font-semibold">Due Today:</span> Take your blood pressure medication
                </p>
                <p className="text-xs md:text-sm text-gray-700">
                  <span className="font-semibold">Due in 3 days:</span> Annual health checkup
                </p>
                <p className="text-xs md:text-sm text-gray-700">
                  <span className="font-semibold">Due in 7 days:</span> Vaccination booster shot
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Wellness Tips Section */}
        <div className="rounded-lg bg-white p-3 md:p-4 shadow-sm">
          <h3 className="mb-3 md:mb-4 text-lg md:text-xl font-bold text-gray-900">Wellness Tips</h3>
          <div className="grid grid-cols-2 gap-2 md:gap-3">
            {/* Tip 1 */}
            <div className="rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 p-3 cursor-pointer hover:shadow-md transition-shadow">
              <p className="text-2xl mb-2">💧</p>
              <p className="text-xs md:text-sm font-semibold text-gray-900">Stay Hydrated</p>
              <p className="text-xs text-gray-600 mt-1">Drink 8 glasses of water daily</p>
            </div>

            {/* Tip 2 */}
            <div className="rounded-lg bg-gradient-to-br from-green-50 to-green-100 p-3 cursor-pointer hover:shadow-md transition-shadow">
              <p className="text-2xl mb-2">🚶</p>
              <p className="text-xs md:text-sm font-semibold text-gray-900">Daily Exercise</p>
              <p className="text-xs text-gray-600 mt-1">Walk 30 min every day</p>
            </div>

            {/* Tip 3 */}
            <div className="rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 p-3 cursor-pointer hover:shadow-md transition-shadow">
              <p className="text-2xl mb-2">😴</p>
              <p className="text-xs md:text-sm font-semibold text-gray-900">Quality Sleep</p>
              <p className="text-xs text-gray-600 mt-1">Get 7-8 hours nightly</p>
            </div>

            {/* Tip 4 */}
            <div className="rounded-lg bg-gradient-to-br from-yellow-50 to-yellow-100 p-3 cursor-pointer hover:shadow-md transition-shadow">
              <p className="text-2xl mb-2">🥗</p>
              <p className="text-xs md:text-sm font-semibold text-gray-900">Healthy Diet</p>
              <p className="text-xs text-gray-600 mt-1">Eat more vegetables & fruits</p>
            </div>
          </div>
        </div>

        {/* Featured Article */}
        <div className="rounded-lg bg-white p-3 md:p-4 shadow-sm">
          <h3 className="mb-2 md:mb-3 text-base md:text-lg font-bold text-gray-900">
            Health Tips
          </h3>
          <div
            className="cursor-pointer rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 p-3 md:p-4 transition-transform hover:scale-105"
            onClick={() => router.push('/health/articles')}
          >
            <p className="text-xs md:text-sm font-semibold text-blue-600">Featured Article</p>
            <h4 className="mt-1 font-bold text-sm md:text-base text-gray-900">
              Understanding Diabetes: Prevention and Management
            </h4>
            <p className="mt-1 text-xs md:text-sm text-gray-600">
              Learn about diabetes prevention and management strategies for a healthier life.
            </p>
            <p className="mt-2 text-xs text-gray-500">8 min read</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
