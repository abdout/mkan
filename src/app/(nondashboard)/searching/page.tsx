import { getListings } from '@/components/host/action';
import { PropertyContent } from "@/components/site/property/content";

async function getListingsData(filters: any) {
  try {
    const listings = await getListings({ ...filters, publishedOnly: true });
    return listings;
  } catch (error) {
    console.error("Error fetching listings:", error);
    return [];
  }
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const filters = {
    location: searchParams.location as string | undefined,
    priceMin: searchParams.priceMin
      ? Number(searchParams.priceMin)
      : undefined,
    priceMax: searchParams.priceMax
      ? Number(searchParams.priceMax)
      : undefined,
    beds: searchParams.beds ? Number(searchParams.beds) : undefined,
    baths: searchParams.baths ? Number(searchParams.baths) : undefined,
    propertyType: searchParams.propertyType as any | undefined,
    amenities: searchParams.amenities as any | undefined,
  };

  const listings = await getListingsData(filters);

  return (
    <div className="bg-background">
      <PropertyContent properties={listings} />
    </div>
  );
}
