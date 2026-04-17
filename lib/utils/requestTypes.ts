// Service Request Types and Enums
export enum RequestStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export enum RequestType {
  APPOINTMENT = 'appointment',
  LAB_TEST = 'lab_test',
  AMBULANCE = 'ambulance',
  MEDICINE = 'medicine',
  CAREGIVER = 'caregiver',
}

export interface ServiceRequest {
  id: string;
  userId: string;
  userName: string;
  userPhone: string;
  userLocation: {
    lat: number;
    lng: number;
    address: string;
  };
  type: RequestType;
  status: RequestStatus;
  details: Record<string, any>;
  preferredProviderId?: string;
  acceptedProviderId?: string;
  estimatedCost: number;
  actualCost?: number;
  rating?: number;
  review?: string;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  expiresAt: string;
}

export interface Notification {
  id: string;
  recipientId: string;
  type: 'request' | 'acceptance' | 'rejection' | 'update' | 'completion' | 'rating';
  title: string;
  message: string;
  requestId?: string;
  providerId?: string;
  read: boolean;
  actionUrl?: string;
  createdAt: string;
}

export interface ProviderRequest {
  requestId: string;
  providerId: string;
  providerName: string;
  distance: number;
  estimatedArrival: number;
  status: 'pending' | 'accepted' | 'rejected';
  quotedPrice?: number;
  respondedAt?: string;
}

export interface ServiceBooking {
  id: string;
  requestId: string;
  userId: string;
  providerId: string;
  type: RequestType;
  status: RequestStatus;
  estimatedCost: number;
  actualCost?: number;
  startTime: string;
  endTime?: string;
  rating?: number;
  review?: string;
  createdAt: string;
  completedAt?: string;
}
