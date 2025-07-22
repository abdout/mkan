import { getListings } from "@/components/host/action";
import { PropertyContent } from "@/components/site/property/content";
import { Listing } from "@/types/listing";

async function getPublishedListings() {
  try {
    const listings = await getListings({ publishedOnly: true });
    return listings as Listing[];
  } catch (error) {
    console.error("Error fetching published listings:", error);
    return [];
  }
}

export default async function ListingsPage() {
  const listings = await getPublishedListings();

  return (
    <div className="min-h-screen bg-background">
      <div className="layout-container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            All Available Properties
          </h1>
          <p className="text-gray-600">
            Discover amazing places to stay from our community of hosts
          </p>
        </div>
        
        <PropertyContent properties={listings} />
      </div>
    </div>
  );
}
