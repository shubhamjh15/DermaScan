// components/navbar.tsx
"use client"; // Essential: Marks this as a Client Component

import React, { useState, useEffect } from "react"; // Import React
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X, User, LogOut, Loader2 } from "lucide-react";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { authClient } from "@/lib/auth-client"; // For client-side sign out

// Define the user type expected from your API endpoint
// Adjust fields based on what /api/auth/session actually returns
interface SessionUser {
  id: string;
  email?: string | null;
  name?: string | null;
  // Add any other fields your navbar might need (e.g., profile picture URL)
}

export default function Navbar() {
  // --- State Variables ---
  const [sessionUser, setSessionUser] = useState<SessionUser | null>(null); // Holds logged-in user data or null
  const [isLoadingSession, setIsLoadingSession] = useState(true); // Tracks initial session fetch
  const [isOpen, setIsOpen] = useState(false); // Mobile menu state
  const [scrolled, setScrolled] = useState(false); // Header background on scroll
  const [isSigningOut, setIsSigningOut] = useState(false); // Tracks sign-out process

  // --- Hooks ---
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();

  // --- Effects ---

  // Effect 1: Fetch session status when the component mounts
  useEffect(() => {
    const fetchSession = async () => {
      setIsLoadingSession(true); // Ensure loading state is true initially
      try {
        const response = await fetch('/api/auth/session'); // Call your session check API

        if (response.ok) {
          const data = await response.json();
          setSessionUser(data.user as SessionUser | null); // Store user data if request succeeds
        } else {
          // Handle non-OK responses (like 401 Unauthorized) by setting user to null
          setSessionUser(null);
        }
      } catch (error) {
        // Handle network or other errors during fetch
        console.error("Navbar: Error fetching session status:", error);
        setSessionUser(null); // Assume not logged in on error
      } finally {
        setIsLoadingSession(false); // Stop loading indicator regardless of outcome
      }
    };

    fetchSession();
  }, []); // Empty dependency array ensures this runs only once on mount

  // Effect 2: Add scroll listener for header background effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20); // Change background if scrolled more than 20px
    };
    window.addEventListener("scroll", handleScroll);
    // Cleanup function to remove listener when component unmounts
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // Empty dependency array: run only once

  // Effect 3: Close mobile menu when the route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]); // Run whenever the pathname changes

  // --- Event Handlers ---

  // Toggles the mobile menu open/closed
  const toggleMenu = () => setIsOpen(!isOpen);

  // Handles the sign-out process
  const handleSignOut = async () => {
    setIsSigningOut(true); // Show loading state on button
    try {
      await authClient.signOut(); // Use the client library to sign out
      toast({
        title: "Signed out successfully",
        description: "You have been signed out.",
      });
      setSessionUser(null); // Update local state immediately
      router.push("/"); // Redirect to homepage after sign out
      // router.refresh(); // Optionally refresh server components if needed
    } catch (error) {
      console.error("Navbar: Sign out error:", error);
      toast({
        variant: "destructive",
        title: "Error signing out",
        description: "Could not sign out. Please try again.",
      });
    } finally {
      setIsSigningOut(false); // Hide loading state on button
    }
  };

  // Navigates to the login page
  const handleSignInClick = () => {
    router.push('/login');
  };

  // --- Data ---

  // Navigation links definition
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/beauty-analysis", label: "Beauty Analysis" },
    { href: "/analysis", label: "Skin Analysis" }, // Assuming this is Skin Analysis
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "About" },
  ];

  // --- Render Logic ---
  return (
    <>
      {/* Header element with dynamic background based on scroll */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/80 backdrop-blur-md shadow-sm" // Scrolled state style
            : "bg-transparent" // Initial transparent state
        }`}
      >
        <div className="container mx-auto px-4 md:px-6">
          {/* Main header content alignment */}
          <div className="flex h-16 items-center justify-between">

            {/* Logo and Brand Name */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2" aria-label="Go to Homepage">
                <div className="h-8 w-8 relative">
                  <Image
                    src="/images/dermascan-logo.png" // Ensure this image is in public/images
                    alt="DermaScan Logo"
                    width={32}
                    height={32}
                    className="object-contain"
                    priority // Prioritize loading as it's likely above the fold
                  />
                </div>
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#cb0c62] via-[#8e44ad] to-[#00f2ff]">
                  DermaScan
                </span>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors hover:text-primary ${
                    pathname === link.href
                      ? "text-primary font-semibold" // Active link style
                      : "text-muted-foreground" // Inactive link style
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop Authentication Button Area */}
            <div className="hidden md:flex items-center">
               {isLoadingSession ? (
                 // Show loading button while checking session
                 <Button variant="outline" size="sm" disabled aria-busy="true">
                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                   Loading...
                 </Button>
               ) : (
                 // Show actual Sign In/Out button after loading
                 <Button
                    variant="outline"
                    size="sm"
                    // Choose handler based on whether a user session exists
                    onClick={sessionUser ? handleSignOut : handleSignInClick}
                    // Disable button only during the sign-out process
                    disabled={isSigningOut}
                    aria-live="polite" // Announce changes for screen readers
                  >
                    {!sessionUser ? (
                      // User is logged out
                      <> <User className="mr-2 h-4 w-4" /> Sign In </>
                    ) : (
                      // User is logged in
                      isSigningOut ? (
                        // Sign out in progress
                        <> <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing out... </>
                      ) : (
                        // Default logged-in state
                        <> <LogOut className="mr-2 h-4 w-4" /> Sign Out </>
                        // Alternative: Show user name if available
                        // <> <LogOut className="mr-2 h-4 w-4" /> {sessionUser.name || 'Sign Out'} </>
                      )
                    )}
                  </Button>
               )}
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="flex md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMenu}
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
              >
                {/* Toggle between Menu and X icons */}
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu Drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden overflow-hidden bg-background/95 backdrop-blur-md border-t border-border/50" // Added border
            >
              <div className="container mx-auto px-4 py-4">
                {/* Mobile Navigation Links */}
                <nav className="flex flex-col space-y-1 mb-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)} // Close menu on link click
                      className={`block rounded-md px-3 py-2 text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground ${
                        pathname === link.href
                          ? "bg-accent text-accent-foreground" // Active mobile link style
                          : "text-foreground" // Inactive mobile link style
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                {/* Mobile Authentication Button Area */}
                <div className="pt-4 border-t border-border/50">
                   {isLoadingSession ? (
                      // Loading state for mobile button
                      <Button variant="outline" className="w-full justify-start" disabled aria-busy="true">
                         <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading...
                      </Button>
                   ) : (
                      // Actual mobile Sign In/Out button
                      <Button
                        variant="outline"
                        className="w-full justify-start" // Align text left
                        onClick={() => {
                          if (sessionUser) {
                            handleSignOut(); // Sign out if logged in
                          } else {
                            handleSignInClick(); // Go to login if logged out
                          }
                          setIsOpen(false); // Close menu after action
                        }}
                        disabled={isSigningOut}
                        aria-live="polite"
                      >
                       {!sessionUser ? (
                          // Logged out state
                          <> <User className="mr-2 h-4 w-4" /> Sign In </>
                        ) : (
                          // Logged in state
                          isSigningOut ? (
                            // Sign out in progress
                            <> <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing out... </>
                          ) : (
                            // Default logged-in state
                            <> <LogOut className="mr-2 h-4 w-4" /> Sign Out </>
                          )
                        )}
                      </Button>
                   )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Spacer Div: Prevents content from hiding behind the fixed header */}
      <div className="h-16" aria-hidden="true"></div>
    </>
  );
}