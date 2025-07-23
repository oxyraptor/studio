
"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { ArrowLeft, CheckCircle, Users, User } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

const detailsSchema = z.object({
  numberOfVisitors: z.coerce.number().min(1, "You must have at least one visitor.").max(10, "You can book for a maximum of 10 visitors."),
  visitorNames: z.array(z.object({ name: z.string().min(1, "Visitor name is required.") })),
});

type DetailsFormValues = z.infer<typeof detailsSchema>;

export default function DetailsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const date = searchParams.get("date");
  const time = searchParams.get("time");
  const { toast } = useToast();

  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const form = useForm<DetailsFormValues>({
    resolver: zodResolver(detailsSchema),
    defaultValues: {
      numberOfVisitors: 1,
      visitorNames: [{ name: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "visitorNames",
  });
  
  const numberOfVisitors = form.watch("numberOfVisitors");

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

  React.useEffect(() => {
    const currentCount = fields.length;
    const targetCount = numberOfVisitors || 0;
    if (currentCount < targetCount) {
      for (let i = currentCount; i < targetCount; i++) {
        append({ name: "" });
      }
    } else if (currentCount > targetCount) {
      for (let i = currentCount; i > targetCount; i--) {
        remove(i - 1);
      }
    }
  }, [numberOfVisitors, fields.length, append, remove]);


  function onSubmit(data: DetailsFormValues) {
    console.log("Booking submitted:", { date, time, ...data });
    setIsDialogOpen(true);
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
        <Card className="w-full max-w-lg shadow-lg rounded-xl">
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
                        <Input type="number" min="1" max="10" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {fields.map((field, index) => (
                    <FormField
                    key={field.id}
                    control={form.control}
                    name={`visitorNames.${index}.name`}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="flex items-center gap-2"><User className="h-4 w-4" /> Visitor {index + 1} Name</FormLabel>
                            <FormControl>
                                <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                ))}

              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row gap-2">
                 <Button asChild variant="link" className="w-full sm:w-auto">
                    <Link href={`/book/time?date=${date}`}>
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
