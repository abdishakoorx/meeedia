"use client";

import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import {
  Home,
  Users,
  Settings,
  BarChart2,
  SidebarClose,
  SidebarOpen,
  LoaderPinwheel,
  Coins,
} from "lucide-react";
import { Logo } from "@/components/logo";
import { UserDetails } from "@/app/_context/UserDetails";
import { SignOutButton, UserButton } from "@clerk/nextjs";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SidebarItem {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
}

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { userDetails } = useContext(UserDetails);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--sidebar-width",
      isCollapsed ? "5rem" : "16rem"
    );
  }, [isCollapsed]);

  const sidebarItems: SidebarItem[] = [
    {
      icon: <Home className="w-5 h-5" />,
      label: "Dashboard",
      href: "/in/dashboard",
      active: true,
    },
    {
      icon: <Users className="w-5 h-5" />,
      label: "Team",
      href: "/in/team",
    },
    {
      icon: <BarChart2 className="w-5 h-5" />,
      label: "Analytics",
      href: "/in/analytics",
    },
    {
      icon: <Settings className="w-5 h-5" />,
      label: "Settings",
      href: "/in/settings",
    },
  ];

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={`
        fixed 
        left-0 
        top-0 
        h-full 
        ${isCollapsed ? "w-20" : "w-64"} 
        bg-gray-200 dark:bg-gray-800
        border-r 
        border-gray-200 
        shadow-sm 
        transition-all 
        duration-300 
        ease-in-out 
        z-40
        flex 
        flex-col
        overflow-hidden
      `}
    >
      {/* Collapse/Expand Button */}
      <div
        onClick={toggleSidebar}
        className="
          absolute 
          top-6 
          right-4
          transition 
          rounded-full
          z-5
          p-2
          dark:text-accent text-accent-dark          
        "
      >
        {isCollapsed ? (
          <SidebarOpen className="w-6 h-6" />
        ) : (
          <SidebarClose className="w-6 h-6" />
        )}
      </div>

      {/* Logo Area */}
      <div className="h-16 mt-4 px-4">{isCollapsed ? <></> : <Logo />}</div>

      {/* Navigation Items */}
      <nav className="flex-1 pt-8 border-t-2 dark:border-gray-300 border-gray-600">
        {sidebarItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center px-4 py-3 mx-4 rounded-lg group transition duration-300 
              ${
                item.active
                  ? "bg-blue-200 dark:bg-blue-800 text-blue-600 dark:text-blue-200"
                  : "text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:text-gray-800"
              }`}
          >
            <span className="mr-4">{item.icon}</span>
            <span
              className={`
                transition-all 
                duration-300 
                ${
                  isCollapsed
                    ? "opacity-0 absolute left-16 pointer-events-none"
                    : "opacity-100 relative"
                }
              `}
            >
              {item.label}
            </span>
          </Link>
        ))}
      </nav>

      {/* Tokens Section */}
      <div className="p-4 border-t border-gray-300 dark:border-gray-700">
        <div className="flex items-center justify-between mb-2">
          {isCollapsed ? (
            <Coins className="h-6 w-6 text-yellow-500" />
          ) : (
            <div className="flex items-center space-x-2">
              <Coins className="h-5 w-5 text-yellow-500" />
              <p className="text-base font-bold text-gray-600 dark:text-gray-300">
                Tokens
              </p>
            </div>
          )}
        </div>
        <Progress
          value={(userDetails?.credits ?? 0) * 10}
          className="h-3 rounded-full bg-gray-200 dark:bg-gray-600"
        >
          <span className="sr-only">
            {(userDetails?.credits ?? 0) * 10}% Tokens Used
          </span>
        </Progress>
        {!isCollapsed && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            {(userDetails?.credits ?? 0) * 10}% of your tokens remaining.
          </p>
        )}
        {!isCollapsed && (userDetails?.credits ?? 0) < 3 && (
          <p className="text-xs text-red-500 dark:text-red-400 mt-1">
            Low tokens remaining! Consider upgrading your plan.
          </p>
        )}
      </div>

      {/* Footer/User Area */}
      <div className="p-4 bg-gray-50 dark:bg-gray-900 transition-all duration-300">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {/* Entire footer as trigger */}
            <div
              className="flex items-center justify-between cursor-pointer"
              aria-label="User Dropdown"
            >
              {/* User Avatar */}
              <UserButton />

              {/* User Info */}
              <div
                className={`flex-1 ml-4 transition-all duration-300 overflow-hidden ${
                  isCollapsed
                    ? "opacity-0 w-0 max-w-0"
                    : "opacity-100 w-auto max-w-full"
                }`}
              >
                {userDetails ? (
                  <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                      {userDetails.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {userDetails.email}
                    </p>
                  </div>
                ) : (
                  <LoaderPinwheel className="h-6 w-6 text-gray-500 dark:text-gray-400 animate-spin" />
                )}
              </div>
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg p-2"
            sideOffset={8}
          >
            <DropdownMenuItem>
              <SignOutButton />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Sidebar;
