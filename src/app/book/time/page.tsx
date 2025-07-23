
"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, ArrowLeft, Utensils } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { format } from "date-fns";
import { BookingProgress } from "@/components/booking-progress";

const timeSlots = [
    "09:00", 
    "10:30", 
    // Lunch break from 12:00 to 13:00
    "13:00", 
    "14:30", 
    "16:00"
];

const lunchBreakStart = "12:00";
const lunchBreakEnd = "13:00";
const MAX_TICKETS_PER_SLOT = 20;
const DAILY_VISITOR_LIMIT = 100;

// Mock function to get bookings for a given date
const getBookingsForDate = (date: string) => {
    // In a real app, this would fetch from a database.
    // For now, we'll generate predictable "random" availability.
    const mockBookings: Record<string, number> = {};
    const dateSeed = new Date(date).getDate();
    let totalBooked = 0;
    
    const allSlotsForBooking = [
        "09:00", "10:30", "12:00", "13:30", "15:00", "16:30"
    ];

    allSlotsForBooking.forEach((slot, index) => {
        // Create pseudo-randomness based on date and slot for booked tickets
        const bookedCount = (dateSeed * (index + 1)) % (MAX_TICKETS_PER_SLOT + 1);
        totalBooked += bookedCount;
        mockBookings[slot] = bookedCount;
    });

    // If total booked for the day exceeds the daily limit, adjust it.
    // This is a mock scenario; a real DB would prevent this.
    if (totalBooked > DAILY_VISITOR_LIMIT) {
        let excess = totalBooked - DAILY_VISITOR_LIMIT;
        for (const slot of [...allSlotsForBooking].reverse()) {
            if (excess <= 0) break;
            const currentBooked = mockBookings[slot];
            const reduction = Math.min(currentBooked, excess);
            mockBookings[slot] -= reduction;
            excess -= reduction;
        }
    }
    
    // Now calculate availability
    const availableSlots: Record<string, number> = {};
    allSlotsForBooking.forEach(slot => {
        const booked = mockBookings[slot] ?? 0;
        availableSlots[slot] = MAX_TICKETS_PER_SLOT - booked;
    });

    return availableSlots;
};

export default function SelectTimePage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const date = searchParams.get("date");
    const { toast } = useToast();

    const [selectedTime, setSelectedTime] = React.useState<string | null>(null);
    const [availableSlots, setAvailableSlots] = React.useState<Record<string, number>>({});

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
            router.push(`/book/details?date=${date}&time=${slot}`);
        }
    };
    
    if (!date) {
        return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
    }

    const formattedDate = format(new Date(date), 'PPP');
    const totalAvailableToday = Object.values(availableSlots).reduce((sum, count) => sum + count, 0);
    const displayLimit = Math.min(totalAvailableToday, DAILY_VISITOR_LIMIT);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
             <Button asChild variant="outline" className="absolute top-4 left-4">
                <Link href="/" className="flex items-center gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Home
                </Link>
            </Button>
            <div className="w-full max-w-lg">
                <BookingProgress currentStep={2} />
            </div>
            <Card className="w-full max-w-lg shadow-lg rounded-xl">
                <CardHeader>
                    <CardTitle className="font-headline text-3xl">Step 2: Select a Time</CardTitle>
                    <CardDescription>Choose a time for your visit on <strong>{formattedDate}</strong>.
                     <br />
                     Total tickets available for today: <strong>{displayLimit}</strong>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
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
                     <Button asChild variant="link" className="w-full">
                        <Link href={`/book/date`}>
                           <ArrowLeft className="mr-2 h-4 w-4" /> Go back to date selection
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
