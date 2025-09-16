import { Users, Star } from 'lucide-react';
import { ServiceCategory } from '../../types/consultant';

interface ServiceCategoriesProps {
  services: ServiceCategory[];
}

const ServiceCategories = ({ services }: ServiceCategoriesProps) => {
  const getServiceIcon = (iconType: string) => {
    switch (iconType) {
      case 'plant':
        return <span className="text-2xl">🌱</span>;
      case 'users':
        return <Users className="h-6 w-6 text-green-600" />;
      case 'star':
        return <Star className="h-6 w-6 text-green-600" />;
      default:
        return <span className="text-2xl">📋</span>;
    }
  };

  const getPriceUnit = (serviceName: string) => {
    return serviceName === 'Soil Analysis' ? 'analysis' : 'hour';
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Service Categories</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service.id} className="border border-gray-200 rounded-lg p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              {getServiceIcon(service.icon)}
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">{service.name}</h3>
            <p className="text-sm text-gray-600 mb-3">{service.description}</p>
            <p className="font-medium text-green-600">
              ${service.pricePerHour}/{getPriceUnit(service.name)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceCategories;