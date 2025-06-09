import { PropertyForm } from '@/components/forms/PropertyForm'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function NewPropertyPage() {
  // TODO: Uncomment auth check when ready for production
  // const session = await auth()
  
  // if (!session?.user) {
  //   redirect('/login')
  // }

  return (
    <div>
      <PropertyForm />
    </div>
  )
} 