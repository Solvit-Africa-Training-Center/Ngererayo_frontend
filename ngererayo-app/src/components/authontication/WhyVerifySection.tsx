import React, { useState } from 'react';
import { Info, ChevronDown, ChevronUp } from 'lucide-react';

const WhyVerifySection: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mt-6">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
      >
        <Info size={16} />
        <span className="text-sm font-medium">Why verify?</span>
        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      
      {isExpanded && (
        <div className="mt-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800">
            Account verification helps us ensure the security of our platform and prevents unauthorized access to your account. 
            This extra step protects both you and other users in our agricultural marketplace community.
          </p>
        </div>
      )}
    </div>
  );
};

export default WhyVerifySection;