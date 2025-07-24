import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, ChevronRight } from "lucide-react"

export default function Guest() {
  return (
    <div className="bg-white">
      {/* Main Content */}
      <div className="">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Recommended for you</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {/* Action Required Card */}
          <Card className="border border-gray-300 max-w-sm pb-0">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2 text-red-600 text-xs font-semibold uppercase tracking-wide">
                <div className="w-3 h-3 bg-red-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">!</span>
                </div>
                ACTION REQUIRED
              </div>
            </CardHeader>
            <CardContent className="space-y-3 pb-0">
              <h2 className="text-lg font-bold text-gray-900">Your identity is not fully verified</h2>
              <p className="text-sm text-gray-600 leading-relaxed font-medium">
                Identity verification helps us check that you're really you. It's one of the ways we keep Airbnb secure.
              </p>
            </CardContent>
            <div className="space-y-0">
              <div className="border-t border-gray-200 "></div>
              <Button variant="ghost" className="w-full justify-between text-left h-auto p-4 hover:bg-gray-50 border-0">
                <span className="font-semibold text-sm text-gray-900">Check identity verification status</span>
                <ChevronRight className="w-4 h-4 text-gray-900" />
              </Button>
              <div className="border-t border-gray-200"></div>
              <Button variant="ghost" className="w-full justify-between text-left h-auto p-4 hover:bg-gray-50 border-0">
                <span className="font-semibold text-sm text-gray-900">Learn more</span>
                <ChevronRight className="w-4 h-4 text-gray-900" />
              </Button>
            </div>
          </Card>

          {/* Quick Link Card */}
          <Card className="border border-gray-300 max-w-sm pb-0 relative">
            <CardHeader className="pb-3">
              <div className="text-gray-500 text-xs font-semibold uppercase tracking-wide">QUICK LINK</div>
            </CardHeader>
            <CardContent className="space-y-3 pb-0">
              <h2 className="text-lg font-bold text-gray-900">Finding reservation details</h2>
              <p className="text-sm text-gray-600 leading-relaxed font-medium">
                Your Trips tab has full details, receipts, and Host contact info for each of your reservations.
              </p>
            </CardContent>
            <div className="absolute bottom-0 left-0 right-0">
              <div className="border-t border-gray-200 "></div>
              <Button  className="bg-transparent w-full justify-between text-left h-13 p-4 hover:rounded-lg hover:bg-gray-50 border-0">
                <span className="font-semibold text-sm text-gray-900">Go to Trips</span>
                <ChevronRight className="w-4 h-4 text-gray-900" />
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
