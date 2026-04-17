import { ServiceRequest, Quotation, Booking } from '@/types';

// Service Request Management
export function createServiceRequest(
  userId: string,
  tests?: string[],
  documentUrl?: string,
  location?: string,
  preferredDate?: string
): ServiceRequest {
  const request: ServiceRequest = {
    id: `req_${Date.now()}`,
    userId,
    tests: tests || [],
    documentUrl,
    location: location || '',
    preferredDate: preferredDate || new Date().toISOString().split('T')[0],
    status: 'pending',
    createdAt: new Date().toISOString(),
  };
  
  saveServiceRequest(request);
  return request;
}

export function getServiceRequests(userId: string): ServiceRequest[] {
  if (typeof window === 'undefined') return [];
  const requests = localStorage.getItem('lab_requests');
  if (!requests) return [];
  
  const allRequests = JSON.parse(requests) as ServiceRequest[];
  return allRequests.filter(r => r.userId === userId);
}

export function saveServiceRequest(request: ServiceRequest) {
  if (typeof window === 'undefined') return;
  
  const requests = localStorage.getItem('lab_requests');
  const allRequests = requests ? JSON.parse(requests) : [];
  
  const index = allRequests.findIndex((r: ServiceRequest) => r.id === request.id);
  if (index >= 0) {
    allRequests[index] = request;
  } else {
    allRequests.push(request);
  }
  
  localStorage.setItem('lab_requests', JSON.stringify(allRequests));
}

// Quotation Management
export function generateMockQuotations(requestId: string, nearbyLabs: any[]): Quotation[] {
  const quotations: Quotation[] = nearbyLabs.map((lab, index) => ({
    id: `quo_${requestId}_${lab.id}`,
    requestId,
    labId: lab.id,
    labName: lab.name,
    price: Math.floor(Math.random() * 2000) + 500,
    availability: ['Today', 'Tomorrow', 'Day after tomorrow'][Math.floor(Math.random() * 3)],
    responseTime: `${Math.floor(Math.random() * 4) + 1} hour${Math.floor(Math.random() * 4) + 1 > 1 ? 's' : ''}`,
    rating: (Math.random() * 2 + 3.5).toFixed(1),
    reviewCount: Math.floor(Math.random() * 500) + 50,
    createdAt: new Date().toISOString(),
    status: 'active',
  }));
  
  saveQuotations(quotations);
  return quotations;
}

export function getQuotations(requestId: string): Quotation[] {
  if (typeof window === 'undefined') return [];
  const quotations = localStorage.getItem('lab_quotations');
  if (!quotations) return [];
  
  const allQuotations = JSON.parse(quotations) as Quotation[];
  return allQuotations.filter(q => q.requestId === requestId);
}

export function saveQuotations(quotations: Quotation[]) {
  if (typeof window === 'undefined') return;
  
  const existing = localStorage.getItem('lab_quotations');
  const allQuotations = existing ? JSON.parse(existing) : [];
  
  quotations.forEach(quotation => {
    const index = allQuotations.findIndex((q: Quotation) => q.id === quotation.id);
    if (index >= 0) {
      allQuotations[index] = quotation;
    } else {
      allQuotations.push(quotation);
    }
  });
  
  localStorage.setItem('lab_quotations', JSON.stringify(allQuotations));
}

// Booking Management
export function createBooking(
  userId: string,
  labId: string,
  quotationId: string,
  requestId?: string,
  tests?: string[],
  bookingDate?: string
): Booking {
  const booking: Booking = {
    id: `book_${Date.now()}`,
    userId,
    labId,
    quotationId,
    requestId,
    tests: tests || [],
    bookingDate: bookingDate || new Date().toISOString().split('T')[0],
    status: 'confirmed',
    createdAt: new Date().toISOString(),
  };
  
  saveBooking(booking);
  return booking;
}

export function getBookings(userId: string): Booking[] {
  if (typeof window === 'undefined') return [];
  const bookings = localStorage.getItem('lab_bookings');
  if (!bookings) return [];
  
  const allBookings = JSON.parse(bookings) as Booking[];
  return allBookings.filter(b => b.userId === userId);
}

export function saveBooking(booking: Booking) {
  if (typeof window === 'undefined') return;
  
  const bookings = localStorage.getItem('lab_bookings');
  const allBookings = bookings ? JSON.parse(bookings) : [];
  
  const index = allBookings.findIndex((b: Booking) => b.id === booking.id);
  if (index >= 0) {
    allBookings[index] = booking;
  } else {
    allBookings.push(booking);
  }
  
  localStorage.setItem('lab_bookings', JSON.stringify(allBookings));
}

// Helper: Get nearby labs based on location
export function getNearbyLabs(location: string, allLabs: any[]): any[] {
  return allLabs.filter(lab => 
    lab.location.toLowerCase().includes(location.toLowerCase())
  ).slice(0, 5); // Return top 5 nearby labs
}

// Helper: Sort quotations by price or rating
export function sortQuotations(
  quotations: Quotation[],
  sortBy: 'price' | 'rating' | 'responseTime' = 'price'
): Quotation[] {
  const sorted = [...quotations];
  
  if (sortBy === 'price') {
    sorted.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'rating') {
    sorted.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
  } else if (sortBy === 'responseTime') {
    sorted.sort((a, b) => {
      const aHours = parseInt(a.responseTime);
      const bHours = parseInt(b.responseTime);
      return aHours - bHours;
    });
  }
  
  return sorted;
}

// Helper: Filter quotations by price range
export function filterQuotationsByPrice(
  quotations: Quotation[],
  minPrice: number,
  maxPrice: number
): Quotation[] {
  return quotations.filter(q => q.price >= minPrice && q.price <= maxPrice);
}

// Helper: Filter quotations by rating
export function filterQuotationsByRating(
  quotations: Quotation[],
  minRating: number
): Quotation[] {
  return quotations.filter(q => parseFloat(q.rating) >= minRating);
}
