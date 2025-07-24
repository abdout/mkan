"use client"

import { useState } from "react"
import Image from "next/image"
import NavThumbnails from "./nav-thumbnails"

interface PhotoSection {
  id: string
  label: string
  photos: string[]
}

interface PhotoTourProps {
  sections?: PhotoSection[]
}

// Mock data - replace with actual listing data
const mockSections: PhotoSection[] = [
  {
    id: "living-room",
    label: "Living room",
    photos: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&h=600&fit=crop"
    ]
  },
  {
    id: "kitchen",
    label: "Full kitchen",
    photos: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&h=600&fit=crop"
    ]
  },
  {
    id: "bedroom",
    label: "Bedroom",
    photos: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1560448204-6032e02f11c3?w=800&h=600&fit=crop"
    ]
  },
  {
    id: "bathroom",
    label: "Full bathroom",
    photos: [
      "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop"
    ]
  }
]

export default function PhotoTour({ sections = mockSections }: PhotoTourProps) {
  const [selectedSection, setSelectedSection] = useState<string>(sections[0]?.id || "")

  const scrollToSection = (sectionId: string) => {
    setSelectedSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className=" px-20">
      {/* Title */}
      <h3 className="text-2xl mb-8">Photo tour</h3>

             {/* Navigation Thumbnails */}
       <NavThumbnails
         sections={sections}
         onSectionClick={scrollToSection}
         selectedSection={selectedSection}
       />

             {/* Photo Sections */}
       <div className="space-y-8">
         {sections.map((section) => (
                       <div key={section.id} id={section.id} className="grid grid-cols-1 md:grid-cols-6 gap-8">
              {/* Label Column */}
              <div className="md:col-span-2">
                <div className="sticky top-24">
                  <h4 className="">
                    {section.label}
                  </h4>
                </div>
              </div>

              {/* Photos Column */}
              <div className="md:col-span-4 space-y-4">
               {section.photos.map((photo, index) => (
                 <div
                   key={index}
                   className="relative aspect-[4/3] overflow-hidden cursor-pointer group"
                 >
                   <Image
                     src={photo}
                     alt={`${section.label} photo ${index + 1}`}
                     fill
                     className="object-cover transition-transform duration-300 group-hover:scale-105"
                   />
                   <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                 </div>
               ))}
             </div>
           </div>
         ))}
       </div>
    </div>
  )
}
