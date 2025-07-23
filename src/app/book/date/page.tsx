
"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { format, isPast } from "date-fns";
import { Calendar as CalendarIcon, ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

function isToday(date: Date) {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

export default function SelectDatePage() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const router = useRouter();

  const handleNext = () => {
    if (date) {
      const dateString = format(date, "yyyy-MM-dd");
      router.push(`/book/time?date=${dateString}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
       <Button asChild variant="outline" className="absolute top-4 left-4">
          <Link href="/home" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
          </Link>
      </Button>
      <Card className="w-full max-w-md shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle className="font-headline text-3xl">Step 1: Select a Date</CardTitle>
          <CardDescription>Choose the date for your visit.</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
            <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={(day) => isPast(day) && !isToday(day)}
                className="rounded-md border"
            />
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleNext}
            disabled={!date}
            className="w-full"
            size="lg"
          >
            Next <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
