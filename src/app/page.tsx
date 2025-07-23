
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarCheck, MapPin, User, LogIn } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="relative flex flex-col min-h-screen">
      <Image 
          src="https://storage.googleapis.com/project-spark-prod/project-spark-b82af2b3-5353-4889-8d8a-de500c3b313f/static-assets/433e1444-2458-45e0-827c-9b508f72f236"
          alt="Background"
          layout="fill"
          objectFit="cover"
          className="z-0"
          data-ai-hint="temple water"
      />
      <div className="absolute inset-0 bg-black/50 z-10" />
      <div className="relative z-20 flex flex-col flex-grow text-white">
        <header className="px-4 py-3 sm:px-6 lg:px-8 border-b border-white/20 bg-black/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
              <h1 className="text-2xl font-bold font-headline">
                CitizExperience
              </h1>
              <div className="flex items-center gap-4">
                <Link href="/map" className={cn(buttonVariants({ variant: "outline" }), "flex items-center gap-2 bg-transparent text-white border-white/50 hover:bg-white/10 hover:text-white")}>
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
            
            <h2 className="text-4xl font-bold font-headline">
              Welcome, Citizen!
            </h2>
            <p className="mt-2 text-lg text-gray-200">
              Your portal to seamless civic engagement. Book your visit and find your way to us with ease.
            </p>
          </div>
          <div className="max-w-md text-center w-full">
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-white/20">
                  <CalendarCheck className="h-16 w-16 mx-auto text-primary" />
                  <h2 className="mt-6 text-3xl font-bold">
                      Plan Your Visit
                  </h2>
                  <p className="mt-4 text-gray-200">
                      Reserve your spot at the CitizExperience Center. Our new booking process makes it easier than ever.
                  </p>
                  <Button asChild size="lg" className="mt-8 w-full bg-primary text-primary-foreground hover:bg-primary/90">
                      <Link href="/book/date">
                          Book Your Visit
                      </Link>
                  </Button>
              </div>
          </div>
        </main>
        <footer className="px-4 py-6 sm:px-6 lg:px-8 mt-auto">
          <div className="max-w-7xl mx-auto text-center text-white/70 text-sm">
            <p>&copy; {new Date().getFullYear()} CitizExperience. All Rights Reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
