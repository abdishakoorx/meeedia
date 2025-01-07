"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { MessageCircle, User } from "lucide-react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Logo } from "@/components/logo";
import { ModeToggle } from "@/components/mode-toggler";
import { Button } from "@/components/ui/button";

const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: React.ReactNode;
  }[];
  className?: string;
}) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 0,
          y: -10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "flex max-w-fit fixed top-5 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-full",
          "bg-white/70 dark:bg-black/70 backdrop-blur-md backdrop-saturate-150",
          "shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]",
          "z-[5000] pr-2 pl-8 py-2 items-center justify-between space-x-3 md:space-x-10",
          className
        )}
      >
        {/* Left section with Logo */}
        <div className="flex items-center gap-3 md:gap-6">
          <Link href="/"><Logo /></Link>
          {navItems.map(
            (
              navItem: { name: string; link: string; icon?: React.ReactNode },
              idx: number
            ) => (
              <Link
                key={`link=${idx}`}
                href={navItem.link}
                className={cn(
                  "relative dark:text-neutral-50 font-semibold items-center flex text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500",
                  "transition-colors duration-200"
                )}
              >
                <span className="block sm:hidden">{navItem.icon}</span>
                <span className="hidden sm:block text-base">{navItem.name}</span>
              </Link>
            )
          )}
        </div>

        {/* Right section with Mode Toggle and Signin */}
        <div className="flex items-center gap-3 md:gap-6">
          <ModeToggle />
          <SignedOut>
            <SignInButton mode="modal">
              <Button className="border text-base relative bg-transparent border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full hover:bg-white/10 transition-colors duration-200">
                <span>Sign in</span>
                <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-secondary to-transparent h-px" />
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                },
              }}
            />
          </SignedIn>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export function FloatingNavDemo() {
  const navItems = [
    {
      name: "About",
      link: "/",
      icon: <User className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Contact",
      link: "/",
      icon: (
        <MessageCircle className="h-4 w-4 text-neutral-500 dark:text-white" />
      ),
    },
  ];
  return (
    <div className="relative w-full">
      <FloatingNav navItems={navItems} />
    </div>
  );
}
