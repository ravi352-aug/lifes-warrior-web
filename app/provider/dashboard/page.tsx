'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Clock, MapPin, DollarSign, CheckCircle, XCircle, Star, Phone, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MainLayout } from '@/components/shared/Navigation';

interface ServiceRequest {
  id: string;
  type: string;
  customerName: string;
  customerRating: number;
  location: string;
  distance: number;
  timeAgo: string;
  quoteAmount: number;
  details: string;
  status: 'pending' | 'accepted' | 'rejected';
  customerPhone?: string;
}

const mockRequests: ServiceRequest[] = [
  {
    id: 'req_001',
    type: 'Lab Test Collection',
    customerName: 'Rajesh Kumar',
    customerRating: 4.7,
    location: 'Sector 5, Faridabad',
    distance: 2.1,
    timeAgo: '2 minutes ago',
    quoteAmount: 1200,
    details: 'Blood test collection - Home visit',
    status: 'pending',
    customerPhone: '+91-9876543456',
  },
  {
    id: 'req_002',
    type: 'Medicine Delivery',
    customerName: 'Priya Sharma',
    customerRating: 4.9,
    location: 'Sector 3, Faridabad',
    distance: 1.5,
    timeAgo: '5 minutes ago',
    quoteAmount: 450,
    details: 'Urgent medicine delivery - 3 medicines required',
    status: 'pending',
    customerPhone: '+91-9876543457',
  },
  {
    id: 'req_003',
    type: 'Caregiver Service',
    customerName: 'Dr. Desai',
    customerRating: 4.8,
    location: 'Sector 7, Faridabad',
    distance: 3.2,
    timeAgo: '8 minutes ago',
    quoteAmount: 1000,
    details: 'Elderly care - 8 hours daily service',
    status: 'pending',
    customerPhone: '+91-9876543458',
  },
  {
    id: 'req_004',
    type: 'Lab Test Collection',
    customerName: 'Amit Patel',
    customerRating: 4.6,
    location: 'Civil Lines, Faridabad',
    distance: 4.8,
    timeAgo: '12 minutes ago',
    quoteAmount: 800,
    details: 'Thyroid profile test - Home collection',
    status: 'pending',
    customerPhone: '+91-9876543459',
  },
];

