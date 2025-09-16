import { Video, Phone, MapPin } from 'lucide-react';
import { ConsultationSession } from '../../types/consultant';

interface UpcomingConsultationsProps {
  consultations: ConsultationSession[];
}

const UpcomingConsultations = ({ consultations }: UpcomingConsultationsProps) => {
  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Today';
    if (days === 1) return 'Tomorrow';
    return `Dec ${date.getDate()}`;
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="h-4 w-4" />;
      case 'phone': return <Phone className="h-4 w-4" />;
      case 'in-person': return <MapPin className="h-4 w-4" />;
      default: return null;
    }
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-2 py-1 rounded text-xs font-medium";
    switch (status) {
      case 'confirmed':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'pending':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  return (
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
              <span className={getStatusBadge(consultation.status)}>
                {consultation.status}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>10:00 AM {formatTime(consultation.scheduledAt)}</span>
                <div className="flex items-center space-x-1">
                  {getTypeIcon(consultation.type)}
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
  );
};

export default UpcomingConsultations;