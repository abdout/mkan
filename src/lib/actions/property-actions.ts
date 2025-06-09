"use server"

import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { Amenity, Highlight, PropertyType } from '@prisma/client'

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
    let testUser = await prisma.user.findUnique({
      where: { email: 'test@example.com' }
    })
    
    if (!testUser) {
      console.log('👤 Creating new test user...')
      testUser = await prisma.user.create({
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
    
    const location = await prisma.location.create({
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
    
    const property = await prisma.property.create({
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

export async function getProperties(filters?: {
  location?: string
  priceMin?: number
  priceMax?: number
  beds?: string
  baths?: string
  propertyType?: string
  amenities?: string[]
}) {
  try {
    console.log('Starting getProperties with filters:', filters);
    
    // Test database connection
    const testConnection = await prisma.$queryRaw`SELECT 1 as test`;
    console.log('Database connection test:', testConnection);
    
    const whereClause: any = {}

    if (filters?.location) {
      whereClause.location = {
        OR: [
          { city: { contains: filters.location, mode: 'insensitive' } },
          { state: { contains: filters.location, mode: 'insensitive' } },
          { address: { contains: filters.location, mode: 'insensitive' } },
        ]
      }
    }

    if (filters?.priceMin) {
      whereClause.pricePerMonth = { ...whereClause.pricePerMonth, gte: filters.priceMin }
    }

    if (filters?.priceMax) {
      whereClause.pricePerMonth = { ...whereClause.pricePerMonth, lte: filters.priceMax }
    }

    if (filters?.beds && filters.beds !== 'any') {
      whereClause.beds = { gte: parseInt(filters.beds) }
    }

    if (filters?.baths && filters.baths !== 'any') {
      whereClause.baths = { gte: parseInt(filters.baths) }
    }

    if (filters?.propertyType && filters.propertyType !== 'any') {
      whereClause.propertyType = filters.propertyType
    }

    if (filters?.amenities && filters.amenities.length > 0) {
      whereClause.amenities = {
        hasEvery: filters.amenities
      }
    }

    console.log('Query where clause:', JSON.stringify(whereClause, null, 2));

    const properties = await prisma.property.findMany({
      where: whereClause,
      include: {
        location: true,
        manager: {
          select: {
            id: true,
            username: true,
            email: true,
            image: true
          }
        }
      },
      orderBy: {
        postedDate: 'desc'
      }
    })

    console.log('Found properties:', properties.length);
    return properties
  } catch (error) {
    console.error('Error fetching properties:', error)
    // Return empty array instead of throwing to prevent page crash
    return []
  }
}

export async function getProperty(id: number) {
  try {
    const property = await prisma.property.findUnique({
      where: { id },
      include: {
        location: true,
        manager: {
          select: {
            id: true,
            username: true,
            email: true,
            image: true
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
    const existingProperty = await prisma.property.findUnique({
      where: { id },
      select: { managerId: true }
    })

    if (!existingProperty || existingProperty.managerId !== session.user.id) {
      throw new Error('You can only update your own properties')
    }

    const property = await prisma.property.update({
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
    const existingProperty = await prisma.property.findUnique({
      where: { id },
      select: { managerId: true, locationId: true }
    })

    if (!existingProperty || existingProperty.managerId !== session.user.id) {
      throw new Error('You can only delete your own properties')
    }

    // Delete property (this will cascade delete related records)
    await prisma.property.delete({
      where: { id }
    })

    // Optionally delete the location if no other properties use it
    const otherPropertiesUsingLocation = await prisma.property.findFirst({
      where: { locationId: existingProperty.locationId }
    })

    if (!otherPropertiesUsingLocation) {
      await prisma.location.delete({
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