import HeroSection from "@/components/site/HeroSection";
import { PropertyContent } from "@/components/site/property/content";
import { getListings } from "@/components/host/action";
import PropertyFilter from "@/components/site/property-filter";
import { Listing } from "@/types/listing";
import AirbnbInspiration from "@/components/atom/airbnb-inspiration";
import GiftCard from "@/components/atom/airbnb-gift-card";
import Ask from "@/components/atom/airbnb-ask";
import SiteFooter from "@/components/template/footer-airbnb/site-footer";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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
      <div className="layout-container space-y-10 pb-20">
        <PropertyFilter />
        <PropertyContent properties={listings} />
        <Link href='/listings' className="flex my-14">
        <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 h-12 px-10">
          Explore All Listings
        </Button>
        </Link>
        <AirbnbInspiration />
        <GiftCard />
        <Ask />
      </div>
        
    </div>
  );
}
