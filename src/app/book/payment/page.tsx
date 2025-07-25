
"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { format } from "date-fns";
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
import { ArrowLeft, CheckCircle, User, Mail, Phone, Calendar as CalendarIcon, Clock, Users, CreditCard } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { BookingProgress } from "@/components/booking-progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const COST_PER_VISITOR = 500;

const paymentSchema = z.object({
    cardNumber: z.string().refine((val) => /^\d{16}$/.test(val), {
      message: "Card number must be 16 digits.",
    }),
    expiryDate: z.string().refine((val) => /^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(val), {
        message: "Invalid expiry date. Use MM/YY format.",
    }),
    cvc: z.string().refine((val) => /^\d{3}$/.test(val), {
      message: "CVC must be 3 digits.",
    }),
});

const upiSchema = z.object({
    upiId: z.string().refine((val) => /^[\w.-]+@[\w.-]+$/.test(val), {
        message: "Please enter a valid UPI ID.",
    }),
});

type PaymentFormValues = z.infer<typeof paymentSchema>;
type UpiFormValues = z.infer<typeof upiSchema>;


export default function PaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const date = searchParams.get("date");
  const time = searchParams.get("time");
  const visitors = searchParams.get("visitors");
  const name = searchParams.get("name");
  const email = searchParams.get("email");
  const whatsapp = searchParams.get("whatsapp");
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const cardForm = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      cardNumber: "",
      expiryDate: "",
      cvc: "",
    },
  });
  
  const upiForm = useForm<UpiFormValues>({
    resolver: zodResolver(upiSchema),
    defaultValues: {
      upiId: "",
    },
  });

  React.useEffect(() => {
    if (!date || !time || !visitors || !name || !email || !whatsapp) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Missing booking information. Please start again.",
      });
      router.push("/book/date");
    }
  }, [date, time, visitors, name, email, whatsapp, router, toast]);

  if (!date || !time || !visitors || !name || !email || !whatsapp) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  const numberOfVisitors = parseInt(visitors, 10);
  const totalAmount = numberOfVisitors * COST_PER_VISITOR;
  const formattedDate = format(new Date(date), "PPP");
  const goBackLink = `/book/contact?date=${date}&time=${time}&visitors=${visitors}&name=${name}&email=${email}&whatsapp=${whatsapp}`;
  
  function onPaymentSubmit(data: PaymentFormValues | UpiFormValues) {
    console.log("Dummy Payment Submitted:", data);
    setIsDialogOpen(true);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
        <Button asChild variant="outline" className="absolute top-4 left-4">
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </Button>
        <div className="w-full max-w-2xl">
          <BookingProgress currentStep={5} />
        </div>
        <Card className="w-full max-w-lg shadow-lg rounded-xl bg-card text-card-foreground border-border">
          <CardHeader>
            <CardTitle className="font-headline text-3xl">Step 5: Payment</CardTitle>
            <CardDescription>
              Review your booking details and proceed to payment.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground flex items-center gap-2"><User /> Name</span>
                <span>{name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground flex items-center gap-2"><Mail /> Email</span>
                <span>{email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground flex items-center gap-2"><Phone /> WhatsApp</span>
                <span>{whatsapp}</span>
              </div>
            </div>
            <Separator />
            <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                    <span className="text-muted-foreground flex items-center gap-2"><CalendarIcon /> Visit Date</span>
                    <span>{formattedDate}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-muted-foreground flex items-center gap-2"><Clock /> Visit Time</span>
                    <span>{time}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-muted-foreground flex items-center gap-2"><Users /> Visitors</span>
                    <span>{numberOfVisitors}</span>
                </div>
            </div>
             <Separator />
             <div className="flex justify-between items-center pt-2">
                <span className="text-lg font-semibold">Total Amount:</span>
                <span className="text-2xl font-bold text-primary">₹{totalAmount.toLocaleString()}</span>
            </div>
          </CardContent>
          <Separator />
            <Tabs defaultValue="card" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="card">Card</TabsTrigger>
                    <TabsTrigger value="upi">UPI</TabsTrigger>
                </TabsList>
                <TabsContent value="card">
                     <Form {...cardForm}>
                        <form onSubmit={cardForm.handleSubmit(onPaymentSubmit)}>
                            <CardContent className="space-y-4 pt-4">
                                <FormField
                                    control={cardForm.control}
                                    name="cardNumber"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>Card Number</FormLabel>
                                        <FormControl>
                                            <Input placeholder="0000 0000 0000 0000" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                    />
                                <div className="flex gap-4">
                                    <FormField
                                        control={cardForm.control}
                                        name="expiryDate"
                                        render={({ field }) => (
                                            <FormItem className="flex-1">
                                            <FormLabel>Expiry Date</FormLabel>
                                            <FormControl>
                                                <Input placeholder="MM/YY" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                            </FormItem>
                                        )}
                                        />
                                    <FormField
                                        control={cardForm.control}
                                        name="cvc"
                                        render={({ field }) => (
                                            <FormItem className="flex-1">
                                            <FormLabel>CVC</FormLabel>
                                            <FormControl>
                                                <Input placeholder="123" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </CardContent>
                            <CardFooter className="flex flex-col sm:flex-row gap-2">
                                <Button asChild variant="link" className="w-full sm:w-auto">
                                <Link href={goBackLink}>
                                    <ArrowLeft className="mr-2 h-4 w-4" /> Go back
                                </Link>
                                </Button>
                                <Button type="submit" size="lg" className="w-full sm:w-auto flex-grow bg-primary text-primary-foreground hover:bg-primary/90">
                                    <CreditCard className="mr-2 h-4 w-4" /> Pay Now
                                </Button>
                            </CardFooter>
                        </form>
                    </Form>
                </TabsContent>
                <TabsContent value="upi">
                   <Form {...upiForm}>
                        <form onSubmit={upiForm.handleSubmit(onPaymentSubmit)}>
                            <CardContent className="space-y-4 pt-4">
                               <FormField
                                    control={upiForm.control}
                                    name="upiId"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>UPI ID</FormLabel>
                                        <FormControl>
                                            <Input placeholder="your-id@upi" {...field} />
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
                                    Pay with UPI
                                </Button>
                            </CardFooter>
                        </form>
                    </Form>
                </TabsContent>
            </Tabs>
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
              Total amount paid: <strong>₹{totalAmount.toLocaleString()}</strong>
              <br />
              A confirmation has been sent to {email}.
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
