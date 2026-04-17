'use client';

import { useState } from 'react';
import { Calendar, Clock, CheckCircle, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ScheduleSlot {
  day: string;
  date: string;
  startTime: string;
  endTime: string;
  available: number;
  booked: number;
}

const mockSchedule: ScheduleSlot[] = [
  { day: 'Monday', date: '2026-03-24', startTime: '09:00 AM', endTime: '06:00 PM', available: 8, booked: 3 },
  { day: 'Tuesday', date: '2026-03-25', startTime: '09:00 AM', endTime: '06:00 PM', available: 8, booked: 5 },
  { day: 'Wednesday', date: '2026-03-26', startTime: '09:00 AM', endTime: '06:00 PM', available: 8, booked: 2 },
  { day: 'Thursday', date: '2026-03-27', startTime: '09:00 AM', endTime: '06:00 PM', available: 8, booked: 6 },
  { day: 'Friday', date: '2026-03-28', startTime: '09:00 AM', endTime: '06:00 PM', available: 8, booked: 4 },
  { day: 'Saturday', date: '2026-03-29', startTime: '10:00 AM', endTime: '04:00 PM', available: 6, booked: 3 },
];

export default function ProviderSchedulePage() {
  const [schedule] = useState<ScheduleSlot[]>(mockSchedule);

  return (
    <div className="space-y-6 px-4 py-4 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Schedule Management</h1>
          <p className="mt-2 text-gray-600">Manage your availability and service hours</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Slot
        </Button>
      </div>

      {/* Weekly Schedule */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <h2 className="font-bold text-gray-900">This Week's Schedule</h2>
        </div>

        <div className="divide-y divide-gray-200">
          {schedule.map((slot, idx) => (
            <div key={idx} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-gray-900">{slot.day}</h3>
                    <span className="text-sm text-gray-500">{slot.date}</span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="h-4 w-4" />
                      {slot.startTime} - {slot.endTime}
                    </div>
                    <div className="text-gray-600">
                      Available: <span className="font-medium">{slot.available}</span>
                    </div>
                    <div className="text-gray-600">
                      Booked: <span className="font-medium">{slot.booked}</span>
                    </div>
                    <div className="text-gray-600">
                      Availability: <span className="font-medium">{((slot.available - slot.booked) / slot.available * 100).toFixed(0)}%</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: `${((slot.available - slot.booked) / slot.available * 100)}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex gap-2 ml-4">
                  <Button variant="outline" className="text-xs">
                    Edit
                  </Button>
                  <Button variant="outline" className="text-xs">
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Settings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="font-bold text-gray-900 mb-4">Default Working Hours</h3>
          <div className="space-y-3">
            {['Monday to Friday', 'Saturday', 'Sunday'].map((day, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <span className="text-gray-600">{day}</span>
                <input
                  type="text"
                  placeholder="09:00 AM - 06:00 PM"
                  className="px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="font-bold text-gray-900 mb-4">Days Off</h3>
          <div className="space-y-2">
            {['Add day off', 'Manage holidays', 'Set vacation dates'].map((item, idx) => (
              <Button key={idx} variant="outline" className="w-full justify-start">
                <Plus className="h-4 w-4 mr-2" />
                {item}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
