
"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ArrowLeft, CheckCircle, User, Mail, Phone } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { BookingProgress } from "@/components/booking-progress";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required."),
  email: z.string().email("Invalid email address."),
  whatsapp: z.string().min(10, "WhatsApp number must be at least 10 digits.").max(15, "WhatsApp number cannot exceed 15 digits."),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const COST_PER_VISITOR = 500;

export default function ContactPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const date = searchParams.get("date");
  const time = searchParams.get("time");
  const visitors = searchParams.get("visitors");
  const { toast } = useToast();

  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      whatsapp: "",
    },
  });

  const numberOfVisitors = parseInt(visitors || "1", 10);
  const totalAmount = numberOfVisitors * COST_PER_VISITOR;

  React.useEffect(() => {
    if (!date || !time || !visitors) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Missing booking information. Please start again.",
      });
      router.push("/book/date");
    }
  }, [date, time, visitors, router, toast]);

  function onSubmit(data: ContactFormValues) {
    console.log("Booking submitted:", { date, time, visitors, ...data });
    setIsDialogOpen(true);
  }

  if (!date || !time || !visitors) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  const formattedDate = format(new Date(date), "PPP");
  const goBackLink = `/book/details?date=${date}&time=${time}`;

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
        <Button asChild variant="outline" className="absolute top-4 left-4">
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </Button>
        <div className="w-full max-w-lg">
          <BookingProgress currentStep={4} />
        </div>
        <Card className="w-full max-w-lg shadow-lg rounded-xl bg-card text-card-foreground border-border">
          <CardHeader>
            <CardTitle className="font-headline text-3xl">Step 4: Contact Details</CardTitle>
            <CardDescription>
              Please provide your contact information to finalize the booking.
            </CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2"><User className="h-4 w-4" /> Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2"><Mail className="h-4 w-4" /> Email Address</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="e.g. john.doe@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="whatsapp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2"><Phone className="h-4 w-4" /> WhatsApp Number</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="e.g. +919876543210" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row gap-2">
                <Button asChild variant="link" className="w-full sm:w-auto">
                  <Link href={goBackLink}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Go back
                  </Link>
                </Button>
                <Button type="submit" size="lg" className="w-full sm:w-auto flex-grow bg-primary text-primary-foreground hover:bg-primary/90">
                  Confirm Booking
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="flex justify-center">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <AlertDialogTitle className="text-center text-2xl">Booking Confirmed!</AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              Your visit for {numberOfVisitors} {numberOfVisitors > 1 ? 'people' : 'person'} on {formattedDate} at {time} is booked.
              <br />
              Total amount to be paid: <strong>₹{totalAmount.toLocaleString()}</strong>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => router.push('/')} className="w-full">
              Back to Home
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
