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
          <div className="space-y-4">
            <h3>
              Add some
              <br />
              photos of your house
            </h3>
            <p>
              You'll need 5 photos to get started. You can add more or make changes later.
            </p>
          </div>

          {/* Right side - Upload box */}
          <div>
            <div className="border border-dashed border-muted-foreground rounded-lg text-center bg-muted h-[300px] flex flex-col justify-center">
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
                  className="inline-block px-3 py-1.5 border border-foreground rounded-md bg-background hover:bg-accent cursor-pointer transition-colors"
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
                  <p className="mb-4">
                    {uploadedPhotos.length} photo{uploadedPhotos.length !== 1 ? 's' : ''} uploaded
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {uploadedPhotos.slice(0, 6).map((photo, index) => (
                      <div key={index} className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                        <span className="text-muted-foreground">{photo.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default PhotosPage; 