import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function BookingForm() {
  return (
    <div className="absolute top-[53%] left-8 transform -translate-y-1/2 z-20">
      <div className="bg-white rounded-xs px-6 py-4 shadow-md w-80">
        {/* Main heading */}
        <h1 className="text-xl font-medium text-[#6b6b6b] mb-3 leading-tight">
          Book unique<br />
          accommodations and<br />
          activities.
        </h1>

        {/* Booking form */}
        <div className="space-y-3">
          {/* Location field */}
          <div>
            <Label htmlFor="location" className="text-xs font-bold text-[#6b6b6b] mb-1 block">
              WHERE
            </Label>
            <Input
              id="location"
              placeholder="Anywhere"
              className="h-10 text-sm border-gray-300 border rounded-xs px-3 placeholder:text-[#c0c0c0] focus:border-gray-400 focus:ring-0 w-full"
            />
          </div>

          {/* Date fields */}
          <div className="grid grid-cols-2">
            <div>
              <Label htmlFor="arrival" className="text-xs font-bold text-[#6b6b6b] mb-1 block">
                CHECK-IN
              </Label>
              <Input
                id="arrival"
                placeholder="mm/dd/yyyy"
                className="h-10 text-sm border-gray-300 border rounded-l-xs rounded-r-none px-3 placeholder:text-[#c0c0c0] focus:border-gray-400 focus:ring-0 w-full focus:z-10 relative"
              />
            </div>
            <div>
              <Label htmlFor="departure" className="text-xs font-bold text-[#6b6b6b] mb-1 block">
                CHECK-OUT
              </Label>
              <Input
                id="departure"
                placeholder="mm/dd/yyyy"
                className="h-10 text-sm border-gray-300 border-t border-r border-b border-l-0 rounded-r-xs rounded-l-none px-3 placeholder:text-[#c0c0c0] focus:border-gray-400 focus:ring-0 w-full focus:z-10 relative"
              />
            </div>
          </div>

          {/* Travelers field */}
          <div>
            <Label htmlFor="travelers" className="text-xs font-bold text-[#6b6b6b] mb-1 block">
              GUESTS
            </Label>
            <Input
              id="travelers"
              placeholder="Guests"
              className="h-10 text-sm border-gray-300 border rounded-xs px-3 placeholder:text-[#c0c0c0] focus:border-gray-400 focus:ring-0 w-full"
            />
          </div>

          {/* Search button */}
          <div className="pt-2 flex justify-end">
            <Button className="px-8 py-1 h-10 text-sm font-medium bg-[#ff5a5f] hover:bg-[#ff5a5f]/90 text-white rounded-xs">
              Search
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
