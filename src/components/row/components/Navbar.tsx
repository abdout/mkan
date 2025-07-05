import Image from "next/image";
import Link from "next/link";
import DesktopLogo from "../../public/airbnb-desktop.png";
import MobileLogo from "../../public/airbnb-mobile.webp";
import { UserNavWrapper } from "./UserNavWrapper";
import { SearchModalCompnent } from "./SearchComponent";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <nav className="w-full border-b">
      <div className="flex items-center justify-between container mx-auto px-5 lg:px-10 py-5">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={32}
            height={32}
            className="h-8 w-8"
          />
          <span className="text-xl font-bold">Rentiful</span>
        </Link>

        <SearchModalCompnent />

        <div className="flex items-center gap-x-6">
          <div className="hidden lg:block">
            <Button variant="outline" className="font-medium">
              Airbnb your home
            </Button>
          </div>
          <UserNavWrapper />
        </div>
      </div>
    </nav>
  );
}
