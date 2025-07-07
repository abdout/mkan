"use client";

import React from 'react';
import Link from 'next/link';
import { Menu, X, LogOut } from 'lucide-react';
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { ALL_NAVIGATION_ITEMS } from './constant';
import { useCurrentUser } from '../../auth/use-current-user';

interface MobileNavProps {
  isLandingPage?: boolean;
}

const MobileNav = ({ isLandingPage = false }: MobileNavProps) => {
  const [open, setOpen] = React.useState(false);
  const { data: session } = useSession();
  const currentUser = useCurrentUser();
  const pathname = usePathname();

  const handleSignOut = async () => {
    await signOut({ 
      callbackUrl: "/",
      redirect: true 
    });
    setOpen(false);
  };

  // Filter out login/join items if user is logged in
  const filteredNavItems = ALL_NAVIGATION_ITEMS.filter(item => {
    if (!currentUser) return true;
    return item.href !== "/login" && item.href !== "/join";
  });

  const handleLinkClick = () => {
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className={`md:hidden w-9 h-9 flex items-center justify-center relative z-[60] transition-colors ${
            open 
              ? 'text-black hover:text-black/80' 
              : isLandingPage 
                ? 'text-white hover:text-white/80' 
                : 'text-black hover:text-black/80'
          } hover:bg-transparent`}
        >
          <div className="w-5 h-5 flex items-center justify-center">
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </div>
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      
      <SheetContent side="right" className="w-80 p-6">
        <div className="flex flex-col space-y-4 pt-8">
          {filteredNavItems.map((item, index) => {
            // Handle display items without href
            if (item.type === "display" && !item.href) {
              return (
                <div key={index} className="text-black text-sm">
                  {item.label}
                </div>
              );
            }
            
            // Handle navigation items with href
            if (item.href) {
              return (
                <Link
                  key={item.href || index}
                  href={item.href}
                  onClick={handleLinkClick}
                  className="text-black text-sm hover:text-black/70 transition-colors"
                >
                  {item.label}
                </Link>
              );
            }
            
            return null;
          })}
          
          {currentUser && (
            <>
              <Separator className="my-2" />
              <button
                onClick={handleSignOut}
                className="text-black text-sm text-left hover:text-black/70 transition-colors flex items-center gap-2"
              >
                <LogOut className="size-4" />
                Logout
              </button>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
