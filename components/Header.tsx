"use client"
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const session = useSession();
  const isAuthenticated = session.status === "authenticated";
  return isAuthenticated ? (
    <Button
      variant="outline"
      className="absolute top-5 right-5"
      onClick={(e) => {
        e.preventDefault();
        signOut({ callbackUrl: "/", redirect: true });
      }}
    >
      Sign out
    </Button>
  ) : (
    <Button
      className="absolute top-5 right-5"
      onClick={(e) => {
        e.preventDefault();
        signIn("google", { callbackUrl: "/", redirect: true });
      }}
    >
      Sign up
    </Button>
  );
};

export default Header;
