import { PrismaClient, PropertyType, Amenity, Highlight } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting listings seed process...')

  // Clear existing listings and related data
  await prisma.application.deleteMany()
  await prisma.lease.deleteMany()
  await prisma.tenant.deleteMany()
  await prisma.listing.deleteMany()
  await prisma.location.deleteMany()
  console.log('🧹 Cleared existing data')

  // Find or create the Facebook account manager
  const manager = await prisma.user.upsert({
    where: { email: 'osmanabdout@hotmail.com' },
    update: { role: 'MANAGER' },
    create: {
      email: 'osmanabdout@hotmail.com',
      username: 'Osman Abdout',
      role: 'MANAGER',
      emailVerified: new Date()
    }
  })

  console.log(`✅ Manager set up: ${manager.email} (${manager.username})`)

  // Define diverse listing data with different statuses
  const listingData = [
    // PUBLISHED LISTINGS (isPublished: true, draft: false)
    {
      title: 'Luxury Downtown Penthouse',
      description: 'Stunning penthouse apartment in the heart of downtown with panoramic city views. Features include a private rooftop terrace, floor-to-ceiling windows, and premium finishes throughout.',
      pricePerNight: 450,
      securityDeposit: 4500,
      applicationFee: 150,
      bedrooms: 3,
      bathrooms: 2.5,
      squareFeet: 2200,
      propertyType: PropertyType.Apartment,
      isPetsAllowed: false,
      isParkingIncluded: true,
      amenities: [Amenity.AirConditioning, Amenity.Gym, Amenity.Pool, Amenity.WiFi, Amenity.Parking],
      highlights: [Highlight.GreatView, Highlight.RecentlyRenovated, Highlight.HighSpeedInternetAccess],
      photoUrls: [
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800'
      ],
      location: {
        address: '100 Main Street, Suite 3001',
        city: 'New York',
        state: 'NY',
        country: 'United States',
        postalCode: '10001',
        latitude: 40.7128,
        longitude: -74.0060
      },
      isPublished: true,
      draft: false,
      instantBook: true,
      averageRating: 4.8,
      numberOfReviews: 24
    },
    {
      title: 'Cozy Beach House',
      description: 'Charming beach house just steps from the ocean. Features include a private deck, outdoor shower, and fully equipped kitchen. Perfect for beach lovers and remote workers.',
      pricePerNight: 320,
      securityDeposit: 3200,
      applicationFee: 100,
      bedrooms: 2,
      bathrooms: 1.5,
      squareFeet: 1400,
      propertyType: PropertyType.Cottage,
      isPetsAllowed: true,
      isParkingIncluded: true,
      amenities: [Amenity.WiFi, Amenity.WasherDryer, Amenity.HardwoodFloors, Amenity.PetsAllowed],
      highlights: [Highlight.GreatView, Highlight.QuietNeighborhood, Highlight.CloseToTransit],
      photoUrls: [
        'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800',
        'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800'
      ],
      location: {
        address: '25 Seaside Drive',
        city: 'Santa Monica',
        state: 'CA',
        country: 'United States',
        postalCode: '90401',
        latitude: 34.0195,
        longitude: -118.4912
      },
      isPublished: true,
      draft: false,
      instantBook: false,
      averageRating: 4.6,
      numberOfReviews: 18
    },
    {
      title: 'Modern Family Villa',
      description: 'Spacious modern villa perfect for families. Features include a large backyard, gourmet kitchen, master suite with walk-in closet, and home office.',
      pricePerNight: 580,
      securityDeposit: 5800,
      applicationFee: 200,
      bedrooms: 4,
      bathrooms: 3,
      squareFeet: 3200,
      propertyType: PropertyType.Villa,
      isPetsAllowed: true,
      isParkingIncluded: true,
      amenities: [Amenity.AirConditioning, Amenity.WasherDryer, Amenity.Dishwasher, Amenity.WalkInClosets, Amenity.PetsAllowed, Amenity.Parking],
      highlights: [Highlight.RecentlyRenovated, Highlight.QuietNeighborhood, Highlight.SprinklerSystem],
      photoUrls: [
        'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800'
      ],
      location: {
        address: '789 Maple Avenue',
        city: 'Austin',
        state: 'TX',
        country: 'United States',
        postalCode: '78701',
        latitude: 30.2672,
        longitude: -97.7431
      },
      isPublished: true,
      draft: false,
      instantBook: true,
      averageRating: 4.9,
      numberOfReviews: 31
    },
    {
      title: 'Urban Loft Studio',
      description: 'Trendy loft studio in the arts district. Features exposed brick walls, high ceilings, and large windows. Perfect for artists, students, or young professionals.',
      pricePerNight: 180,
      securityDeposit: 1800,
      applicationFee: 75,
      bedrooms: 1,
      bathrooms: 1,
      squareFeet: 650,
      propertyType: PropertyType.Apartment,
      isPetsAllowed: false,
      isParkingIncluded: false,
      amenities: [Amenity.WiFi, Amenity.HardwoodFloors, Amenity.HighSpeedInternet],
      highlights: [Highlight.HighSpeedInternetAccess, Highlight.CloseToTransit, Highlight.GreatView],
      photoUrls: [
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800'
      ],
      location: {
        address: '456 Art Street, Unit 2B',
        city: 'Portland',
        state: 'OR',
        country: 'United States',
        postalCode: '97201',
        latitude: 45.5152,
        longitude: -122.6784
      },
      isPublished: true,
      draft: false,
      instantBook: false,
      averageRating: 4.4,
      numberOfReviews: 12
    },
    {
      title: 'Executive Townhouse',
      description: 'Elegant three-story townhouse in prestigious neighborhood. Features include a private garage, rooftop deck, marble countertops, and smart home technology.',
      pricePerNight: 420,
      securityDeposit: 4200,
      applicationFee: 125,
      bedrooms: 3,
      bathrooms: 2.5,
      squareFeet: 2100,
      propertyType: PropertyType.Townhouse,
      isPetsAllowed: false,
      isParkingIncluded: true,
      amenities: [Amenity.AirConditioning, Amenity.WasherDryer, Amenity.Dishwasher, Amenity.WalkInClosets, Amenity.Parking],
      highlights: [Highlight.RecentlyRenovated, Highlight.Intercom, Highlight.SprinklerSystem, Highlight.QuietNeighborhood],
      photoUrls: [
        'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800',
        'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800'
      ],
      location: {
        address: '321 Executive Row',
        city: 'Seattle',
        state: 'WA',
        country: 'United States',
        postalCode: '98101',
        latitude: 47.6062,
        longitude: -122.3321
      },
      isPublished: true,
      draft: false,
      instantBook: true,
      averageRating: 4.7,
      numberOfReviews: 28
    },

    // DRAFT LISTINGS (draft: true, isPublished: false)
    {
      title: 'Eco-Friendly Tiny House',
      description: 'Sustainable tiny house with solar panels, composting toilet, and rainwater collection. Perfect for environmentally conscious renters.',
      pricePerNight: 120,
      securityDeposit: 1200,
      applicationFee: 50,
      bedrooms: 1,
      bathrooms: 1,
      squareFeet: 400,
      propertyType: PropertyType.Tinyhouse,
      isPetsAllowed: true,
      isParkingIncluded: true,
      amenities: [Amenity.WiFi, Amenity.PetsAllowed],
      highlights: [Highlight.QuietNeighborhood, Highlight.GreatView],
      photoUrls: [
        'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800'
      ],
      location: {
        address: '15 Green Valley Road',
        city: 'Asheville',
        state: 'NC',
        country: 'United States',
        postalCode: '28801',
        latitude: 35.5951,
        longitude: -82.5515
      },
      isPublished: false,
      draft: true,
      instantBook: false,
      averageRating: 0,
      numberOfReviews: 0
    },
    {
      title: 'Student Housing - Shared Rooms',
      description: 'Affordable shared housing near university campus. Each room is furnished with a bed, desk, and storage. Common areas include kitchen, living room, and study spaces.',
      pricePerNight: 80,
      securityDeposit: 800,
      applicationFee: 25,
      bedrooms: 1,
      bathrooms: 0.5,
      squareFeet: 150,
      propertyType: PropertyType.Rooms,
      isPetsAllowed: false,
      isParkingIncluded: false,
      amenities: [Amenity.WiFi, Amenity.HighSpeedInternet, Amenity.WasherDryer],
      highlights: [Highlight.HighSpeedInternetAccess, Highlight.CloseToTransit],
      photoUrls: [
        'https://images.unsplash.com/photo-1555854877-bab0e5b6856c?w=800'
      ],
      location: {
        address: '200 College Avenue, Room 3A',
        city: 'Boston',
        state: 'MA',
        country: 'United States',
        postalCode: '02115',
        latitude: 42.3601,
        longitude: -71.0589
      },
      isPublished: false,
      draft: true,
      instantBook: false,
      averageRating: 0,
      numberOfReviews: 0
    },

    // IN PROGRESS LISTINGS (draft: false, isPublished: false, but has photos and basic info)
    {
      title: 'Luxury High-Rise Apartment',
      description: 'Premium apartment in luxury high-rise building. Features include concierge service, rooftop pool, fitness center, and stunning city views.',
      pricePerNight: 380,
      securityDeposit: 3800,
      applicationFee: 150,
      bedrooms: 2,
      bathrooms: 2,
      squareFeet: 1800,
      propertyType: PropertyType.Apartment,
      isPetsAllowed: false,
      isParkingIncluded: true,
      amenities: [Amenity.AirConditioning, Amenity.Pool, Amenity.Gym, Amenity.WiFi, Amenity.Parking, Amenity.Dishwasher],
      highlights: [Highlight.GreatView, Highlight.Intercom, Highlight.HighSpeedInternetAccess, Highlight.CloseToTransit],
      photoUrls: [
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'
      ],
      location: {
        address: '888 Financial Plaza, Floor 25',
        city: 'Chicago',
        state: 'IL',
        country: 'United States',
        postalCode: '60601',
        latitude: 41.8781,
        longitude: -87.6298
      },
      isPublished: false,
      draft: false,
      instantBook: false,
      averageRating: 0,
      numberOfReviews: 0
    },
    {
      title: 'Mountain View Cabin',
      description: 'Rustic cabin with modern amenities nestled in the mountains. Perfect for nature lovers and those seeking peace and quiet.',
      pricePerNight: 250,
      securityDeposit: 2500,
      applicationFee: 100,
      bedrooms: 2,
      bathrooms: 1,
      squareFeet: 1200,
      propertyType: PropertyType.Cottage,
      isPetsAllowed: true,
      isParkingIncluded: true,
      amenities: [Amenity.WiFi, Amenity.WasherDryer, Amenity.PetsAllowed, Amenity.Parking],
      highlights: [Highlight.GreatView, Highlight.QuietNeighborhood],
      photoUrls: [
        'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800'
      ],
      location: {
        address: '123 Mountain Trail',
        city: 'Denver',
        state: 'CO',
        country: 'United States',
        postalCode: '80201',
        latitude: 39.7392,
        longitude: -104.9903
      },
      isPublished: false,
      draft: false,
      instantBook: false,
      averageRating: 0,
      numberOfReviews: 0
    },

    // ACTION REQUIRED LISTINGS (missing critical information)
    {
      title: 'Downtown Studio',
      description: 'Modern studio apartment in the heart of downtown.',
      pricePerNight: 200,
      securityDeposit: 2000,
      applicationFee: 75,
      bedrooms: 1,
      bathrooms: 1,
      squareFeet: 600,
      propertyType: PropertyType.Apartment,
      isPetsAllowed: false,
      isParkingIncluded: false,
      amenities: [Amenity.WiFi],
      highlights: [Highlight.CloseToTransit],
      photoUrls: [], // Missing photos - action required
      location: {
        address: '555 Downtown Ave',
        city: 'Miami',
        state: 'FL',
        country: 'United States',
        postalCode: '33101',
        latitude: 25.7617,
        longitude: -80.1918
      },
      isPublished: false,
      draft: false,
      instantBook: false,
      averageRating: 0,
      numberOfReviews: 0
    },
    {
      title: 'Garden Apartment',
      description: 'Beautiful garden apartment with private outdoor space.',
      pricePerNight: 280,
      securityDeposit: 2800,
      applicationFee: 100,
      bedrooms: 2,
      bathrooms: 1,
      squareFeet: 1000,
      propertyType: PropertyType.Apartment,
      isPetsAllowed: true,
      isParkingIncluded: true,
      amenities: [Amenity.WiFi, Amenity.PetsAllowed, Amenity.Parking],
      highlights: [Highlight.QuietNeighborhood],
      photoUrls: [
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'
      ],
      location: {
        address: '777 Garden Street',
        city: 'San Francisco',
        state: 'CA',
        country: 'United States',
        postalCode: '94102',
        latitude: 37.7749,
        longitude: -122.4194
      },
      isPublished: false,
      draft: false,
      instantBook: false,
      averageRating: 0,
      numberOfReviews: 0
    }
  ]

  // Create listings with locations
  console.log('🏠 Creating listings with locations...')
  
  let publishedCount = 0
  let draftCount = 0
  let inProgressCount = 0
  let actionRequiredCount = 0

  for (const [index, listing] of listingData.entries()) {
    try {
      // Create location first
      const location = await prisma.location.create({
        data: listing.location
      })

      // Create listing
      const createdListing = await prisma.listing.create({
        data: {
          title: listing.title,
          description: listing.description,
          pricePerNight: listing.pricePerNight,
          securityDeposit: listing.securityDeposit,
          applicationFee: listing.applicationFee,
          bedrooms: listing.bedrooms,
          bathrooms: listing.bathrooms,
          squareFeet: listing.squareFeet,
          propertyType: listing.propertyType,
          isPetsAllowed: listing.isPetsAllowed,
          isParkingIncluded: listing.isParkingIncluded,
          amenities: listing.amenities,
          highlights: listing.highlights,
          photoUrls: listing.photoUrls,
          locationId: location.id,
          hostId: manager.id,
          isPublished: listing.isPublished,
          draft: listing.draft,
          instantBook: listing.instantBook,
          averageRating: listing.averageRating,
          numberOfReviews: listing.numberOfReviews,
          postedDate: listing.isPublished ? new Date() : null
        }
      })

      // Count by status
      if (listing.isPublished) {
        publishedCount++
      } else if (listing.draft) {
        draftCount++
      } else if (listing.photoUrls.length > 0) {
        inProgressCount++
      } else {
        actionRequiredCount++
      }

      console.log(`✅ Created listing: ${createdListing.title} (${listing.isPublished ? 'Published' : listing.draft ? 'Draft' : listing.photoUrls.length > 0 ? 'In Progress' : 'Action Required'})`)
    } catch (error) {
      console.error(`❌ Error creating listing ${index + 1}:`, error)
    }
  }

  console.log('🎉 Listings seed completed successfully!')
  console.log(`📊 Summary:`)
  console.log(`   - Manager: ${manager.email}`)
  console.log(`   - Published listings: ${publishedCount}`)
  console.log(`   - Draft listings: ${draftCount}`)
  console.log(`   - In Progress listings: ${inProgressCount}`)
  console.log(`   - Action Required listings: ${actionRequiredCount}`)
  console.log(`   - Total listings: ${listingData.length}`)
  console.log(`\n🌐 Visit http://localhost:3000/dashboard/properties to see your listings!`)
  console.log(`🔍 Visit http://localhost:3000/search to see published listings!`)
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 