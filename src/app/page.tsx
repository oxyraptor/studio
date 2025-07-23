import { BookingSection } from "@/components/booking-section";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold font-headline text-foreground">
            CitizExperience
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Your portal to seamless civic engagement. Book your visit and find your way to us with ease.
          </p>
        </div>
      </header>
      <main className="flex-grow px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1">
            <div className="lg:col-span-3">
              <BookingSection />
            </div>
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
