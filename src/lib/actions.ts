"use server";

import { recommendRoute } from "@/ai/flows/recommend-route";

const EXPERIENCE_CENTER_LOCATION = "19.9999477,73.7845846"; // Mahakavi Kalidas Kalamandir, Nashik

export async function getRouteRecommendation(
  userLocation: string
): Promise<string> {
  try {
    const result = await recommendRoute({
      userLocation,
      experienceCenterLocation: EXPERIENCE_CENTER_LOCATION,
    });
    return result.routeRecommendation;
  } catch (error) {
    console.error("Error getting route recommendation:", error);
    throw new Error("Failed to get route from AI model.");
  }
}
