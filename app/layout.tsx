import type React from "react"
import "@/app/globals.css"
import { Space_Grotesk, Space_Mono } from "next/font/google"
import localFont from "next/font/local"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ClientLayout from "./ClientLayout"
import ConditionalLayout from "@/components/ConditionalLayout"
import { Toaster } from "@/components/ui/toaster";


// Local font
const clashDisplay = localFont({
  src: [
    {
      path: "../public/fonts/ClashDisplay-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/ClashDisplay-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/ClashDisplay-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-clash-display",
})

// Google fonts
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
})

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
})

export const metadata = {
  title: "DermaScan - AI-Powered Beauty & Skincare Platform",
  description:
    "The ultimate Gen Z beauty tech platform. Get AI-powered skin analysis, personalized beauty recommendations, and connect with beauty influencers.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${clashDisplay.variable} ${spaceGrotesk.variable} ${spaceMono.variable}`}
    >
      <body className="font-sans">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {/* Keep the main flex container */}
          <div className="flex flex-col min-h-screen relative overflow-hidden">
            <div className="noise-bg"></div>

            {/* --- Replace Navbar/main/Footer with ConditionalLayout --- */}
            <ConditionalLayout>
              {/* Pass the ClientLayout wrapping the children */}
              <ClientLayout>{children}</ClientLayout>
            </ConditionalLayout>
            <Toaster />
            {/* --- End of replacement --- */}

          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}