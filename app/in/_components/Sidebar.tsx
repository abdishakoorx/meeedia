"use client";

import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  SidebarClose,
  SidebarOpen,
  LoaderPinwheel,
  Camera,
  Sparkles,
  Grid3x3,
} from "lucide-react";
import { Logo } from "@/components/logo";
import { UserDetails } from "@/app/_context/UserDetails";
import { SignOutButton, UserButton } from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDashboard } from "../DashboardProvider";
import TokenRefresh from "./TokenRefresh";

interface SidebarItem {
  icon: React.ReactNode;
  label: string;
  href: string;
}

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { isCollapsed, toggleSidebar } = useDashboard();
  const { userDetails } = useContext(UserDetails);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobileScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobileScreen();
    window.addEventListener("resize", checkMobileScreen);
    return () => window.removeEventListener("resize", checkMobileScreen);
  }, []);

  const sidebarItems: SidebarItem[] = [
    {
      icon: <Home className="w-5 h-5" />,
      label: "Dashboard",
      href: "/in",
    },
    {
      icon: <Camera className="w-5 h-5" />,
      label: "Scratch Editor",
      href: "/in/scratch-editor",
    },
    {
      icon: <Sparkles className="w-5 h-5" />,
      label: "AI Editor",
      href: "/in/ai-editor",
    },
    {
      icon: <Grid3x3 className="w-5 h-5" />,
      label: "Projects",
      href: "/in/projects",
    },
  ];

  const isActiveLink = (href: string): boolean => {
    if (href === "/in") {
      // For dashboard, check if we're at root /in or /in/
      return pathname === "/in" || pathname === "/in/";
    }
    // For other routes, check if the pathname starts with the href
    return pathname.startsWith(href);
  };

  const getSidebarClasses = () => {
    if (isMobile) {
      return `fixed top-0 left-0 h-full w-64 bg-gray-200 dark:bg-gray-800 border-r border-gray-200 shadow-lg z-50 transition-transform duration-300 ease-in-out flex flex-col 
      ${isCollapsed ? "-translate-x-full" : "translate-x-0"}
      `;
    }

    return `fixed left-0 top-0 h-full bg-gray-200 dark:bg-gray-800 border-r border-gray-200 shadow-sm transition-all duration-300 ease-in-out z-40 flex flex-col overflow-hidden
     ${isCollapsed ? "w-20" : "w-64"}
    `;
  };

  const MobileOverlay = () => {
    if (!isMobile || isCollapsed) return null;

    return (
      <div
        onClick={toggleSidebar}
        className="fixed inset-0 bg-black/50 z-40 backdrop-blur-smlg:hidden"
      />
    );
  };

  return (
    <>
      <MobileOverlay />

      <div
        className={getSidebarClasses()}
        style={{
          ...(isMobile &&
            isCollapsed && {
              transform: "translateX(-100%)",
              width: "0",
              overflow: "hidden",
            }),
        }}
      >
        <div className="flex-1 flex flex-col">
          {isMobile && !isCollapsed && (
            <button
              onClick={toggleSidebar}
              className="absolute top-4 right-4 z-50 mt-3 dark:text-gray-300 text-gray-700"
            >
              <SidebarClose className="w-6 h-6" />
            </button>
          )}

          {!isMobile && (
            <div
              onClick={toggleSidebar}
              className="absolute top-6 right-4 transition rounded-full z-5 p-2 dark:text-gray-300 text-gray-700"
            >
              {isCollapsed ? (
                <SidebarOpen className="w-6 h-6" />
              ) : (
                <SidebarClose className="w-6 h-6" />
              )}
            </div>
          )}

          <div className="h-16 mt-4 px-4">
            {!isMobile && isCollapsed ? <></> : <Logo />}
          </div>

          <nav className="flex-1 pt-6">
            {sidebarItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={isMobile ? toggleSidebar : undefined}
                className={`flex items-center px-4 py-3 mb-2 mx-4 rounded-lg group transition duration-300 
                  ${
                    isActiveLink(item.href)
                      ? "bg-secondary dark:bg-secondary-dark text-black text-lg"
                      : "text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:text-gray-800"
                  }
                  ${!isMobile && isCollapsed ? "justify-center" : ""}`}
              >
                <span>{item.icon}</span>
                <span
                  className={`transition-all duration-300 ml-4 font-mono
                    ${
                      !isMobile && isCollapsed
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
        </div>

        <div className="mt-auto">
          <TokenRefresh isCollapsed={isCollapsed} isMobile={isMobile} />

          <div className="p-4 bg-gray-50 dark:bg-gray-900">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div
                  className="flex items-center justify-between cursor-pointer"
                  aria-label="User Dropdown"
                >
                  <UserButton />

                  <div
                    className={`flex-1 ml-4 transition-all duration-300 overflow-hidden 
                      ${
                        !isMobile && isCollapsed
                          ? "opacity-0 w-0 max-w-0"
                          : "opacity-100 w-auto max-w-full"
                      }
                    `}
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
                className="w-48 bg-white dark:bg-gray-700 hover:bg-transparent cursor-pointer rounded-md shadow-lg p-2"
                sideOffset={8}
              >
                <DropdownMenuItem>
                  <SignOutButton />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
