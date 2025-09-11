/**
 * SELLER DASHBOARD - Main hub for verified sellers
 * 
 * Integration Notes:
 * - Requires CartContext for cart functionality
 * - Uses seller verification status to control access
 * - Sample data included - replace with API calls
 * - Routes: /seller-dashboard, /seller-verification
 * 
 * Dependencies: SellerProfile, DashboardMetrics, Product types
 */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Clock, AlertCircle } from 'lucide-react';
import { SellerProfile, DashboardMetrics as MetricsType, Product } from '../../type/seller';
import VerificationStatus from '../../components/seller/VerificationStatus';
import DashboardMetrics from '../../components/seller/DashboardMetrics';
import ProductListings from '../../components/seller/ProductListings';

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
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadDashboardData();
  }, []);

  // Loads seller profile, metrics, and products data
  const loadDashboardData = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API calls
      // const [sellerData, metricsData, productsData] = await Promise.all([
      //   fetchSellerProfile(),
      //   fetchDashboardMetrics(), 
      //   fetchSellerProducts()
      // ]);
      
      // Using sample data for now
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSeller(sampleSellerProfile);
      setMetrics(sampleMetrics);
      setProducts(sampleProducts);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Auto-redirect unverified sellers to verification page
  useEffect(() => {
    if (seller && seller.verificationStatus === 'not_submitted') {
      navigate('/seller-verification');
    }
  }, [seller, navigate]);

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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header Section */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome back {seller.name}
            </h1>
            <VerificationStatus 
              status={seller.verificationStatus}
              submittedAt={seller.verificationSubmittedAt}
            />
          </div>
          <button
            onClick={() => navigate('/seller/products/new')}
            disabled={seller.verificationStatus !== 'verified'}
            className={`
              px-4 py-2 rounded-lg font-medium flex items-center gap-2
              ${seller.verificationStatus === 'verified' 
                ? 'bg-green-600 hover:bg-green-700 text-white' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }
            `}
          >
            <Plus className="h-4 w-4" />
            New Listing
          </button>
        </div>

        {/* Verification Notice for Pending/Rejected */}
        {seller.verificationStatus === 'pending' && (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-orange-600" />
              <div>
                <h3 className="font-medium text-orange-800">Verification in Progress</h3>
                <p className="text-sm text-orange-700">
                  Your documents are being reviewed. You'll be able to create listings once verified.
                </p>
              </div>
            </div>
          </div>
        )}

        {seller.verificationStatus === 'rejected' && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-red-600" />
                <div>
                  <h3 className="font-medium text-red-800">Verification Rejected</h3>
                  <p className="text-sm text-red-700">
                    Please resubmit your verification documents.
                  </p>
                </div>
              </div>
              <button
                onClick={() => navigate('/seller-verification')}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm"
              >
                Resubmit
              </button>
            </div>
          </div>
        )}

        {/* Metrics */}
        {metrics && <DashboardMetrics metrics={metrics} />}

        {/* Products Section */}
        {seller.verificationStatus === 'verified' && (
          <ProductListings products={products} />
        )}
      </div>
    </div>
  );
};

export default SellerDashboard;