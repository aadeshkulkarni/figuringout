"use client";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Kanban } from "lucide-react";
import Image from "next/image";

const Header = () => {
  const session = useSession();
  const isAuthenticated = session.status === "authenticated";
  return (
    <Sheet>
      <SheetTrigger className="absolute z-50 top-5 right-5 rotate-90 cursor-pointer">
        <Kanban width="40px" height="40px" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Figuringout.life</SheetTitle>
          <SheetDescription>
            {isAuthenticated ? (
              <div className="py-8">
                <div className="py-4 flex gap-2 md:gap-8 items-center">
                  <Image
                    src={session?.data?.user?.image || ""}
                    width="40"
                    height="40"
                    className="border p-0 m-0 rounded-full"
                    alt="User profile pic"
                  />
                  <div className="text-left">
                    <p>{session?.data?.user?.name}</p>
                    <p>{session?.data?.user?.email}</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={(e) => {
                    e.preventDefault();
                    signOut({ callbackUrl: "/", redirect: true });
                  }}
                >
                  Sign out
                </Button>
              </div>
            ) : (
              <Button
                className="w-full my-8"
                onClick={(e) => {
                  e.preventDefault();
                  signIn("google", { callbackUrl: "/", redirect: true });
                }}
              >
                Get started
              </Button>
            )}
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
  return;
};

export default Header;
