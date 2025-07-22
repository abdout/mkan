import AmenityViewer from '@/components/listings/amenity-viewer';

export default function TestAmenityViewerPage() {
  // Sample amenities that match the image
  const sampleAmenities = [
    'wifi',
    'tv', 
    'free-parking',
    'air-conditioning',
    'smoke-alarm',
    'kitchen',
    'washer',
    'pool',
    'hot-tub',
    'patio'
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-8">Amenity Viewer Test</h1>
      <div className="max-w-2xl">
        <AmenityViewer amenities={sampleAmenities} />
      </div>
    </div>
  );
} 