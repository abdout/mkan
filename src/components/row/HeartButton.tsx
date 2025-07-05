"use client";

import useFavorite from "@/hooks/useFavorite";
import { SafeUser } from "@/types/row-types";
import React from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

type Props = {
  listingId: string;
  currentUser?: SafeUser | null;
};

function HeartButton({ listingId, currentUser }: Props) {
  const { hasFavorite, toggleFavorite } = useFavorite({
    listingId,
    currentUser,
  });

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    toggleFavorite();
  };

  return (
    <button
      onClick={handleClick}
      className={`
        relative p-2 rounded-full 
        hover:bg-neutral-100/90 active:scale-90
        transition-all duration-200 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2
      `}
      aria-label={hasFavorite ? "Remove from favorites" : "Add to favorites"}
      title={hasFavorite ? "Remove from favorites" : "Add to favorites"}
      type="button"
    >
      <div className="relative">
        <AiOutlineHeart
          size={24}
          className={`
            absolute -top-[2px] -right-[2px]
            stroke-white stroke-2
            ${hasFavorite ? 'opacity-0' : 'opacity-100'}
            transition-opacity duration-200 ease-in-out
          `}
        />
        <AiFillHeart
          size={24}
          className={`
            transform transition-all duration-200 ease-in-out
            ${hasFavorite ? 'scale-110 fill-rose-500' : 'scale-100 fill-neutral-500/70'}
          `}
        />
      </div>
    </button>
  );
}

export default HeartButton;
