import { ReactNode } from 'react'
import SiteFooter from '@/components/template/footer-airbnb/site-footer'

interface SiteLayoutProps {
  children: ReactNode
}

export default function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Main content area */}
      <main className="flex-1">
        {children}
      </main>
      
      {/* Footer */}
      <SiteFooter />
    </div>
  )
}
