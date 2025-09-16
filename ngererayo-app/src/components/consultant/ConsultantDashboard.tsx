import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Plus, Users, Star, DollarSign, Video, Phone, MapPin } from 'lucide-react';
import { ConsultantProfile, ConsultantMetrics, ConsultationSession, ConsultantReview, ServiceCategory } from '../../types/consultant';
import logo from '../../assets/images/LOGO.png';

const ConsultantDashboard = () => {
  const navigate = useNavigate();
  const [consultant, setConsultant] = useState<ConsultantProfile | null>(null);
  const [metrics, setMetrics] = useState<ConsultantMetrics | null>(null);
  const [consultations, setConsultations] = useState<ConsultationSession[]>([]);
  const [reviews, setReviews] = useState<ConsultantReview[]>([]);
  const [services, setServices] = useState<ServiceCategory[]>([]);

  const sampleConsultant: ConsultantProfile = {
    id: '1',
    name: 'Dr. James Mutua',
    email: 'james@example.com',
    phone: '+250788123456',
    specializations: ['Crop Disease Management', 'Soil Analysis', 'Farm Planning'],
    experience: 8,
    rating: 4.9,
    totalConsultations: 150,
    verificationStatus: 'verified',
    documents: [],
    services: []
  };

  const sampleMetrics: ConsultantMetrics = {
    activeClients: 24,
    consultationsThisMonth: 18,
    averageRating: 4.9,
    monthlyRevenue: 3200
  };

  const sampleConsultations: ConsultationSession[] = [
    {
      id: '1',
      consultantId: '1',
      clientId: 'client1',
      clientName: 'John Mbeki',
      service: 'Crop Disease Management',
      scheduledAt: new Date(),
      duration: 60,
      status: 'scheduled',
      type: 'video',
      meetingLink: 'https://meet.example.com/123'
    },
    {
      id: '2',
      consultantId: '1',
      clientId: 'client2',
      clientName: 'Sarah Wanjiku',
      service: 'Soil Testing & Analysis',
      scheduledAt: new Date(Date.now() + 86400000),
      duration: 45,
      status: 'scheduled',
      type: 'phone'
    },
    {
      id: '3',
      consultantId: '1',
      clientId: 'client3',
      clientName: 'Peter Ochieng',
      service: 'Organic Farming Transition',
      scheduledAt: new Date(Date.now() + 172800000),
      duration: 90,
      status: 'scheduled',
      type: 'in-person'
    }
  ];

  const sampleReviews: ConsultantReview[] = [
    {
      id: '1',
      clientName: 'Mary Njeri',
      rating: 5,
      comment: 'Excellent advice on pest control. My tomato yield increased by 40%!',
      service: 'Crop Disease Management',
      createdAt: new Date(Date.now() - 172800000)
    },
    {
      id: '2',
      clientName: 'David Kiprotich',
      rating: 5,
      comment: 'Very knowledgeable about modern farming techniques. Highly recommended.',
      service: 'Farm Planning',
      createdAt: new Date(Date.now() - 604800000)
    },
    {
      id: '3',
      clientName: 'Grace Auma',
      rating: 4,
      comment: 'Helpful consultation on soil improvement. Clear and practical advice.',
      service: 'Soil Analysis',
      createdAt: new Date(Date.now() - 1209600000)
    }
  ];

  const sampleServices: ServiceCategory[] = [
    {
      id: '1',
      name: 'Crop Advisory',
      description: 'Disease, pest, and nutrient management',
      pricePerHour: 50,
      icon: 'plant',
      isActive: true
    },
    {
      id: '2',
      name: 'Farm Planning',
      description: 'Strategic planning and optimization',
      pricePerHour: 75,
      icon: 'users',
      isActive: true
    },
    {
      id: '3',
      name: 'Soil Analysis',
      description: 'Testing and improvement recommendations',
      pricePerHour: 100,
      icon: 'star',
      isActive: true
    }
  ];

  useEffect(() => {
    setConsultant(sampleConsultant);
    setMetrics(sampleMetrics);
    setConsultations(sampleConsultations);
    setReviews(sampleReviews);
    setServices(sampleServices);
  }, []);

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (days === 0) return 'Today';
    if (days === 1) return 'Tomorrow';
    if (days < 7) return `${days} days ago`;
    if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
    return `${Math.floor(days / 30)} months ago`;
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-3">
              <img 
                src={logo} 
                alt="Logo" 
                className="h-8 w-auto cursor-pointer" 
                onClick={() => navigate('/')}
              />
              <div className="leading-tight">
                <div className="text-green-700 font-bold text-lg">NGERERAYO</div>
                <p className="text-xs text-gray-500 -mt-1">Agricultural Marketplace</p>
              </div>
            </div>
            <nav className="flex space-x-8">
              <button className="text-gray-600 hover:text-gray-900">Marketplace</button>
              <button className="text-gray-600 hover:text-gray-900">Services</button>
              <button className="text-gray-600 hover:text-gray-900">About</button>
            </nav>
            <div className="flex items-center space-x-4">
              <button className="text-gray-600">🔔</button>
              <button className="text-gray-600">🛒</button>
              <button className="bg-green-600 text-white px-4 py-2 rounded">Login</button>
              <button className="bg-green-700 text-white px-4 py-2 rounded">Get Started</button>
            </div>
          </div>
          
          {/* Role Switching */}
          <div className="flex items-center space-x-4 text-sm">
            <span className="text-gray-600">Demo - Switch Role:</span>
            <button className="px-3 py-1 rounded bg-gray-100 text-gray-700">Farmer</button>
            <button className="px-3 py-1 rounded bg-gray-100 text-gray-700">Buyer</button>
            <button className="px-3 py-1 rounded bg-green-600 text-white">Consultant</button>
            <button className="px-3 py-1 rounded bg-gray-100 text-gray-700">Logistics</button>
            <button className="px-3 py-1 rounded bg-gray-100 text-gray-700">Admin</button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Dashboard Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Consultant Dashboard</h1>
            <p className="text-gray-600">Manage your consultations and client relationships</p>
          </div>
          <div className="flex space-x-4">
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Calendar className="h-4 w-4" />
              <span>My Schedule</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              <Plus className="h-4 w-4" />
              <span>Add Service</span>
            </button>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-blue-50 p-6 rounded-lg border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Clients</p>
                <p className="text-2xl font-bold text-gray-900">{metrics?.activeClients}</p>
              </div>
              <div className="bg-blue-500 p-3 rounded-lg">
                <Users className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-green-50 p-6 rounded-lg border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Consultations This Month</p>
                <p className="text-2xl font-bold text-gray-900">{metrics?.consultationsThisMonth}</p>
              </div>
              <div className="bg-green-500 p-3 rounded-lg">
                <Calendar className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 p-6 rounded-lg border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Rating</p>
                <p className="text-2xl font-bold text-gray-900">{metrics?.averageRating}</p>
              </div>
              <div className="bg-yellow-500 p-3 rounded-lg">
                <Star className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-purple-50 p-6 rounded-lg border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                <p className="text-2xl font-bold text-gray-900">${metrics?.monthlyRevenue}</p>
              </div>
              <div className="bg-purple-500 p-3 rounded-lg">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Upcoming Consultations */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Upcoming Consultations</h2>
              <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                View Calendar
              </button>
            </div>
            
            <div className="space-y-4">
              {consultations.slice(0, 3).map((consultation) => (
                <div key={consultation.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium text-gray-900">{consultation.clientName}</h3>
                      <p className="text-sm text-gray-600">{consultation.service}</p>
                    </div>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                      confirmed
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>10:00 AM {formatTime(consultation.scheduledAt)}</span>
                      <div className="flex items-center space-x-1">
                        {consultation.type === 'video' && <Video className="h-4 w-4" />}
                        {consultation.type === 'phone' && <Phone className="h-4 w-4" />}
                        {consultation.type === 'in-person' && <MapPin className="h-4 w-4" />}
                        <span>{consultation.type}</span>
                      </div>
                    </div>
                    <button className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700">
                      Join Call
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Reviews */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Recent Reviews</h2>
              <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                View All
              </button>
            </div>
            
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-100 pb-4 last:border-b-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">{review.clientName}</h3>
                    <div className="flex items-center space-x-1">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">"{review.comment}"</p>
                  <p className="text-xs text-gray-500">{formatTime(review.createdAt)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Service Categories */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Service Categories</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service) => (
              <div key={service.id} className="border border-gray-200 rounded-lg p-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  {service.icon === 'plant' && <span className="text-2xl">🌱</span>}
                  {service.icon === 'users' && <Users className="h-6 w-6 text-green-600" />}
                  {service.icon === 'star' && <Star className="h-6 w-6 text-green-600" />}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{service.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{service.description}</p>
                <p className="font-medium text-green-600">
                  ${service.pricePerHour}/{service.name === 'Soil Analysis' ? 'analysis' : 'hour'}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultantDashboard;