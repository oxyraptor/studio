
"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import Link from "next/link";
import { ArrowLeft, User, Mail, Calendar, Clock, CheckCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";


const bookingSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

export default function PaymentPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const date = searchParams.get("date");
    const time = searchParams.get("time");
    const { toast } = useToast();
    const [isDialogOpen, setIsDialogOpen] = React.useState(false);

    const form = useForm<BookingFormValues>({
        resolver: zodResolver(bookingSchema),
        defaultValues: { name: "", email: "" },
    });
    
    React.useEffect(() => {
        if (!date || !time) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Missing booking details. Redirecting...",
            });
            router.push("/book/date");
        }
    }, [date, time, router, toast]);


    function onSubmit(data: BookingFormValues) {
        // In a real app, you would handle payment and save the booking here.
        console.log("Booking submitted:", { ...data, date, time });
        setIsDialogOpen(true);
    }
    
    if (!date || !time) {
        return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
    }

    const formattedDate = format(new Date(date), 'PPP');

    return (
        <>
        <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
            <Button asChild variant="outline" className="absolute top-4 left-4">
                <Link href={`/book/time?date=${date}`} className="flex items-center gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Time
                </Link>
            </Button>
            <Card className="w-full max-w-md shadow-lg rounded-xl">
                <CardHeader>
                    <CardTitle className="font-headline text-3xl">Step 3: Confirm & Book</CardTitle>
                    <CardDescription>Enter your details to finalize your visit.</CardDescription>
                </CardHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <CardContent className="space-y-6">
                             <div className="p-4 rounded-lg border bg-muted/50 space-y-2">
                                <h4 className="font-semibold">Your Selection</h4>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="flex items-center gap-2 text-muted-foreground"><Calendar className="h-4 w-4"/> Date</span>
                                    <span>{formattedDate}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="flex items-center gap-2 text-muted-foreground"><Clock className="h-4 w-4"/> Time</span>
                                    <span>{time}</span>
                                </div>
                            </div>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel className="flex items-center gap-2"><User className="h-4 w-4" /> Your Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="John Doe" {...field} />
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
                                    <FormLabel className="flex items-center gap-2"><Mail className="h-4 w-4" /> Your Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="john.doe@example.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                        <CardFooter>
                            <Button type="submit" size="lg" className="w-full">
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
                  Thank you, {form.watch("name")}. Your visit for {formattedDate} at {time} is booked. A confirmation email has been sent to {form.watch("email")}.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction onClick={() => router.push('/home')} className="w-full">
                  Back to Home
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
    );
}
