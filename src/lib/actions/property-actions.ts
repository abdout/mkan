"use server"

// Removed unused import
import { auth } from '@/lib/auth'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { Amenity, Highlight, PropertyType } from '@prisma/client'
import { db } from "@/lib/db"
import { Prisma } from "@prisma/client"

export type PropertyFormData = {
  name: string
  description: string
  pricePerMonth: number
  securityDeposit: number
  applicationFee: number
  beds: number
  baths: number
  squareFeet: number
  propertyType: PropertyType
  isPetsAllowed: boolean
  isParkingIncluded: boolean
  amenities: Amenity[]
  highlights: Highlight[]
  photoUrls: string[]
  // Location data
  address: string
  city: string
  state: string
  country: string
  postalCode: string
  latitude: number
  longitude: number
}

// Types for filtering
interface PropertyFilters {
  location?: string
  priceRange?: [number, number]
  beds?: number
  baths?: number
  propertyType?: PropertyType
  squareFeet?: [number, number]
  amenities?: Amenity[]
  availableFrom?: string
  coordinates?: [number, number] // [longitude, latitude]
  favoriteIds?: number[]
}

export async function createProperty(data: PropertyFormData) {
  console.log('🏗️ === CREATE PROPERTY SERVER ACTION STARTED ===')
  console.log('📨 Received data:', data)
  
  // TODO: Uncomment auth check when ready for production
  // const session = await auth()
  
  // if (!session?.user?.id) {
  //   throw new Error('You must be logged in to create a property')
  // }

  try {
    console.log('🔍 Validating required fields...')
    const requiredFields = ['name', 'description', 'address', 'city', 'state', 'country', 'postalCode']
    const missingFields = requiredFields.filter(field => !data[field as keyof PropertyFormData])
    
    if (missingFields.length > 0) {
      console.error('❌ Missing required fields:', missingFields)
      throw new Error(`Missing required fields: ${missingFields.join(', ')}`)
    }

    if (data.pricePerMonth <= 0) {
      console.error('❌ Invalid price per month:', data.pricePerMonth)
      throw new Error('Price per month must be greater than 0')
    }

    if (data.squareFeet <= 0) {
      console.error('❌ Invalid square feet:', data.squareFeet)
      throw new Error('Square feet must be greater than 0')
    }

    console.log('✅ Basic validation passed')
    // For testing: Create or get a test user
    console.log('👤 Finding or creating test user...')
    let testUser = await db.user.findUnique({
      where: { email: 'test@example.com' }
    })
    
    if (!testUser) {
      console.log('👤 Creating new test user...')
      testUser = await db.user.create({
        data: {
          email: 'test@example.com',
          username: 'Test User',
          role: 'MANAGER'
        }
      })
      console.log('✅ Test user created:', testUser.id)
    } else {
      console.log('✅ Found existing test user:', testUser.id)
    }

    // Create location first
    console.log('📍 Creating location...')
    const locationData = {
      address: data.address,
      city: data.city,
      state: data.state,
      country: data.country,
      postalCode: data.postalCode,
      latitude: data.latitude,
      longitude: data.longitude,
    }
    console.log('📍 Location data:', locationData)
    
    const location = await db.location.create({
      data: locationData
    })
    console.log('✅ Location created:', location.id)

    // Create property
    console.log('🏠 Creating property...')
    const propertyData = {
      name: data.name,
      description: data.description,
      pricePerMonth: data.pricePerMonth,
      securityDeposit: data.securityDeposit,
      applicationFee: data.applicationFee,
      beds: data.beds,
      baths: data.baths,
      squareFeet: data.squareFeet,
      propertyType: data.propertyType,
      isPetsAllowed: data.isPetsAllowed,
      isParkingIncluded: data.isParkingIncluded,
      amenities: data.amenities,
      highlights: data.highlights,
      photoUrls: data.photoUrls,
      locationId: location.id,
      managerId: testUser.id, // TODO: Replace with session.user.id when auth is enabled
    }
    console.log('🏠 Property data:', propertyData)
    
    const property = await db.property.create({
      data: propertyData,
      include: {
        location: true,
        manager: true,
      }
    })
    console.log('✅ Property created successfully:', property.id)

    console.log('🔄 Revalidating paths...')
    revalidatePath('/search')
    revalidatePath('/dashboard/properties')
    
    console.log('🎉 === CREATE PROPERTY SUCCESS ===')
    return { success: true, property }
  } catch (error) {
    console.error('💥 === CREATE PROPERTY ERROR ===')
    console.error('💥 Error creating property:', error)
    console.error('💥 Error stack:', error instanceof Error ? error.stack : 'No stack trace')
    throw new Error(`Failed to create property: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

// Get properties with optional filtering
export async function getProperties(filters?: PropertyFilters) {
  try {
    const where: Prisma.PropertyWhereInput = {}

    if (filters) {
      // Location filtering
      if (filters.location) {
        where.location = {
          OR: [
            { city: { contains: filters.location, mode: 'insensitive' } },
            { state: { contains: filters.location, mode: 'insensitive' } },
            { address: { contains: filters.location, mode: 'insensitive' } },
          ]
        }
      }

      // Price range
      if (filters.priceRange) {
        where.pricePerMonth = {
          gte: filters.priceRange[0],
          lte: filters.priceRange[1],
        }
      }

      // Beds and baths
      if (filters.beds) where.beds = { gte: filters.beds }
      if (filters.baths) where.baths = { gte: filters.baths }

      // Property type
      if (filters.propertyType) where.propertyType = filters.propertyType

      // Square feet
      if (filters.squareFeet) {
        where.squareFeet = {
          gte: filters.squareFeet[0],
          lte: filters.squareFeet[1],
        }
      }

      // Amenities
      if (filters.amenities && filters.amenities.length > 0) {
        where.amenities = {
          hasEvery: filters.amenities
        }
      }

      // Coordinate-based filtering (within radius)
      if (filters.coordinates) {
        const [longitude, latitude] = filters.coordinates
        const radius = 0.1 // Adjust radius as needed
        where.location = {
          ...where.location,
          latitude: {
            gte: latitude - radius,
            lte: latitude + radius,
          },
          longitude: {
            gte: longitude - radius,
            lte: longitude + radius,
          },
        }
      }

      // Filter by favorites
      if (filters.favoriteIds && filters.favoriteIds.length > 0) {
        where.id = { in: filters.favoriteIds }
      }
    }

    const properties = await db.property.findMany({
      where,
      include: {
        location: true,
        manager: {
          select: {
            id: true,
            email: true,
            username: true,
          }
        }
      },
      orderBy: {
        postedDate: 'desc'
      }
    })

    return properties
  } catch (error) {
    console.error('Error fetching properties:', error)
    throw new Error('Failed to fetch properties')
  }
}

export async function getProperty(id: number) {
  try {
    const property = await db.property.findUnique({
      where: { id },
      include: {
        location: true,
        manager: {
          select: {
            id: true,
            email: true,
            username: true,
          }
        }
      }
    })

    if (!property) {
      throw new Error('Property not found')
    }

    return property
  } catch (error) {
    console.error('Error fetching property:', error)
    throw new Error('Failed to fetch property')
  }
}

export async function updateProperty(id: number, data: Partial<PropertyFormData>) {
  const session = await auth()
  
  if (!session?.user?.id) {
    throw new Error('You must be logged in to update a property')
  }

  try {
    // Check if user owns this property
    const existingProperty = await db.property.findUnique({
      where: { id },
      select: { managerId: true }
    })

    if (!existingProperty || existingProperty.managerId !== session.user.id) {
      throw new Error('You can only update your own properties')
    }

    const property = await db.property.update({
      where: { id },
      data,
      include: {
        location: true,
        manager: true,
      }
    })

    revalidatePath('/search')
    revalidatePath('/dashboard/properties')
    revalidatePath(`/search/${id}`)
    
    return { success: true, property }
  } catch (error) {
    console.error('Error updating property:', error)
    throw new Error('Failed to update property')
  }
}

export async function deleteProperty(id: number) {
  const session = await auth()
  
  if (!session?.user?.id) {
    throw new Error('You must be logged in to delete a property')
  }

  try {
    // Check if user owns this property
    const existingProperty = await db.property.findUnique({
      where: { id },
      select: { managerId: true, locationId: true }
    })

    if (!existingProperty || existingProperty.managerId !== session.user.id) {
      throw new Error('You can only delete your own properties')
    }

    // Delete property (this will cascade delete related records)
    await db.property.delete({
      where: { id }
    })

    // Optionally delete the location if no other properties use it
    const otherPropertiesUsingLocation = await db.property.findFirst({
      where: { locationId: existingProperty.locationId }
    })

    if (!otherPropertiesUsingLocation) {
      await db.location.delete({
        where: { id: existingProperty.locationId }
      })
    }

    revalidatePath('/search')
    revalidatePath('/dashboard/properties')
    
    return { success: true }
  } catch (error) {
    console.error('Error deleting property:', error)
    throw new Error('Failed to delete property')
  }
}

// Get properties managed by a specific user
export async function getManagerProperties(userId: string) {
  try {
    const properties = await db.property.findMany({
      where: {
        managerId: userId,
      },
      include: {
        location: true,
        applications: {
          include: {
            tenant: true,
          },
        },
        leases: {
          include: {
            tenant: true,
          },
        },
      },
      orderBy: {
        postedDate: 'desc',
      },
    })

    return properties
  } catch (error) {
    console.error('Error fetching manager properties:', error)
    throw new Error('Failed to fetch manager properties')
  }
}

// Get property leases
export async function getPropertyLeases(propertyId: number) {
  try {
    const leases = await db.lease.findMany({
      where: {
        propertyId,
      },
      include: {
        tenant: true,
        payments: true,
        application: true,
      },
      orderBy: {
        startDate: 'desc',
      },
    })

    return leases
  } catch (error) {
    console.error('Error fetching property leases:', error)
    throw new Error('Failed to fetch property leases')
  }
}

// Get payments for a lease
export async function getPayments(leaseId: number) {
  try {
    const payments = await db.payment.findMany({
      where: {
        leaseId,
      },
      include: {
        lease: {
          include: {
            tenant: true,
            property: true,
          },
        },
      },
      orderBy: {
        dueDate: 'desc',
      },
    })

    return payments
  } catch (error) {
    console.error('Error fetching payments:', error)
    throw new Error('Failed to fetch payments')
  }
} 