"use client";

import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // ✅ Hide Navbar on the homepage ("/") and profile setup page ("/profile")
  const hideNavbar = pathname === "/" || pathname === "/profile";

  return (
    <SessionProvider>
      <html lang="en">
        <body>
          <div className="flex flex-col min-h-screen">
            {!hideNavbar && <Navbar />}{" "}
            {/* ✅ Navbar is shown only on pages except login & profile setup */}
            <main className="flex-grow bg-gray-100">{children}</main>
          </div>
        </body>
      </html>
    </SessionProvider>
  );
}
