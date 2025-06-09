"use client";

import Image from "next/image";
import React from "react";
import Navbar from "@/components/template/header-airbnb/header";
import BookingForm from "@/components/site/booking-form";


const HeroSection = () => {

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Transparent Navbar Overlay */}
      <div className="absolute top-0 left-0 w-full z-50">
        <Navbar />
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
        <BookingForm />
      </div>
    </div>
  );
};

export default HeroSection;
