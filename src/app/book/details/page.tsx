
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
import { ArrowLeft, ArrowRight, Users } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { BookingProgress } from "@/components/booking-progress";

const detailsSchema = z.object({
  numberOfVisitors: z.coerce.number().min(1, "You must have at least one visitor.").max(10, "You can book for a maximum of 10 visitors."),
});

type DetailsFormValues = z.infer<typeof detailsSchema>;

const COST_PER_VISITOR = 500;

export default function DetailsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const date = searchParams.get("date");
  const time = searchParams.get("time");
  const { toast } = useToast();

  const form = useForm<DetailsFormValues>({
    resolver: zodResolver(detailsSchema),
    defaultValues: {
      numberOfVisitors: 1,
    },
  });
  
  const numberOfVisitors = form.watch("numberOfVisitors");
  const totalAmount = (numberOfVisitors || 0) * COST_PER_VISITOR;

  React.useEffect(() => {
    if (!date || !time) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Missing booking information. Please start again.",
      });
      router.push("/book/date");
    }
  }, [date, time, router, toast]);

  function onSubmit(data: DetailsFormValues) {
    const params = new URLSearchParams({
      date: date!,
      time: time!,
      visitors: data.numberOfVisitors.toString(),
    });
    router.push(`/book/contact?${params.toString()}`);
  }
  
  if (!date || !time) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  const formattedDate = format(new Date(date), "PPP");

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
            <BookingProgress currentStep={3} />
        </div>
        <Card className="w-full max-w-lg shadow-lg rounded-xl bg-card text-card-foreground border-border">
          <CardHeader>
            <CardTitle className="font-headline text-3xl">Step 3: Visitor Details</CardTitle>
            <CardDescription>Enter details for your visit on <strong>{formattedDate}</strong> at <strong>{time}</strong>.</CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="numberOfVisitors"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2"><Users className="h-4 w-4" /> Number of Visitors</FormLabel>
                      <FormControl>
                        <Input type="number" min="1" max="10" {...field} onChange={(e) => field.onChange(e.target.valueAsNumber)} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <div className="flex justify-between items-center pt-4 border-t border-border">
                    <span className="text-lg font-semibold">Total Amount:</span>
                    <span className="text-2xl font-bold text-primary">₹{totalAmount.toLocaleString()}</span>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row gap-2">
                 <Button asChild variant="link" className="w-full sm:w-auto">
                    <Link href={`/book/time?date=${date}`}>
                       <ArrowLeft className="mr-2 h-4 w-4" /> Go back
                    </Link>
                </Button>
                <Button type="submit" size="lg" className="w-full sm:w-auto flex-grow bg-primary text-primary-foreground hover:bg-primary/90">
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
    </>
  );
}
