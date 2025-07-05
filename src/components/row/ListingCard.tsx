"use client";

import useCountries from "@/hooks/useCountries";
import { SafeReservation, SafeUser, safeListing } from "@/types/row-types";
import { format } from "date-fns";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo, useState } from "react";
import Button from "./Button";
import HeartButton from "./HeartButton";

type Props = {
  data: safeListing;
  reservation?: SafeReservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
};

function ListingCard({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = "",
  currentUser,
}: Props) {
  const router = useRouter();
  const { getByValue } = useCountries();
  const [imageLoading, setImageLoading] = useState(true);

  const location = getByValue(data.locationValue);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) return;

      onAction?.(actionId);
    },
    [onAction, actionId, disabled]
  );

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return data.price;
  }, [reservation, data.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.4,
        ease: "easeOut",
      }}
      onClick={() => router.push(`/listings/${data.id}`)}
      className="col-span-1 cursor-pointer group"
      role="article"
      aria-label={`${location?.label} listing`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          router.push(`/listings/${data.id}`);
        }
      }}
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="aspect-square w-full relative overflow-hidden rounded-xl bg-neutral-200">
          <div className={`absolute inset-0 bg-neutral-200 ${imageLoading ? 'animate-pulse' : 'hidden'}`} />
          <Image
            fill
            className={`
              object-cover h-full w-full 
              transition-all duration-300 ease-in-out
              ${imageLoading ? 'opacity-0' : 'opacity-100'}
              group-hover:scale-110
            `}
            src={data.imageSrc}
            alt={`${location?.label} - ${data.category}`}
            onLoadingComplete={() => setImageLoading(false)}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
          />
          <div className="absolute top-3 right-3">
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
        <div className="font-semibold text-lg line-clamp-1">
          {location?.region}, {location?.label}
        </div>
        <div className="font-light text-neutral-500 line-clamp-1">
          {reservationDate || data.category}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="flex items-center gap-1">
            <span className="font-semibold">${price}</span>
            {!reservation && <span className="font-light text-neutral-500">/ night</span>}
          </div>
        </div>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
            className="mt-2"
          />
        )}
      </div>
    </motion.div>
  );
}

export default ListingCard;
