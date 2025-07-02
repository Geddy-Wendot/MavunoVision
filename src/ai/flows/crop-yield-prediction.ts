'use server';
/**
 * @fileOverview Predicts crop yields based on input data using a pre-trained model.
 *
 * - predictCropYield - A function that takes crop, year, area, and weather data as input and returns a predicted yield.
 * - CropYieldInput - The input type for the predictCropYield function.
 * - CropYieldOutput - The return type for the predictCropYield function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { getPredictedRainfall } from '@/ai/tools/weather-tool';

const CropYieldInputSchema = z.object({
  crop: z.string().describe('The type of crop.'),
  county: z.string().describe('The county in Kenya where the crop is grown.'),
  year: z.number().describe('The year for which the prediction is being made.'),
  area: z.number().describe('The area of the land in hectares.'),
  fertilizer: z.string().describe('Type of fertilizer used.'),
  soilQuality: z.string().describe('Quality of the soil'),
});
export type CropYieldInput = z.infer<typeof CropYieldInputSchema>;

const CropYieldOutputSchema = z.object({
  predictedYield: z.number().describe('The predicted crop yield in tons.'),
  recommendedFertilizer: z.string().describe('The recommended fertilizer type for maximum yield given the inputs.'),
  irrigationAdvice: z.string().describe('Advice on irrigation, e.g., "Irrigation recommended due to low rainfall." or "No irrigation needed."'),
});
export type CropYieldOutput = z.infer<typeof CropYieldOutputSchema>;

export async function predictCropYield(input: CropYieldInput): Promise<CropYieldOutput> {
  return predictCropYieldFlow(input);
}

const prompt = ai.definePrompt({
  name: 'cropYieldPredictionPrompt',
  input: {schema: CropYieldInputSchema},
  output: {schema: CropYieldOutputSchema},
  tools: [getPredictedRainfall],
  prompt: `You are an expert agricultural model, capable of predicting crop yields and providing recommendations based on historical and environmental data for Kenya.

  First, use the getPredictedRainfall tool to find the predicted rainfall for the given county and year.

  Then, based on that rainfall data and the following input data, provide a predicted crop yield, recommend the best fertilizer to use, and give advice on irrigation.

  Input Data:
  - Crop: {{{crop}}}
  - County: {{{county}}}
  - Year: {{{year}}}
  - Area (hectares): {{{area}}}
  - Fertilizer Type Used for Prediction: {{{fertilizer}}}
  - Soil Quality: {{{soilQuality}}}

  Your Task:
  1.  **Predict Yield**: Predict the crop yield in tons. Give your answer as a floating point number for the 'predictedYield' field.
  2.  **Recommend Fertilizer**: Based on all inputs, determine the single best fertilizer type for maximum yield.
  3.  **Advise on Irrigation**: Based on the crop's water needs and the predicted rainfall, provide concise irrigation advice. State if it's needed and briefly why.

  Give your answer as a valid JSON object. Do not include units or other verbiage in the output fields.`,
});

const predictCropYieldFlow = ai.defineFlow(
  {
    name: 'predictCropYieldFlow',
    inputSchema: CropYieldInputSchema,
    outputSchema: CropYieldOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
