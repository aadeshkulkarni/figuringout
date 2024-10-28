import { Heart, Home, LockKeyhole, Plus, Search, User } from "lucide-react";
import Link from "next/link";
import React from "react";

const NavigationList = [
  {
    key: "home",
    href: "/",
    component: Home,
    className: "",
  },
  {
    key: "search",
    href: "",
    component: Search,
    className: "",
  },
  {
    key: "plus",
    href: "",
    component: Plus,
    className: "",
  },
  {
    key: "heart",
    href: "",
    component: Heart,
    className: "fill-black ",
  },
  {
    key: "user",
    href: "",
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
    <div className="z-50 fixed bottom-0 left-0 w-screen md:w-fit md:h-screen p-4 flex md:flex-col justify-between md:justify-center items-center gap-8 bg-primary-foreground md:bg-transparent border md:border-0 md:shadow-none">
      {NavigationList.map(({ key, href, className = "", component: Component }) => (
        <Link key={key} href={href} className={`hover:opacity-50 ${className}`}>
          <Component width={24} height={24} className={className} />
        </Link>
      ))}
    </div>
  );
};

export default SideNavbar;
