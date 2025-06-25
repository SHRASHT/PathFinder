"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Bot, History, User, CreditCard } from "lucide-react";

const Sidebar = () => {
  const pathname = usePathname();
  const menuItems = [
    {
      name: "Workspace",
      href: "/dashboard",
      icon: Home,
    },
    {
      name: "AI Tools",
      href: "/dashboard/assessment",
      icon: Bot,
    },
    {
      name: "My History",
      href: "/dashboard/recommendations",
      icon: History,
    },
    {
      name: "Profile",
      href: "/dashboard/profile",
      icon: User,
    },
    {
      name: "Billing",
      href: "/dashboard/billing",
      icon: CreditCard,
    },
  ];
  return (
    <div className="w-64 bg-gray-900 text-white h-screen flex flex-col">
      <div className="p-4 flex-1">
        <h2 className="text-xl font-bold mb-6">Career Hub</h2>{" "}
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  pathname === item.href
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <IconComponent className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
