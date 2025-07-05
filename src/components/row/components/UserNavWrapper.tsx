"use client";

import { useEffect, useState } from "react";
import { UserNav } from "./UserNav";
import { getUserData } from "./UserNavServer";

export function UserNavWrapper() {
  const [userData, setUserData] = useState<{ user: { id: string; picture: string; } | null; } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUserData()
      .then(data => {
        setUserData(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Error fetching user data:", error);
        setUserData({ user: null });
        setIsLoading(false);
      });
  }, []);

  return <UserNav userData={userData} isLoading={isLoading} />;
} 