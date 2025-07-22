import React from "react";
import HeroSection from "../../../components/site/HeroSection";
import FeaturesSection from "./FeaturesSection";
import DiscoverSection from "./DiscoverSection";
import CallToActionSection from "./CallToActionSection";
import FooterSection from "./FooterSection";
import { PropertyContent } from "@/components/site/property/content";
import AirbnbFilter from "@/components/atom/airbnb-filter";
import AirbnbPropertyHeader from "@/components/atom/airbnb-property-header";
import AirbnbSelect from "@/components/atom/airbnb-select";
import AirbnbIconsRow from "@/components/atom/airbnb-icons-row";
import AirbnbImages from "@/components/atom/airbnb-images";
import AirbnbReserve from "@/components/atom/airbnb-reserve";
import AirbnbInspiration from "@/components/atom/airbnb-inspiration";
import AirbnbReviews from "@/components/atom/airbnb-reviews";

import PropertyContentComponent from "@/components/property/content";

const Landing = () => {
  return (
    <div>
      <HeroSection />
      <div className="layout-container space-y-10">
      <AirbnbIconsRow />
      
      <PropertyContentComponent searchParams={Promise.resolve({})} />
      
      
      <AirbnbPropertyHeader 
        title="Luxury Downtown"
        location="Manhattan, New York"
        rating={4.8}
        reviewCount={127}
        isSuperhost={true}
      />
      <AirbnbImages 
        images={[
          "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop",
          "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&h=300&fit=crop",
          "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
          "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop"
        ]}
      />
      <AirbnbReserve />
      <AirbnbInspiration />
      <AirbnbReviews />
      <AirbnbSelect type="location" />
      <AirbnbFilter />
      <PropertyContent properties={[]} />
      </div>
      <FeaturesSection />
      <DiscoverSection />
      <CallToActionSection />
      <FooterSection />

    </div>
  );
};

export default Landing;
