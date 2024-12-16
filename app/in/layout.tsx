import React from "react";
import Sidebar from "./_components/Sidebar";

export default function InLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 pl-[var(--sidebar-width)] transition-all duration-300 ease-in-out">
        {children}
      </main>
    </div>
  );
}