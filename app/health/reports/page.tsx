'use client';

import { useRouter } from 'next/navigation';
import { FileText, Calendar, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MainLayout } from '@/components/shared/Navigation';
import { currentUser, healthReports } from '@/lib/mockData';

export default function HealthReportsPage() {
  const router = useRouter();

  return (
    <MainLayout
      headerProps={{
        userName: currentUser.name,
        userAvatar: currentUser.avatar,
      }}
    >
      <div className="space-y-6 px-4 py-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Health Reports</h1>
          <p className="mt-1 text-gray-600">View and manage your health analysis reports</p>
        </div>

        {/* Health Score Overview */}
        <div className="rounded-lg bg-gradient-to-r from-green-50 to-blue-50 p-6 border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-700 font-medium">Your Health Score</p>
              <p className="text-4xl font-bold text-gray-900 mt-2">
                {currentUser.healthScore}
                <span className="text-lg text-gray-600">/100</span>
              </p>
              <p className="mt-2 text-sm text-gray-600">Last updated today</p>
            </div>
            <div className="text-6xl">💚</div>
          </div>
        </div>

        {/* Reports List */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">Your Reports</h2>
            <Button variant="outline" size="sm">
              Download All
            </Button>
          </div>

          {healthReports.length === 0 ? (
            <div className="rounded-lg border border-gray-200 bg-white p-8 text-center">
              <FileText className="mx-auto mb-3 h-12 w-12 text-gray-300" />
              <p className="text-gray-600">No reports yet</p>
              <p className="text-sm text-gray-500">
                Your health reports will appear here after tests or consultations
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {healthReports.map((report) => (
                <div
                  key={report.id}
                  className="overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow hover:shadow-lg"
                >
                  <div className="p-4">
                    <div className="mb-3 flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div
                            className={`rounded-lg p-2 ${
                              report.type === 'blood-test'
                                ? 'bg-red-100 text-red-600'
                                : report.type === 'scan'
                                  ? 'bg-purple-100 text-purple-600'
                                  : report.type === 'general'
                                    ? 'bg-blue-100 text-blue-600'
                                    : 'bg-green-100 text-green-600'
                            }`}
                          >
                            <FileText className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-900">
                              {report.title}
                            </h3>
                            <p className="text-xs text-gray-500 capitalize">
                              {report.type.replace('-', ' ')}
                            </p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">{report.content}</p>
                        <p className="mt-2 text-sm font-medium text-green-600">
                          Analysis: {report.analysis}
                        </p>
                      </div>
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
                    </div>

                    {/* Metrics */}
                    {report.metrics && (
                      <div className="mt-3 border-t border-gray-200 pt-3">
                        <p className="mb-2 text-xs font-semibold text-gray-700">
                          Key Metrics:
                        </p>
                        <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                          {Object.entries(report.metrics).map(([key, value]) => (
                            <div
                              key={key}
                              className="rounded bg-gray-50 p-2 text-xs"
                            >
                              <p className="text-gray-600">
                                {key.replace(/([A-Z])/g, ' $1').trim()}
                              </p>
                              <p className="font-medium text-gray-900">{value}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="mt-3 flex items-center justify-between border-t border-gray-200 pt-3 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{report.createdAt}</span>
                      </div>
                      <Button variant="ghost" size="sm" className="text-blue-600">
                        Download PDF
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Health Tips */}
        <div className="rounded-lg bg-blue-50 p-6 border border-blue-200">
          <h3 className="mb-3 font-bold text-gray-900 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            Health Tips
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>✓ Maintain regular exercise routine for better health scores</li>
            <li>✓ Schedule quarterly health checkups for preventive care</li>
            <li>✓ Keep track of your health metrics for better insights</li>
            <li>✓ Read health articles to stay informed about wellness</li>
          </ul>
        </div>
      </div>
    </MainLayout>
  );
}
