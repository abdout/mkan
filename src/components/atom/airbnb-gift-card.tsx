import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function GiftCard() {
  return (
    <div className="bg-[#ffffff] min-h-screen flex items-center justify-center">
      <div className="max-w-7xl w-full flex items-center justify-between">
        {/* Left side - Text content */}
        <div className="flex-1 max-w-md">
          <h1 className="text-[#000000] text-5xl font-bold leading-tight mb-8">Shop Mkan <br /> gift cards</h1>
          <Button className="bg-[#000000] text-[#ffffff] hover:bg-[#000000]/90 px-6 py-4 text-lg font-medium rounded-lg">
            Learn more
          </Button>
        </div>

        {/* Right side - Gift cards image */}
        <div className="flex-1 relative ml-16 flex justify-center items-center">
          <div className="w-full max-w-2xl">
            <Image
              src="/airbnb/gift-cards.png"
              alt="Three Airbnb gift cards overlapping at angles"
              width={800}
              height={400}
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
