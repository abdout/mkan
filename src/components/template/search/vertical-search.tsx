"use client"

import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import DateRangePicker from "@/components/atom/date-range-picker"
import { Counter } from "@/components/atom"
import { format } from "date-fns"

type ActiveField = "location" | "checkin" | "checkout" | "guests" | null

export default function BookingForm() {
  const router = useRouter()
  const [activeField, setActiveField] = useState<ActiveField>(null)
  const [isMobile, setIsMobile] = useState(false)
  const formRef = useRef<HTMLDivElement>(null)
  
  const [formData, setFormData] = useState({
    location: "",
    checkIn: "",
    checkOut: "",
    guests: {
      adults: 0,
      children: 0,
      infants: 0
    }
  })

  const [dateRange, setDateRange] = useState<{
    from: Date | undefined
    to: Date | undefined
  }>({
    from: undefined,
    to: undefined
  })

  const [searchQuery, setSearchQuery] = useState("")
  const [filteredLocations, setFilteredLocations] = useState<string[]>([])

  // Sample locations for autocomplete - Sudan focused with neighborhoods
  const locations = [
    // Khartoum neighborhoods
    "Khartoum, Arkaweet",
    "Khartoum, Al Amarat",
    "Khartoum, Al Riyadh",
    "Khartoum, Al Sahafa",
    "Khartoum, Al Mamoura",
    "Khartoum, Al Taif",
    "Khartoum, Al Manshiya",
    "Khartoum, Al Kalakla",
    "Khartoum, Al Jabal",
    "Khartoum, Al Souq Al Arabi",
    "Khartoum, Al Souq Al Shaabi",
    "Khartoum, Al Souq Al Afriqi",
    "Khartoum, Al Souq Al Sudan",
    "Khartoum, Al Souq Al Khartoum",
    "Khartoum, Al Souq Al Omdurman",
    "Khartoum, Al Souq Al Bahri",
    "Khartoum, Al Souq Al Shargi",
    "Khartoum, Al Souq Al Gharbi",
    "Khartoum, Al Souq Al Shamali",
    "Khartoum, Al Souq Al Janobi",
    // Omdurman neighborhoods
    "Omdurman, Al Thawra",
    "Omdurman, Al Salha",
    "Omdurman, Al Halfaya",
    "Omdurman, Al Abasiya",
    "Omdurman, Al Mulazmeen",
    "Omdurman, Al Souq Al Omdurman",
    "Omdurman, Al Souq Al Shaabi",
    "Omdurman, Al Souq Al Arabi",
    "Omdurman, Al Souq Al Sudan",
    "Omdurman, Al Souq Al Afriqi",
    "Omdurman, Al Souq Al Khartoum",
    "Omdurman, Al Souq Al Bahri",
    "Omdurman, Al Souq Al Shargi",
    "Omdurman, Al Souq Al Gharbi",
    "Omdurman, Al Souq Al Shamali",
    "Omdurman, Al Souq Al Janobi",
    // Port Sudan neighborhoods
    "Port Sudan, Al Souq Al Bahri",
    "Port Sudan, Al Souq Al Shargi",
    "Port Sudan, Al Souq Al Gharbi",
    "Port Sudan, Al Souq Al Shamali",
    "Port Sudan, Al Souq Al Janobi",
    // Kassala neighborhoods
    "Kassala, Al Souq Al Bahri",
    "Kassala, Al Souq Al Shargi",
    "Kassala, Al Souq Al Gharbi",
    "Kassala, Al Souq Al Shamali",
    "Kassala, Al Souq Al Janobi",
    // El Obeid neighborhoods
    "El Obeid, Al Souq Al Bahri",
    "El Obeid, Al Souq Al Shargi",
    "El Obeid, Al Souq Al Gharbi",
    "El Obeid, Al Souq Al Shamali",
    "El Obeid, Al Souq Al Janobi",
    // Nyala neighborhoods
    "Nyala, Al Souq Al Bahri",
    "Nyala, Al Souq Al Shargi",
    "Nyala, Al Souq Al Gharbi",
    "Nyala, Al Souq Al Shamali",
    "Nyala, Al Souq Al Janobi",
    // Wad Madani neighborhoods
    "Wad Madani, Al Souq Al Bahri",
    "Wad Madani, Al Souq Al Shargi",
    "Wad Madani, Al Souq Al Gharbi",
    "Wad Madani, Al Souq Al Shamali",
    "Wad Madani, Al Souq Al Janobi",
    // El Fasher neighborhoods
    "El Fasher, Al Souq Al Bahri",
    "El Fasher, Al Souq Al Shargi",
    "El Fasher, Al Souq Al Gharbi",
    "El Fasher, Al Souq Al Shamali",
    "El Fasher, Al Souq Al Janobi",
    // Kosti neighborhoods
    "Kosti, Al Souq Al Bahri",
    "Kosti, Al Souq Al Shargi",
    "Kosti, Al Souq Al Gharbi",
    "Kosti, Al Souq Al Shamali",
    "Kosti, Al Souq Al Janobi",
    // Gedaref neighborhoods
    "Gedaref, Al Souq Al Bahri",
    "Gedaref, Al Souq Al Shargi",
    "Gedaref, Al Souq Al Gharbi",
    "Gedaref, Al Souq Al Shamali",
    "Gedaref, Al Souq Al Janobi",
    // Rabak neighborhoods
    "Rabak, Al Souq Al Bahri",
    "Rabak, Al Souq Al Shargi",
    "Rabak, Al Souq Al Gharbi",
    "Rabak, Al Souq Al Shamali",
    "Rabak, Al Souq Al Janobi",
    // Sennar neighborhoods
    "Sennar, Al Souq Al Bahri",
    "Sennar, Al Souq Al Shargi",
    "Sennar, Al Souq Al Gharbi",
    "Sennar, Al Souq Al Shamali",
    "Sennar, Al Souq Al Janobi",
    // El Daein neighborhoods
    "El Daein, Al Souq Al Bahri",
    "El Daein, Al Souq Al Shargi",
    "El Daein, Al Souq Al Gharbi",
    "El Daein, Al Souq Al Shamali",
    "El Daein, Al Souq Al Janobi",
    // El Fula neighborhoods
    "El Fula, Al Souq Al Bahri",
    "El Fula, Al Souq Al Shargi",
    "El Fula, Al Souq Al Gharbi",
    "El Fula, Al Souq Al Shamali",
    "El Fula, Al Souq Al Janobi",
    // Dongola neighborhoods
    "Dongola, Al Souq Al Bahri",
    "Dongola, Al Souq Al Shargi",
    "Dongola, Al Souq Al Gharbi",
    "Dongola, Al Souq Al Shamali",
    "Dongola, Al Souq Al Janobi",
    // Atbara neighborhoods
    "Atbara, Al Souq Al Bahri",
    "Atbara, Al Souq Al Shargi",
    "Atbara, Al Souq Al Gharbi",
    "Atbara, Al Souq Al Shamali",
    "Atbara, Al Souq Al Janobi",
    // Kadugli neighborhoods
    "Kadugli, Al Souq Al Bahri",
    "Kadugli, Al Souq Al Shargi",
    "Kadugli, Al Souq Al Gharbi",
    "Kadugli, Al Souq Al Shamali",
    "Kadugli, Al Souq Al Janobi",
    // El Geneina neighborhoods
    "El Geneina, Al Souq Al Bahri",
    "El Geneina, Al Souq Al Shargi",
    "El Geneina, Al Souq Al Gharbi",
    "El Geneina, Al Souq Al Shamali",
    "El Geneina, Al Souq Al Janobi",
    // El Damazin neighborhoods
    "El Damazin, Al Souq Al Bahri",
    "El Damazin, Al Souq Al Shargi",
    "El Damazin, Al Souq Al Gharbi",
    "El Damazin, Al Souq Al Shamali",
    "El Damazin, Al Souq Al Janobi",
    // El Manaqil neighborhoods
    "El Manaqil, Al Souq Al Bahri",
    "El Manaqil, Al Souq Al Shargi",
    "El Manaqil, Al Souq Al Gharbi",
    "El Manaqil, Al Souq Al Shamali",
    "El Manaqil, Al Souq Al Janobi",
    // Shendi neighborhoods
    "Shendi, Al Souq Al Bahri",
    "Shendi, Al Souq Al Shargi",
    "Shendi, Al Souq Al Gharbi",
    "Shendi, Al Souq Al Shamali",
    "Shendi, Al Souq Al Janobi",
    // Singa neighborhoods
    "Singa, Al Souq Al Bahri",
    "Singa, Al Souq Al Shargi",
    "Singa, Al Souq Al Gharbi",
    "Singa, Al Souq Al Shamali",
    "Singa, Al Souq Al Janobi",
    // El Nuhud neighborhoods
    "El Nuhud, Al Souq Al Bahri",
    "El Nuhud, Al Souq Al Shargi",
    "El Nuhud, Al Souq Al Gharbi",
    "El Nuhud, Al Souq Al Shamali",
    "El Nuhud, Al Souq Al Janobi",
    // Tokar neighborhoods
    "Tokar, Al Souq Al Bahri",
    "Tokar, Al Souq Al Shargi",
    "Tokar, Al Souq Al Gharbi",
    "Tokar, Al Souq Al Shamali",
    "Tokar, Al Souq Al Janobi",
    // El Dinder neighborhoods
    "El Dinder, Al Souq Al Bahri",
    "El Dinder, Al Souq Al Shargi",
    "El Dinder, Al Souq Al Gharbi",
    "El Dinder, Al Souq Al Shamali",
    "El Dinder, Al Souq Al Janobi",
    // El Roseires neighborhoods
    "El Roseires, Al Souq Al Bahri",
    "El Roseires, Al Souq Al Shargi",
    "El Roseires, Al Souq Al Gharbi",
    "El Roseires, Al Souq Al Shamali",
    "El Roseires, Al Souq Al Janobi"
  ]

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleFieldClick = (field: ActiveField) => {
    setActiveField(activeField === field ? null : field)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleDateRangeChange = (from: Date | undefined, to: Date | undefined) => {
    setDateRange({ from, to })
    setFormData(prev => ({
      ...prev,
      checkIn: from ? format(from, 'yyyy-MM-dd') : '',
      checkOut: to ? format(to, 'yyyy-MM-dd') : ''
    }))
  }

  // Handle location search
  const handleLocationSearch = (query: string) => {
    setSearchQuery(query)
    if (query.trim() === "") {
      setFilteredLocations([])
    } else {
      const filtered = locations.filter(location =>
        location.toLowerCase().includes(query.toLowerCase())
      )
             setFilteredLocations(filtered.slice(0, 3)) // Limit to 3 results
    }
  }

  const selectLocation = (location: string) => {
    setFormData(prev => ({ ...prev, location }))
    setSearchQuery("")
    setFilteredLocations([])
    setActiveField("checkin")
  }

  // Add guest counter handlers
  const handleGuestChange = (type: 'adults' | 'children' | 'infants', operation: 'increment' | 'decrement') => {
    setFormData(prev => ({
      ...prev,
      guests: {
        ...prev.guests,
        [type]: operation === 'increment' 
          ? prev.guests[type] + 1 
          : Math.max(0, prev.guests[type] - 1)
      }
    }))
  }

  // Helper function to get total guests
  const getTotalGuests = () => {
    return formData.guests.adults + formData.guests.children + formData.guests.infants
  }

  // Helper function to get guest display text
  const getGuestDisplayText = () => {
    const total = getTotalGuests()
    if (total === 0) return "Add guests"
    
    const parts = []
    if (formData.guests.adults > 0) {
      parts.push(`${formData.guests.adults} adult${formData.guests.adults > 1 ? 's' : ''}`)
    }
    if (formData.guests.children > 0) {
      parts.push(`${formData.guests.children} child${formData.guests.children > 1 ? 'ren' : ''}`)
    }
    if (formData.guests.infants > 0) {
      parts.push(`${formData.guests.infants} infant${formData.guests.infants > 1 ? 's' : ''}`)
    }
    
    return parts.join(', ')
  }

  // Click outside to reset
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setActiveField(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleSearch = () => {
    const searchParams = new URLSearchParams()
    
    if (formData.location) {
      searchParams.set("location", formData.location)
    }
    if (formData.checkIn) {
      searchParams.set("checkIn", formData.checkIn)
    }
    if (formData.checkOut) {
      searchParams.set("checkOut", formData.checkOut)
    }
    if (getTotalGuests() > 0) {
      searchParams.set("guests", getTotalGuests().toString())
      searchParams.set("adults", formData.guests.adults.toString())
      searchParams.set("children", formData.guests.children.toString())
      searchParams.set("infants", formData.guests.infants.toString())
    }

    const searchUrl = `/search${searchParams.toString() ? `?${searchParams.toString()}` : ""}`
    router.push(searchUrl)
  }

  // Helper function to get field styling
  const getFieldStyling = (field: ActiveField) => {
    const isActive = activeField === field
    const hasActiveField = activeField !== null

    let bgClass = "bg-transparent"
    if (isActive) {
      bgClass = "bg-white shadow-md"
    } else if (hasActiveField) {
      bgClass = "bg-[#e5e7eb]"
    }

    return `${bgClass} transition-all duration-200`
  }

  // Mobile field order
  const mobileFields: ActiveField[] = ["location", "checkin", "guests"]

  if (isMobile) {
  return (
      <div className="absolute top-[53%] left-4 md:left-8 transform -translate-y-1/2 z-20 w-[calc(100%-2rem)] md:w-auto" ref={formRef}>
        <div className="bg-white rounded-xs px-4 md:px-6 py-6 md:py-4 shadow-md w-full md:w-80">
        {/* Main heading */}
          <h1 className="text-lg md:text-xl font-medium text-[#6b6b6b] mb-4 md:mb-3 leading-tight">
          Book unique<br />
          accommodations and<br />
          activities.
        </h1>

          {/* Mobile: Single field at a time */}
          <div className="space-y-4">
            {mobileFields.map((field, index) => (
              <div key={field} className={`${activeField === field ? 'block' : 'hidden'}`}>
                                 {field === "location" && (
          <div>
                     <Label className="text-[11px] font-medium text-[#6b6b6b] mb-1 block">
              WHERE
            </Label>
                                                <Input
                         placeholder="Anywhere"
                         value={searchQuery}
                         onChange={(e) => handleLocationSearch(e.target.value)}
                         className="h-12 text-sm border-0 border-none rounded-xs px-3 placeholder:text-[#c0c0c0] focus:ring-0 focus:outline-none focus:border-0 shadow-none w-full text-black caret-black"
                         onFocus={() => setActiveField("location")}
                         autoFocus
                       />
                                           {/* Mobile autocomplete dropdown */}
                      {filteredLocations.length > 0 && (
                        <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-b-xs shadow-lg z-20 max-h-60 overflow-y-auto no-scrollbar">
                          {filteredLocations.map((location, index) => (
                            <div
                              key={index}
                              className="px-3 py-2 hover:bg-gray-50 cursor-pointer text-sm"
                              onClick={() => selectLocation(location)}
                            >
                              {location}
                            </div>
                          ))}
                        </div>
                      )}
          </div>
                 )}

                {(field === "checkin" || field === "checkout") && (
            <div>
                    <Label className="text-[11px] font-medium text-[#6b6b6b] mb-1 block">
                DATES
              </Label>
                                             <div className="w-full">
                      <DateRangePicker 
                        className="w-full"
                        date={dateRange}
                        onDateChange={(date) => {
                          if (date) {
                            handleDateRangeChange(date.from, date.to)
                          }
                        }}
                      />
                    </div>
            </div>
                )}

                {field === "guests" && (
                  <div>
                    <Label className="text-[11px] font-medium text-[#6b6b6b] mb-1 block">
                      GUESTS
                    </Label>
                                                           <Input
                      type="number"
                      min="1"
                      placeholder="Guests"
                      value={getGuestDisplayText()}
                      onChange={(e) => handleInputChange("guests", e.target.value)}
                      className="h-12 text-sm border-0 border-none rounded-xs px-3 placeholder:text-[#c0c0c0] focus:ring-0 focus:outline-none focus:border-0 shadow-none w-full text-black caret-black"
                      onFocus={() => setActiveField("guests")}
                      autoFocus
                    />
                  </div>
                )}

                {/* Navigation buttons */}
                <div className="flex justify-between mt-4">
                  {index > 0 && (
                    <Button
                      variant="outline"
                      onClick={() => setActiveField(mobileFields[index - 1])}
                      className="px-4 py-2 text-sm"
                    >
                      Previous
                    </Button>
                  )}
                  {index < mobileFields.length - 1 ? (
                    <Button
                      onClick={() => setActiveField(mobileFields[index + 1])}
                      className="px-4 py-2 text-sm bg-[#de3151] hover:bg-[#de3151]/90 text-white"
                    >
                      Next
                    </Button>
                  ) : (
                    <Button
                      onClick={handleSearch}
                      className="px-4 py-2 text-sm bg-[#de3151] hover:bg-[#de3151]/90 text-white"
                    >
                      Search
                    </Button>
                  )}
                </div>
              </div>
            ))}

            {/* Show search button when no field is active */}
            {!activeField && (
              <div className="pt-3 flex justify-end">
                <Button 
                  onClick={() => setActiveField("location")}
                  className="px-8 py-2 h-12 text-sm font-medium bg-[#de3151] hover:bg-[#de3151]/90 text-white rounded-xs"
                >
                  Start Search
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Desktop version
  return (
    <div className="absolute top-[53%] left-4 md:left-8 transform -translate-y-1/2 z-20 w-[calc(100%-2rem)] md:w-auto" ref={formRef}>
      <div className="relative">
        <div className="bg-white rounded-xs px-4 md:px-6 py-6 md:py-4 shadow-md w-full md:w-80">
          {/* Main heading */}
          <h1 className="text-lg md:text-xl font-medium text-[#6b6b6b] mb-4 md:mb-3 leading-tight">
            Book unique<br />
            accommodations and<br />
            activities.
          </h1>

          {/* Desktop: All fields visible */}
          <div className="space-y-4 md:space-y-3">
            {/* Location field */}
            <div>
              <Label className="text-[11px] font-medium text-[#6b6b6b] mb-1 block">
                WHERE
              </Label>
                             <button
                 className={`w-full h-12 text-left px-3 border border-gray-300 rounded-xs ${getFieldStyling("location")}`}
                 onClick={() => handleFieldClick("location")}
               >
                <span className={`text-sm ${formData.location ? 'text-black' : 'text-[#c0c0c0]'}`}>
                  {formData.location || "Anywhere"}
                </span>
              </button>
            </div>

                         {/* Date fields */}
             <div>
               <div className="grid grid-cols-2">
                 <div>
                   <Label className="text-[11px] font-medium text-[#6b6b6b] mb-1 block">
                     CHECK-IN
                   </Label>
                 </div>
                 <div>
                   <Label className="text-[11px] font-medium text-[#6b6b6b] mb-1 block">
                     CHECK-OUT
                   </Label>
                 </div>
               </div>
               <div className="flex">
                                   <button
                    className={`flex-1 h-12 text-left px-3 border border-gray-300 rounded-l-xs rounded-r-none ${getFieldStyling("checkin")}`}
                    onClick={() => handleFieldClick("checkin")}
                  >
                   <span className={`text-sm ${dateRange.from ? 'text-black' : 'text-[#c0c0c0]'}`}>
                     {dateRange.from ? format(dateRange.from, 'MMM dd') : "Add date"}
                   </span>
                 </button>
                 <div className="w-px h-8 bg-[#e5e7eb] self-center"></div>
                                   <button
                    className={`flex-1 h-12 text-left px-3 border border-gray-300 border-l-0 rounded-r-xs rounded-l-none ${getFieldStyling("checkout")}`}
                    onClick={() => handleFieldClick("checkout")}
                  >
                   <span className={`text-sm ${dateRange.to ? 'text-black' : 'text-[#c0c0c0]'}`}>
                     {dateRange.to ? format(dateRange.to, 'MMM dd') : "Add date"}
                   </span>
                 </button>
            </div>
          </div>

          {/* Travelers field */}
          <div>
              <Label className="text-[11px] font-medium text-[#6b6b6b] mb-1 block">
              GUESTS
            </Label>
                             <button
                 className={`w-full h-12 text-left px-3 border border-gray-300 rounded-xs ${getFieldStyling("guests")}`}
                 onClick={() => handleFieldClick("guests")}
               >
                <span className={`text-sm ${getTotalGuests() > 0 ? 'text-black' : 'text-[#c0c0c0]'}`}>
                  {getGuestDisplayText()}
                </span>
              </button>
          </div>

          {/* Search button */}
            <div className="pt-3 md:pt-2 flex justify-end">
              <Button 
                onClick={handleSearch}
                className="px-8 py-2 md:py-1 h-12 md:h-10 text-sm font-medium bg-[#de3151] hover:bg-[#de3151]/90 text-white rounded-xs"
              >
              Search
            </Button>
            </div>
          </div>
        </div>

        {/* Desktop Dropdowns - Positioned to the right */}
                          {activeField === "location" && (
           <div 
             className="absolute top-0 left-full ml-4 w-80 h-full bg-white rounded-2xl shadow-lg border border-[#e5e7eb] p-6 z-10"
             onMouseLeave={() => setActiveField(null)}
           >
             <h3 className="text-lg font-semibold mb-4">Where to?</h3>
             
             {/* Search input */}
             <div className="mb-4">
               <Input
                 placeholder="Search destinations..."
                 value={searchQuery}
                 onChange={(e) => handleLocationSearch(e.target.value)}
                 className="w-full h-10 border-0 border-none rounded-lg focus:outline-none focus:border-0 shadow-none text-black caret-black"
                 autoFocus
               />
             </div>

                           {/* Results */}
              <div className="space-y-2 max-h-80 overflow-y-auto no-scrollbar">
                               {filteredLocations.length > 0 ? (
                  filteredLocations.map((location, index) => (
                    <div 
                      key={index}
                      className="p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
                      onClick={() => selectLocation(location)}
                    >
                      <div className="font-medium">{location}</div>
                                             <div className="text-sm text-gray-500">
                         
                       </div>
                    </div>
                  ))
               ) : searchQuery ? (
                 <div className="text-center text-gray-500 py-4">
                   No destinations found
                 </div>
               ) : (
                 // Show popular destinations when no search
                 locations.slice(0, 3).map((location, index) => (
                   <div 
                     key={index}
                     className="p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
                     onClick={() => selectLocation(location)}
                   >
                     <div className="font-medium">{location}</div>
                     <div className="text-sm text-gray-500">
                       
                     </div>
                   </div>
                 ))
               )}
             </div>
           </div>
         )}

                 {(activeField === "checkin" || activeField === "checkout") && (
           <div className="absolute top-0 left-full ml-4 w-[600px] h-full bg-white rounded-2xl shadow-lg border border-[#e5e7eb] p-6 z-10">
             <div className="flex justify-center">
               <DateRangePicker 
                 className="w-full"
                 date={dateRange}
                 onDateChange={(date) => {
                   if (date) {
                     handleDateRangeChange(date.from, date.to)
                   }
                 }}
               />
             </div>
           </div>
         )}

                 {activeField === "guests" && (
           <div className="absolute top-0 left-full ml-4 w-80 h-full bg-white rounded-2xl shadow-lg border border-[#e5e7eb] p-6 z-10">
            <h3 className="text-lg font-semibold mb-4">Who's coming?</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Adults</div>
                  <div className="text-sm text-gray-500">Ages 13 or above</div>
                </div>
                <Counter
                  value={formData.guests.adults}
                  onIncrement={() => handleGuestChange('adults', 'increment')}
                  onDecrement={() => handleGuestChange('adults', 'decrement')}
                  min={0}
                  max={16}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Children</div>
                  <div className="text-sm text-gray-500">Ages 2-12</div>
                </div>
                <Counter
                  value={formData.guests.children}
                  onIncrement={() => handleGuestChange('children', 'increment')}
                  onDecrement={() => handleGuestChange('children', 'decrement')}
                  min={0}
                  max={10}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Infants</div>
                  <div className="text-sm text-gray-500">Under 2</div>
                </div>
                <Counter
                  value={formData.guests.infants}
                  onIncrement={() => handleGuestChange('infants', 'increment')}
                  onDecrement={() => handleGuestChange('infants', 'decrement')}
                  min={0}
                  max={5}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
