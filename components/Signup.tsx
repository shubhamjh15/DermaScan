"use client";
import React, { useState } from "react";
import { Mail, Lock, User, ArrowRight, Loader2 } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { GoogleIcon } from "./ui/google-icon";
import { GoogleAuthButton } from "@/components/Auth/GoogleAuthButton";
import { InputField } from "@/components/Auth/FormFields";
import { SignUpFormValues, signUpSchema } from "@/lib/schema/signupSchema";
import {authClient} from "@/lib/auth-client";

const Signup = () => {
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const [pending, setPending] = useState(false);
  const { toast } = useToast();

  const onSubmit = async (data: SignUpFormValues) => {
    form.reset()
    await authClient.signUp.email({
      email: data.email,
      password: data.password,
      name: data.name,
    },
      {
        onRequest:()=>{
          setPending(true)
        },
        onSuccess:()=>{
          toast({
            title: "Account created",
            description: "your account has been created check your email for confirmation",
          });
        console.log("success")
        },
        onError: (ctx) => {
          console.log("error",ctx)
          toast({
            variant:"destructive",
            title: "something went wrong",
            description: ctx.error.message??"something went wrong."
          });
          console.log("error",ctx.error.message)
      },

    })
    setPending(false)
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-background/80 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <div className="flex items-center justify-center space-x-2">
              {/* <div className="w-8 h-8 rounded-md bg-primary/90 flex items-center justify-center text-white font-bold">
                A
              </div> */}
              <div className="w-8 h-8">
                <Image
                    src="/images/dermascan-logo.png"
                    alt="DermaScan Logo"
                    width={32}
                    height={32}
                    className="object-contain"
                  />
              </div>
              <h1 className="text-2xl font-bold">DermaScan</h1>
            </div>
          </Link>
        </div>

        <Card className="border-none shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Create an account
            </CardTitle>
            <CardDescription className="text-center">
              Enter your information to create your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <InputField
                  control={form.control}
                  name="name"
                  label="Full name"
                  placeholder="john doe"
                  type="text"
                  icon={<User className="h-5 w-5 text-muted-foreground" />}
                />

                <InputField
                  control={form.control}
                  name="email"
                  label="Email"
                  placeholder="john.doe@example.com"
                  type="email"
                  icon={<Mail className="h-5 w-5 text-muted-foreground" />}
                />

                <InputField
                  control={form.control}
                  name="password"
                  label="Password"
                  placeholder="••••••••"
                  type="password"
                  icon={<Lock className="h-5 w-5 text-muted-foreground" />}
                  showPasswordToggle={true}
                />

                <InputField
                  control={form.control}
                  name="confirmPassword"
                  label="Confirm Password"
                  placeholder="••••••••"
                  type="password"
                  icon={<Lock className="h-5 w-5 text-muted-foreground" />}
                  showPasswordToggle={true}
                />

                <Button type="submit" className="w-full" disabled={pending}>
                  {pending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Please wait...
                    </>
                  ) : (
                    <>
                      Sign up <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="flex gap-4 ">
              <GoogleAuthButton
                action="signup"
                buttonText="Sign up with Google"
                redirectTo="/"
              />
            </div>

            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                Log in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
