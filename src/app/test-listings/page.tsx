import { getListings } from '@/components/host/action';
import { getHostListings } from '@/components/host/action';
import { db } from '@/lib/db';

export default async function TestListingsPage() {
  // Get all listings (no filter)
  const allListings = await getListings({});
  
  // Get only published listings
  const publishedListings = await getListings({ publishedOnly: true });
  
  // Get host listings for the Facebook account
  const hostListings = await getHostListings();
  
  // Get the Facebook account user
  const facebookUser = await db.user.findUnique({
    where: { email: 'osmanabdout@hotmail.com' }
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Listings Test Page</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Facebook Account</h2>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p><strong>Email:</strong> {facebookUser?.email}</p>
          <p><strong>Username:</strong> {facebookUser?.username}</p>
          <p><strong>Role:</strong> {facebookUser?.role}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* All Listings */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-3">All Listings ({allListings.length})</h3>
          <div className="space-y-2">
            {allListings.map((listing) => (
              <div key={listing.id} className="border p-2 rounded text-sm">
                <p className="font-medium">{listing.title}</p>
                <p className="text-gray-600">
                  Status: {listing.isPublished ? 'Published' : listing.draft ? 'Draft' : 'In Progress'}
                </p>
                <p className="text-gray-500">${listing.pricePerNight}/night</p>
              </div>
            ))}
          </div>
        </div>

        {/* Published Listings */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-3">Published Listings ({publishedListings.length})</h3>
          <div className="space-y-2">
            {publishedListings.map((listing) => (
              <div key={listing.id} className="border p-2 rounded text-sm bg-green-50">
                <p className="font-medium">{listing.title}</p>
                <p className="text-green-600">✅ Published</p>
                <p className="text-gray-500">${listing.pricePerNight}/night</p>
              </div>
            ))}
          </div>
        </div>

        {/* Host Listings */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-3">Host Listings ({hostListings.length})</h3>
          <div className="space-y-2">
            {hostListings.map((listing) => (
              <div key={listing.id} className="border p-2 rounded text-sm">
                <p className="font-medium">{listing.title}</p>
                <p className="text-gray-600">
                  Status: {listing.isPublished ? 'Published' : listing.draft ? 'Draft' : 'In Progress'}
                </p>
                <p className="text-gray-500">${listing.pricePerNight}/night</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Summary</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-100 p-4 rounded-lg text-center">
            <p className="text-2xl font-bold text-blue-600">{allListings.length}</p>
            <p className="text-sm text-blue-800">Total Listings</p>
          </div>
          <div className="bg-green-100 p-4 rounded-lg text-center">
            <p className="text-2xl font-bold text-green-600">{publishedListings.length}</p>
            <p className="text-sm text-green-800">Published</p>
          </div>
          <div className="bg-yellow-100 p-4 rounded-lg text-center">
            <p className="text-2xl font-bold text-yellow-600">
              {allListings.filter(l => l.draft).length}
            </p>
            <p className="text-sm text-yellow-800">Draft</p>
          </div>
          <div className="bg-orange-100 p-4 rounded-lg text-center">
            <p className="text-2xl font-bold text-orange-600">
              {allListings.filter(l => !l.isPublished && !l.draft).length}
            </p>
            <p className="text-sm text-orange-800">In Progress</p>
          </div>
        </div>
      </div>
    </div>
  );
} 