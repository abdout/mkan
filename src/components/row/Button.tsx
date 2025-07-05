"use client";

import React from "react";
import { IconType } from "react-icons";
import { cn } from "@/lib/utils";

type Props = {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
  isColor?: boolean;
  type?: "button" | "submit" | "reset";
  loading?: boolean;
  className?: string;
};

function Button({
  label,
  onClick,
  disabled,
  outline,
  small,
  icon: Icon,
  isColor,
  type = "button",
  loading = false,
  className,
}: Props) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={cn(
        "relative inline-flex items-center justify-center",
        "disabled:opacity-70 disabled:cursor-not-allowed",
        "rounded-lg transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-offset-2",
        outline
          ? "bg-white border-black text-black hover:bg-neutral-50 focus:ring-black"
          : "bg-rose-500 border-rose-500 text-white hover:bg-rose-600 focus:ring-rose-500",
        small
          ? "text-sm py-1.5 px-3 font-normal border"
          : "text-base py-3 px-4 font-semibold border-2",
        loading && "cursor-wait",
        className
      )}
      aria-disabled={disabled || loading}
      aria-label={loading ? `${label} - Loading...` : label}
    >
      {Icon && (
        <span className="absolute left-4 flex items-center">
          <Icon
            size={small ? 16 : 20}
            className={cn(
              "transition-transform group-hover:scale-110",
              isColor && "text-blue-600"
            )}
            aria-hidden="true"
          />
        </span>
      )}
      <span className={cn(Icon && "pl-8")}>
        {loading ? (
          <span className="flex items-center gap-2">
            <svg
              className="animate-spin h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            {label}
          </span>
        ) : (
          label
        )}
      </span>
    </button>
  );
}

export default Button;
