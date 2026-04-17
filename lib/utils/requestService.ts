import {
  ServiceRequest,
  Notification,
  ProviderRequest,
  ServiceBooking,
  RequestStatus,
  RequestType,
} from './requestTypes';

// Service Request Management
export function createServiceRequest(
  userId: string,
  userName: string,
  userPhone: string,
  type: RequestType,
  details: Record<string, any>,
  location: { lat: number; lng: number; address: string },
  estimatedCost: number
): ServiceRequest {
  const id = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const now = new Date();
  const expiresAt = new Date(now.getTime() + 30 * 60000).toISOString(); // 30 mins

  const request: ServiceRequest = {
    id,
    userId,
    userName,
    userPhone,
    userLocation: location,
    type,
    status: RequestStatus.PENDING,
    details,
    estimatedCost,
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
    expiresAt,
  };

  // Save to localStorage
  const requests = getAllRequests();
  requests.push(request);
  localStorage.setItem('healthcare_requests', JSON.stringify(requests));

  return request;
}

export function getServiceRequest(requestId: string): ServiceRequest | null {
  const requests = getAllRequests();
  return requests.find((r) => r.id === requestId) || null;
}

export function getAllRequests(): ServiceRequest[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('healthcare_requests');
  return stored ? JSON.parse(stored) : [];
}

export function getUserRequests(userId: string): ServiceRequest[] {
  return getAllRequests().filter((r) => r.userId === userId);
}

export function getProviderRequests(providerId: string): ServiceRequest[] {
  return getAllRequests().filter((r) => r.acceptedProviderId === providerId);
}

export function updateRequestStatus(requestId: string, status: RequestStatus): ServiceRequest | null {
  const requests = getAllRequests();
  const request = requests.find((r) => r.id === requestId);

  if (request) {
    request.status = status;
    request.updatedAt = new Date().toISOString();
    if (status === RequestStatus.COMPLETED) {
      request.completedAt = new Date().toISOString();
    }
    localStorage.setItem('healthcare_requests', JSON.stringify(requests));
    return request;
  }

  return null;
}

export function acceptRequest(requestId: string, providerId: string): ServiceRequest | null {
  const requests = getAllRequests();
  const request = requests.find((r) => r.id === requestId);

  if (request) {
    request.acceptedProviderId = providerId;
    request.status = RequestStatus.ACCEPTED;
    request.updatedAt = new Date().toISOString();
    localStorage.setItem('healthcare_requests', JSON.stringify(requests));
    return request;
  }

  return null;
}

export function completeRequest(requestId: string, actualCost: number): ServiceRequest | null {
  const requests = getAllRequests();
  const request = requests.find((r) => r.id === requestId);

  if (request) {
    request.status = RequestStatus.COMPLETED;
    request.actualCost = actualCost;
    request.completedAt = new Date().toISOString();
    request.updatedAt = new Date().toISOString();
    localStorage.setItem('healthcare_requests', JSON.stringify(requests));
    return request;
  }

  return null;
}

export function rateRequest(
  requestId: string,
  rating: number,
  review: string
): ServiceRequest | null {
  const requests = getAllRequests();
  const request = requests.find((r) => r.id === requestId);

  if (request && rating >= 1 && rating <= 5) {
    request.rating = rating;
    request.review = review;
    request.updatedAt = new Date().toISOString();
    localStorage.setItem('healthcare_requests', JSON.stringify(requests));
    return request;
  }

  return null;
}

// Notification Management
export function createNotification(
  recipientId: string,
  type: Notification['type'],
  title: string,
  message: string,
  requestId?: string,
  providerId?: string,
  actionUrl?: string
): Notification {
  const id = `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  const notification: Notification = {
    id,
    recipientId,
    type,
    title,
    message,
    requestId,
    providerId,
    read: false,
    actionUrl,
    createdAt: new Date().toISOString(),
  };

  // Save to localStorage
  const notifications = getAllNotifications();
  notifications.push(notification);
  localStorage.setItem('healthcare_notifications', JSON.stringify(notifications));

  return notification;
}

export function getAllNotifications(): Notification[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('healthcare_notifications');
  return stored ? JSON.parse(stored) : [];
}

export function getUserNotifications(userId: string): Notification[] {
  return getAllNotifications()
    .filter((n) => n.recipientId === userId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function markNotificationAsRead(notificationId: string): void {
  const notifications = getAllNotifications();
  const notification = notifications.find((n) => n.id === notificationId);

  if (notification) {
    notification.read = true;
    localStorage.setItem('healthcare_notifications', JSON.stringify(notifications));
  }
}

export function getUnreadNotificationCount(userId: string): number {
  return getUserNotifications(userId).filter((n) => !n.read).length;
}

export function deleteNotification(notificationId: string): void {
  const notifications = getAllNotifications().filter((n) => n.id !== notificationId);
  localStorage.setItem('healthcare_notifications', JSON.stringify(notifications));
}

// Booking Management
export function createBooking(
  requestId: string,
  userId: string,
  providerId: string,
  type: RequestType,
  estimatedCost: number
): ServiceBooking {
  const id = `booking_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const now = new Date();

  const booking: ServiceBooking = {
    id,
    requestId,
    userId,
    providerId,
    type,
    status: RequestStatus.ACCEPTED,
    estimatedCost,
    startTime: now.toISOString(),
    createdAt: now.toISOString(),
  };

  // Save to localStorage
  const bookings = getAllBookings();
  bookings.push(booking);
  localStorage.setItem('healthcare_bookings', JSON.stringify(bookings));

  return booking;
}

export function getAllBookings(): ServiceBooking[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('healthcare_bookings');
  return stored ? JSON.parse(stored) : [];
}

export function getUserBookings(userId: string): ServiceBooking[] {
  return getAllBookings()
    .filter((b) => b.userId === userId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function getProviderBookings(providerId: string): ServiceBooking[] {
  return getAllBookings()
    .filter((b) => b.providerId === providerId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function updateBookingStatus(bookingId: string, status: RequestStatus): ServiceBooking | null {
  const bookings = getAllBookings();
  const booking = bookings.find((b) => b.id === bookingId);

  if (booking) {
    booking.status = status;
    if (status === RequestStatus.COMPLETED) {
      booking.endTime = new Date().toISOString();
      booking.completedAt = new Date().toISOString();
    }
    localStorage.setItem('healthcare_bookings', JSON.stringify(bookings));
    return booking;
  }

  return null;
}

export function rateBooking(
  bookingId: string,
  rating: number,
  review: string
): ServiceBooking | null {
  const bookings = getAllBookings();
  const booking = bookings.find((b) => b.id === bookingId);

  if (booking && rating >= 1 && rating <= 5) {
    booking.rating = rating;
    booking.review = review;
    localStorage.setItem('healthcare_bookings', JSON.stringify(bookings));
    return booking;
  }

  return null;
}
