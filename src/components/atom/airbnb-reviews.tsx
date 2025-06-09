"use client";

import React from 'react';

interface ReviewCategory {
  name: string;
  rating: number;
  icon: React.ReactNode;
}

interface AirbnbReviewsProps {
  overallRating?: number;
  totalReviews?: number;
  ratingBreakdown?: number[];
  categories?: ReviewCategory[];
  className?: string;
}

const defaultCategories: ReviewCategory[] = [
  {
    name: 'Cleanliness',
    rating: 4.9,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
    )
  },
  {
    name: 'Accuracy',
    rating: 4.9,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    )
  },
  {
    name: 'Check-in',
    rating: 4.9,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
      </svg>
    )
  },
  {
    name: 'Communication',
    rating: 4.9,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    )
  },
  {
    name: 'Location',
    rating: 4.7,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    )
  },
  {
    name: 'Value',
    rating: 4.7,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
      </svg>
    )
  }
];

const AirbnbReviews: React.FC<AirbnbReviewsProps> = ({
  overallRating = 4.92,
  totalReviews = 51,
  ratingBreakdown = [95, 3, 1, 0, 1], // percentages for 5,4,3,2,1 stars
  categories = defaultCategories,
  className = "",
}) => {
  return (
    <div className={`w-full ${className}`}>
      {/* Header */}
      <div className="flex items-center mb-8">
        <svg className="w-5 h-5 mr-2" viewBox="0 0 16 16" fill="none">
          <path d="M7.99996 3.16675L9.16663 6.83341H12.8333L9.83329 9.16675L10.8333 12.8334L7.99996 10.5001L5.16663 12.8334L6.16663 9.16675L3.16663 6.83341H6.83329L7.99996 3.16675Z" fill="black"/>
        </svg>
        <span className="text-xl font-semibold">
          {overallRating} · {totalReviews} reviews
        </span>
      </div>

      {/* Main Content - Single Row Layout */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Overall Rating Section */}
        <div className="lg:w-60">
          <h3 className="text-lg font-medium mb-4">Overall rating</h3>
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((star, index) => (
              <div key={star} className="flex items-center space-x-3">
                <span className="text-sm w-2">{star}</span>
                <div className="flex-1 bg-gray-200 rounded-full h-1">
                  <div 
                    className="bg-black h-1 rounded-full"
                    style={{ width: `${ratingBreakdown[index]}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Categories Row */}
        <div className="flex-1">
          <div className="flex justify-between gap-4 overflow-x-auto">
            {categories.map((category, index) => (
              <div key={index} className="flex flex-col min-w-0 flex-1">
                <h4 className="text-base font-medium text-gray-900 mb-2">
                  {category.name}
                </h4>
                <span className="text-lg font-semibold mb-6">
                  {category.rating}
                </span>
                <div className="text-gray-700">
                  {category.icon}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AirbnbReviews; 