import { getListing } from "@/components/host/action";
import { notFound } from "next/navigation";
import ListingDetailsClient from "@/components/listing-details-client";

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
    <div className="min-h-screen bg-background">
      <ListingDetailsClient listing={listing} />
    </div>
  );
}
