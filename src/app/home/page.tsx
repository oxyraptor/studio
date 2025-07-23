
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarCheck, MapPin, User, LogIn } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="px-4 py-3 sm:px-6 lg:px-8 border-b">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold font-headline text-foreground">
              CitizExperience
            </h1>
            <div className="flex items-center gap-4">
              <Link href="/map" className={cn(buttonVariants({ variant: "outline" }), "flex items-center gap-2")}>
                <MapPin className="h-5 w-5" />
                <span>View Map</span>
              </Link>
              <Avatar>
                <AvatarImage src="https://placehold.co/40x40.png" alt="User Avatar" data-ai-hint="avatar user" />
                <AvatarFallback>
                  <User />
                </AvatarFallback>
              </Avatar>
            </div>
        </div>
      </header>
      <main className="flex-grow px-4 sm:px-6 lg:px-8 py-8 flex flex-col items-center">
        <div className="w-full max-w-4xl text-left mb-8">
          <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden shadow-lg mb-12">
            <Image 
                src="https://storage.googleapis.com/project-spark-prod/project-spark-b82af2b3-5353-4889-8d8a-de500c3b313f/static-assets/433e1444-2458-45e0-827c-9b508f72f236"
                alt="CitizExperience Center"
                layout="fill"
                objectFit="cover"
                data-ai-hint="temple water"
            />
             <div className="absolute inset-0 bg-black/30" />
          </div>
          <h2 className="text-4xl font-bold font-headline text-foreground">
            Welcome, Citizen!
          </h2>
          <p className="mt-2 text-lg text-muted-foreground">
            Your portal to seamless civic engagement. Book your visit and find your way to us with ease.
          </p>
        </div>
        <div className="max-w-md text-center w-full">
            <div className="bg-card p-8 rounded-xl shadow-lg border">
                <CalendarCheck className="h-16 w-16 mx-auto text-primary" />
                <h2 className="mt-6 text-3xl font-bold text-foreground">
                    Plan Your Visit
                </h2>
                <p className="mt-4 text-muted-foreground">
                    Reserve your spot at the CitizExperience Center. Our new booking process makes it easier than ever.
                </p>
                <Button asChild size="lg" className="mt-8 w-full">
                    <Link href="/book/date">
                        Book Your Visit
                    </Link>
                </Button>
            </div>
        </div>
      </main>
      <footer className="px-4 py-6 sm:px-6 lg:px-8 mt-auto">
        <div className="max-w-7xl mx-auto text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} CitizExperience. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
