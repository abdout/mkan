"use client"

import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export default function Component() {
  return (
    <div className="bg-[#ffffff] rounded-full shadow-lg border border-[#e5e7eb] flex items-center overflow-hidden w-96">
        <button onClick={() => {}} className="flex-1 px-6 py-4 text-left">
          <div className="font-semibold text-[#000000] text-xs">Anywhere</div>
        </button>

        <div className="w-px h-8 bg-[#e5e7eb]"></div>

        <button onClick={() => {}} className="flex-1 px-6 py-4 text-left">
          <div className="font-semibold text-[#000000] text-xs">Anytime</div>
        </button>

        <div className="w-px h-8 bg-[#e5e7eb]"></div>

        <button onClick={() => {}} className="flex-1 px-6 py-4 text-left">
          <div className="font-semibold text-[#000000] text-xs">Add guests</div>
        </button>

        <div className="pr-2">
          <Button size="icon" className="rounded-full w-8 h-8 bg-[#de3151] border-0">
            <Search className="w-4 h-4 text-[#ffffff]" />
            <span className="sr-only">Search</span>
          </Button>
        </div>
    </div>
  )
}
