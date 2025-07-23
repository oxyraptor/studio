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
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1050.7707173457234!2d73.7845846299866!3d19.999947710397418!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bddeb078da5698b%3A0xe87de4b0b5849486!2sMahakavi%20Kalidas%20Kalamandir!5e1!3m2!1sen!2sin!4v1753249657937!5m2!1sen!2sin" width="600" height="450" style={{border:0}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="w-full"></iframe>
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
