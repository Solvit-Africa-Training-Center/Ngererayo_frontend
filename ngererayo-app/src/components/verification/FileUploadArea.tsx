import { useState } from 'react';
import { Upload, CheckCircle } from 'lucide-react';
import { DocumentRequirement, VerificationDocument } from '../../type/verification';

interface FileUploadAreaProps {
  requirement: DocumentRequirement;
  onFileSelect: (file: File) => void;
  uploadedFile?: VerificationDocument | null;
  isUploading: boolean;
  error?: string;
}

const FileUploadArea = ({ 
  requirement, 
  onFileSelect, 
  uploadedFile, 
  isUploading, 
  error 
}: FileUploadAreaProps) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      onFileSelect(files[0]);
    }
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {requirement.label} <span className="text-red-500">*</span>
      </label>
      <div
        className={`
          border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer
          transition-colors duration-200 hover:border-green-500
          ${isDragOver ? 'border-green-500 bg-green-50' : ''}
          ${error ? 'border-red-500' : ''}
        `}
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
        onDragLeave={() => setIsDragOver(false)}
        onClick={() => document.getElementById(`file-input-${requirement.type}`)?.click()}
      >
        {uploadedFile ? (
          <div className="text-green-600">
            <CheckCircle className="w-8 h-8 mx-auto mb-2" />
            <p className="font-medium">{uploadedFile.name}</p>
            <p className="text-sm text-gray-500">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
          </div>
        ) : (
          <div className="text-gray-500">
            <Upload className="w-8 h-8 mx-auto mb-2 text-green-600" />
            <p className="font-medium text-green-600">Upload {requirement.label}</p>
            <p className="text-sm">{requirement.acceptedFormats.join(', ')} up to {requirement.maxSize}MB</p>
          </div>
        )}
        <input
          id={`file-input-${requirement.type}`}
          type="file"
          accept={requirement.acceptedFormats.map(f => `.${f.toLowerCase()}`).join(',')}
          onChange={(e) => e.target.files?.[0] && onFileSelect(e.target.files[0])}
          className="hidden"
        />
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      {isUploading && (
        <div className="mt-2">
          <div className="bg-gray-200 rounded-full h-2">
            <div className="bg-green-600 h-2 rounded-full transition-all duration-300" style={{ width: '50%' }} />
          </div>
          <p className="text-sm text-gray-600 mt-1">Uploading...</p>
        </div>
      )}
    </div>
  );
};

export default FileUploadArea;