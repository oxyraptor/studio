
"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AtSign, Lock } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  function onSubmit(data: LoginFormValues) {
    // In a real app, you would handle authentication here.
    console.log("Login submitted:", data);
    
    // For this prototype, we'll just show a success toast and redirect.
    toast({
      title: "Login Successful",
      description: "Welcome back!",
    });
    router.push("/home");
  }

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-background p-4">
        <Image 
            src="https://storage.googleapis.com/project-spark-prod/project-spark-b82af2b3-5353-4889-8d8a-de500c3b313f/static-assets/433e1444-2458-45e0-827c-9b508f72f236"
            alt="Background"
            layout="fill"
            objectFit="cover"
            className="z-0"
            data-ai-hint="temple water"
        />
        <div className="absolute inset-0 bg-black/50 z-10" />
      <div className="w-full max-w-md z-20">
        <div className="text-center mb-8">
            <h1 className="text-4xl font-bold font-headline text-white">
                CitizExperience
            </h1>
            <p className="text-gray-200">Your portal to seamless civic engagement.</p>
        </div>
        <Card className="shadow-lg rounded-xl bg-white/10 backdrop-blur-sm border-white/20 text-white">
          <CardHeader>
            <CardTitle className="font-headline text-3xl">Welcome Back</CardTitle>
            <CardDescription className="text-gray-200">Sign in to continue to your account.</CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <AtSign className="h-4 w-4" /> Email Address
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="john.doe@example.com"
                          {...field}
                          className="bg-white/20 border-white/30 placeholder:text-gray-300"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Lock className="h-4 w-4" /> Password
                      </FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} className="bg-white/20 border-white/30 placeholder:text-gray-300" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <Button type="submit" size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  Sign In
                </Button>
                <Button variant="link" size="sm" className="text-white/80 hover:text-white">
                    Forgot Password?
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
       <footer className="px-4 py-6 sm:px-6 lg:px-8 mt-auto z-20">
        <div className="max-w-7xl mx-auto text-center text-white/70 text-sm">
          <p>&copy; {new Date().getFullYear()} CitizExperience. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
