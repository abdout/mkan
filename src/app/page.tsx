import HeroSection from "@/components/site/HeroSection";
import { PropertyContent } from "@/components/site/property/content";
import { getListings } from "@/components/host/action";
import AirbnbIconsRow from "@/components/atom/airbnb-icons-row";
import { Listing } from "@/types/listing";
import AirbnbInspiration from "@/components/atom/airbnb-inspiration";
import GiftCard from "@/components/atom/airbnb-gift-card";
import Ask from "@/components/atom/airbnb-ask";

async function getPublishedListings() {
  try {
    const listings = await getListings({ publishedOnly: true });
    return listings as Listing[];
  } catch (error) {
    console.error("Error fetching published listings:", error);
    return [];
  }
}

export default async function Home() {
  const listings = await getPublishedListings();

  return (
    <div className="bg-background">
      <HeroSection />
      <div className="layout-container space-y-10">
        <AirbnbIconsRow />
        <PropertyContent properties={listings} />
        <AirbnbInspiration />
        <GiftCard />
        <Ask />
      </div>
    </div>
  );
}
