import HeroSection from "@/components/site/HeroSection";
import { PropertyContent } from "@/components/site/property/content";
import { getListings } from "@/components/host/action";

async function getPublishedListings() {
  try {
    const listings = await getListings({ publishedOnly: true });
    return listings;
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
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <PropertyContent properties={listings} />
      </main>
    </div>
  );
}
