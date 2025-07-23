"use client";

import React from "react";
import AirbnbPropertyHeader from "@/components/atom/airbnb-property-header";
import AirbnbImages from "@/components/atom/airbnb-images";
import AirbnbReviews from "@/components/atom/airbnb-reviews";
import AirbnbReserve from "@/components/atom/airbnb-reserve";
import AmenityViewer from "@/components/listings/amenity-viewer";
import { Badge } from "@/components/ui/badge";
import { MapPin, Bed, Bath, Users, Square } from "lucide-react";
import { Listing } from "@/types/listing";
import PropertyGallery from "@/components/atom/airbnb-img";
import AirbnbInfo from "./atom/airbnb-info";
import Review from "./listings/review";

interface ListingDetailsClientProps {
    listing: Listing;
}

export default function ListingDetailsClient({ listing }: ListingDetailsClientProps) {
    const locationString = listing.location
        ? `${listing.location.city}, ${listing.location.state}`
        : "Location not available";

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: listing.title || "Property Listing",
                url: window.location.href,
            });
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(window.location.href);
        }
    };

    const handleSave = () => {
        // TODO: Implement save/favorite functionality
        console.log("Save listing:", listing.id);
    };

    const handleShowAllPhotos = () => {
        // TODO: Implement photo gallery modal
        console.log("Show all photos");
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Property Header */}
            <AirbnbPropertyHeader
                title={listing.title || "Beautiful Property"}
                location={locationString}
                rating={listing.averageRating || 4.5}
                reviewCount={listing.numberOfReviews || 0}
                isSuperhost={false} // TODO: Add superhost logic
                onShare={handleShare}
                onSave={handleSave}
                isSaved={false} // TODO: Add saved state logic
                className="mb-4"
            />

            {/* Main Content */}

            <PropertyGallery 
                images={listing.photoUrls || []}
                onSave={handleSave}
                isSaved={false}
                onShowAllPhotos={handleShowAllPhotos}
            />
            <div className="space-y-8">
                {/* Images */}
                {/* <AirbnbImages
                    images={listing.photoUrls || []}
                    onSave={handleSave}
                    isSaved={false}
                    onShowAllPhotos={handleShowAllPhotos}
                    className="mb-8"
                /> */}
                <div className="flex gap-20 mt-10">
                    
                    <div className="flex-1 max-w-2xl">
                        {/* Property Details */}
                        <div className="border-b border-gray-200 pb-8">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-semibold text-gray-900">
                                    {listing.title || "Beautiful Property"}
                                </h2>
                                <div className="flex items-center space-x-2">
                                    <Badge variant="outline" className="text-sm">
                                        {listing.propertyType || "Property"}
                                    </Badge>
                                    {listing.isPetsAllowed && (
                                        <Badge variant="secondary" className="text-sm">
                                            Pet Friendly
                                        </Badge>
                                    )}
                                </div>
                            </div>

                            {/* Property Stats */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                {listing.bedrooms && (
                                    <div className="flex items-center space-x-2">
                                        <Bed className="w-5 h-5 text-gray-600" />
                                        <span className="text-sm text-gray-700">
                                            {listing.bedrooms} bedroom{listing.bedrooms !== 1 ? 's' : ''}
                                        </span>
                                    </div>
                                )}
                                {listing.bathrooms && (
                                    <div className="flex items-center space-x-2">
                                        <Bath className="w-5 h-5 text-gray-600" />
                                        <span className="text-sm text-gray-700">
                                            {listing.bathrooms} bathroom{listing.bathrooms !== 1 ? 's' : ''}
                                        </span>
                                    </div>
                                )}
                                {listing.guestCount && (
                                    <div className="flex items-center space-x-2">
                                        <Users className="w-5 h-5 text-gray-600" />
                                        <span className="text-sm text-gray-700">
                                            Up to {listing.guestCount} guests
                                        </span>
                                    </div>
                                )}
                                {listing.squareFeet && (
                                    <div className="flex items-center space-x-2">
                                        <Square className="w-5 h-5 text-gray-600" />
                                        <span className="text-sm text-gray-700">
                                            {listing.squareFeet} sq ft
                                        </span>
                                    </div>
                                )}
                            </div>


                            {/* Location */}
                            {listing.location && (
                                <div className="flex items-center space-x-2 mb-4">
                                    <MapPin className="w-4 h-4 text-gray-600" />
                                    <span className="text-sm text-gray-700">
                                        {listing.location.address}, {listing.location.city}, {listing.location.state}
                                    </span>
                                </div>
                            )}

                            {/* Description */}
                            {listing.description && (
                                <div className="prose prose-sm max-w-none">
                                    <p className="text-gray-700 leading-relaxed">
                                        {listing.description}
                                    </p>
                                </div>
                            )}
                        </div>

                        <AirbnbInfo />

                        {/* Amenities */}
                        <div className="border-b border-gray-200 pb-8">
                            <AmenityViewer />
                        </div>
                    </div>
                    {/* Reservation Widget - Fixed position */}
                    <div className="w-80 flex-shrink-0">
                        <div className="sticky top-8">
                            <AirbnbReserve
                                pricePerNight={listing.pricePerNight || 0}
                                rating={listing.averageRating || 4.5}
                                reviewCount={listing.numberOfReviews || 0}
                                className="w-full"
                            />
                        </div>
                    </div>

                </div>

                {/* Reviews */}
                <AirbnbReviews
                    overallRating={listing.averageRating || 4.5}
                    totalReviews={listing.numberOfReviews || 0}
                    className="border-b border-gray-200 pb-8"
                />

                <Review />

                {/* Host Information */}
                <div className="border-b border-gray-200 pb-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                        Hosted by {listing.host?.username || "Host"}
                    </h3>
                    <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                            <span className="text-lg font-semibold text-gray-600">
                                {listing.host?.username?.charAt(0).toUpperCase() || "H"}
                            </span>
                        </div>
                        <div>
                            <p className="font-medium text-gray-900">
                                {listing.host?.username || "Host"}
                            </p>
                            <p className="text-sm text-gray-600">
                                Member since {listing.postedDate ? new Date(listing.postedDate).getFullYear() : "2024"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 