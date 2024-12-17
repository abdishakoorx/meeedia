import { Logo } from "@/components/logo";
import { ModeToggle } from "@/components/mode-toggler";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import React from "react";

function Header() {
  return (
    <div className="px-10 mx-auto flex items-center justify-between p-4">
      <div>
        <Logo />
      </div>

      <div className="flex gap-8">
        <ModeToggle />
        <>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </>
      </div>
    </div>
  );
}

export default Header;
