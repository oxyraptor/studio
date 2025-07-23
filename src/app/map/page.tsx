import { LocationSection } from "@/components/location-section";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function MapPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Button asChild variant="outline">
                <Link href="/" className="flex items-center gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Home
                </Link>
            </Button>
            <h1 className="text-4xl font-bold font-headline text-foreground">
                Our Location
            </h1>
        </div>
      </header>
      <main className="flex-grow px-4 sm:px-6 lg:px-8 py-8 flex items-center justify-center">
        <div className="w-full max-w-4xl">
          <LocationSection />
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
