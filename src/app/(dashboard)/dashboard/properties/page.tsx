import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Plus, Edit, Trash2, MapPin, DollarSign, Bed, Bath, Square } from 'lucide-react'

export default async function PropertiesPage() {
  // TODO: Uncomment auth check when ready for production
  // const session = await auth()
  
  // if (!session?.user) {
  //   redirect('/login')
  // }

  console.log('🏠 === PROPERTIES PAGE DEBUG ===')
  
  // Debug: Check all users and properties in database
  const allUsers = await prisma.user.findMany()
  const allProperties = await prisma.property.findMany({
    include: { location: true, manager: true }
  })
  
  console.log('👥 All users in database:', allUsers.map(u => ({ id: u.id, email: u.email, username: u.username })))
  console.log('🏠 All properties in database:', allProperties.map(p => ({ 
    id: p.id, 
    name: p.name, 
    managerId: p.managerId,
    manager: p.manager ? { id: p.manager.id, email: p.manager.email } : null
  })))
  
  // For debugging: Show all properties instead of filtering by user
  const properties = await prisma.property.findMany({
    // where: {
    //   managerId: session.user.id
    // },
    include: {
      location: true,
      _count: {
        select: {
          applications: true,
          leases: true
        }
      }
    },
    orderBy: {
      postedDate: 'desc'
    }
  })

  console.log('🏠 Found properties:', properties.length)
  properties.forEach((property, index) => {
    console.log(`🏠 Property ${index + 1}:`, {
      id: property.id,
      name: property.name,
      managerId: property.managerId,
      pricePerMonth: property.pricePerMonth,
      location: `${property.location.city}, ${property.location.state}`
    })
  })

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Properties</h1>
          <p className="text-gray-600 mt-2">
            Manage your property listings and track applications
          </p>
        </div>
        <Link href="/dashboard/properties/new">
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add New Property
          </Button>
        </Link>
      </div>

      {properties.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                <Plus className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold">No properties yet</h3>
              <p className="text-gray-600 max-w-md">
                Start by adding your first property listing.
              </p>
              <Link href="/dashboard/properties/new">
                <Button>Add Your First Property</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <Card key={property.id} className="group hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg line-clamp-2">{property.name}</CardTitle>
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="text-sm">
                    {property.location.city}, {property.location.state}
                  </span>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  <span className="font-medium">${property.pricePerMonth.toLocaleString()}/mo</span>
                </div>
                
                <Badge variant="secondary">
                  {property.propertyType}
                </Badge>

                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1" asChild>
                    <Link href={`/search/${property.id}`}>
                      View
                    </Link>
                  </Button>
                  <Button size="sm" className="flex-1" asChild>
                    <Link href={`/dashboard/properties/${property.id}`}>
                      Manage
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
} 