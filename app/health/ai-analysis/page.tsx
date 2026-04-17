'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, Upload, Brain, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MainLayout } from '@/components/shared/Navigation';
import { currentUser } from '@/lib/mockData';

export default function AIAnalysisPage() {
  const router = useRouter();

  const sampleReports = [
    {
      id: 1,
      title: 'Blood Test Report - January 2024',
      date: 'Jan 15, 2024',
      status: 'analyzed',
      summary: 'Generally healthy with slightly elevated cholesterol levels. Recommended: Increase physical activity.',
      insights: [
        'Hemoglobin: Normal (13.2 g/dL)',
        'Cholesterol: Slightly High (210 mg/dL)',
        'Blood Sugar: Normal (95 mg/dL)',
        'Blood Pressure: Normal (120/80)',
      ],
    },
    {
      id: 2,
      title: 'Thyroid Profile - December 2023',
      date: 'Dec 10, 2023',
      status: 'analyzed',
      summary: 'Thyroid function within normal range. No medication adjustments needed.',
      insights: ['TSH: 2.1 mIU/L (Normal)', 'T3: 1.8 ng/mL (Normal)', 'T4: 8.5 mcg/dL (Normal)'],
    },
    {
      id: 3,
      title: 'Liver Function Test - November 2023',
      date: 'Nov 20, 2023',
      status: 'analyzed',
      summary: 'All liver parameters are normal. Continue current lifestyle habits.',
      insights: [
        'ALT: 28 U/L (Normal)',
        'AST: 32 U/L (Normal)',
        'Bilirubin: 0.8 mg/dL (Normal)',
      ],
    },
  ];

  const analysisFeatures = [
    {
      icon: <Brain className="h-8 w-8" />,
      title: 'AI-Powered Analysis',
      description: 'Advanced machine learning algorithms analyze your health data',
    },
    {
      icon: <CheckCircle className="h-8 w-8" />,
      title: 'Instant Insights',
      description: 'Get immediate analysis and health recommendations',
    },
    {
      icon: <AlertCircle className="h-8 w-8" />,
      title: 'Health Alerts',
      description: 'Receive alerts for any concerning health indicators',
    },
  ];

  return (
    <MainLayout
      headerProps={{
        userName: currentUser.name,
        userAvatar: currentUser.avatar,
        notificationCount: 2,
      }}
    >
      <div className="space-y-4 md:space-y-6 px-4 py-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="rounded-lg p-2 hover:bg-gray-100"
          >
            <ArrowLeft className="h-5 w-5 text-gray-700" />
          </button>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">AI Report Analysis</h1>
        </div>

        {/* Upload Section */}
        <div className="rounded-lg border-2 border-dashed border-blue-300 bg-blue-50 p-6 md:p-8 text-center">
          <Upload className="h-12 w-12 text-blue-600 mx-auto mb-3" />
          <p className="text-sm md:text-base font-semibold text-gray-900 mb-2">
            Upload Your Health Report
          </p>
          <p className="text-xs md:text-sm text-gray-600 mb-4">
            Drag and drop your report image or PDF here, or click to browse
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            Choose File
          </Button>
          <p className="text-xs text-gray-500 mt-3">Supported formats: JPG, PNG, PDF</p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
          {analysisFeatures.map((feature, index) => (
            <div key={index} className="rounded-lg bg-white p-4 shadow-sm">
              <div className="text-indigo-600 mb-2">{feature.icon}</div>
              <h3 className="font-bold text-gray-900 mb-1 text-sm md:text-base">
                {feature.title}
              </h3>
              <p className="text-xs md:text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Previous Reports */}
        <div>
          <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">
            Your Previous Reports
          </h2>

          <div className="space-y-3">
            {sampleReports.map((report) => (
              <div
                key={report.id}
                onClick={() => {}}
                className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm md:text-base">
                      {report.title}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-500">{report.date}</p>
                  </div>
                  <span className="inline-block px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full font-semibold">
                    Analyzed
                  </span>
                </div>

                <p className="text-xs md:text-sm text-gray-700 mb-3">{report.summary}</p>

                <div className="bg-gray-50 rounded-lg p-3 mb-3">
                  <p className="text-xs font-semibold text-gray-900 mb-2">Key Insights:</p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {report.insights.map((insight, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-600 flex-shrink-0" />
                        {insight}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  variant="outline"
                  className="w-full text-blue-600 border-blue-300 hover:bg-blue-50"
                >
                  View Full Analysis
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
