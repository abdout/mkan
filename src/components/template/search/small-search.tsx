"use client"

import { SearchButton } from "@/components/atom"

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
          <SearchButton size="small" onClick={() => {}} />
        </div>
    </div>
  )
}
