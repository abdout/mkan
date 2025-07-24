import { Heart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function DetailCard() {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <div className="flex gap-6 bg-white rounded-lg overflow-hidden">
        {/* Property Image */}
        <div className="flex-1">
          <img
            src="/placeholder.svg?height=300&width=500"
            alt="Bordeaux Getaway - Modern living room"
            className="w-full h-[300px] object-cover rounded-lg"
          />
        </div>

        {/* Property Details */}
        <div className="flex-1 flex flex-col justify-between py-2">
          <div>
            {/* Header with favorite button */}
            <div className="flex justify-between items-start mb-2">
              <p className="text-[#6b7280] text-sm font-medium">Entire home in Bordeaux</p>
              <Button variant="ghost" size="icon" className="text-[#6b7280] hover:text-[#374151]">
                <Heart className="h-6 w-6" />
              </Button>
            </div>

            {/* Main Title */}
            <h1 className="text-[#374151] text-2xl font-semibold mb-6">Bordeaux Getaway</h1>

            {/* Property Details */}
            <div className="space-y-3 mb-6">
              <p className="text-[#6b7280] text-base">4-6 guests • Entire Home • 5 beds • 3 bath</p>
              <p className="text-[#6b7280] text-base">Wifi • Kitchen • Free Parking</p>
            </div>
          </div>

          {/* Rating and Price */}
          <div className="flex justify-between items-end">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-[#fcd34d] text-[#fcd34d]" />
                <span className="text-[#374151] font-medium">5.0</span>
              </div>
              <span className="text-[#6b7280]">(318 reviews)</span>
            </div>

            <div className="text-right">
              <span className="text-[#374151] text-2xl font-semibold">$325</span>
              <span className="text-[#6b7280] text-base ml-1">/night</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
