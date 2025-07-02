'use server';
/**
 * @fileOverview Recommends crops based on environmental and geographical data.
 *
 * - getCropRecommendation - A function that recommends suitable crops.
 * - CropRecommendationInput - The input type for the getCropRecommendation function.
 * - CropRecommendationOutput - The return type for the getCropRecommendation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { cropData } from '@/lib/data';

const CropRecommendationInputSchema = z.object({
  county: z.string().describe('The county in Kenya.'),
  year: z.number().describe('The year for which the recommendation is being made.'),
  area: z.number().describe('The area of the land in hectares.'),
  rainfall: z.number().describe('The predicted amount of rainfall in mm.'),
  soilQuality: z.string().describe('The quality of the soil.'),
});
export type CropRecommendationInput = z.infer<typeof CropRecommendationInputSchema>;

const CropRecommendationOutputSchema = z.object({
  recommendations: z.array(z.object({
    cropName: z.string().describe('The name of the recommended crop.'),
    reason: z.string().describe('A brief reason why this crop is recommended for the given conditions.'),
  })).describe('An array of top 3 crop recommendations.'),
});
export type CropRecommendationOutput = z.infer<typeof CropRecommendationOutputSchema>;


export async function getCropRecommendation(input: CropRecommendationInput): Promise<CropRecommendationOutput> {
  return cropRecommendationFlow(input);
}

const allCrops = cropData.map(c => c.name).join(', ');

const prompt = ai.definePrompt({
  name: 'cropRecommendationPrompt',
  input: {schema: CropRecommendationInputSchema},
  output: {schema: CropRecommendationOutputSchema},
  prompt: `You are an expert agronomist providing advice to farmers in Kenya.

  Based on the following conditions, recommend the top 3 most suitable crops to plant. The available crops to choose from are: ${allCrops}.

  For each recommendation, provide a concise reason explaining why it's a good choice for the given county, climate, and soil.

  Input Data:
  - County: {{{county}}}
  - Year: {{{year}}}
  - Land Area (hectares): {{{area}}}
  - Predicted Rainfall (mm): {{{rainfall}}}
  - Soil Quality: {{{soilQuality}}}

  Return your response as a valid JSON object.`,
});

const cropRecommendationFlow = ai.defineFlow(
  {
    name: 'cropRecommendationFlow',
    inputSchema: CropRecommendationInputSchema,
    outputSchema: CropRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
