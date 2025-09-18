import { SellerProfile } from '../../type/seller';

interface VerificationStatusProps {
  status: SellerProfile['verificationStatus'];
  submittedAt?: Date;
}

const VerificationStatus = ({ status, submittedAt }: VerificationStatusProps) => {
  // Returns styling configuration based on verification status
  const getStatusConfig = () => {
    switch (status) {
      case 'pending':
        return {
          text: 'Account pending verification',
          badge: 'Pending',
          bgColor: 'bg-orange-100',
          textColor: 'text-orange-800',
          badgeColor: 'bg-orange-500 text-white'
        };
      case 'verified':
        return {
          text: 'Account verified',
          badge: 'Verified',
          bgColor: 'bg-green-100',
          textColor: 'text-green-800',
          badgeColor: 'bg-green-500 text-white'
        };
      case 'rejected':
        return {
          text: 'Verification rejected',
          badge: 'Rejected',
          bgColor: 'bg-red-100',
          textColor: 'text-red-800',
          badgeColor: 'bg-red-500 text-white'
        };
      case 'not_submitted':
        return {
          text: 'Verification required',
          badge: 'Required',
          bgColor: 'bg-yellow-100',
          textColor: 'text-yellow-800',
          badgeColor: 'bg-yellow-500 text-white'
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div className="flex items-center gap-3 mb-6">
      <span className={`text-sm ${config.textColor}`}>{config.text}</span>
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.badgeColor}`}>
        {config.badge}
      </span>
    </div>
  );
};

export default VerificationStatus;