"use client";

import { useLoginModal, useRegisterModal, useRentModal } from "@/hooks/useModal";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface UserMenuProps {
  currentUser?: {
    name?: string | null;
    image?: string | null;
  } | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    rentModal.onOpen();
  }, [currentUser, loginModal, rentModal]);

  return (
    <div className="relative flex items-center gap-4">
      <Button
        onClick={onRent}
        variant="outline"
        className="hidden md:block px-4 py-2"
      >
        Airbnb your home
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="rounded-full">
            <AiOutlineMenu className="h-5 w-5" />
            <div className="hidden md:block ml-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={currentUser?.image || "/placeholder.jpg"} />
                <AvatarFallback>
                  {currentUser?.name?.[0] || "G"}
                </AvatarFallback>
              </Avatar>
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px]">
          {currentUser ? (
            <>
              <DropdownMenuItem onClick={() => router.push("/trips")}>
                My trips
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/favorites")}>
                My favorites
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/reservations")}>
                My reservations
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/properties")}>
                My properties
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onRent}>
                Airbnb my home
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => {}}>
                Logout
              </DropdownMenuItem>
            </>
          ) : (
            <>
              <DropdownMenuItem onClick={loginModal.onOpen}>
                Login
              </DropdownMenuItem>
              <DropdownMenuItem onClick={registerModal.onOpen}>
                Sign up
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserMenu;
