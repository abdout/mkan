"use client";

import { NAVBAR_HEIGHT } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../../ui/button";
import { useSession, signOut } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { Bell, MessageCircle, Plus, Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { SidebarTrigger } from "../../ui/sidebar";
import { NAVIGATION_LINKS, DISPLAY_ITEMS, AUTH_LINKS, ALL_NAVIGATION_ITEMS } from "./constant";

const Navbar = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const isDashboardPage =
    pathname.includes("/managers") || pathname.includes("/tenants");
  const isLandingPage = pathname === "/";

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <div
      className={`top-0 left-0 w-full z-50 ${
        isLandingPage ? "bg-transparent" : "bg-white"
      }`}
      style={{ height: `${NAVBAR_HEIGHT}px` }}
    >
      <div className="flex justify-between items-center w-full py-3 px-8">
        <div className="flex items-center gap-4 md:gap-6">
          {isDashboardPage && (
            <div className="md:hidden">
              <SidebarTrigger />
            </div>
          )}
          <Link
            href="/"
            className="cursor-pointer hover:!text-primary-300"
            scroll={false}
          >
            <div className="flex items-center gap-2">
              <Image
                src="/tent.png"
                alt="Mkan Logo"
                width={20}
                height={20}
                className="w-4.5 h-4.5 invert"
              />
              <div className={`text-xl font-bold ${
                isLandingPage ? "text-white" : "text-primary-700"
              }`}>
                Mk
                <span className={`font-light hover:!text-primary-300 ${
                  isLandingPage ? "text-white" : "text-secondary-500"
                }`}>
                  an
                </span>
              </div>
            </div>
          </Link>
          {isDashboardPage && session?.user && (
            <Button
              variant="secondary"
              className="md:ml-4 bg-primary-50 text-primary-700 hover:bg-secondary-500 hover:text-primary-50"
              onClick={() =>
                router.push(
                  session.user.role?.toLowerCase() === "manager"
                    ? "/managers/newproperty"
                    : "/search"
                )
              }
            >
              {session.user.role?.toLowerCase() === "manager" ? (
                <>
                  <Plus className="h-4 w-4" />
                  <span className="hidden md:block ml-2">Add New Property</span>
                </>
              ) : (
                <>
                  <Search className="h-4 w-4" />
                  <span className="hidden md:block ml-2">
                    Search Properties
                  </span>
                </>
              )}
            </Button>
          )}
        </div>
        {/* Navigation Links - Single Array Approach */}
        <nav className="flex items-center gap-6">
          {ALL_NAVIGATION_ITEMS.map((item, index) => {
            const commonClasses = `text-sm ${isLandingPage ? "text-white" : "text-gray-700"}`;
            
            if (item.type === "display") {
              return (
                <span key={index} className={commonClasses}>
                  {item.label}
                </span>
              );
            }
            
            return (
              <Link
                key={item.href || index}
                href={item.href!}
                className={commonClasses}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Original approach - commented out */}
        {/* <nav className="flex items-center gap-6">
          {NAVIGATION_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm ${isLandingPage ? "text-white" : "text-gray-700"}`}
            >
              {link.label}
            </Link>
          ))}
          
          {DISPLAY_ITEMS.map((item, index) => (
            <span
              key={index}
              className={`text-sm ${isLandingPage ? "text-white" : "text-gray-700"}`}
            >
              {item.label}
            </span>
          ))}
          
          {AUTH_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm ${isLandingPage ? "text-white" : "text-gray-700"}`}
            >
              {link.label}
            </Link>
          ))}
        </nav> */}
      </div>
    </div>
  );
};

export default Navbar;
