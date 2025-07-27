"use client"

import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"

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
          <Button
            size="icon"
            className="rounded-full bg-[#de3151] hover:bg-[#de3151]/90 text-white w-10 h-10"
            onClick={() => {}}
          >
            <Search className="w-4 h-4" />
            <span className="sr-only">Search</span>
          </Button>
        </div>
    </div>
  )
}