export default function ProviderDashboardPage() {
  const router = useRouter();
  const [requests, setRequests] = useState<ServiceRequest[]>(mockRequests);
  const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const pendingRequests = requests.filter((r) => r.status === 'pending');
  const acceptedRequests = requests.filter((r) => r.status === 'accepted');
  const rejectedRequests = requests.filter((r) => r.status === 'rejected');

  const handleAccept = (requestId: string) => {
    setActionLoading(requestId);
    setTimeout(() => {
      setRequests((prev) =>
        prev.map((r) => (r.id === requestId ? { ...r, status: 'accepted' as const } : r))
      );
      setSelectedRequest(null);
      setActionLoading(null);
    }, 1000);
  };

  const handleReject = (requestId: string) => {
    setActionLoading(requestId);
    setTimeout(() => {
      setRequests((prev) =>
        prev.map((r) => (r.id === requestId ? { ...r, status: 'rejected' as const } : r))
      );
      setSelectedRequest(null);
      setActionLoading(null);
    }, 1000);
  };

  const stats = [
    { label: 'Pending', value: pendingRequests.length, color: 'bg-blue-100 text-blue-700' },
    { label: 'Accepted Today', value: acceptedRequests.length, color: 'bg-green-100 text-green-700' },
    { label: 'Earnings Today', value: `₹${acceptedRequests.reduce((sum, r) => sum + r.quoteAmount, 0)}`, color: 'bg-green-100 text-green-700' },
  ];

  return (
    <MainLayout
      headerProps={{
        userName: 'Dr. Sharma',
        userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=provider',
      }}
    >
      <div className="space-y-6 px-4 py-4 max-w-6xl mx-auto">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Provider Dashboard</h1>
          <p className="mt-2 text-gray-600">Manage your service requests and grow your business</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map((stat, idx) => (
            <div key={idx} className={`rounded-lg p-4 ${stat.color}`}>
              <p className="text-sm font-medium opacity-90">{stat.label}</p>
              <p className="text-3xl font-bold mt-2">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Requests List */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Incoming Requests ({pendingRequests.length})
              </h2>

              {pendingRequests.length === 0 ? (
                <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                  <Clock className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-600">No pending requests at the moment</p>
                  <p className="text-sm text-gray-500 mt-2">Check back later or adjust your availability</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {pendingRequests.map((request) => (
                    <div
                      key={request.id}
                      onClick={() => setSelectedRequest(request)}
                      className="bg-white rounded-lg border border-gray-200 p-4 cursor-pointer hover:shadow-lg hover:border-blue-300 transition-all"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-bold text-gray-900">{request.type}</h3>
                            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                              New
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">{request.customerName}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-green-600">₹{request.quoteAmount}</p>
                          <p className="text-xs text-gray-500">{request.timeAgo}</p>
                        </div>
                      </div>

                      {/* Request Details */}
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          <span>{request.distance} km away</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                          <span>{request.customerRating} rating</span>
                        </div>
                      </div>

                      <p className="text-sm text-gray-600 mb-3">{request.details}</p>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAccept(request.id);
                          }}
                          disabled={actionLoading === request.id}
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                        >
                          {actionLoading === request.id ? (
                            <>
                              <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                              Accepting...
                            </>
                          ) : (
                            <>
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Accept
                            </>
                          )}
                        </Button>
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleReject(request.id);
                          }}
                          disabled={actionLoading === request.id}
                          variant="outline"
                          className="flex-1"
                        >
                          {actionLoading === request.id ? (
                            <>
                              <div className="animate-spin h-4 w-4 border-2 border-gray-600 border-t-transparent rounded-full mr-2"></div>
                              Rejecting...
                            </>
                          ) : (
                            <>
                              <XCircle className="h-4 w-4 mr-2" />
                              Reject
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Accepted Requests */}
            {acceptedRequests.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Accepted Today ({acceptedRequests.length})</h3>
                <div className="space-y-2">
                  {acceptedRequests.map((request) => (
                    <div key={request.id} className="bg-green-50 rounded-lg border border-green-200 p-3 flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">{request.customerName}</p>
                        <p className="text-sm text-gray-600">{request.type}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600">₹{request.quoteAmount}</p>
                        <Button
                          onClick={() => router.push(`/provider/status-update/${request.id}`)}
                          className="text-xs mt-1 bg-green-600 hover:bg-green-700 text-white py-1 px-2 h-auto"
                        >
                          Update Status
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Request Details Panel */}
          {selectedRequest && (
            <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-4 h-fit">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Request Details</h3>

              <div className="space-y-4">
                {/* Customer Info */}
                <div className="border-b border-gray-200 pb-4">
                  <p className="text-sm text-gray-600 font-medium mb-2">Customer</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-gray-900">{selectedRequest.customerName}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-sm text-gray-700">{selectedRequest.customerRating}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Service Details */}
                <div className="border-b border-gray-200 pb-4">
                  <p className="text-sm text-gray-600 font-medium mb-2">Service</p>
                  <p className="font-bold text-gray-900 mb-2">{selectedRequest.type}</p>
                  <p className="text-sm text-gray-700">{selectedRequest.details}</p>
                </div>

                {/* Location & Distance */}
                <div className="border-b border-gray-200 pb-4">
                  <p className="text-sm text-gray-600 font-medium mb-2">Location</p>
                  <div className="flex items-center gap-2 text-sm text-gray-700 mb-1">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span>{selectedRequest.location}</span>
                  </div>
                  <p className="text-xs text-gray-600 ml-6">{selectedRequest.distance} km away</p>
                </div>

                {/* Quote */}
                <div className="border-b border-gray-200 pb-4">
                  <p className="text-sm text-gray-600 font-medium mb-2">Quote Amount</p>
                  <p className="text-3xl font-bold text-green-600">₹{selectedRequest.quoteAmount}</p>
                </div>

                {/* Contact Buttons */}
                <div className="flex gap-2">
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2">
                    <Phone className="h-4 w-4" />
                    Call Customer
                  </Button>
                  <Button variant="outline" className="flex-1 flex items-center justify-center gap-2">
                    <MessageCircle className="h-4 w-4" />
                    Message
                  </Button>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-4 border-t border-gray-200">
                  <Button
                    onClick={() => handleAccept(selectedRequest.id)}
                    disabled={actionLoading === selectedRequest.id}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                  >
                    {actionLoading === selectedRequest.id ? 'Accepting...' : 'Accept'}
                  </Button>
                  <Button
                    onClick={() => handleReject(selectedRequest.id)}
                    disabled={actionLoading === selectedRequest.id}
                    variant="outline"
                    className="flex-1"
                  >
                    {actionLoading === selectedRequest.id ? 'Rejecting...' : 'Reject'}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
