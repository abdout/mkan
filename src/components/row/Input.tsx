"use client";

import React, { useState } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { BiDollar } from "react-icons/bi";
import { cn } from "@/lib/utils";

type Props = {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  description?: string;
  className?: string;
};

function Input({
  id,
  label,
  type = "text",
  disabled,
  formatPrice,
  register,
  required,
  errors,
  description,
  className,
}: Props) {
  const [isFocused, setIsFocused] = useState(false);
  const error = errors[id];

  return (
    <div className={cn("w-full space-y-2", className)}>
      <div className="relative">
        {formatPrice && (
          <BiDollar
            size={24}
            className={cn(
              "absolute top-5 left-2 text-neutral-700",
              error && "text-rose-500",
              disabled && "opacity-50"
            )}
            aria-hidden="true"
          />
        )}
        <input
          id={id}
          disabled={disabled}
          {...register(id, { required })}
          placeholder=" "
          type={type}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          aria-invalid={!!error}
          aria-describedby={`${id}-description ${id}-error`}
          className={cn(
            "peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md",
            "outline-none transition-all duration-200",
            "placeholder:text-neutral-400",
            "disabled:opacity-70 disabled:cursor-not-allowed",
            formatPrice ? "pl-9" : "pl-4",
            error
              ? "border-rose-500 focus:border-rose-600"
              : "border-neutral-300 focus:border-black",
            isFocused && "ring-2 ring-offset-1",
            error
              ? "ring-rose-500/20"
              : "ring-neutral-300/20"
          )}
        />
        <label
          htmlFor={id}
          className={cn(
            "absolute text-md duration-200 transform -translate-y-3 top-5 z-10 origin-[0]",
            formatPrice ? "left-9" : "left-4",
            "peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0",
            "peer-focus:scale-75 peer-focus:-translate-y-4",
            error ? "text-rose-500" : "text-zinc-400",
            disabled && "opacity-50"
          )}
        >
          {label}
          {required && <span className="text-rose-500 ml-1">*</span>}
        </label>
      </div>
      {description && (
        <p
          id={`${id}-description`}
          className="text-sm text-neutral-500"
        >
          {description}
        </p>
      )}
      {error && (
        <p
          id={`${id}-error`}
          className="text-sm font-medium text-rose-500"
        >
          {error.message?.toString()}
        </p>
      )}
    </div>
  );
}

export default Input;
