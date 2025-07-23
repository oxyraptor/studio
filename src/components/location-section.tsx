import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { RouteRecommendation } from "./route-recommendation";

export function LocationSection() {
  return (
    <Card className="w-full shadow-lg rounded-xl">
      <CardHeader>
        <CardTitle className="font-headline text-3xl">Find Us</CardTitle>
        <CardDescription>Our center is located in the heart of the city.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-lg overflow-hidden border">
          <Image
            src="https://placehold.co/600x400"
            alt="Map showing location of the experience center"
            width={600}
            height={400}
            className="w-full object-cover"
            data-ai-hint="city map"
          />
        </div>
        <div className="flex items-start space-x-3 text-lg">
          <MapPin className="h-6 w-6 mt-1 text-primary flex-shrink-0" />
          <div>
            <p className="font-bold">CitizExperience Center</p>
            <p className="text-muted-foreground">123 Civic Plaza, Downtown, Anytown, USA 12345</p>
          </div>
        </div>
        <RouteRecommendation />
      </CardContent>
    </Card>
  );
}
