import {
  User,
  Provider,
  Service,
  ServiceRequest,
  Quotation,
  Booking,
  HealthReport,
  Article,
  Notification,
} from '@/types';

// Initialize demo users on load
export function initializeDemoUsers() {
  if (typeof window !== 'undefined') {
    const existingUsers = localStorage.getItem('healthcare_users');
    if (!existingUsers) {
      const demoUsers = [
        {
          id: 'user_demo_001',
          name: 'Ravi Kumar',
          email: 'demo@healthcare.com',
          phone: '+91 9876543210',
          password: 'Demo@123', // Remember: only for demo, never store passwords in localStorage in production
          createdAt: new Date().toISOString(),
        },
        {
          id: 'user_demo_002',
          name: 'Priya Sharma',
          email: 'priya@healthcare.com',
          phone: '+91 9876543211',
          password: 'Demo@123',
          createdAt: new Date().toISOString(),
        },
      ];
      localStorage.setItem('healthcare_users', JSON.stringify(demoUsers));
    }
  }
}

// Initialize on first import (only runs in browser)
if (typeof window !== 'undefined') {
  initializeDemoUsers();
}

// Available locations for filtering
export const AVAILABLE_LOCATIONS = [
  { id: 'bangalore-sector5', name: 'Sector 5, Bangalore', city: 'Bangalore', distance: 0, isCurrent: true, label: 'Current Location' },
  { id: 'bangalore-sector7', name: 'Sector 7, Bangalore', city: 'Bangalore', distance: 1.2, isCurrent: false },
  { id: 'bangalore-sector15', name: 'Sector 15, Bangalore', city: 'Bangalore', distance: 3.5, isCurrent: false },
  { id: 'bangalore-sector21', name: 'Sector 21, Bangalore', city: 'Bangalore', distance: 4.8, isCurrent: false },
  { id: 'delhi-sector5', name: 'Sector 5, Delhi', city: 'Delhi', distance: 0, isCurrent: false, label: 'Current Location' },
  { id: 'delhi-sector7', name: 'Sector 7, Delhi', city: 'Delhi', distance: 2.1, isCurrent: false },
  { id: 'delhi-sector15', name: 'Sector 15, Delhi', city: 'Delhi', distance: 4.2, isCurrent: false },
  { id: 'mumbai-bandra', name: 'Bandra, Mumbai', city: 'Mumbai', distance: 0, isCurrent: false, label: 'Current Location' },
  { id: 'mumbai-dadar', name: 'Dadar, Mumbai', city: 'Mumbai', distance: 2.5, isCurrent: false },
  { id: 'mumbai-andheri', name: 'Andheri, Mumbai', city: 'Mumbai', distance: 5.3, isCurrent: false },
  { id: 'hyderabad-hyd', name: 'Hyderabad', city: 'Hyderabad', distance: 0, isCurrent: false, label: 'Current Location' },
  { id: 'pune-pune', name: 'Pune', city: 'Pune', distance: 0, isCurrent: false, label: 'Current Location' },
  { id: 'kolkata-kolkata', name: 'Kolkata', city: 'Kolkata', distance: 0, isCurrent: false, label: 'Current Location' },
];

export const DEFAULT_LOCATION = AVAILABLE_LOCATIONS[0];

// Current logged-in user
export const currentUser: User = {
  id: 'user_001',
  name: 'Ravi Kumar',
  email: 'ravi@example.com',
  phone: '+91-9876543210',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ravi',
  dob: '1990-05-15',
  location: 'Bangalore, India',
  healthScore: 85,
  walletBalance: 5650,
  medicalHistory: 'No major allergies',
  createdAt: '2023-01-15',
};

