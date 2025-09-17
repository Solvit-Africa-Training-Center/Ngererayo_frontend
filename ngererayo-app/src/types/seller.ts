export interface SellerProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  verificationStatus: 'pending' | 'verified' | 'rejected' | 'not_submitted';
  verificationSubmittedAt?: Date;
  verifiedAt?: Date;
  joinedAt: Date;
  rating: number;
  totalSales: number;
  activeListings: number;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  unit: string;
  stock: number;
  category: string;
  description: string;
  images: string[];
  status: 'active' | 'inactive' | 'out_of_stock';
  createdAt: Date;
  updatedAt: Date;
  sellerId: string;
}

export interface DashboardMetrics {
  activeListings: number;
  totalSales: number;
  ordersToday: number;
  unreadMessages: number;
  totalRevenue: number;
  monthlyGrowth: number;
}

export interface RecentOrder {
  id: string;
  buyerName: string;
  products: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  orderDate: Date;
}