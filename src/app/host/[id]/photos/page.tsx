"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { StepNavigation } from '@/components/host';
import Image from 'next/image';

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
    <div className=" ">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Left side - Text content */}
          <div className="">
            <h1 className="text-4xl font-medium text-gray-900 mb-4">
              Add some
              <br />
              photos of your house
            </h1>
            <p className="text-gray-600 text-lg">
              You'll need 5 photos to get started. You can add more or make changes later.
            </p>
          </div>

          {/* Right side - Upload box */}
          <div>
            <div className="border border-dashed border-neutral-500 rounded-lg  text-center bg-gray-50 h-[300px] flex flex-col justify-center">
              {/* Camera Image */}
              <div className="">
                <div className="relative w-32 h-32 mx-auto">
                  <Image
                    src="/airbnb/camera.avif"
                    alt="Camera"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Upload Button */}
              <div>
                <label
                  htmlFor="photo-upload"
                  className="inline-block px-3 py-1.5 border border-black rounded-md text-sm font-medium bg-white hover:bg-gray-50 cursor-pointer transition-colors"
                >
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
          </div>
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