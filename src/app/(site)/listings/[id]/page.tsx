import { getListing } from "@/components/host/action";
import { notFound } from "next/navigation";
import ListingDetailsClient from "@/components/listing-details-client";
import Location from "@/components/atom/airbnb-map";
import DetailsHeader from "@/components/listings/detials-header";

interface ListingPageProps {
  params: {
    id: string;
  };
}

export default async function ListingPage({ params }: ListingPageProps) {
  const listingId = parseInt(params.id);

  if (isNaN(listingId)) {
    notFound();
  }

  let listing;
  try {
    listing = await getListing(listingId);
  } catch (error) {
    console.error("Error fetching listing:", error);
    notFound();
  }

  if (!listing || !listing.isPublished) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background mx-14">
      <DetailsHeader />
      <ListingDetailsClient listing={listing} />
      <Location />
    </div>
  );
}
