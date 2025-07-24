import Image from "next/image"
import { ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function Guides() {
  const guides = [
    {
      title: "Getting started on Airbnb",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      title: "Finding a stay that's right for you",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      title: "AirCover for guests",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      title: "Setting up your Airbnb account",
      image: "/placeholder.svg?height=300&width=400",
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-semibold text-gray-900">Guides for getting started</h1>
        <button className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors">
          <span className="text-base font-medium">Browse all topics</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Grid of guide cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {guides.map((guide, index) => (
          <Card
            key={index}
            className="group cursor-pointer border-0 shadow-none hover:shadow-lg transition-shadow duration-300"
          >
            <CardContent className="p-0">
              <div className="relative overflow-hidden rounded-xl">
                <Image
                  src={guide.image || "/placeholder.svg"}
                  alt={guide.title}
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="pt-4">
                <h3 className="text-lg font-medium text-gray-900 leading-tight">{guide.title}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
