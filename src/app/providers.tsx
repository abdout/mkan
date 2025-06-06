"use client";

import StoreProvider from "@/state/redux";
import { SessionProvider } from "next-auth/react";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <StoreProvider>
        {children}
      </StoreProvider>
    </SessionProvider>
  );
};

export default Providers;