// Doctors for Appointment Service
export const doctors: Provider[] = [
  {
    id: 'doctor_001',
    name: 'Dr. Priya Sharma',
    type: 'appointment',
    description: 'General Physician with 15+ years experience',
    rating: 4.8,
    reviewCount: 245,
    responseTime: 5,
    priceRange: { min: 300, max: 500 },
    location: 'Bangalore',
    phone: '+91-9123456789',
    distance: 2.5,
    availability: '9 AM - 6 PM',
    specialization: 'General Medicine',
    credentials: 'MBBS, MD',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Doctor1',
  },
  {
    id: 'doctor_002',
    name: 'Dr. Rajesh Patel',
    type: 'appointment',
    description: 'Cardiologist specializing in heart diseases',
    rating: 4.7,
    reviewCount: 189,
    responseTime: 8,
    priceRange: { min: 600, max: 1000 },
    location: 'Bangalore',
    phone: '+91-9234567890',
    distance: 4.2,
    availability: '10 AM - 5 PM',
    specialization: 'Cardiology',
    credentials: 'MBBS, MD, DM',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Doctor2',
  },
  {
    id: 'doctor_003',
    name: 'Dr. Neha Singh',
    type: 'appointment',
    description: 'Dermatologist with modern treatment options',
    rating: 4.6,
    reviewCount: 156,
    responseTime: 3,
    priceRange: { min: 400, max: 700 },
    location: 'Bangalore',
    phone: '+91-9345678901',
    distance: 1.8,
    availability: '11 AM - 7 PM',
    specialization: 'Dermatology',
    credentials: 'MBBS, MD',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Doctor3',
  },
  {
    id: 'doctor_004',
    name: 'Dr. Amit Kumar',
    type: 'appointment',
    description: 'Orthopedic surgeon with sports medicine expertise',
    rating: 4.9,
    reviewCount: 312,
    responseTime: 6,
    priceRange: { min: 500, max: 900 },
    location: 'Bangalore',
    phone: '+91-9456789012',
    distance: 3.1,
    availability: '9 AM - 8 PM',
    specialization: 'Orthopedics',
    credentials: 'MBBS, MS, Diploma Sports Medicine',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Doctor4',
  },
];

// Labs for Lab Tests Service
export const labs: Provider[] = [
  {
    id: 'lab_001',
    name: 'Accurate Diagnostics',
    type: 'lab-test',
    description: 'Full-service diagnostic lab with home collection',
    rating: 4.7,
    reviewCount: 428,
    responseTime: 2,
    priceRange: { min: 100, max: 2000 },
    location: 'Bangalore',
    phone: '+91-8123456789',
    distance: 1.5,
    availability: '24/7',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lab1',
  },
  {
    id: 'lab_002',
    name: 'PathLab Plus',
    type: 'lab-test',
    description: 'Advanced pathology with AI-based reports',
    rating: 4.6,
    reviewCount: 356,
    responseTime: 3,
    priceRange: { min: 80, max: 1800 },
    location: 'Bangalore',
    phone: '+91-8234567890',
    distance: 2.8,
    availability: '6 AM - 11 PM',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lab2',
  },
  {
    id: 'lab_003',
    name: 'HealthCare Labs',
    type: 'lab-test',
    description: 'NABL accredited lab with quick reports',
    rating: 4.8,
    reviewCount: 512,
    responseTime: 1,
    priceRange: { min: 120, max: 2200 },
    location: 'Bangalore',
    phone: '+91-8345678901',
    distance: 0.8,
    availability: '24/7',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lab3',
  },
];

// Medicine Stores
export const medicineStores: Provider[] = [
  {
    id: 'store_001',
    name: 'MediCare Pharmacy',
    type: 'medicine',
    description: 'Licensed pharmacy with home delivery',
    rating: 4.5,
    reviewCount: 634,
    responseTime: 15,
    priceRange: { min: 50, max: 5000 },
    location: 'Bangalore',
    phone: '+91-7123456789',
    distance: 0.5,
    availability: '8 AM - 10 PM',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Store1',
  },
  {
    id: 'store_002',
    name: 'HealthPlus Pharmacy',
    type: 'medicine',
    description: 'Premium pharmacy with generic alternatives',
    rating: 4.6,
    reviewCount: 501,
    responseTime: 20,
    priceRange: { min: 40, max: 4500 },
    location: 'Bangalore',
    phone: '+91-7234567890',
    distance: 1.2,
    availability: '9 AM - 9 PM',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Store2',
  },
];

// Ambulance Services
export const ambulances: Provider[] = [
  {
    id: 'ambulance_001',
    name: 'Emergency Ambulance Service',
    type: 'ambulance',
    description: 'ALS equipped ambulances with trained paramedics',
    rating: 4.9,
    reviewCount: 789,
    responseTime: 3,
    priceRange: { min: 500, max: 1500 },
    location: 'Bangalore',
    phone: '108',
    distance: 2.1,
    availability: '24/7',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ambulance1',
  },
  {
    id: 'ambulance_002',
    name: 'QuickAid Ambulance',
    type: 'ambulance',
    description: 'Non-emergency and emergency transport services',
    rating: 4.7,
    reviewCount: 456,
    responseTime: 5,
    priceRange: { min: 400, max: 1200 },
    location: 'Bangalore',
    phone: '+91-9999888877',
    distance: 3.5,
    availability: '24/7',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ambulance2',
  },
];

