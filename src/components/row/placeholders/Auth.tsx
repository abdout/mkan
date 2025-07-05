"use client";

import { ReactNode } from "react";

// Placeholder auth components for missing Kinde auth
export function RegisterLink({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <button className={className} onClick={() => console.log("Register clicked")}>
      {children}
    </button>
  );
}

export function LoginLink({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <button className={className} onClick={() => console.log("Login clicked")}>
      {children}
    </button>
  );
}

export function LogoutLink({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <button className={className} onClick={() => console.log("Logout clicked")}>
      {children}
    </button>
  );
}

// Placeholder server session
export function getKindeServerSession() {
  return {
    getUser: async () => ({
      id: "demo-user-id",
      picture: "/placeholder.jpg",
      given_name: "Demo",
      family_name: "User",
      email: "demo@example.com"
    })
  };
}

// Placeholder action
export async function createAirbnbHome(params: { userId: string }) {
  console.log("Create Airbnb home:", params);
  return { success: true };
} 