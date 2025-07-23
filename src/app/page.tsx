
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ChevronDown, Menu } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <Link href={href} className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
        {children}
    </Link>
);

const NavDropdown = ({ label, children }: { label: string, children: React.ReactNode }) => (
    <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-gray-300 hover:text-white transition-colors focus:outline-none">
            {label} <ChevronDown className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            {children}
        </DropdownMenuContent>
    </DropdownMenu>
);

export default function Home() {
  return (
    <div className="relative flex flex-col min-h-screen bg-black text-white">
      {/* Background Image */}
      <Image
        src="https://placehold.co/1920x1080.png"
        alt="Background image of a modern city"
        layout="fill"
        objectFit="cover"
        quality={80}
        className="absolute inset-0 z-0 opacity-20"
        data-ai-hint="modern city architecture"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent z-10" />
      
      <div className="relative z-20 flex flex-col flex-grow">
        <header className="px-4 py-3 sm:px-6 lg:px-8 border-b border-white/10">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
              <div className="flex items-center gap-2">
                  <svg width="40" height="40" viewBox="0 0 52 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M25.9999 0L12.9999 12.6L0 25.2L12.9999 25.2L25.9999 12.6L38.9999 25.2L51.9999 25.2L38.9999 12.6L25.9999 0Z" fill="#D4AF37"/>
                      <path d="M12.9999 16.8L25.9999 29.4L38.9999 16.8L25.9999 42L12.9999 16.8Z" fill="#D4AF37"/>
                  </svg>
                  <h1 className="text-lg font-semibold tracking-wider">
                    Citizen Experience Center
                  </h1>
              </div>
              
              <nav className="hidden md:flex items-center gap-6">
                <NavDropdown label="About">
                    <DropdownMenuItem>The Story</DropdownMenuItem>
                    <DropdownMenuItem>The Building</DropdownMenuItem>
                </NavDropdown>
                <NavDropdown label="Explore">
                    <DropdownMenuItem>Exhibits</DropdownMenuItem>
                    <DropdownMenuItem>Virtual Tour</DropdownMenuItem>
                </NavDropdown>
                <NavLink href="/map">Map</NavLink>
                <NavDropdown label="Media">
                    <DropdownMenuItem>News</DropdownMenuItem>
                    <DropdownMenuItem>Gallery</DropdownMenuItem>
                </NavDropdown>
                <NavLink href="#">Contact us</NavLink>
              </nav>

              <div className="flex items-center gap-4">
                  <Button asChild className={cn(buttonVariants({ variant: 'default' }), "bg-primary text-primary-foreground hover:bg-primary/90 hidden md:block")}>
                    <Link href="/book/date">
                      Book Now
                    </Link>
                  </Button>
                  <Sheet>
                      <SheetTrigger asChild className="md:hidden">
                          <Button variant="outline" size="icon"><Menu /></Button>
                      </SheetTrigger>
                      <SheetContent>
                          <nav className="flex flex-col gap-4 mt-8">
                              <NavLink href="#">About</NavLink>
                              <NavLink href="#">Explore</NavLink>
                              <NavLink href="/map">Map</NavLink>
                              <NavLink href="#">Media</NavLink>
                              <NavLink href="#">Contact us</NavLink>
                              <Button asChild className={cn(buttonVariants({ variant: 'default' }), "bg-primary text-primary-foreground hover:bg-primary/90 w-full")}>
                                  <Link href="/book/date">Book Now</Link>
                              </Button>
                          </nav>
                      </SheetContent>
                  </Sheet>
              </div>
          </div>
        </header>

        <main className="flex-grow px-4 sm:px-6 lg:px-8 py-8 flex items-center">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12">
                <div className="text-left">
                    <h2 className="text-5xl md:text-6xl font-bold leading-tight tracking-tight">
                    A New Era of<br/>Public Engagement
                    </h2>
                    <p className="mt-4 text-lg text-gray-400">
                    Your central hub for seamless access to public services and information.
                    </p>
                    <Button asChild size="lg" variant="outline" className="mt-8 border-primary text-primary hover:bg-primary/10">
                        <Link href="/map">
                            Map
                        </Link>
                    </Button>
                </div>
                <div className="relative h-96 w-full">
                    <Carousel className="w-full h-full rounded-lg overflow-hidden shadow-2xl">
                        <CarouselContent>
                            <CarouselItem>
                                <Image 
                                    src="https://placehold.co/600x400.png"
                                    alt="Citizen Experience Center Exhibit 1"
                                    width={600}
                                    height={400}
                                    className="object-cover w-full h-full"
                                    data-ai-hint="modern government building"
                                />
                            </CarouselItem>
                             <CarouselItem>
                                <Image 
                                    src="https://placehold.co/600x400.png"
                                    alt="Citizen Experience Center Exhibit 2"
                                    width={600}
                                    height={400}
                                    className="object-cover w-full h-full"
                                    data-ai-hint="interactive exhibit display"
                                />
                            </CarouselItem>
                             <CarouselItem>
                                <Image 
                                    src="https://placehold.co/600x400.png"
                                    alt="Citizen Experience Center Exhibit 3"
                                    width={600}
                                    height={400}
                                    className="object-cover w-full h-full"
                                    data-ai-hint="people engaging with technology"
                                />
                            </CarouselItem>
                        </CarouselContent>
                        <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10" />
                        <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10" />
                    </Carousel>
                </div>
            </div>
        </main>
      </div>
    </div>
  );
}
