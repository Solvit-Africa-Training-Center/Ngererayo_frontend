/**
 * SELLER VERIFICATION PAGE - Document upload for seller verification
 * 
 * Integration Notes:
 * - Handles ID document and business license uploads
 * - File validation: PDF/PNG/JPG, max 100MB
 * - Redirects to /verification-pending on success
 * - Replace setTimeout with actual API calls
 * 
 * Dependencies: DocumentRequirement, VerificationDocument types
 */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressSteps from '../../components/verification/ProgressSteps';
import FileUploadArea from '../../components/verification/FileUploadArea';
import { DocumentRequirement, VerificationDocument } from '../../type/verification';

const documentRequirements: DocumentRequirement[] = [
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

const SellerVerificationPage = () => {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState<Record<string, VerificationDocument | null>>({
    id_document: null,
    business_license: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [uploadingFiles, setUploadingFiles] = useState<Record<string, boolean>>({});

  // Validates uploaded files against size and format requirements
  const validateFile = (file: File, requirement: DocumentRequirement): string | null => {
    // Check file size limit (convert MB to bytes)
    if (file.size > requirement.maxSize * 1024 * 1024) {
      return `File size must be less than ${requirement.maxSize}MB`;
    }
    
    // Check file format against accepted types
    const fileExtension = file.name.split('.').pop()?.toUpperCase();
    if (!fileExtension || !requirement.acceptedFormats.includes(fileExtension)) {
      return `File must be ${requirement.acceptedFormats.join(', ')} format`;
    }
    
    return null;
  };

  // Handles file selection and upload process
  const handleFileSelect = async (file: File, documentType: DocumentRequirement['type']) => {
    const requirement = documentRequirements.find(req => req.type === documentType);
    if (!requirement) return;

    // Validate file before processing
    const validationError = validateFile(file, requirement);
    if (validationError) {
      setErrors(prev => ({ ...prev, [documentType]: validationError }));
      return;
    }

    // Clear errors and start upload process
    setErrors(prev => ({ ...prev, [documentType]: '' }));
    setUploadingFiles(prev => ({ ...prev, [documentType]: true }));

    // TODO: Replace with actual API call to upload documents
    // Simulate upload for now
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

  // Checks if all required documents are uploaded
  const isFormComplete = () => {
    return documentRequirements.every(req => 
      req.required ? documents[req.type] !== null : true
    );
  };

  // Submits verification documents to admin for review
  const handleSubmit = async () => {
    if (!isFormComplete()) return;
    
    setIsSubmitting(true);
    try {
      // TODO: Replace with actual API call to submit documents
      // await submitVerificationDocuments(documents);
      await new Promise(resolve => setTimeout(resolve, 2000));
      navigate('/verification-pending');
    } catch (error) {
      setErrors({ submit: 'Failed to submit documents. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Join Ngererayo
          </h1>
          
          <ProgressSteps currentStep={2} />
          
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Identity Verification Required
            </h2>
            <p className="text-gray-600">
              Please upload your identification Documents as required
            </p>
          </div>

          <div className="space-y-6">
            {documentRequirements.map((requirement) => (
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