// Caregivers
export const caregivers: Provider[] = [
  {
    id: 'caregiver_001',
    name: 'Priya Care Services',
    type: 'caregiver',
    description: 'Experienced female caregiver for elderly care',
    rating: 4.8,
    reviewCount: 234,
    responseTime: 30,
    priceRange: { min: 300, max: 600 },
    location: 'Bangalore',
    phone: '+91-9876543210',
    distance: 2.5,
    availability: 'Flexible hours',
    credentials: 'Certified Caregiver',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Caregiver1',
  },
  {
    id: 'caregiver_002',
    name: 'Healthcare Companions',
    type: 'caregiver',
    description: 'Post-operative and rehabilitation care specialists',
    rating: 4.7,
    reviewCount: 189,
    responseTime: 25,
    priceRange: { min: 400, max: 800 },
    location: 'Bangalore',
    phone: '+91-9765432109',
    distance: 3.2,
    availability: 'Flexible hours',
    credentials: 'Certified Caregiver, First Aid',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Caregiver2',
  },
];

// Hospitals
export const hospitals: Provider[] = [
  {
    id: 'hospital_001',
    name: 'City Medical Center',
    type: 'hospital',
    description: 'Multi-specialty hospital with state-of-the-art facilities',
    rating: 4.8,
    reviewCount: 324,
    responseTime: 10,
    priceRange: { min: 1000, max: 50000 },
    location: 'Downtown, Main Street',
    phone: '+91-8012345678',
    distance: 2.5,
    availability: '24/7',
    specialization: 'Cardiology, Orthopedics',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Hospital1',
  },
  {
    id: 'hospital_002',
    name: 'Apollo Hospital',
    type: 'hospital',
    description: 'Leading healthcare provider with advanced diagnostic centers',
    rating: 4.7,
    reviewCount: 456,
    responseTime: 8,
    priceRange: { min: 1500, max: 75000 },
    location: 'Whitefield, Tech Park Road',
    phone: '+91-8023456789',
    distance: 4.8,
    availability: '24/7',
    specialization: 'Neurology, Oncology, Cardiology',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Hospital2',
  },
  {
    id: 'hospital_003',
    name: 'Fortis Healthcare',
    type: 'hospital',
    description: 'Comprehensive healthcare solutions with expert specialists',
    rating: 4.9,
    reviewCount: 567,
    responseTime: 7,
    priceRange: { min: 1200, max: 60000 },
    location: 'Indiranagar, Ring Road',
    phone: '+91-8034567890',
    distance: 3.2,
    availability: '24/7',
    specialization: 'Pediatrics, Urology, Gastroenterology',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Hospital3',
  },
  {
    id: 'hospital_004',
    name: 'Max Healthcare',
    type: 'hospital',
    description: 'Premium hospital with advanced technology and compassionate care',
    rating: 4.6,
    reviewCount: 298,
    responseTime: 12,
    priceRange: { min: 1000, max: 55000 },
    location: 'Koramangala, Brigade Road',
    phone: '+91-8045678901',
    distance: 1.8,
    availability: '24/7',
    specialization: 'Dermatology, Dentistry, Orthopedics',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Hospital4',
  },
  {
    id: 'hospital_005',
    name: 'St. Johns Hospital',
    type: 'hospital',
    description: 'Trusted healthcare institution with experienced medical staff',
    rating: 4.5,
    reviewCount: 412,
    responseTime: 15,
    priceRange: { min: 800, max: 40000 },
    location: 'Domlur, Service Road',
    phone: '+91-8056789012',
    distance: 5.2,
    availability: '24/7',
    specialization: 'General Medicine, Surgery, Pathology',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Hospital5',
  },
];

// Health Articles
export const articles: Article[] = [
  {
    id: 'article_001',
    title: 'Understanding Diabetes: Prevention and Management',
    content:
      'Diabetes is a chronic condition that affects how your body regulates blood sugar levels. This comprehensive guide covers prevention strategies, management techniques, and lifestyle modifications...',
    excerpt: 'Learn about diabetes prevention and management strategies for a healthier life.',
    category: 'disease',
    author: 'Dr. Sarah Mitchell',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=article1',
    readTime: 8,
    createdAt: '2024-03-15',
    tags: ['diabetes', 'prevention', 'health'],
  },
  {
    id: 'article_002',
    title: '10 Essential Daily Exercises for Fitness',
    content:
      'Regular exercise is key to maintaining good health. Here are 10 essential exercises you can do daily to improve your fitness, strength, and overall well-being...',
    excerpt: 'Discover 10 simple exercises to boost your daily fitness routine.',
    category: 'fitness',
    author: 'Mike Johnson',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=article2',
    readTime: 6,
    createdAt: '2024-03-12',
    tags: ['fitness', 'exercise', 'health'],
  },
  {
    id: 'article_003',
    title: 'Nutrition Guide: Superfoods for Better Health',
    content:
      'Discover the best superfoods to include in your diet for optimal nutrition. From leafy greens to antioxidant-rich berries, learn how to fuel your body...',
    excerpt: 'Explore superfoods that can transform your nutritional health.',
    category: 'nutrition',
    author: 'Dr. Emily Brown',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=article3',
    readTime: 7,
    createdAt: '2024-03-10',
    tags: ['nutrition', 'diet', 'health'],
  },
  {
    id: 'article_004',
    title: 'Mental Health Matters: Stress Management Techniques',
    content:
      'Mental health is as important as physical health. Learn practical stress management techniques and mindfulness practices to maintain psychological well-being...',
    excerpt: 'Master stress management and improve your mental wellness.',
    category: 'mental-health',
    author: 'Dr. James Wilson',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=article4',
    readTime: 9,
    createdAt: '2024-03-08',
    tags: ['mental-health', 'stress', 'wellness'],
  },
  {
    id: 'article_005',
    title: 'Sleep Quality: Tips for Better Rest',
    content:
      'Quality sleep is essential for health and productivity. This article covers tips for improving sleep quality, sleep hygiene, and addressing common sleep disorders...',
    excerpt: 'Improve your sleep quality with practical tips and techniques.',
    category: 'wellness',
    author: 'Dr. Lisa Chen',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=article5',
    readTime: 6,
    createdAt: '2024-03-05',
    tags: ['sleep', 'wellness', 'rest'],
  },
];

// Health Reports
export const healthReports: HealthReport[] = [
  {
    id: 'report_001',
    userId: 'user_001',
    type: 'blood-test',
    title: 'Complete Blood Count (CBC) Report',
    content: 'Regular checkup blood test results',
    analysis:
      'All values are within normal range. Hemoglobin levels are healthy. No concerning findings.',
    metrics: {
      hemoglobin: '14.5 g/dL',
      whiteBloodCells: '7,000-11,000/µL',
      platelets: '150,000-400,000/µL',
    },
    createdAt: '2024-02-28',
  },
  {
    id: 'report_002',
    userId: 'user_001',
    type: 'general',
    title: 'Quarterly Health Assessment',
    content: 'Comprehensive health evaluation',
    analysis: 'Overall health status is excellent. Continue current lifestyle habits.',
    metrics: {
      bmi: '22.5',
      bloodPressure: '120/80 mmHg',
      cholesterol: '180 mg/dL',
    },
    createdAt: '2024-02-20',
  },
];

// Sample Bookings
export const bookings: Booking[] = [
  {
    id: 'booking_001',
    userId: 'user_001',
    providerId: 'doctor_001',
    serviceType: 'appointment',
    status: 'confirmed',
    scheduledDate: '2024-03-25 2:30 PM',
    amount: 500,
    providerName: 'Dr. Priya Sharma',
    providerImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Doctor1',
    createdAt: '2024-03-20',
  },
  {
    id: 'booking_002',
    userId: 'user_001',
    providerId: 'lab_003',
    serviceType: 'lab-test',
    status: 'completed',
    scheduledDate: '2024-03-18',
    amount: 800,
    providerName: 'HealthCare Labs',
    providerImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lab3',
    createdAt: '2024-03-15',
  },
];

// Sample Notifications
export const notifications: Notification[] = [
  {
    id: 'notif_001',
    userId: 'user_001',
    type: 'appointment',
    title: 'Appointment Confirmed',
    message: 'Your appointment with Dr. Priya Sharma is confirmed for Tomorrow 2:30 PM',
    read: false,
    actionUrl: '/bookings/booking_001',
    createdAt: '2024-03-22',
  },
  {
    id: 'notif_002',
    userId: 'user_001',
    type: 'article',
    title: 'New Health Article',
    message: 'Check out our latest article on diabetes prevention and management',
    read: false,
    actionUrl: '/health/articles/article_001',
    createdAt: '2024-03-21',
  },
];
