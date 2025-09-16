import { useState } from 'react';
import { Upload, Check } from 'lucide-react';

interface ConsultantRegistrationProps {
  onRegistrationComplete: () => void;
  onBackToStep1: () => void;
}

const ConsultantRegistrationPage = ({ onRegistrationComplete }: ConsultantRegistrationProps) => {
  const [idDocument, setIdDocument] = useState<File | null>(null);
  const [professionalLicense, setProfessionalLicense] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = (file: File, type: 'id' | 'license') => {
    if (type === 'id') {
      setIdDocument(file);
    } else {
      setProfessionalLicense(file);
    }
  };

  const handleSubmit = async () => {
    if (!idDocument || !professionalLicense) return;
    
    setUploading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setUploading(false);
    onRegistrationComplete();
  };

  const FileUploadArea = ({ 
    label, 
    file, 
    onFileSelect, 
    required = true 
  }: { 
    label: string; 
    file: File | null; 
    onFileSelect: (file: File) => void; 
    required?: boolean;
  }) => (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-400 transition-colors">
        <input
          type="file"
          accept=".pdf,.png,.jpg,.jpeg"
          onChange={(e) => e.target.files?.[0] && onFileSelect(e.target.files[0])}
          className="hidden"
          id={`upload-${label.replace(/\s+/g, '-').toLowerCase()}`}
        />
        <label
          htmlFor={`upload-${label.replace(/\s+/g, '-').toLowerCase()}`}
          className="cursor-pointer"
        >
          {file ? (
            <div className="text-green-600">
              <Check className="h-8 w-8 mx-auto mb-2" />
              <p className="font-medium">{file.name}</p>
              <p className="text-sm text-gray-500">Click to change</p>
            </div>
          ) : (
            <div className="text-gray-500">
              <Upload className="h-8 w-8 mx-auto mb-2" />
              <p className="font-medium">Upload {label}</p>
              <p className="text-sm">PDF, PNG, JPG up to 100MB</p>
            </div>
          )}
        </label>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Progress Indicator */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-8 h-8 bg-green-500 text-white rounded-full">
              <Check className="h-4 w-4" />
            </div>
            <span className="ml-2 text-sm text-green-600 font-medium">Registration</span>
          </div>
          <div className="w-16 h-0.5 bg-green-500 mx-4"></div>
          <div className="flex items-center">
            <div className="flex items-center justify-center w-8 h-8 bg-green-500 text-white rounded-full font-medium">
              2
            </div>
            <span className="ml-2 text-sm text-green-600 font-medium">Identity Verification</span>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Join Ngererayo</h1>
            <h2 className="text-lg font-semibold text-gray-700 mb-1">Identity Verification Required</h2>
            <p className="text-gray-600">Please upload your identification documents as required</p>
          </div>

          <FileUploadArea
            label="ID Document"
            file={idDocument}
            onFileSelect={(file) => handleFileUpload(file, 'id')}
          />

          <FileUploadArea
            label="Professional License"
            file={professionalLicense}
            onFileSelect={(file) => handleFileUpload(file, 'license')}
          />

          <button
            onClick={handleSubmit}
            disabled={!idDocument || !professionalLicense || uploading}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white font-medium py-3 px-4 rounded-lg transition-colors"
          >
            {uploading ? 'Processing...' : 'Complete Registration'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConsultantRegistrationPage;