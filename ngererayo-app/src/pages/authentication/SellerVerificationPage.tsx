import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store, Users } from 'lucide-react';
import ProgressSteps from '../../components/verification/ProgressSteps';
import FileUploadArea from '../../components/verification/FileUploadArea';
import { DocumentRequirement, VerificationDocument } from '../../types/verification';

const sellerDocuments: DocumentRequirement[] = [
  {
    type: 'id_document',
    label: 'ID Document',
    description: 'National ID, Passport, or Driver\'s License',
    acceptedFormats: ['PDF', 'PNG', 'JPG'],
    maxSize: 100,
    required: true
  },
  {
    type: 'business_license',
    label: 'Business License',
    description: 'Business registration certificate or cooperative membership',
    acceptedFormats: ['PDF', 'PNG', 'JPG'],
    maxSize: 100,
    required: true
  }
];

const consultantDocuments: DocumentRequirement[] = [
  {
    type: 'id_document',
    label: 'ID Document',
    description: 'National ID, Passport, or Driver\'s License',
    acceptedFormats: ['PDF', 'PNG', 'JPG'],
    maxSize: 100,
    required: true
  },
  {
    type: 'professional_license',
    label: 'Professional License',
    description: 'Agricultural degree, certification, or professional license',
    acceptedFormats: ['PDF', 'PNG', 'JPG'],
    maxSize: 100,
    required: true
  }
];

const SellerVerificationPage = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<'seller' | 'consultant' | null>(null);
  const [documents, setDocuments] = useState<Record<string, VerificationDocument | null>>({
    id_document: null,
    business_license: null,
    professional_license: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [uploadingFiles, setUploadingFiles] = useState<Record<string, boolean>>({});

  const currentDocuments = selectedRole === 'consultant' ? consultantDocuments : sellerDocuments;

  const validateFile = (file: File, requirement: DocumentRequirement): string | null => {
    if (file.size > requirement.maxSize * 1024 * 1024) {
      return `File size must be less than ${requirement.maxSize}MB`;
    }
    
    const fileExtension = file.name.split('.').pop()?.toUpperCase();
    if (!fileExtension || !requirement.acceptedFormats.includes(fileExtension)) {
      return `File must be ${requirement.acceptedFormats.join(', ')} format`;
    }
    
    return null;
  };

  const handleFileSelect = async (file: File, documentType: DocumentRequirement['type']) => {
    const requirement = currentDocuments.find(req => req.type === documentType);
    if (!requirement) return;

    const validationError = validateFile(file, requirement);
    if (validationError) {
      setErrors(prev => ({ ...prev, [documentType]: validationError }));
      return;
    }

    setErrors(prev => ({ ...prev, [documentType]: '' }));
    setUploadingFiles(prev => ({ ...prev, [documentType]: true }));

    setTimeout(() => {
      const newDocument: VerificationDocument = {
        id: Date.now().toString(),
        type: documentType,
        name: file.name,
        file,
        size: file.size,
        uploadedAt: new Date(),
        status: 'uploaded'
      };

      setDocuments(prev => ({ ...prev, [documentType]: newDocument }));
      setUploadingFiles(prev => ({ ...prev, [documentType]: false }));
    }, 1500);
  };

  const isFormComplete = () => {
    return selectedRole && currentDocuments.every(req => 
      req.required ? documents[req.type] !== null : true
    );
  };

  const handleSubmit = async () => {
    if (!isFormComplete()) return;
    
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      if (selectedRole === 'consultant') {
        navigate('/consultant/dashboard');
      } else {
        navigate('/verification-pending');
      }
    } catch (error) {
      setErrors({ submit: 'Failed to submit documents. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!selectedRole) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
              Join Ngererayo
            </h1>
            
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Choose Your Role
              </h2>
              <p className="text-gray-600">
                Select whether you want to sell products or provide services
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button
                onClick={() => setSelectedRole('seller')}
                className="p-6 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors text-center"
              >
                <Store className="h-12 w-12 mx-auto mb-4 text-green-600" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Seller/Farmer</h3>
                <p className="text-gray-600">Sell agricultural products and produce</p>
              </button>

              <button
                onClick={() => setSelectedRole('consultant')}
                className="p-6 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors text-center"
              >
                <Users className="h-12 w-12 mx-auto mb-4 text-green-600" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Consultant</h3>
                <p className="text-gray-600">Provide professional agricultural services</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Join Ngererayo
            </h1>
            <button
              onClick={() => setSelectedRole(null)}
              className="text-green-600 hover:text-green-700 text-sm font-medium"
            >
              Change Role
            </button>
          </div>
          
          <ProgressSteps currentStep={2} />
          
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Identity Verification Required
            </h2>
            <p className="text-gray-600">
              Please upload your identification documents as required for {selectedRole}
            </p>
          </div>

          <div className="space-y-6">
            {currentDocuments.map((requirement) => (
              <FileUploadArea
                key={requirement.type}
                requirement={requirement}
                onFileSelect={(file) => handleFileSelect(file, requirement.type)}
                uploadedFile={documents[requirement.type]}
                isUploading={uploadingFiles[requirement.type] || false}
                error={errors[requirement.type]}
              />
            ))}
          </div>

          {errors.submit && (
            <p className="text-red-500 text-sm text-center mb-4">{errors.submit}</p>
          )}

          <button
            onClick={handleSubmit}
            disabled={!isFormComplete() || isSubmitting}
            className={`
              w-full py-3 px-6 rounded-lg font-medium text-white transition-colors
              ${isFormComplete() && !isSubmitting
                ? 'bg-green-600 hover:bg-green-700' 
                : 'bg-gray-400 cursor-not-allowed'
              }
            `}
          >
            {isSubmitting ? 'Submitting...' : 'Complete Registration'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellerVerificationPage;