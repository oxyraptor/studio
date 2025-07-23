"use server";

import { recommendRoute } from "@/ai/flows/recommend-route";

const EXPERIENCE_CENTER_LOCATION = "34.0522,-118.2437"; // Downtown Los Angeles

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
