// RecommendRoute flow to provide a route from the user location to the Experience Center.

'use server';

/**
 * @fileOverview This file defines a Genkit flow for recommending a route from the user's current location to the Experience Center.
 *
 * @exports recommendRoute - An asynchronous function that takes the user's location and returns a route recommendation.
 * @exports RecommendRouteInput - The input type for the recommendRoute function.
 * @exports RecommendRouteOutput - The output type for the recommendRoute function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendRouteInputSchema = z.object({
  userLocation: z
    .string()
    .describe('The current location of the user in latitude and longitude.'),
  experienceCenterLocation: z
    .string()
    .describe('The location of the Experience Center in latitude and longitude.'),
});
export type RecommendRouteInput = z.infer<typeof RecommendRouteInputSchema>;

const RecommendRouteOutputSchema = z.object({
  routeRecommendation: z
    .string()
    .describe('The recommended route from the user location to the Experience Center.'),
});
export type RecommendRouteOutput = z.infer<typeof RecommendRouteOutputSchema>;

export async function recommendRoute(input: RecommendRouteInput): Promise<RecommendRouteOutput> {
  return recommendRouteFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendRoutePrompt',
  input: {schema: RecommendRouteInputSchema},
  output: {schema: RecommendRouteOutputSchema},
  prompt: `You are a route recommendation expert. Given the user's location and the Experience Center location, provide a detailed route recommendation to the user.

User Location: {{{userLocation}}}
Experience Center Location: {{{experienceCenterLocation}}}

Route Recommendation: `,
});

const recommendRouteFlow = ai.defineFlow(
  {
    name: 'recommendRouteFlow',
    inputSchema: RecommendRouteInputSchema,
    outputSchema: RecommendRouteOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
