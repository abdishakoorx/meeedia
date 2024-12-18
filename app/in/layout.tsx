import React from "react";
import Sidebar from "./_components/Sidebar";
import { DashboardProvider } from "./DashboardProvider";

export default function InLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DashboardProvider>
      <div className="flex">
        <Sidebar />
        <main className="flex-1 lg:pl-[var(--sidebar-width)] transition-all duration-300 ease-in-out">
          {children}
        </main>
      </div>
    </DashboardProvider>
  );
}
