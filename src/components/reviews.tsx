import AirbnbReview from "@/components/atom/airbnb-review"

const reviewsData = [
  {
    reviewerName: "Sarah",
    reviewerLocation: "Riyadh, Saudi Arabia",
    reviewerImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=120&h=120&fit=crop&crop=face",
    rating: 5,
    date: "March 2025",
    stayDuration: "Stayed one night",
    reviewText: "The place was extremely clean, comfortable and easy to find. They responded very quickly and tried to make me get the best of my stay 🙏 excellent experience overall!"
  },
  {
    reviewerName: "Ahmed",
    reviewerLocation: "Dubai, UAE",
    reviewerImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face",
    rating: 5,
    date: "February 2025",
    stayDuration: "Stayed 3 nights",
    reviewText: "Perfect location and amazing amenities. The host was incredibly helpful and the apartment exceeded our expectations. Highly recommend!"
  },
  {
    reviewerName: "Fatima",
    reviewerLocation: "Jeddah, Saudi Arabia",
    reviewerImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&crop=face",
    rating: 4,
    date: "January 2025",
    stayDuration: "Stayed 2 nights",
    reviewText: "Great place with beautiful views. The kitchen was well-equipped and the bed was very comfortable. Would definitely stay again."
  },
  {
    reviewerName: "Omar",
    reviewerLocation: "Kuwait City, Kuwait",
    reviewerImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=face",
    rating: 5,
    date: "December 2024",
    stayDuration: "Stayed one week",
    reviewText: "Exceptional hospitality and a beautiful property. The location was perfect for exploring the city. The host went above and beyond to make our stay memorable."
  },
  {
    reviewerName: "Layla",
    reviewerLocation: "Doha, Qatar",
    reviewerImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&h=120&fit=crop&crop=face",
    rating: 5,
    date: "November 2024",
    stayDuration: "Stayed 4 nights",
    reviewText: "Absolutely stunning apartment with modern amenities. The host was very responsive and the check-in process was seamless. Perfect for both business and leisure."
  }
]

export default function Reviews() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">What guests are saying</h2>
        <p className="text-gray-600">Read reviews from recent guests</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {reviewsData.map((review, index) => (
          <AirbnbReview
            key={index}
            reviewerName={review.reviewerName}
            reviewerLocation={review.reviewerLocation}
            reviewerImage={review.reviewerImage}
            rating={review.rating}
            date={review.date}
            stayDuration={review.stayDuration}
            reviewText={review.reviewText}
          />
        ))}
      </div>
    </div>
  )
} 