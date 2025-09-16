import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, ShoppingBag, TrendingUp, Clock, MessageSquare, Globe, ShoppingCart, Bell, User } from 'lucide-react';
import { SellerProfile, DashboardMetrics as MetricsType, Product, Chat } from '../../types/seller';
import logo from '../../assets/images/LOGO.png';

// Sample data for testing
const sampleSellerProfile: SellerProfile = {
  id: '1',
  name: 'Diane',
  email: 'diane@example.com',
  phone: '+250784567890',
  location: 'Kigali, Rwanda',
  verificationStatus: 'pending',
  verificationSubmittedAt: new Date('2024-01-15'),
  joinedAt: new Date('2024-01-10'),
  rating: 4.8,
  totalSales: 2309,
  activeListings: 8
};

const sampleMetrics: MetricsType = {
  activeListings: 8,
  totalSales: 2309,
  ordersToday: 3,
  unreadMessages: 5,
  totalRevenue: 2309,
  monthlyGrowth: 15
};

const sampleChats = [
  {
    id: '1',
    buyerId: 'buyer1',
    buyerName: 'John Doe',
    productId: '1',
    productName: 'Maize',
    lastMessage: 'Is this still available?',
    lastMessageTime: new Date(),
    unreadCount: 2,
    status: 'active' as const
  },
  {
    id: '2',
    buyerId: 'buyer2',
    buyerName: 'Jane Smith',
    productId: '2',
    productName: 'Tomatoes',
    lastMessage: 'Can you deliver to Nyamirambo?',
    lastMessageTime: new Date(Date.now() - 3600000),
    unreadCount: 1,
    status: 'active' as const
  }
];

const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Maize',
    price: 20,
    unit: 'kg',
    stock: 103,
    category: 'Grains',
    description: 'Fresh organic maize',
    images: [],
    status: 'active',
    createdAt: new Date(),
    updatedAt: new Date(),
    sellerId: '1'
  },
  {
    id: '2',
    name: 'Tomatoes',
    price: 23,
    unit: 'kg',
    stock: 129,
    category: 'Vegetables',
    description: 'Fresh red tomatoes',
    images: [],
    status: 'active',
    createdAt: new Date(),
    updatedAt: new Date(),
    sellerId: '1'
  },
  {
    id: '3',
    name: 'Yams',
    price: 12,
    unit: 'kg',
    stock: 142,
    category: 'Root Vegetables',
    description: 'Fresh yams',
    images: [],
    status: 'active',
    createdAt: new Date(),
    updatedAt: new Date(),
    sellerId: '1'
  }
];

const SellerDashboard = () => {
  const [seller, setSeller] = useState<SellerProfile | null>(null);
  const [metrics, setMetrics] = useState<MetricsType | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSeller(sampleSellerProfile);
      setMetrics(sampleMetrics);
      setProducts(sampleProducts);
      setChats(sampleChats);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!seller) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-600">Error loading dashboard</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img src={logo} alt="Logo" className="h-8 w-auto" />
            <div className="leading-tight">
              <div className="text-green-700 font-bold text-lg">NGERERAYO</div>
              <p className="text-xs text-gray-500 -mt-1">Agricultural Marketplace</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex space-x-8">
            <button className="text-gray-600 hover:text-gray-900">Home</button>
            <button className="text-gray-600 hover:text-gray-900">Marketplace</button>
            <button className="text-green-600 font-medium">Dashboard</button>
          </nav>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            <button className="text-sm text-gray-600 flex items-center space-x-1">
              <Globe size={16} />
              <span>EN</span>
            </button>
            <button className="text-gray-600">
              <ShoppingCart size={20} />
            </button>
            <button className="text-gray-600">
              <Bell size={20} />
            </button>
            <div className="flex items-center space-x-2">
              <User size={20} className="text-gray-600" />
              <span className="text-gray-900 font-medium">Diane</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back Diane
            </h1>
            <div className="flex items-center space-x-2">
              <span className="text-gray-600">Account pending verification</span>
              <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-sm font-medium">
                Pending
              </span>
            </div>
          </div>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New Listing
          </button>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div 
            onClick={() => navigate('/seller/products')}
            className="bg-blue-50 p-6 rounded-lg border cursor-pointer hover:bg-blue-100 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Listings</p>
                <p className="text-2xl font-bold text-gray-900">{metrics?.activeListings || 8}</p>
              </div>
              <div className="bg-blue-500 p-3 rounded-lg">
                <ShoppingBag className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-green-50 p-6 rounded-lg border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total sales</p>
                <p className="text-2xl font-bold text-gray-900">${metrics?.totalSales || 2309}</p>
              </div>
              <div className="bg-green-500 p-3 rounded-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-purple-50 p-6 rounded-lg border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Orders Today</p>
                <p className="text-2xl font-bold text-gray-900">{metrics?.ordersToday || 3}</p>
              </div>
              <div className="bg-purple-500 p-3 rounded-lg">
                <Clock className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>

          <div 
            onClick={() => navigate('/seller/chats')}
            className="bg-orange-50 p-6 rounded-lg border cursor-pointer hover:bg-orange-100 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Messages</p>
                <p className="text-2xl font-bold text-gray-900">{metrics?.unreadMessages || 5}</p>
              </div>
              <div className="bg-orange-500 p-3 rounded-lg">
                <MessageSquare className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* My Listings */}
        <div className="bg-white rounded-lg border p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">My listings</h2>
            <button
              onClick={() => navigate('/seller/products')}
              className="text-green-600 hover:text-green-700 text-sm font-medium"
            >
              View all
            </button>
          </div>
          
          <div className="space-y-4">
            {products.slice(0, 3).map((product) => (
              <div key={product.id} className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600">{product.price}/{product.unit} - {product.stock} in stock</p>
                  <h3 className="font-medium text-gray-900">{product.name}</h3>
                </div>
                <button 
                  onClick={() => navigate(`/seller/products/${product.id}/edit`)}
                  className="text-green-600 hover:text-green-700 text-sm font-medium"
                >
                  Edit
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-green-800 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img src={logo} alt="Logo" className="h-8 w-auto" />
                <span className="text-xl font-bold">NGERERAYO</span>
              </div>
              <p className="text-sm text-gray-300 mb-4">Agricultural Marketplace</p>
              <p className="text-gray-400 text-sm">
                Rwanda's leading digital agricultural marketplace connecting farmers and buyers across the country.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">About</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-white">About us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">How it works</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Support</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Terms</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Services</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-white">Marketplace</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Cooperatives</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Payments</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Delivery</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Contact us</h3>
              <ul className="space-y-2 text-sm">
                <li className="text-red-400">+250785600440</li>
                <li className="text-red-400">info@ngererayo.rw</li>
                <li className="text-red-400">Kigali,Rwanda</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>©2024 Ngererayo. Uburenganzira bwose burinzwe. Made in Rwanda</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SellerDashboard;