import { Star, Globe, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { IdentityVerified, Building, Chat, Superhost } from "@/components/atom/icons"

export default function MeetHost() {
  return (
    <div className="max-w-6xl mx-auto p-6 bg-white">
      <h1 className="text-3xl font-semibold text-gray-900 mb-8">Meet your host</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left side - Host profile */}
        <div className="space-y-8">
          <div className=" w-88 rounded-4xl border px-10 py-6 shadow-lg">
            <div className="flex gap-20">
              {/* Left div - Image, name, superhost */}
              <div className="flex flex-col items-center">
                <div className="relative mb-4">
                  <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200">
                    <img
                      src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=48&h=48&fit=crop"
                      alt="Host Faisal"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-[#e31c5f] rounded-full flex items-center justify-center">
                    <IdentityVerified className="w-4 h-4 text-white" />
                  </div>
                </div>
                <h2 className="text-3xl font-semibold text-gray-900 mb-2">Faisal</h2>
                <div className="flex items-center gap-2 text-gray-600">
                  <Superhost className="w-3 h-3 text-gray-700" />
                  <span className="text-sm">Superhost</span>
                </div>
              </div>

              {/* Right div - Statistics with dividers */}
              <div className="flex flex-col  gap-2 flex-1">
                <div className="">
                  <strong className="text-xl font-bold">75</strong>
                  <p className="text-xs -mt-1">Reviews</p>
                </div>

                <div className="w-20 h-[1px] bg-gray-300 "></div>

                <div className="leading-none">
                  <strong className="text-xl font-bold ">5.0</strong>
                  <p className="text-xs -mt-1">Rating</p>
                </div>

                <div className="w-20 h-[1px] bg-gray-300 "></div>

                <div className="leading-none">
                  <strong className="text-xl font-bold ">9</strong>
                  <p className="text-xs -mt-1">Months hosting</p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional host info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Building className="w-5 h-5 text-gray-600" />
              <span className="text-gray-900">My work: Architect</span>
            </div>
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-gray-600" />
              <span className="text-gray-900">Speaks Arabic and English</span>
            </div>
          </div>

          <div>
            <p className="text-gray-900 font-medium">Living the Dream!</p>
          </div>
        </div>

        {/* Right side - Host details */}
        <div className="space-y-4">
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Faisal is a Superhost</h3>
            <p className="text-gray-700 leading-relaxed">
              Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.
            </p>
          </div>

          <div>
            <h4 className="text-2xl font-semibold text-gray-900 mb-4">Host details</h4>
            <div className="space-y-1">
              <p className="text-gray-700">Response rate: 100%</p>
              <p className="text-gray-700">Responds within an hour</p>
            </div>
          </div>

          <div>
            <Button
              className="bg-gray-100 hover:bg-gray-200 text-gray-900 border border-gray-300 px-6 py-3 rounded-lg font-medium flex items-center gap-2"
              variant="outline"
            >
              <Chat className="w-4 h-4" />
              Message host
            </Button>
          </div>

          {/* Security notice */}
          <div className="pt-8 border-t border-gray-200">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-[#e31c5f] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                To help protect your payment, always use Airbnb to send money and communicate with hosts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
