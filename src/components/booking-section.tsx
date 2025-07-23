"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { addDays, format, isPast } from "date-fns";
import { Calendar as CalendarIcon, Clock, User, Mail } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

const bookingSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

const timeSlots = Array.from({ length: 9 }, (_, i) => `${(i + 9).toString().padStart(2, '0')}:00`);
const MAX_TICKETS_PER_SLOT = 20;

export function BookingSection() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = React.useState<string | null>(null);
  const [bookings, setBookings] = React.useState<Record<string, Record<string, number>>>({});
  const { toast } = useToast();

  React.useEffect(() => {
    // Initialize bookings with random availability for the next 30 days
    const initialBookings: Record<string, Record<string, number>> = {};
    for (let i = 0; i < 30; i++) {
      const day = addDays(new Date(), i);
      const dayKey = format(day, "yyyy-MM-dd");
      initialBookings[dayKey] = {};
      timeSlots.forEach(slot => {
        initialBookings[dayKey][slot] = Math.floor(Math.random() * (MAX_TICKETS_PER_SLOT + 1));
      });
    }
    setBookings(initialBookings);
  }, []);

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: { name: "", email: "" },
  });

  function onSubmit(data: BookingFormValues) {
    if (!date || !selectedTime) {
      toast({
        variant: "destructive",
        title: "Booking Error",
        description: "Please select a date and time slot.",
      });
      return;
    }

    const dateKey = format(date, "yyyy-MM-dd");
    const currentTickets = bookings[dateKey]?.[selectedTime] ?? 0;

    if (currentTickets <= 0) {
      toast({
        variant: "destructive",
        title: "Sold Out",
        description: "This time slot is no longer available.",
      });
      return;
    }

    setBookings(prev => ({
      ...prev,
      [dateKey]: {
        ...prev[dateKey],
        [selectedTime]: currentTickets - 1,
      },
    }));

    toast({
      title: "Booking Confirmed!",
      description: `Thank you, ${data.name}. Your visit on ${format(date, "PPP")} at ${selectedTime} is booked.`,
    });

    form.reset();
    setSelectedTime(null);
  }

  const selectedDateKey = date ? format(date, "yyyy-MM-dd") : null;
  const availableSlots = selectedDateKey ? bookings[selectedDateKey] || {} : {};

  return (
    <Card className="w-full shadow-lg rounded-xl">
      <CardHeader>
        <CardTitle className="font-headline text-3xl">Book Your Visit</CardTitle>
        <CardDescription>Select a date and time to reserve your spot.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                 <h3 className="text-lg font-medium">1. Select a Date</h3>
                 <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={day => {
                            setDate(day);
                            setSelectedTime(null);
                        }}
                        disabled={(day) => isPast(day) && !isToday(day)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
              </div>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2"><User className="h-4 w-4" /> Your Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} className="bg-white" />
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
                        <Input placeholder="john.doe@example.com" {...field} className="bg-white" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-medium">2. Select a Time Slot</h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {date ? timeSlots.map(slot => {
                  const availableCount = availableSlots[slot] ?? 0;
                  const isAvailable = availableCount > 0;
                  return (
                    <Button
                      key={slot}
                      type="button"
                      variant={selectedTime === slot ? "default" : "outline"}
                      onClick={() => setSelectedTime(slot)}
                      disabled={!isAvailable}
                      className="flex flex-col h-16 transition-all duration-200 ease-in-out"
                    >
                      <span className="font-bold text-lg"><Clock className="inline-block h-4 w-4 mr-1"/>{slot}</span>
                      <span className="text-xs">{isAvailable ? `${availableCount} available` : "Sold Out"}</span>
                    </Button>
                  );
                }) : <p className="text-muted-foreground col-span-full">Please select a date first.</p>}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              size="lg"
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
              disabled={!date || !selectedTime || !form.formState.isValid}
            >
              Book Now
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}

function isToday(date: Date) {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}
