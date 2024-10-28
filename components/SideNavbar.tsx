import { Heart, Home, Plus, Search, User } from "lucide-react";
import Link from "next/link";
import React from "react";

const NavigationList = [
  {
    key: "home",
    href: "/",
    component: Home,
  },
  {
    key: "search",
    href: "",
    component: Search,
  },
  {
    key: "plus",
    href: "",
    component: Plus,
  },
  {
    key: "heart",
    href: "",
    component: Heart,
    className: "fill-black",
  },
  {
    key: "user",
    href: "",
    component: User,
    className: "fill-black",
  },
];

const SideNavbar = () => {
  return (
    <div className="h-screen p-4 flex flex-col justify-center gap-8 bg-transparent border-0 shadow-none">
      {NavigationList.map(({ key, href, className = "", component: Component }) => (
        <Link key={key} href={href} className="hover:opacity-50">
          <Component width={24} height={24} className={className} />
        </Link>
      ))}
    </div>
  );
};

export default SideNavbar;
