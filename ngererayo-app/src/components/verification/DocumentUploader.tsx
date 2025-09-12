import { useState } from 'react';
import { DocumentRequirement, VerificationDocument } from '../../type/verification';

interface DocumentUploaderProps {
  requirements: DocumentRequirement[];
  onDocumentsChange: (documents: Record<string, VerificationDocument | null>) => void;
}

const useFileUpload = () => {
  const [uploadState, setUploadState] = useState({
    documents: [] as VerificationDocument[],
    isUploading: false,
    uploadProgress: {} as Record<string, number>,
    errors: {} as Record<string, string>
  });

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

  const uploadFile = async (file: File, documentType: DocumentRequirement['type']) => {
    setUploadState(prev => ({ ...prev, isUploading: true }));
    
    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadState(prev => ({
        ...prev,
        uploadProgress: {
          ...prev.uploadProgress,
          [documentType]: Math.min((prev.uploadProgress[documentType] || 0) + 10, 90)
        }
      }));
    }, 100);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newDocument: VerificationDocument = {
        id: Date.now().toString(),
        type: documentType,
        name: file.name,
        file,
        size: file.size,
        uploadedAt: new Date(),
        status: 'uploaded'
      };

      setUploadState(prev => ({
        ...prev,
        documents: [...prev.documents.filter(doc => doc.type !== documentType), newDocument],
        uploadProgress: { ...prev.uploadProgress, [documentType]: 100 },
        isUploading: false
      }));

      clearInterval(progressInterval);
      return newDocument;
    } catch (error) {
      clearInterval(progressInterval);
      setUploadState(prev => ({
        ...prev,
        errors: { ...prev.errors, [documentType]: 'Upload failed. Please try again.' },
        isUploading: false
      }));
      throw error;
    }
  };

  return { uploadState, validateFile, uploadFile };
};

const DocumentUploader = ({ requirements, onDocumentsChange }: DocumentUploaderProps) => {
  const { uploadState, validateFile, uploadFile } = useFileUpload();

  return (
    <div className="space-y-4">
      {requirements.map((requirement) => (
        <div key={requirement.type} className="border rounded-lg p-4">
          <h3 className="font-medium text-gray-900">{requirement.label}</h3>
          <p className="text-sm text-gray-600 mb-2">{requirement.description}</p>
          <p className="text-xs text-gray-500">
            Accepted formats: {requirement.acceptedFormats.join(', ')} (max {requirement.maxSize}MB)
          </p>
        </div>
      ))}
    </div>
  );
};

export default DocumentUploader;
export { useFileUpload };