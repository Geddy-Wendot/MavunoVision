// Implemented with Genkit
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

const CropYieldInputSchema = z.object({
  crop: z.string().describe('The type of crop.'),
  year: z.number().describe('The year for which the prediction is being made.'),
  area: z.number().describe('The area of the land in hectares.'),
  rainfall: z.number().describe('The amount of rainfall in mm.'),
  fertilizer: z.string().describe('Type of fertilizer used.'),
  soilQuality: z.string().describe('Quality of the soil'),
});
export type CropYieldInput = z.infer<typeof CropYieldInputSchema>;

const CropYieldOutputSchema = z.object({
  predictedYield: z.number().describe('The predicted crop yield in tons.'),
});
export type CropYieldOutput = z.infer<typeof CropYieldOutputSchema>;

export async function predictCropYield(input: CropYieldInput): Promise<CropYieldOutput> {
  return predictCropYieldFlow(input);
}

const prompt = ai.definePrompt({
  name: 'cropYieldPredictionPrompt',
  input: {schema: CropYieldInputSchema},
  output: {schema: CropYieldOutputSchema},
  prompt: `You are an expert agricultural model, capable of predicting crop yields based on historical and environmental data.

  Predict the crop yield in tons for the following input data:

  Crop: {{{crop}}}
  Year: {{{year}}}
  Area (hectares): {{{area}}}
  Rainfall (mm): {{{rainfall}}}
  Fertilizer Type: {{{fertilizer}}}
  Soil Quality: {{{soilQuality}}}

  Give your answer as a floating point number.  Do not include units or other verbiage.`,
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
