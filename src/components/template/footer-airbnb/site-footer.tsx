import Link from "next/link"
import { Globe, DollarSign, Facebook, Twitter, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SiteFooter() {
  return (
    <div className="bg-muted border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 justify-items-center">
          {/* Support Column */}
          <div className="text-left">
            <h3 className="font-semibold text-sm mb-4">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-muted-foreground text-sm font-light hover:underline">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground text-sm font-light hover:underline">
                  Safety information
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground text-sm font-light hover:underline">
                  Cancellation options
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground text-sm font-light hover:underline">
                  Our COVID-19 Response
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground text-sm font-light hover:underline">
                  Supporting people with disabilities
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground text-sm font-light hover:underline">
                  Report a neighborhood concern
                </Link>
              </li>
            </ul>
          </div>

          {/* Community Column */}
          <div className="text-left">
            <h3 className="font-semibold text-sm mb-4">Community</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-muted-foreground text-sm font-light hover:underline">
                  Airbnb.org: disaster relief housing
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground text-sm font-light hover:underline">
                  Support: Afghan refugees
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground text-sm font-light hover:underline">
                  Celebrating diversity & belonging
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground text-sm font-light hover:underline">
                  Combating discrimination
                </Link>
              </li>
            </ul>
          </div>

          {/* Hosting Column */}
          <div className="text-left">
            <h3 className="font-semibold text-sm mb-4">Hosting</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-muted-foreground text-sm font-light hover:underline">
                  Try hosting
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground text-sm font-light hover:underline">
                  AirCover: protection for Hosts
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground text-sm font-light hover:underline">
                  Explore hosting resources
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground text-sm font-light hover:underline">
                  Visit our community forum
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground text-sm font-light hover:underline">
                  How to host responsibly
                </Link>
              </li>
            </ul>
          </div>

          {/* About Column */}
          <div className="text-left">
            <h3 className="font-semibold text-sm mb-4">About</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-muted-foreground text-sm font-light hover:underline">
                  Newsroom
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground text-sm font-light hover:underline">
                  Learn about new features
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground text-sm font-light hover:underline">
                  Letter from our founders
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground text-sm font-light hover:underline">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground text-sm font-light hover:underline">
                  Investors
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground text-sm font-light hover:underline">
                  Airbnb Luxe
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-border pt-6 px-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            {/* Left side - Copyright and legal links */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <p>© 2022 Airbnb, Inc.</p>
              <span>·</span>
              <Link href="#" className="hover:underline">
                Privacy
              </Link>
              <span>·</span>
              <Link href="#" className="hover:underline">
                Terms
              </Link>
              <span>·</span>
              <Link href="#" className="hover:underline">
                Sitemap
              </Link>
            </div>

            {/* Right side - Language, currency, and social icons */}
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:bg-background gap-2">
                <Globe className="w-4 h-4" />
                English (US)
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:bg-background gap-2">
                <DollarSign className="w-4 h-4" />
                USD
              </Button>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="w-8 h-8 text-muted-foreground hover:bg-background">
                  <Facebook className="w-4 h-4" />
                  <span className="sr-only">Facebook</span>
                </Button>
                <Button variant="ghost" size="icon" className="w-8 h-8 text-muted-foreground hover:bg-background">
                  <Twitter className="w-4 h-4" />
                  <span className="sr-only">Twitter</span>
                </Button>
                <Button variant="ghost" size="icon" className="w-8 h-8 text-muted-foreground hover:bg-background">
                  <Instagram className="w-4 h-4" />
                  <span className="sr-only">Instagram</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
