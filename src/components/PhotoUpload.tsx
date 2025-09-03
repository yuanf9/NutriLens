import React, { useState, useRef } from 'react';
import { Camera, Upload, Image, Loader } from 'lucide-react';

interface PhotoUploadProps {
  onPhotoAnalysis: (imageUrl: string) => void;
}

export const PhotoUpload: React.FC<PhotoUploadProps> = ({ onPhotoAnalysis }) => {
  const [dragActive, setDragActive] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setPreviewImage(imageUrl);
        setIsAnalyzing(true);
        onPhotoAnalysis(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraCapture = () => {
    // In a real app, this would open camera
    // For demo, we'll use a sample image
    const sampleImage = 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400';
    setPreviewImage(sampleImage);
    setIsAnalyzing(true);
    onPhotoAnalysis(sampleImage);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Track Your Meals</h2>
        <p className="text-gray-600">Upload a photo of your meal to get instant nutrition analysis</p>
      </div>

      <div
        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
          dragActive
            ? 'border-green-500 bg-green-50'
            : 'border-gray-300 bg-white hover:border-green-400 hover:bg-green-50'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {previewImage ? (
          <div className="space-y-4">
            <div className="relative inline-block">
              <img
                src={previewImage}
                alt="Food preview"
                className="w-48 h-48 object-cover rounded-lg mx-auto"
              />
              {isAnalyzing && (
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                  <div className="text-white text-center">
                    <Loader className="w-8 h-8 animate-spin mx-auto mb-2" />
                    <p className="text-sm">Analyzing nutrition...</p>
                  </div>
                </div>
              )}
            </div>
            {!isAnalyzing && (
              <button
                onClick={() => {
                  setPreviewImage(null);
                  setIsAnalyzing(false);
                }}
                className="text-sm text-gray-500 hover:text-gray-700 underline"
              >
                Upload different image
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                <Image className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <div>
              <p className="text-lg font-medium text-gray-800 mb-2">
                Drop your meal photo here
              </p>
              <p className="text-gray-500 text-sm">
                or click to browse files
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center justify-center space-x-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                <Upload className="w-5 h-5" />
                <span>Upload Photo</span>
              </button>
              
              <button
                onClick={handleCameraCapture}
                className="flex items-center justify-center space-x-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                <Camera className="w-5 h-5" />
                <span>Take Photo</span>
              </button>
            </div>
          </div>
        )}
        
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileInput}
          className="hidden"
        />
      </div>
    </div>
  );
};