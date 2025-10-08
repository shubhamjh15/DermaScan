"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FaGoogle, FaApple, FaInstagram } from "react-icons/fa"

interface SignInModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function SignInModal({ open, onOpenChange }: SignInModalProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] border border-primary/20 bg-card/95 backdrop-blur-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold gradient-text">Welcome Back</DialogTitle>
          <DialogDescription>
            Sign in to your DermaScan account to access your personalized beauty profile.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="signin" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="signin" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-border/50 bg-background/50"
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="text-xs text-primary hover:underline">
                  Forgot password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-border/50 bg-background/50"
              />
            </div>
            <Button className="w-full">Sign In</Button>

            <div className="relative flex items-center justify-center my-4">
              <div className="absolute border-t border-border/50 w-full"></div>
              <span className="relative px-2 bg-card text-xs text-muted-foreground">or continue with</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <Button variant="outline" size="icon" className="border-border/50">
                <FaGoogle className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="border-border/50">
                <FaApple className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="border-border/50">
                <FaInstagram className="h-4 w-4" />
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="signup" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="signup-email">Email</Label>
              <Input
                id="signup-email"
                type="email"
                placeholder="you@example.com"
                className="border-border/50 bg-background/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="signup-password">Password</Label>
              <Input
                id="signup-password"
                type="password"
                placeholder="••••••••"
                className="border-border/50 bg-background/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="••••••••"
                className="border-border/50 bg-background/50"
              />
            </div>
            <Button className="w-full">Create Account</Button>

            <div className="text-xs text-center text-muted-foreground">
              By signing up, you agree to our{" "}
              <a href="#" className="text-primary hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-primary hover:underline">
                Privacy Policy
              </a>
              .
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
