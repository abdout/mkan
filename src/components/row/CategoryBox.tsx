"use client";

import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import React, { useCallback } from "react";
import { IconType } from "react-icons";

type Props = {
  icon: IconType;
  label: string;
  selected?: boolean;
  description?: string;
};

function CategoryBox({ icon: Icon, label, selected, description }: Props) {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      category: label,
    };

    if (params?.get("category") === label) {
      delete updatedQuery.category;
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  }, [label, params, router]);

  return (
    <button
      onClick={handleClick}
      className={`
        flex flex-col items-center justify-center gap-2 p-3 
        border-b-2 transition cursor-pointer min-w-[100px]
        hover:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-300
        ${selected ? "border-b-neutral-800 text-neutral-800" : "border-transparent text-neutral-500"}
        ${selected ? "" : "hover:text-neutral-800"}
      `}
      role="tab"
      aria-selected={selected}
      aria-label={description || `Filter by ${label}`}
      title={description || `Filter by ${label}`}
    >
      <div className="relative group">
        <Icon 
          size={26}
          className={`
            transition-transform duration-200 ease-in-out
            group-hover:scale-110 group-focus:scale-110
            ${selected ? "transform scale-110" : ""}
          `}
        />
      </div>
      <div className="font-medium text-xs whitespace-nowrap">{label}</div>
    </button>
  );
}

export default CategoryBox;
