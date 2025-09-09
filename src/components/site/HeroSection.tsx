"use client";

import Image from "next/image";
import React from "react";
import SiteHeader from "@/components/template/header-airbnb/header";
import BookingForm from "@/components/template/search/vertical-search";

interface HeroSectionProps {
  onSearch?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onSearch }) => {

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Transparent Navbar Overlay */}
      <div className="absolute top-0 left-0 w-full z-50">
        <SiteHeader />
      </div>
      
      {/* Hero Background Image */}
      <div className="relative h-full w-full">
        <Image
          src="/hero.png"
          alt="Rentiful Rental Platform Hero Section"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <BookingForm onSearch={onSearch} />
      </div>
    </div>
  );
};

export default HeroSection;
