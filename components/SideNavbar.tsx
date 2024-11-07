import { Heart, Home, LockKeyhole, Plus, Search, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ThemeToggle } from "./ThemeToggle";

const NavigationList = [
  {
    key: "home",
    href: "/",
    component: Home,
    className: "",
  },
  {
    key: "search",
    href: "/search",
    component: Search,
    className: "",
  },
  {
    key: "plus",
    href: "/create",
    component: Plus,
    className: "",
  },
  {
    key: "heart",
    href: "/activity",
    component: Heart,
    className: "fill-black ",
  },
  {
    key: "user",
    href: "/profile",
    component: User,
    className: "fill-black ",
  },
  // {
  //   key: "polcies",
  //   href: "/policies",
  //   component: LockKeyhole,
  //   className: "hidden md:block",
  // },
];

const SideNavbar = () => {
  return (
    <div className="z-50 fixed bottom-0 left-0 w-screen md:w-fit md:h-screen p-6 flex md:flex-col justify-between md:justify-center items-center gap-8 bg-primary-foreground md:bg-transparent border md:border-0 md:shadow-none">
      <div className="hidden md:block absolute top-4 left-4">
        <Image src="/logo.svg" alt="Logo" width="48" height="48" />
        <ThemeToggle />
      </div>

      {NavigationList.map(({ key, href, className = "", component: Component }) => (
        <Link key={key} href={href} className={`hover:opacity-50 ${className}`}>
          <Component width={28} height={28} className={className} />
        </Link>
      ))}
    </div>
  );
};

export default SideNavbar;
