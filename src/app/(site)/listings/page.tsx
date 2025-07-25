import { getListings } from "@/components/host/actions";
import ListingsHeader from "@/components/listings/listings-header";
import MobileListingsHeader from "@/components/listings/mobile-listings-header";
import { PropertyContent } from "@/components/listings/property/content";
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
      {/* Desktop Header - Hidden on mobile */}
      <div className="hidden md:block sticky top-0 z-50">
        <ListingsHeader />
      </div>
      
      {/* Mobile Header - Hidden on desktop */}
      <MobileListingsHeader />
      
      <div className="layout-container py-8">
        <PropertyContent properties={listings} />
      </div>
    </div>
  );
}
