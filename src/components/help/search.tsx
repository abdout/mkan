import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function SearchBar() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f8f9fa] p-4">
      <div className="relative w-full max-w-md">
        <div className="relative flex items-center">
          <Input
            type="text"
            placeholder="Start your search"
            className="w-full h-14 pl-6 pr-16 text-base border-0 rounded-full shadow-lg bg-[#ffffff] placeholder:text-[#6b7280] focus-visible:ring-2 focus-visible:ring-[#de3151] focus-visible:ring-offset-0"
          />
          <Button
            size="icon"
            className="absolute right-2 h-10 w-10 rounded-full bg-[#de3151] hover:bg-[#c42a47] focus-visible:ring-2 focus-visible:ring-[#de3151] focus-visible:ring-offset-2"
          >
            <Search className="h-5 w-5 text-[#ffffff]" />
            <span className="sr-only">Search</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
