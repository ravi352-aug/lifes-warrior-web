'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, Clock, Star, ArrowRight, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MainLayout } from '@/components/shared/Navigation';
import { useAuth } from '@/lib/hooks/useAuth';
import { getUserRequests } from '@/lib/utils/requestService';
import { RequestStatus } from '@/lib/utils/requestTypes';

export default function MyRequests() {
  const router = useRouter();
  const { user } = useAuth();
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<'all' | RequestStatus>('all');

  useEffect(() => {
    if (!user) return;

    const loadRequests = () => {
      const userRequests = getUserRequests(user.id);
      setRequests(userRequests);
      setLoading(false);
    };

    loadRequests();

    // Refresh every 10 seconds
    const interval = setInterval(loadRequests, 10000);
    return () => clearInterval(interval);
  }, [user]);

  const filteredRequests = filterStatus === 'all'
    ? requests
    : requests.filter((r) => r.status === filterStatus);

  const getStatusBadge = (status: string) => {
    const badges = {
      [RequestStatus.PENDING]: 'bg-blue-100 text-blue-800',
      [RequestStatus.ACCEPTED]: 'bg-purple-100 text-purple-800',
      [RequestStatus.IN_PROGRESS]: 'bg-orange-100 text-orange-800',
      [RequestStatus.COMPLETED]: 'bg-green-100 text-green-800',
      [RequestStatus.CANCELLED]: 'bg-red-100 text-red-800',
    };
    return badges[status as RequestStatus] || 'bg-gray-100 text-gray-800';
  };

  const getStatusText = (status: string) => {
    const texts = {
      [RequestStatus.PENDING]: 'Waiting for response',
      [RequestStatus.ACCEPTED]: 'Provider on the way',
      [RequestStatus.IN_PROGRESS]: 'In progress',
      [RequestStatus.COMPLETED]: 'Completed',
      [RequestStatus.CANCELLED]: 'Cancelled',
    };
    return texts[status as RequestStatus] || status;
  };

  if (loading) {
    return (
      <MainLayout headerProps={{ userName: user?.name || 'User' }}>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600 mx-auto mb-4" />
            <p className="text-gray-600">Loading your requests...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout headerProps={{ userName: user?.name || 'User' }}>
      <div className="space-y-6 px-4 py-4">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Requests</h1>
          <p className="mt-1 text-gray-600">Track and manage all your service requests</p>
        </div>

        {/* Action Button */}
        <Button
          onClick={() => router.push('/request-service')}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium"
        >
          New Service Request
        </Button>

        {/* Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {['all', RequestStatus.PENDING, RequestStatus.ACCEPTED, RequestStatus.COMPLETED].map(
            (status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status as any)}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  filterStatus === status
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status === 'all' ? 'All' : getStatusText(status as string)}
              </button>
            )
          )}
        </div>

        {/* Requests List */}
        {filteredRequests.length === 0 ? (
          <div className="rounded-lg border border-gray-200 bg-white p-8 text-center">
            <AlertCircle className="mx-auto h-12 w-12 text-gray-400 mb-3" />
            <p className="text-gray-600">
              {filterStatus === 'all'
                ? 'No requests yet. Create your first service request!'
                : `No ${filterStatus} requests`}
            </p>
            {filterStatus === 'all' && (
              <Button
                onClick={() => router.push('/request-service')}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white"
              >
                Create Request
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredRequests.map((request) => (
              <div
                key={request.id}
                onClick={() => router.push(`/tracking/${request.id}`)}
                className="rounded-lg border border-gray-200 bg-white p-4 hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-gray-900 capitalize">
                      {request.type.replace('_', ' ')}
                    </h3>
                    <p className="text-xs text-gray-600 mt-1">
                      {new Date(request.createdAt).toLocaleDateString()}{' '}
                      {new Date(request.createdAt).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(request.status)}`}>
                    {getStatusText(request.status)}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
                  <div className="flex items-center gap-1 text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{request.userLocation.address}</span>
                  </div>
                  <div className="text-right text-green-600 font-medium">₹{request.estimatedCost}</div>
                </div>

                {request.rating && (
                  <div className="flex items-center gap-1 pt-2 border-t border-gray-200">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < request.rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="text-sm text-gray-600 ml-2">{request.rating}/5</span>
                  </div>
                )}

                <div className="flex items-center justify-end mt-3 text-blue-600">
                  <span className="text-sm font-medium">View Details</span>
                  <ArrowRight className="h-4 w-4 ml-1" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
