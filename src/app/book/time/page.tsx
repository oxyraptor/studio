
"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, ArrowLeft, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { format } from "date-fns";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";


const timeSlots = Array.from({ length: 9 }, (_, i) => `${(i + 9).toString().padStart(2, '0')}:00`);
const MAX_TICKETS_PER_SLOT = 20;

// Mock function to get bookings for a given date
const getBookingsForDate = (date: string) => {
    // In a real app, this would fetch from a database.
    // For now, we'll generate predictable "random" availability.
    const mockBookings: Record<string, number> = {};
    const dateSeed = new Date(date).getDate();
    timeSlots.forEach((slot, index) => {
        // Create pseudo-randomness based on date and slot
        const availability = (dateSeed * (index + 1)) % (MAX_TICKETS_PER_SLOT + 1);
        mockBookings[slot] = availability;
    });
    return mockBookings;
};

export default function SelectTimePage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const date = searchParams.get("date");
    const { toast } = useToast();

    const [selectedTime, setSelectedTime] = React.useState<string | null>(null);
    const [availableSlots, setAvailableSlots] = React.useState<Record<string, number>>({});
    const [isDialogOpen, setIsDialogOpen] = React.useState(false);

    React.useEffect(() => {
        if (!date) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "No date selected. Redirecting...",
            });
            router.push("/book/date");
            return;
        }
        setAvailableSlots(getBookingsForDate(date));
    }, [date, router, toast]);

    const handleTimeSelect = (slot: string) => {
        const availableCount = availableSlots[slot] ?? 0;
        if (availableCount > 0) {
            setSelectedTime(slot);
            // In a real app, you would save the booking here.
            console.log("Booking submitted:", { date, time: slot });
            setIsDialogOpen(true);
        }
    };
    
    if (!date) {
        return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
    }

    const formattedDate = format(new Date(date), 'PPP');

    return (
        <>
        <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
             <Button asChild variant="outline" className="absolute top-4 left-4">
                <Link href="/home" className="flex items-center gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Home
                </Link>
            </Button>
            <Card className="w-full max-w-lg shadow-lg rounded-xl">
                <CardHeader>
                    <CardTitle className="font-headline text-3xl">Step 2: Select a Time</CardTitle>
                    <CardDescription>Choose a time for your visit on <strong>{formattedDate}</strong>.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                        {timeSlots.map(slot => {
                            const availableCount = availableSlots[slot] ?? 0;
                            const isAvailable = availableCount > 0;
                            return (
                                <Button
                                    key={slot}
                                    type="button"
                                    variant={selectedTime === slot ? "default" : "outline"}
                                    onClick={() => handleTimeSelect(slot)}
                                    disabled={!isAvailable}
                                    className="flex flex-col h-16 transition-all duration-200 ease-in-out"
                                >
                                    <span className="font-bold text-lg"><Clock className="inline-block h-4 w-4 mr-1"/>{slot}</span>
                                    <span className="text-xs">{isAvailable ? `${availableCount} available` : "Sold Out"}</span>
                                </Button>
                            );
                        })}
                    </div>
                </CardContent>
                <CardFooter>
                    <p className="text-sm text-muted-foreground text-center w-full">
                        Your booking will be confirmed immediately upon selecting a time slot.
                    </p>
                </CardFooter>
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
                  Your visit for {formattedDate} at {selectedTime} is booked.
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
