import { getListings } from "@/components/host/action";
import ListingsHeader from "@/components/listings/listings-header";
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
      <ListingsHeader />
      <div className="layout-container py-8">
        
        
        <PropertyContent properties={listings} />
      </div>
    </div>
  );
}
