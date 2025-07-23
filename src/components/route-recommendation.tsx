"use client";

import * as React from "react";
import { getRouteRecommendation } from "@/lib/actions";
import { Button } from "./ui/button";
import { Loader2, Navigation } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

export function RouteRecommendation() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [recommendation, setRecommendation] = React.useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const { toast } = useToast();

  const handleGetDirections = () => {
    setIsLoading(true);

    if (!navigator.geolocation) {
      toast({
        variant: "destructive",
        title: "Geolocation Error",
        description: "Geolocation is not supported by your browser.",
      });
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const userLocation = `${latitude},${longitude}`;

        try {
          const result = await getRouteRecommendation(userLocation);
          setRecommendation(result);
          setIsDialogOpen(true);
        } catch (error) {
          toast({
            variant: "destructive",
            title: "AI Error",
            description: "Could not get route recommendation. Please try again.",
          });
        } finally {
          setIsLoading(false);
        }
      },
      (error) => {
        toast({
          variant: "destructive",
          title: "Location Error",
          description: "Could not get your location. Please ensure location services are enabled.",
        });
        setIsLoading(false);
      }
    );
  };

  return (
    <>
      <Button
        onClick={handleGetDirections}
        disabled={isLoading}
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
        size="lg"
      >
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Navigation className="mr-2 h-4 w-4" />
        )}
        Get Directions
      </Button>

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Your Recommended Route</AlertDialogTitle>
            <AlertDialogDescription>
              {recommendation || "Loading your personalized route..."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setIsDialogOpen(false)}>
              Close
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
