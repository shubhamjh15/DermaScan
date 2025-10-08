// components/ConditionalLayout.tsx
"use client"; // <-- Make this a Client Component

import { usePathname } from "next/navigation";
import Navbar from "@/components/navbar"; // Adjust path if needed
import Footer from "@/components/footer"; // Adjust path if needed
import React from "react";

// Define the paths where Navbar and Footer should NOT be shown
const excludedPaths = ['/signup', '/login', '/forgot-password', '/reset-password', 'email-verified'];

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Check if the current path is in the exclusion list
  const showLayout = !excludedPaths.includes(pathname);

  return (
    <>
      {/* Conditionally render Navbar */}
      {showLayout && <Navbar />}

      {/* Render the main page content */}
      {/* The main tag with flex-1 is moved here to ensure correct layout */}
      <main className="flex-1 relative z-10">
          {children}
      </main>

      {/* Conditionally render Footer */}
      {showLayout && <Footer />}
    </>
  );
}