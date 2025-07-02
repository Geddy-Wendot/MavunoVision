'use server';
/**
 * @fileOverview A Genkit tool for fetching weather information.
 *
 * This file defines a tool that allows the AI to fetch predicted rainfall data.
 * It connects to the weather service to retrieve this information.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { getPredictedRainfallForCounty } from '@/services/weather';

export const getPredictedRainfall = ai.defineTool(
  {
    name: 'getPredictedRainfall',
    description: 'Gets the predicted annual rainfall in millimeters (mm) for a specific county in Kenya and a given year.',
    inputSchema: z.object({
      county: z.string().describe('The county in Kenya for which to get the rainfall prediction.'),
      year: z.number().describe('The year for which to get the prediction.'),
    }),
    outputSchema: z.number().describe('The predicted annual rainfall in millimeters (mm).'),
  },
  async (input) => {
    return await getPredictedRainfallForCounty(input.county, input.year);
  }
);
