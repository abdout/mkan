"use client";

import Navbar from "@/components/template/header-airbnb/header";
import SiteFooter from "@/components/template/footer-airbnb/site-footer";
import { NAVBAR_HEIGHT } from "@/lib/constants";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const isLandingPage = pathname === "/";

  useEffect(() => {
    // Set loading to false when session status is determined
    if (status !== "loading") {
      if (session?.user) {
        const userRole = session.user.role?.toLowerCase();
        if (
          (userRole === "manager" && pathname.startsWith("/search")) ||
          (userRole === "manager" && pathname === "/")
        ) {
          router.push("/dashboard/properties", { scroll: false });
        } else {
          setIsLoading(false);
        }
      } else {
        // No session, but that's okay for public pages
        setIsLoading(false);
      }
    }
  }, [session, status, router, pathname]);

  if (status === "loading" || isLoading) return <>Loading...</>;

  return (
    <div className="h-full w-full">
      <main
        className={`h-full flex w-full flex-col`}
        style={{ paddingTop: "0px" }}
      >
        {children}
      </main>
      <SiteFooter />
    </div>
  );
};

export default Layout;
