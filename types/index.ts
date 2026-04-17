// User and Auth Types
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  dob?: string;
  location: string;
  healthScore: number;
  walletBalance: number;
  medicalHistory?: string;
  createdAt: string;
}

// Service Provider Types
export type ServiceType = 'appointment' | 'lab-test' | 'medicine' | 'ambulance' | 'caregiver';

export interface Provider {
  id: string;
  name: string;
  type: ServiceType;
  description: string;
  rating: number;
  reviewCount: number;
  responseTime: number; // in minutes
  priceRange: {
    min: number;
    max: number;
  };
  location: string;
  phone: string;
  distance: number; // in km
  availability: string; // e.g., "24/7", "9 AM - 9 PM"
  specialization?: string; // for doctors
  credentials?: string; // for doctors/caregivers
  image: string;
}

// Service Types
export interface Service {
  id: string;
  providerId: string;
  name: string;
  description: string;
  price: number;
  category?: string;
}

// Request and Quotation Types
export interface ServiceRequest {
  id: string;
  userId: string;
  serviceType: ServiceType;
  description: string;
  location: string;
  status: 'pending' | 'quoted' | 'accepted' | 'completed' | 'cancelled';
  createdAt: string;
  scheduledDate?: string;
  additionalDetails?: Record<string, any>;
}

export interface Quotation {
  id: string;
  requestId: string;
  providerId: string;
  price: number;
  availability: string;
  responseTime: number; // in minutes
  notes?: string;
  createdAt: string;
}

// Booking Types
export interface Booking {
  id: string;
  userId: string;
  providerId: string;
  serviceType: ServiceType;
  requestId?: string;
  quotationId?: string;
  status: 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  scheduledDate: string;
  amount: number;
  providerName: string;
  providerImage: string;
  createdAt: string;
}

// Health Report Types
export interface HealthReport {
  id: string;
  userId: string;
  type: 'general' | 'blood-test' | 'scan' | 'consultation';
  title: string;
  content: string;
  analysis: string;
  metrics?: Record<string, any>;
  fileUrl?: string;
  createdAt: string;
}

// Article Types
export interface Article {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  category: 'wellness' | 'disease' | 'nutrition' | 'fitness' | 'mental-health';
  author: string;
  image: string;
  readTime: number; // in minutes
  createdAt: string;
  tags: string[];
}

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  type: 'booking' | 'quotation' | 'alert' | 'article' | 'appointment';
  title: string;
  message: string;
  read: boolean;
  actionUrl?: string;
  createdAt: string;
}

// Dashboard Stats Types
export interface DashboardStats {
  nextAppointment?: {
    provider: string;
    date: string;
    time: string;
  };
  healthScore: number;
  walletBalance: number;
}
