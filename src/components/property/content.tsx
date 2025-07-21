import FiltersBar from "./filters-bar";
import FiltersFull from "./filters-full";
import Listings from "./listings";
import { getListings } from "@/components/host/action";

interface SearchPageProps {
  searchParams: Promise<{
    location?: string;
    priceMin?: string;
    priceMax?: string;
    beds?: string;
    baths?: string;
    propertyType?: string;
    amenities?: string;
  }>;
}

export default async function PropertyContent({ searchParams }: SearchPageProps) {
  // Await searchParams for Next.js 15 compatibility
  const params = await searchParams;
  
  // Parse search params for filters - show all properties by default if no location specified
  const filters = {
    location: params.location || undefined, // Changed from 'Los Angeles' to undefined to show all
    priceMin: params.priceMin ? parseInt(params.priceMin) : undefined,
    priceMax: params.priceMax ? parseInt(params.priceMax) : undefined,
    beds: params.beds,
    baths: params.baths,
    propertyType: params.propertyType,
    amenities: params.amenities ? params.amenities.split(',') : undefined,
  };

  // Fetch properties using server action with error handling
  let properties: Awaited<ReturnType<typeof getListings>> = [];
  try {
    console.log('Fetching properties with filters:', filters);
    properties = await getListings(filters);
    console.log('Properties fetched:', properties.length);
  } catch (error) {
    console.error('Error fetching properties:', error);
    // Return empty array on error to prevent page crash
    properties = [];
  }

  return (
    <div className="w-full">
      {/* <div className="border-b border-gray-200">
        <FiltersBar />
      </div> */}
      
      <div className="flex relative">
        <div className="flex-1">
          <Listings properties={properties} />
        </div>
        
        {/* <FiltersFull /> */}
      </div>
    </div>
  );
}
