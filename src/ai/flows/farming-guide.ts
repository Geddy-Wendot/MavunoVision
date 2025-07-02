'use server';
/**
 * @fileOverview Generates a detailed farming guide for a specific crop.
 *
 * - generateFarmingGuide - A function that returns a step-by-step farming guide.
 * - FarmingGuideInput - The input type for the generateFarmingGuide function.
 * - FarmingGuideOutput - The return type for the generateFarmingGuide function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FarmingGuideInputSchema = z.object({
  cropName: z.string().describe('The name of the crop for which to generate a guide.'),
});
export type FarmingGuideInput = z.infer<typeof FarmingGuideInputSchema>;

const FarmingGuideOutputSchema = z.object({
  cropName: z.string().describe('The name of the crop.'),
  landPreparation: z.string().describe("Detailed steps for preparing the land before planting."),
  planting: z.string().describe("Instructions on how to plant the crop, including seed depth, spacing, and timing."),
  wateringAndIrrigation: z.string().describe("Guidance on the crop's water needs, including frequency and methods for irrigation."),
  fertilizerApplication: z.string().describe("A guide on applying fertilizer, including types, amounts, and application schedule."),
  pestAndDiseaseControl: z.string().describe("Information on common pests and diseases affecting this crop in Kenya and recommended control methods (both organic and chemical)."),
  harvesting: z.string().describe("Advice on when and how to properly harvest the crop for maximum yield and quality."),
  postHarvestHandling: z.string().describe("Tips for post-harvest handling, including storage and preparation for market."),
});
export type FarmingGuideOutput = z.infer<typeof FarmingGuideOutputSchema>;

export async function generateFarmingGuide(input: FarmingGuideInput): Promise<FarmingGuideOutput> {
  return farmingGuideFlow(input);
}

const prompt = ai.definePrompt({
  name: 'farmingGuidePrompt',
  input: {schema: FarmingGuideInputSchema},
  output: {schema: FarmingGuideOutputSchema},
  prompt: `You are an expert agronomist creating a detailed farming guide for a farmer in Kenya. The guide should be practical, easy to understand, and specific to Kenyan conditions.

  Generate a comprehensive guide for the following crop: {{{cropName}}}

  Provide detailed, actionable advice for each of the following sections.

  - Land Preparation
  - Planting
  - Watering and Irrigation
  - Fertilizer Application
  - Pest and Disease Control
  - Harvesting
  - Post-Harvest Handling

  Return your response as a valid JSON object.`,
});

const farmingGuideFlow = ai.defineFlow(
  {
    name: 'farmingGuideFlow',
    inputSchema: FarmingGuideInputSchema,
    outputSchema: FarmingGuideOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
