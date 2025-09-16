import { Users, Calendar, Star, DollarSign } from 'lucide-react';
import { ConsultantMetrics as MetricsType } from '../../types/consultant';

interface ConsultantMetricsProps {
  metrics: MetricsType;
}

const ConsultantMetrics = ({ metrics }: ConsultantMetricsProps) => {
  const metricCards = [
    {
      title: 'Active Clients',
      value: metrics.activeClients,
      icon: Users,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Consultations This Month',
      value: metrics.consultationsThisMonth,
      icon: Calendar,
      color: 'bg-green-500',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Average Rating',
      value: metrics.averageRating,
      icon: Star,
      color: 'bg-yellow-500',
      bgColor: 'bg-yellow-50'
    },
    {
      title: 'Monthly Revenue',
      value: `$${metrics.monthlyRevenue}`,
      icon: DollarSign,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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

export default ConsultantMetrics;