"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { StepNavigation } from '@/components/host';
import { Camera, Upload } from 'lucide-react';

interface PhotosPageProps {
  params: Promise<{ id: string }>;
}

const PhotosPage = ({ params }: PhotosPageProps) => {
  const router = useRouter();
  const [id, setId] = React.useState<string>('');
  const [uploadedPhotos, setUploadedPhotos] = useState<File[]>([]);

  React.useEffect(() => {
    params.then((resolvedParams) => {
      setId(resolvedParams.id);
    });
  }, [params]);

  const handleBack = () => {
    router.push(`/host/${id}/amenities`);
  };

  const handleNext = () => {
    router.push(`/host/${id}/title`);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setUploadedPhotos(prev => [...prev, ...Array.from(files)]);
    }
  };

  return (
    <div className="min-h-screen bg-white pb-24">
      <div className="max-w-4xl mx-auto px-6 pt-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-medium text-gray-900 mb-4">
            Add some photos of your house
          </h1>
          <p className="text-gray-600 text-lg">
            You'll need 5 photos to get started. You can add more or make changes later.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="border-2 border-dashed border-gray-300 rounded-2xl p-16 text-center bg-gray-50">
            {/* Camera Icon */}
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-20 h-16 bg-gray-200 rounded-xl">
                <Camera size={32} className="text-gray-500" />
                <div className="absolute translate-x-2 translate-y-2">
                  <div className="w-6 h-6 bg-amber-600 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-amber-300 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Upload Button */}
            <div className="space-y-4">
              <label
                htmlFor="photo-upload"
                className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-lg text-base font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <Upload size={20} className="mr-2" />
                Add photos
              </label>
              <input
                id="photo-upload"
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>

            {uploadedPhotos.length > 0 && (
              <div className="mt-8">
                <p className="text-sm text-gray-600 mb-4">
                  {uploadedPhotos.length} photo{uploadedPhotos.length !== 1 ? 's' : ''} uploaded
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {uploadedPhotos.slice(0, 6).map((photo, index) => (
                    <div key={index} className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-gray-500 text-sm">{photo.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {uploadedPhotos.length < 5 && (
            <p className="text-center text-sm text-gray-500 mt-4">
              {uploadedPhotos.length}/5 photos minimum required
            </p>
          )}
        </div>
      </div>

      <StepNavigation
        onBack={handleBack}
        onNext={handleNext}
        backLabel="Back"
        nextLabel="Next"
        nextDisabled={uploadedPhotos.length < 5}
      />
    </div>
  );
};

export default PhotosPage; 