import { Heart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DetailCardProps {
  title?: string
  location?: string
  guests?: string
  beds?: string
  baths?: string
  amenities?: string
  rating?: string
  reviews?: string
  price?: string
  image?: string
  isFavorited?: boolean
}

export default function DetailCard({
  title = "Bordeaux Getaway",
  location = "Entire home in Bordeaux",
  guests = "4-6 guests",
  beds = "5 beds",
  baths = "3 bath",
  amenities = "Wifi · Kitchen · Free Parking",
  rating = "5.0",
  reviews = "318",
  price = "$325",
  image = "/placeholder.svg?height=200&width=300",
  isFavorited = false
}: DetailCardProps) {
  return (
    <div className="flex gap-6">
      {/* Property Image */}
      <div className="relative flex-shrink-0">
        <img
          src={image}
          alt={title}
          className="w-[300px] h-[200px] object-cover rounded-xl border border-gray-200"
        />
      </div>

      {/* Property Details */}
      <div className="flex-1 flex flex-col gap-4">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <p className="text-sm font-normal text-gray-500">{location}</p>
            <h3 className="text-xl font-medium text-gray-900">{title}</h3>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="w-8 h-8 p-0"
          >
            <Heart className={`h-5 w-5 ${isFavorited ? 'fill-pink-300 text-pink-500' : 'text-gray-700'}`} />
          </Button>
        </div>

        {/* Divider */}
        <div className="w-10 h-px bg-gray-200"></div>

        {/* Details */}
        <div className="flex flex-col">
          <p className="text-sm font-normal text-gray-500">{guests} · Entire Home · {beds} · {baths}</p>
          <p className="text-sm font-normal text-gray-500">{amenities}</p>
        </div>

        {/* Divider */}
        <div className="w-10 h-px bg-gray-200"></div>

        {/* Footer */}
        <div className="flex justify-between items-end">
          <div className="flex items-center gap-1">
            <span className="text-sm font-medium text-gray-700">{rating}</span>
            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-normal text-gray-700">({reviews} reviews)</span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-lg font-medium text-gray-700">{price}</span>
            <span className="text-sm font-normal text-gray-700">/night</span>
          </div>
        </div>
      </div>
    </div>
  )
}
