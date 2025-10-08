import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FaInstagram, FaTiktok, FaYoutube, FaTwitter } from "react-icons/fa"

export default function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background/80 backdrop-blur-lg relative z-10">
      <div className="container px-4 md:px-6 py-12">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 overflow-hidden">
                <Image
                  src="/images/dermascan-logo.png"
                  alt="DermaScan Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <span className="font-bold text-xl gradient-text">DermaScan</span>
            </div>
            <p className="text-sm text-muted-foreground">The ultimate Gen Z beauty tech platform powered by AI.</p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                <FaInstagram className="h-4 w-4" />
                <span className="sr-only">Instagram</span>
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                <FaTiktok className="h-4 w-4" />
                <span className="sr-only">TikTok</span>
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                <FaYoutube className="h-4 w-4" />
                <span className="sr-only">YouTube</span>
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                <FaTwitter className="h-4 w-4" />
                <span className="sr-only">Twitter</span>
              </Button>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-4">Features</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/analysis" className="text-muted-foreground hover:text-primary">
                  AI Skin Analysis
                </Link>
              </li>
              <li>
                <Link href="/consultation" className="text-muted-foreground hover:text-primary">
                  Expert Consultations
                </Link>
              </li>
              <li>
                <Link href="/routine" className="text-muted-foreground hover:text-primary">
                  Personalized Routines
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-primary">
                  Trend Blog
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-4">Company</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-muted-foreground hover:text-primary">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/press" className="text-muted-foreground hover:text-primary">
                  Press
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-4">Stay Updated</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Subscribe to get the latest beauty trends and exclusive offers.
            </p>
            <div className="flex space-x-2">
              <Input type="email" placeholder="Enter your email" className="h-9 border-border/50 bg-background/50" />
              <Button size="sm" className="h-9">
                Subscribe
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">By subscribing, you agree to our Privacy Policy.</p>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} DermaScan. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
