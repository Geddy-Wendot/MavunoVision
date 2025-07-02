// This file is machine-generated - edit at your own risk!

'use server';

/**
 * @fileOverview Generates a descriptive summary of historical yield trends for a specific crop and county.
 *
 * - generateYieldTrendSummary - A function that generates the yield trend summary.
 * - YieldTrendSummaryInput - The input type for the generateYieldTrendSummary function.
 * - YieldTrendSummaryOutput - The return type for the generateYieldTrendSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const YieldTrendSummaryInputSchema = z.object({
  crop: z.string().describe('The crop to analyze yield trends for.'),
  county: z.string().describe('The county to analyze yield trends in.'),
  historicalData: z.string().describe('The historical yield data for the specified crop and county.'),
});
export type YieldTrendSummaryInput = z.infer<typeof YieldTrendSummaryInputSchema>;

const YieldTrendSummaryOutputSchema = z.object({
  summary: z.string().describe('A descriptive summary of the historical yield trends.'),
});
export type YieldTrendSummaryOutput = z.infer<typeof YieldTrendSummaryOutputSchema>;

export async function generateYieldTrendSummary(input: YieldTrendSummaryInput): Promise<YieldTrendSummaryOutput> {
  return yieldTrendSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'yieldTrendSummaryPrompt',
  input: {schema: YieldTrendSummaryInputSchema},
  output: {schema: YieldTrendSummaryOutputSchema},
  prompt: `You are an expert agricultural analyst. You are tasked with summarizing historical yield trends for a specific crop and county.

  Given the following historical yield data, provide a concise and informative summary of the trends. Highlight any significant increases, decreases, or periods of stability in yield.

  Crop: {{{crop}}}
  County: {{{county}}}
  Historical Data: {{{historicalData}}}

  Summary:`,
});

const yieldTrendSummaryFlow = ai.defineFlow(
  {
    name: 'yieldTrendSummaryFlow',
    inputSchema: YieldTrendSummaryInputSchema,
    outputSchema: YieldTrendSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
