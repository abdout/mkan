import DetailCard from "@/components/listings/detial-card"
import SearchHeader from "@/components/listings/search-header"
import SearchMap from "@/components/listings/search-map"
import { getListings } from "@/components/host/actions"
import { Listing } from "@/types/listing"
import { Button } from "@/components/ui/button"

async function getPublishedListings(searchParams?: {
  location?: string
  checkIn?: string
  checkOut?: string
  guests?: string
}) {
  try {
    const listings = await getListings({ publishedOnly: true });
    let filteredListings = listings as Listing[];
    
    // Apply filters based on search parameters
    if (searchParams?.location) {
      filteredListings = filteredListings.filter(listing => 
        listing.location?.city?.toLowerCase().includes(searchParams.location!.toLowerCase()) ||
        listing.location?.country?.toLowerCase().includes(searchParams.location!.toLowerCase()) ||
        listing.title?.toLowerCase().includes(searchParams.location!.toLowerCase())
      );
    }
    
    if (searchParams?.guests) {
      const guestCount = parseInt(searchParams.guests);
      filteredListings = filteredListings.filter(listing => 
        (listing.guestCount || 0) >= guestCount
      );
    }
    
    return filteredListings;
  } catch (error) {
    console.error("Error fetching published listings:", error);
    return [];
  }
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: {
    location?: string
    checkIn?: string
    checkOut?: string
    guests?: string
  }
}) {
  const listings = await getPublishedListings(searchParams);

  // Build search summary
  const searchSummary = [];
  if (searchParams?.location) searchSummary.push(searchParams.location);
  if (searchParams?.checkIn) searchSummary.push(`Check-in: ${searchParams.checkIn}`);
  if (searchParams?.checkOut) searchSummary.push(`Check-out: ${searchParams.checkOut}`);
  if (searchParams?.guests) searchSummary.push(`${searchParams.guests} guests`);

  return (
    <div className="min-h-screen bg-white">
      <SearchHeader />
      <div className="flex">
        {/* Left side - Property listings */}
        <div className="flex-1 min-h-screen">
          {/* Header with search results count */}
          <div className="p-10 border-b border-gray-200">
            <h1 className="text-base font-normal text-gray-500 mb-6">
              {listings.length}+ Airbnb Luxe stays 
              {searchParams?.location ? ` in ${searchParams.location}` : " in Bordeaux"}
              {searchSummary.length > 0 && (
                <span className="text-sm text-gray-400 ml-2">
                  • {searchSummary.join(" • ")}
                </span>
              )}
            </h1>
            
            {/* Filters */}
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="rounded-full px-3 py-1.5 text-sm font-normal border-gray-200 shadow-sm">
                Free cancellation
              </Button>
              <Button variant="outline" size="sm" className="rounded-full px-3 py-1.5 text-sm font-normal border-gray-200 shadow-sm">
                Type of place
              </Button>
              <Button variant="outline" size="sm" className="rounded-full px-3 py-1.5 text-sm font-normal border-gray-200 shadow-sm">
                Price
              </Button>
              <Button variant="outline" size="sm" className="rounded-full px-3 py-1.5 text-sm font-normal border-gray-200 shadow-sm">
                Instant Book
              </Button>
              <Button variant="outline" size="sm" className="rounded-full px-3 py-1.5 text-sm font-normal border-gray-200 shadow-sm">
                More filters
              </Button>
            </div>
          </div>

          {/* Scrollable listings - no local scrollbar */}
          <div className="p-10">
            <div className="space-y-6">
              {listings.map((listing, index) => (
                <div key={listing.id}>
                  <DetailCard 
                    title={listing.title || "Bordeaux Getaway"}
                    location={`Entire home in ${listing.location?.city || "Bordeaux"}`}
                    guests={`${listing.guestCount || 4}-${(listing.guestCount || 4) + 2} guests`}
                    beds={`${listing.bedrooms || 2} beds`}
                    baths={`${listing.bathrooms || 1} bath`}
                    amenities={listing.amenities?.join(" · ") || "Wifi · Kitchen · Free Parking"}
                    rating={listing.averageRating?.toString() || "5.0"}
                    reviews={listing.numberOfReviews?.toString() || "318"}
                    price={`$${listing.pricePerNight || 325}`}
                    image={listing.photoUrls?.[0] || "/placeholder.svg?height=200&width=300"}
                    isFavorited={false}
                  />
                  {index < listings.length - 1 && (
                    <div className="h-px bg-gray-200 mt-6"></div>
                  )}
                </div>
              ))}
              
              {/* Fallback cards if no listings */}
              {listings.length === 0 && (
                <>
                  <DetailCard 
                    title="Bordeaux Getaway"
                    price="$325"
                    isFavorited={false}
                  />
                  <div className="h-px bg-gray-200"></div>
                  <DetailCard 
                    title="Charming Waterfront Condo"
                    price="$200"
                    isFavorited={true}
                  />
                  <div className="h-px bg-gray-200"></div>
                  <DetailCard 
                    title="Historic City Center Home"
                    price="$125"
                    guests="4-6 guests"
                    beds="5 beds"
                    baths="3 bath"
                    isFavorited={false}
                  />
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right side - Search Map Component */}
        <SearchMap />
      </div>
    </div>
  )
}
