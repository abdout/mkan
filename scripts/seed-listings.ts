import { PrismaClient, PropertyType, Amenity, Highlight } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting Sudan listings seed process...')

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

  // Define diverse listing data with Sudanese locations and realistic pricing
  const listingData = [
    // PUBLISHED LISTINGS - Khartoum
    {
      title: 'Luxury Nile View Apartment',
      description: 'Stunning modern apartment with breathtaking views of the Nile River. Located in the prestigious Al-Manshiya district, this property features premium finishes, a private balcony, and 24/7 security. Perfect for executives and families seeking luxury living in the heart of Khartoum.',
      pricePerNight: 250,
      securityDeposit: 2500,
      applicationFee: 100,
      bedrooms: 3,
      bathrooms: 2.5,
      squareFeet: 1800,
      propertyType: PropertyType.Apartment,
      isPetsAllowed: false,
      isParkingIncluded: true,
      amenities: [Amenity.AirConditioning, Amenity.WiFi, Amenity.Parking, Amenity.Dishwasher, Amenity.WasherDryer],
      highlights: [Highlight.GreatView, Highlight.RecentlyRenovated, Highlight.HighSpeedInternetAccess, Highlight.QuietNeighborhood],
      photoUrls: [
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800'
      ],
      location: {
        address: 'Al-Manshiya Street, Building 15',
        city: 'Khartoum',
        state: 'Khartoum',
        country: 'Sudan',
        postalCode: '11111',
        latitude: 15.5007,
        longitude: 32.5599
      },
      isPublished: true,
      draft: false,
      instantBook: true,
      averageRating: 4.8,
      numberOfReviews: 24
    },
    {
      title: 'Traditional Sudanese Villa',
      description: 'Beautiful traditional Sudanese villa with courtyard and garden. Features authentic Sudanese architecture with modern amenities. Located in the peaceful Al-Riyadh neighborhood, this property offers a perfect blend of tradition and comfort.',
      pricePerNight: 180,
      securityDeposit: 1800,
      applicationFee: 75,
      bedrooms: 4,
      bathrooms: 3,
      squareFeet: 2500,
      propertyType: PropertyType.Villa,
      isPetsAllowed: true,
      isParkingIncluded: true,
      amenities: [Amenity.AirConditioning, Amenity.WiFi, Amenity.Parking, Amenity.WasherDryer, Amenity.PetsAllowed],
      highlights: [Highlight.QuietNeighborhood, Highlight.GreatView, Highlight.RecentlyRenovated],
      photoUrls: [
        'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800'
      ],
      location: {
        address: 'Al-Riyadh District, Villa 8',
        city: 'Khartoum',
        state: 'Khartoum',
        country: 'Sudan',
        postalCode: '11112',
        latitude: 15.5507,
        longitude: 32.5599
      },
      isPublished: true,
      draft: false,
      instantBook: false,
      averageRating: 4.6,
      numberOfReviews: 18
    },
    {
      title: 'Student Housing Near University',
      description: 'Affordable student accommodation near University of Khartoum. Clean, furnished rooms with shared kitchen and study areas. Perfect for students seeking convenient and budget-friendly housing.',
      pricePerNight: 60,
      securityDeposit: 600,
      applicationFee: 25,
      bedrooms: 1,
      bathrooms: 0.5,
      squareFeet: 200,
      propertyType: PropertyType.Rooms,
      isPetsAllowed: false,
      isParkingIncluded: false,
      amenities: [Amenity.WiFi, Amenity.HighSpeedInternet, Amenity.AirConditioning],
      highlights: [Highlight.HighSpeedInternetAccess, Highlight.CloseToTransit, Highlight.QuietNeighborhood],
      photoUrls: [
        'https://images.unsplash.com/photo-1555854877-bab0e5b6856c?w=800'
      ],
      location: {
        address: 'University Street, Building 3',
        city: 'Khartoum',
        state: 'Khartoum',
        country: 'Sudan',
        postalCode: '11113',
        latitude: 15.5007,
        longitude: 32.5299
      },
      isPublished: true,
      draft: false,
      instantBook: true,
      averageRating: 4.4,
      numberOfReviews: 12
    },

    // PUBLISHED LISTINGS - Omdurman
    {
      title: 'Family Villa in Omdurman',
      description: 'Spacious family villa in the heart of Omdurman. Features a large garden, traditional Sudanese design elements, and modern conveniences. Located near markets and schools, perfect for families.',
      pricePerNight: 150,
      securityDeposit: 1500,
      applicationFee: 60,
      bedrooms: 5,
      bathrooms: 3,
      squareFeet: 3000,
      propertyType: PropertyType.Villa,
      isPetsAllowed: true,
      isParkingIncluded: true,
      amenities: [Amenity.AirConditioning, Amenity.WiFi, Amenity.Parking, Amenity.WasherDryer, Amenity.PetsAllowed],
      highlights: [Highlight.QuietNeighborhood, Highlight.GreatView, Highlight.CloseToTransit],
      photoUrls: [
        'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800',
        'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800'
      ],
      location: {
        address: 'Al-Thawra Street, Villa 12',
        city: 'Omdurman',
        state: 'Khartoum',
        country: 'Sudan',
        postalCode: '11114',
        latitude: 15.6507,
        longitude: 32.4799
      },
      isPublished: true,
      draft: false,
      instantBook: true,
      averageRating: 4.7,
      numberOfReviews: 28
    },
    {
      title: 'Modern Apartment Complex',
      description: 'Contemporary apartment in a modern complex with security, parking, and community facilities. Located in the growing Al-Sahafa district of Omdurman.',
      pricePerNight: 120,
      securityDeposit: 1200,
      applicationFee: 50,
      bedrooms: 2,
      bathrooms: 2,
      squareFeet: 1200,
      propertyType: PropertyType.Apartment,
      isPetsAllowed: false,
      isParkingIncluded: true,
      amenities: [Amenity.AirConditioning, Amenity.WiFi, Amenity.Parking, Amenity.Dishwasher],
      highlights: [Highlight.RecentlyRenovated, Highlight.CloseToTransit, Highlight.QuietNeighborhood],
      photoUrls: [
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800'
      ],
      location: {
        address: 'Al-Sahafa District, Building 7',
        city: 'Omdurman',
        state: 'Khartoum',
        country: 'Sudan',
        postalCode: '11115',
        latitude: 15.6007,
        longitude: 32.4899
      },
      isPublished: true,
      draft: false,
      instantBook: false,
      averageRating: 4.5,
      numberOfReviews: 15
    },

    // PUBLISHED LISTINGS - Khartoum North
    {
      title: 'Executive Townhouse',
      description: 'Elegant townhouse in the prestigious Al-Kalakla district. Features modern design, private garden, and premium amenities. Perfect for professionals and small families.',
      pricePerNight: 200,
      securityDeposit: 2000,
      applicationFee: 80,
      bedrooms: 3,
      bathrooms: 2.5,
      squareFeet: 1800,
      propertyType: PropertyType.Townhouse,
      isPetsAllowed: false,
      isParkingIncluded: true,
      amenities: [Amenity.AirConditioning, Amenity.WiFi, Amenity.Parking, Amenity.WasherDryer, Amenity.Dishwasher],
      highlights: [Highlight.RecentlyRenovated, Highlight.QuietNeighborhood, Highlight.GreatView],
      photoUrls: [
        'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800',
        'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800'
      ],
      location: {
        address: 'Al-Kalakla Street, Townhouse 5',
        city: 'Khartoum North',
        state: 'Khartoum',
        country: 'Sudan',
        postalCode: '11116',
        latitude: 15.6507,
        longitude: 32.5599
      },
      isPublished: true,
      draft: false,
      instantBook: true,
      averageRating: 4.9,
      numberOfReviews: 31
    },

    // PUBLISHED LISTINGS - Port Sudan
    {
      title: 'Beachfront Apartment',
      description: 'Beautiful apartment with stunning Red Sea views in Port Sudan. Features modern amenities and easy access to the beach. Perfect for those who love the sea and coastal living.',
      pricePerNight: 140,
      securityDeposit: 1400,
      applicationFee: 60,
      bedrooms: 2,
      bathrooms: 2,
      squareFeet: 1000,
      propertyType: PropertyType.Apartment,
      isPetsAllowed: false,
      isParkingIncluded: true,
      amenities: [Amenity.AirConditioning, Amenity.WiFi, Amenity.Parking, Amenity.Dishwasher],
      highlights: [Highlight.GreatView, Highlight.CloseToTransit, Highlight.QuietNeighborhood],
      photoUrls: [
        'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800',
        'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800'
      ],
      location: {
        address: 'Red Sea Street, Building 10',
        city: 'Port Sudan',
        state: 'Red Sea',
        country: 'Sudan',
        postalCode: '22222',
        latitude: 19.6158,
        longitude: 37.2164
      },
      isPublished: true,
      draft: false,
      instantBook: true,
      averageRating: 4.6,
      numberOfReviews: 22
    },

    // PUBLISHED LISTINGS - Wad Madani
    {
      title: 'Agricultural Villa',
      description: 'Spacious villa with garden and agricultural land in Wad Madani. Perfect for families who enjoy gardening and outdoor activities. Located in a peaceful neighborhood.',
      pricePerNight: 100,
      securityDeposit: 1000,
      applicationFee: 40,
      bedrooms: 4,
      bathrooms: 2,
      squareFeet: 2200,
      propertyType: PropertyType.Villa,
      isPetsAllowed: true,
      isParkingIncluded: true,
      amenities: [Amenity.AirConditioning, Amenity.WiFi, Amenity.Parking, Amenity.WasherDryer, Amenity.PetsAllowed],
      highlights: [Highlight.QuietNeighborhood, Highlight.GreatView],
      photoUrls: [
        'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800'
      ],
      location: {
        address: 'Agricultural District, Villa 3',
        city: 'Wad Madani',
        state: 'Al Jazirah',
        country: 'Sudan',
        postalCode: '33333',
        latitude: 14.4019,
        longitude: 33.5199
      },
      isPublished: true,
      draft: false,
      instantBook: false,
      averageRating: 4.3,
      numberOfReviews: 8
    },

    // PUBLISHED LISTINGS - Kassala
    {
      title: 'Mountain View Cottage',
      description: 'Charming cottage with beautiful views of the Taka Mountains. Features traditional Sudanese architecture with modern comforts. Perfect for nature lovers and those seeking tranquility.',
      pricePerNight: 80,
      securityDeposit: 800,
      applicationFee: 30,
      bedrooms: 2,
      bathrooms: 1,
      squareFeet: 800,
      propertyType: PropertyType.Cottage,
      isPetsAllowed: true,
      isParkingIncluded: true,
      amenities: [Amenity.AirConditioning, Amenity.WiFi, Amenity.Parking, Amenity.PetsAllowed],
      highlights: [Highlight.GreatView, Highlight.QuietNeighborhood],
      photoUrls: [
        'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800'
      ],
      location: {
        address: 'Mountain District, Cottage 7',
        city: 'Kassala',
        state: 'Kassala',
        country: 'Sudan',
        postalCode: '44444',
        latitude: 15.4507,
        longitude: 36.3999
      },
      isPublished: true,
      draft: false,
      instantBook: false,
      averageRating: 4.7,
      numberOfReviews: 16
    },

    // DRAFT LISTINGS
    {
      title: 'Eco-Friendly Tiny House',
      description: 'Sustainable tiny house with solar panels and rainwater collection. Perfect for environmentally conscious renters seeking a minimalist lifestyle.',
      pricePerNight: 70,
      securityDeposit: 700,
      applicationFee: 25,
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
        address: 'Green Valley Road, Tiny House 1',
        city: 'Khartoum',
        state: 'Khartoum',
        country: 'Sudan',
        postalCode: '11117',
        latitude: 15.5007,
        longitude: 32.5899
      },
      isPublished: false,
      draft: true,
      instantBook: false,
      averageRating: 0,
      numberOfReviews: 0
    },
    {
      title: 'Luxury High-Rise Apartment',
      description: 'Premium apartment in luxury high-rise building with concierge service, rooftop pool, and stunning city views. Located in the heart of Khartoum.',
      pricePerNight: 300,
      securityDeposit: 3000,
      applicationFee: 120,
      bedrooms: 2,
      bathrooms: 2,
      squareFeet: 1500,
      propertyType: PropertyType.Apartment,
      isPetsAllowed: false,
      isParkingIncluded: true,
      amenities: [Amenity.AirConditioning, Amenity.Pool, Amenity.Gym, Amenity.WiFi, Amenity.Parking, Amenity.Dishwasher],
      highlights: [Highlight.GreatView, Highlight.HighSpeedInternetAccess, Highlight.CloseToTransit],
      photoUrls: [
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'
      ],
      location: {
        address: 'Financial Plaza, Floor 15',
        city: 'Khartoum',
        state: 'Khartoum',
        country: 'Sudan',
        postalCode: '11118',
        latitude: 15.5007,
        longitude: 32.5599
      },
      isPublished: false,
      draft: true,
      instantBook: false,
      averageRating: 0,
      numberOfReviews: 0
    },

    // IN PROGRESS LISTINGS
    {
      title: 'Downtown Studio',
      description: 'Modern studio apartment in the heart of downtown Khartoum. Perfect for young professionals and students.',
      pricePerNight: 90,
      securityDeposit: 900,
      applicationFee: 35,
      bedrooms: 1,
      bathrooms: 1,
      squareFeet: 500,
      propertyType: PropertyType.Apartment,
      isPetsAllowed: false,
      isParkingIncluded: false,
      amenities: [Amenity.WiFi, Amenity.AirConditioning],
      highlights: [Highlight.CloseToTransit, Highlight.HighSpeedInternetAccess],
      photoUrls: [
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800'
      ],
      location: {
        address: 'Downtown Street, Studio 12',
        city: 'Khartoum',
        state: 'Khartoum',
        country: 'Sudan',
        postalCode: '11119',
        latitude: 15.5007,
        longitude: 32.5599
      },
      isPublished: false,
      draft: false,
      instantBook: false,
      averageRating: 0,
      numberOfReviews: 0
    },
    {
      title: 'Garden Apartment',
      description: 'Beautiful garden apartment with private outdoor space in Omdurman. Features a small garden and peaceful surroundings.',
      pricePerNight: 110,
      securityDeposit: 1100,
      applicationFee: 45,
      bedrooms: 2,
      bathrooms: 1,
      squareFeet: 900,
      propertyType: PropertyType.Apartment,
      isPetsAllowed: true,
      isParkingIncluded: true,
      amenities: [Amenity.WiFi, Amenity.PetsAllowed, Amenity.Parking, Amenity.AirConditioning],
      highlights: [Highlight.QuietNeighborhood, Highlight.GreatView],
      photoUrls: [
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'
      ],
      location: {
        address: 'Garden Street, Apartment 5',
        city: 'Omdurman',
        state: 'Khartoum',
        country: 'Sudan',
        postalCode: '11120',
        latitude: 15.6007,
        longitude: 32.4899
      },
      isPublished: false,
      draft: false,
      instantBook: false,
      averageRating: 0,
      numberOfReviews: 0
    },

    // ACTION REQUIRED LISTINGS
    {
      title: 'Traditional House',
      description: 'Beautiful traditional Sudanese house with courtyard. Needs photos and final details.',
      pricePerNight: 130,
      securityDeposit: 1300,
      applicationFee: 50,
      bedrooms: 3,
      bathrooms: 2,
      squareFeet: 1600,
      propertyType: PropertyType.Villa,
      isPetsAllowed: true,
      isParkingIncluded: true,
      amenities: [Amenity.AirConditioning, Amenity.WiFi, Amenity.Parking, Amenity.PetsAllowed],
      highlights: [Highlight.QuietNeighborhood],
      photoUrls: [], // Missing photos - action required
      location: {
        address: 'Traditional District, House 8',
        city: 'Khartoum',
        state: 'Khartoum',
        country: 'Sudan',
        postalCode: '11121',
        latitude: 15.5007,
        longitude: 32.5699
      },
      isPublished: false,
      draft: false,
      instantBook: false,
      averageRating: 0,
      numberOfReviews: 0
    },
    {
      title: 'Modern Apartment',
      description: 'Contemporary apartment with modern amenities. Located in a growing neighborhood.',
      pricePerNight: 160,
      securityDeposit: 1600,
      applicationFee: 65,
      bedrooms: 2,
      bathrooms: 2,
      squareFeet: 1100,
      propertyType: PropertyType.Apartment,
      isPetsAllowed: false,
      isParkingIncluded: true,
      amenities: [Amenity.AirConditioning, Amenity.WiFi, Amenity.Parking, Amenity.Dishwasher],
      highlights: [Highlight.RecentlyRenovated, Highlight.CloseToTransit],
      photoUrls: [
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800'
      ],
      location: {
        address: 'Modern Street, Apartment 15',
        city: 'Khartoum North',
        state: 'Khartoum',
        country: 'Sudan',
        postalCode: '11122',
        latitude: 15.6507,
        longitude: 32.5499
      },
      isPublished: false,
      draft: false,
      instantBook: false,
      averageRating: 0,
      numberOfReviews: 0
    },

    // ADDITIONAL SUDANESE CITIES
    {
      title: 'El Obeid Villa',
      description: 'Spacious villa in El Obeid with traditional design and modern amenities. Perfect for families seeking comfort in this historic city.',
      pricePerNight: 95,
      securityDeposit: 950,
      applicationFee: 40,
      bedrooms: 4,
      bathrooms: 2,
      squareFeet: 2000,
      propertyType: PropertyType.Villa,
      isPetsAllowed: true,
      isParkingIncluded: true,
      amenities: [Amenity.AirConditioning, Amenity.WiFi, Amenity.Parking, Amenity.WasherDryer, Amenity.PetsAllowed],
      highlights: [Highlight.QuietNeighborhood, Highlight.GreatView],
      photoUrls: [
        'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800'
      ],
      location: {
        address: 'Central District, Villa 6',
        city: 'El Obeid',
        state: 'North Kordofan',
        country: 'Sudan',
        postalCode: '55555',
        latitude: 13.1842,
        longitude: 30.2167
      },
      isPublished: true,
      draft: false,
      instantBook: false,
      averageRating: 4.2,
      numberOfReviews: 6
    },
    {
      title: 'Nyala Apartment',
      description: 'Modern apartment in Nyala with all essential amenities. Located near the city center with easy access to markets and services.',
      pricePerNight: 85,
      securityDeposit: 850,
      applicationFee: 35,
      bedrooms: 2,
      bathrooms: 1,
      squareFeet: 800,
      propertyType: PropertyType.Apartment,
      isPetsAllowed: false,
      isParkingIncluded: true,
      amenities: [Amenity.AirConditioning, Amenity.WiFi, Amenity.Parking],
      highlights: [Highlight.CloseToTransit, Highlight.QuietNeighborhood],
      photoUrls: [
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800'
      ],
      location: {
        address: 'City Center, Building 4',
        city: 'Nyala',
        state: 'South Darfur',
        country: 'Sudan',
        postalCode: '66666',
        latitude: 12.0500,
        longitude: 24.8833
      },
      isPublished: true,
      draft: false,
      instantBook: true,
      averageRating: 4.0,
      numberOfReviews: 4
    },
    {
      title: 'Al-Fashir Townhouse',
      description: 'Elegant townhouse in Al-Fashir with traditional Sudanese architecture. Features a private courtyard and garden.',
      pricePerNight: 75,
      securityDeposit: 750,
      applicationFee: 30,
      bedrooms: 3,
      bathrooms: 2,
      squareFeet: 1400,
      propertyType: PropertyType.Townhouse,
      isPetsAllowed: true,
      isParkingIncluded: true,
      amenities: [Amenity.AirConditioning, Amenity.WiFi, Amenity.Parking, Amenity.PetsAllowed],
      highlights: [Highlight.QuietNeighborhood, Highlight.GreatView],
      photoUrls: [
        'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800'
      ],
      location: {
        address: 'Traditional Quarter, Townhouse 3',
        city: 'Al-Fashir',
        state: 'North Darfur',
        country: 'Sudan',
        postalCode: '77777',
        latitude: 13.6279,
        longitude: 25.3494
      },
      isPublished: true,
      draft: false,
      instantBook: false,
      averageRating: 4.1,
      numberOfReviews: 3
    }
  ]

  // Create listings with locations
  console.log('🏠 Creating Sudanese listings with locations...')
  
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

  console.log('🎉 Sudan listings seed completed successfully!')
  console.log(`📊 Summary:`)
  console.log(`   - Manager: ${manager.email}`)
  console.log(`   - Published listings: ${publishedCount}`)
  console.log(`   - Draft listings: ${draftCount}`)
  console.log(`   - In Progress listings: ${inProgressCount}`)
  console.log(`   - Action Required listings: ${actionRequiredCount}`)
  console.log(`   - Total listings: ${listingData.length}`)
  console.log(`\n🌍 Cities covered: Khartoum, Omdurman, Khartoum North, Port Sudan, Wad Madani, Kassala, El Obeid, Nyala, Al-Fashir`)
  console.log(`🌐 Visit http://localhost:3000/dashboard/properties to see your listings!`)
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