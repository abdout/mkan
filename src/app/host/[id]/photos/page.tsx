"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { StepNavigation } from '@/components/host';
import { useHostValidation } from '@/context/host-validation-context';
import { ListingProvider, useListing } from '@/components/host/use-listing';
import Image from 'next/image';
import { Plus } from 'lucide-react';

interface PhotosPageProps {
  params: Promise<{ id: string }>;
}

const PhotosPageContent = ({ params }: PhotosPageProps) => {
  const router = useRouter();
  const [id, setId] = React.useState<string>('');
  const { enableNext, disableNext } = useHostValidation();
  const { listing, updateListingData, loadListing } = useListing();
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  React.useEffect(() => {
    params.then((resolvedParams) => {
      setId(resolvedParams.id);
      // Load the listing data in the background
      const listingId = parseInt(resolvedParams.id);
      if (!isNaN(listingId)) {
        loadListing(listingId).catch(console.error);
      }
    });
  }, [params, loadListing]);

  // Load existing photos from listing
  React.useEffect(() => {
    if (listing?.photoUrls) {
      setUploadedPhotos(listing.photoUrls);
    }
  }, [listing]);

  // Enable/disable next button based on photo count
  React.useEffect(() => {
    if (uploadedPhotos.length >= 5) {
      enableNext();
    } else {
      disableNext();
    }
  }, [uploadedPhotos.length, enableNext, disableNext]);

  const handleBack = () => {
    router.push(`/host/${id}/amenities`);
  };

  const handleNext = () => {
    router.push(`/host/${id}/title`);
  };

  const uploadFileToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'your_upload_preset'); // You'll need to set this up
    
    try {
      const response = await fetch(
        'https://api.cloudinary.com/v1_1/your_cloud_name/image/upload', // Replace with your cloud name
        {
          method: 'POST',
          body: formData,
        }
      );
      
      if (!response.ok) {
        throw new Error('Upload failed');
      }
      
      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error('Upload error:', error);
      // Fallback: create object URL for preview
      return URL.createObjectURL(file);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setIsUploading(true);
      
      try {
        const newPhotos: string[] = [];
        
        for (const file of Array.from(files)) {
          const photoUrl = await uploadFileToCloudinary(file);
          newPhotos.push(photoUrl);
        }
        
        const updatedPhotos = [...uploadedPhotos, ...newPhotos];
        setUploadedPhotos(updatedPhotos);
        
        // Update backend
        await updateListingData({
          photoUrls: updatedPhotos
        });
        
      } catch (error) {
        console.error('Error uploading photos:', error);
      } finally {
        setIsUploading(false);
      }
    }
    
    // Reset input
    event.target.value = '';
  };

  const handleSingleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      
      try {
        const photoUrl = await uploadFileToCloudinary(file);
        const updatedPhotos = [...uploadedPhotos, photoUrl];
        setUploadedPhotos(updatedPhotos);
        
        // Update backend
        await updateListingData({
          photoUrls: updatedPhotos
        });
        
      } catch (error) {
        console.error('Error uploading photo:', error);
      } finally {
        setIsUploading(false);
      }
    }
    
    // Reset input
    event.target.value = '';
  };

  const removePhoto = async (index: number) => {
    const updatedPhotos = uploadedPhotos.filter((_, i) => i !== index);
    setUploadedPhotos(updatedPhotos);
    
    // Update backend
    try {
      await updateListingData({
        photoUrls: updatedPhotos
      });
    } catch (error) {
      console.error('Error removing photo:', error);
    }
  };

  const renderUploadBoxes = () => {
    const boxes = [];
    const maxPhotos = 9; // Allow more photos since we're using 3 per row
    
    // Render uploaded photos
    for (let i = 0; i < uploadedPhotos.length; i++) {
      boxes.push(
        <div
          key={`photo-${i}`}
          className="border border-solid border-foreground rounded-lg bg-muted h-[140px]"
        >
          <div className="relative w-full h-full group">
            <Image
              src={uploadedPhotos[i]}
              alt={`Photo ${i + 1}`}
              fill
              className="object-cover rounded-lg"
            />
            <button
              onClick={() => removePhoto(i)}
              className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              ×
            </button>
          </div>
        </div>
      );
    }
    
    // Add the "add button" box if we haven't reached max photos
    if (uploadedPhotos.length < maxPhotos) {
      boxes.push(
        <div
          key="add-button"
          className="border border-dashed border-muted-foreground rounded-lg bg-muted h-[140px]"
        >
          <div className="w-full h-full flex flex-col items-center justify-center">
            <label
              htmlFor="photo-upload-add"
              className="w-full h-full flex items-center justify-center cursor-pointer hover:bg-muted-foreground/10 transition-colors"
            >
              <Plus size={24} className="text-muted-foreground" />
            </label>
            <input
              id="photo-upload-add"
              type="file"
              accept="image/*"
              onChange={handleSingleFileUpload}
              disabled={isUploading}
              className="hidden"
            />
          </div>
        </div>
      );
    }
    
    return boxes;
  };

  return (
    <div className="">
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

          {/* Right side - Upload boxes */}
          <div>
            {uploadedPhotos.length === 0 ? (
              // Initial large upload box
              <div className="border border-dashed border-muted-foreground rounded-lg text-center bg-muted h-[300px] flex flex-col justify-center">
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

                <div>
                  <label
                    htmlFor="photo-upload"
                    className="inline-block px-3 py-1.5 border border-foreground rounded-md bg-background hover:bg-accent cursor-pointer transition-colors"
                  >
                    {isUploading ? 'Uploading...' : 'Add photos'}
                  </label>
                  <input
                    id="photo-upload"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileUpload}
                    disabled={isUploading}
                    className="hidden"
                  />
                </div>
              </div>
            ) : (
              // Grid of upload boxes
              <div className="grid grid-cols-3 gap-4">
                {renderUploadBoxes()}
              </div>
            )}

            {uploadedPhotos.length > 0 && (
              <div className="mt-4 text-center">
                <p className="text-sm text-muted-foreground">
                  {uploadedPhotos.length} of 5+ photos uploaded
                  {uploadedPhotos.length >= 5 && ' ✓'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const PhotosPage = ({ params }: PhotosPageProps) => {
  return (
    <ListingProvider>
      <PhotosPageContent params={params} />
    </ListingProvider>
  );
};

export default PhotosPage; 