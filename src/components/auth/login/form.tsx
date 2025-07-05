"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LoginSchema } from "../validation";
import { login } from "./action";
import { FormError } from "../error/form-error";
import { FormSuccess } from "../form-success";
import { Social } from "../social";

interface LoginFormProps extends React.ComponentPropsWithoutRef<"div"> {
  callbackUrl?: string;
  error?: string;
}

export const LoginForm = ({
  className,
  callbackUrl,
  error: urlError,
  ...props
}: LoginFormProps) => {
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");
    
    startTransition(() => {
      login(values, callbackUrl)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setError(data.error);
          }
          if (data?.success) {
            form.reset();
            setSuccess(data.success);
          }
          if (data?.twoFactor) {
            setShowTwoFactor(true);
          }
        })
        .catch(() => setError("Something went wrong"));
    });
  };

  return (
    <div className="w-full max-w-[420px] mx-auto px-6 py-8 space-y-4">
      {/* Welcome Text */}
      <h3 className="text-[22px] font-medium leading-tight tracking-wide">
        Welcome to Mkan
      </h3>

      {/* Form Section */}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {showTwoFactor ? (
          <div className="border border-gray-300 rounded-lg overflow-hidden">
            <div className="relative w-full">
              <input
                {...form.register("code")}
                type="text"
                disabled={isPending}
                placeholder="Two Factor Code"
                className="w-full px-3 py-3 text-base bg-transparent outline-none focus:border focus:border-black focus:rounded-lg focus:z-10 relative"
              />
            </div>
          </div>
        ) : (
          <div className="border border-gray-300 rounded-lg overflow-hidden">
            {/* Email Input */}
            <div className="relative w-full">
              <input
                {...form.register("email")}
                type="email"
                disabled={isPending}
                className="w-full px-3 py-2.5 text-base bg-transparent outline-none border-b border-gray-300 focus:border focus:border-black focus:rounded-lg focus:z-10 relative"
                placeholder="Email"
              />
            </div>

            {/* Password Input */}
            <div className="relative w-full group">
              <input
                {...form.register("password")}
                type="password"
                disabled={isPending}
                className="w-full px-3 py-2.5 text-base bg-transparent outline-none focus:border focus:border-black focus:rounded-lg focus:z-10 relative"
                placeholder="Password"
              />
            </div>
          </div>
        )}

        {/* Help Text */}
        <p className="text-xs text-gray-500 leading-relaxed">
          Did you{' '}
          <Link href="/reset" className="underline cursor-pointer text-gray-500 hover:text-gray-900 transition-colors">
            Forget your password
          </Link>
          ? or{' '}
          <Link href="/join" className="underline cursor-pointer text-gray-500 hover:text-gray-900 transition-colors">
            Don&apos;t have an account
          </Link>
          ?
        </p>

        <FormError message={error || urlError} />
        <FormSuccess message={success} />

        {/* Continue Button */}
        <Button 
          disabled={isPending}
          type="submit"
          className="w-full h-12 bg-[#FF385C] hover:bg-[#E31C5F] text-white font-medium text-base rounded-lg"
        >
          {showTwoFactor ? "Confirm" : "Continue"}
        </Button>

        {/* Divider */}
        <div className="flex items-center gap-4">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="text-sm text-gray-900 font-normal tracking-wider">or</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Social Login */}
        <Social callbackUrl={callbackUrl} />
      </form>
    </div>
  );
};
