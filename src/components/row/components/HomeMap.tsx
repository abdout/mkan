"use client";

import { useMemo } from "react";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

interface HomeMapProps {
  locationValue: string;
}

const HomeMap = ({ locationValue }: HomeMapProps) => {
  const MapComponent = useMemo(
    () =>
      dynamic(() => import("./MapComponent"), {
        loading: () => <Skeleton className="h-[35vh] w-full rounded-lg" />,
        ssr: false,
      }),
    []
  );

  return <MapComponent locationValue={locationValue} />;
};

export default HomeMap;
