import { ShoppingBag, TrendingUp, Clock, MessageSquare } from 'lucide-react';
import { DashboardMetrics as MetricsType } from '../../type/seller';

interface DashboardMetricsProps {
  metrics: MetricsType;
}

const DashboardMetrics = ({ metrics }: DashboardMetricsProps) => {
  // Configuration for dashboard metric cards with icons and colors
  const metricCards = [
    {
      title: 'Active Listings',
      value: metrics.activeListings,
      icon: ShoppingBag,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Total sales',
      value: `$${metrics.totalSales}`,
      icon: TrendingUp,
      color: 'bg-green-500',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Orders Today',
      value: metrics.ordersToday,
      icon: Clock,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Messages',
      value: metrics.unreadMessages,
      icon: MessageSquare,
      color: 'bg-orange-500',
      bgColor: 'bg-orange-50'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {metricCards.map((card, index) => (
        <div key={index} className={`${card.bgColor} p-6 rounded-lg border`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{card.title}</p>
              <p className="text-2xl font-bold text-gray-900">{card.value}</p>
            </div>
            <div className={`${card.color} p-3 rounded-lg`}>
              <card.icon className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardMetrics;