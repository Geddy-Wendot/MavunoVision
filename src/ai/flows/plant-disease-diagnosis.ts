'use server';
/**
 * @fileOverview Diagnoses plant diseases from an image and description.
 *
 * - diagnosePlantDisease - A function that diagnoses plant health issues.
 * - PlantDiagnosisInput - The input type for the diagnosePlantDisease function.
 * - PlantDiagnosisOutput - The return type for the diagnosePlantDisease function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PlantDiagnosisInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a plant, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  description: z.string().optional().describe('An optional description of the plant or its symptoms.'),
});
export type PlantDiagnosisInput = z.infer<typeof PlantDiagnosisInputSchema>;

const PlantDiagnosisOutputSchema = z.object({
    isPlant: z.boolean().describe('Whether or not the image contains a plant.'),
    plantName: z.string().describe('The common name of the identified plant.').optional(),
    isHealthy: z.boolean().describe('Whether the plant appears to be healthy.'),
    diagnosis: z.string().describe("The diagnosis of the plant's health issue, if any (e.g., 'Powdery Mildew', 'Aphid Infestation').").optional(),
    possibleCause: z.string().describe("The likely environmental or pathological cause of the issue (e.g., 'High humidity and poor air circulation', 'Overwatering').").optional(),
    remedy: z.string().describe('A recommended mode of treatment or course of action to address the issue.').optional(),
});
export type PlantDiagnosisOutput = z.infer<typeof PlantDiagnosisOutputSchema>;

export async function diagnosePlantDisease(input: PlantDiagnosisInput): Promise<PlantDiagnosisOutput> {
  return plantDiagnosisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'plantDiagnosisPrompt',
  input: {schema: PlantDiagnosisInputSchema},
  output: {schema: PlantDiagnosisOutputSchema},
  prompt: `You are an expert plant pathologist and botanist. Your task is to analyze an image of a plant and an optional user description to diagnose its health.

  1.  First, determine if the image actually contains a plant. If not, set 'isPlant' to false and provide no other information.
  2.  If it is a plant, identify its common name and populate 'plantName'.
  3.  Assess the plant's health. Look for signs of disease, pests, or nutrient deficiencies.
  4.  If the plant is healthy, set 'isHealthy' to true and leave 'diagnosis', 'possibleCause', and 'remedy' empty.
  5.  If the plant is unhealthy, set 'isHealthy' to false.
      - Provide a concise 'diagnosis' of the problem (e.g., "Powdery Mildew", "Aphid Infestation", "Nitrogen Deficiency").
      - Describe the 'possibleCause' of the issue (e.g., "High humidity and poor air circulation", "Overwatering leading to root rot").
      - Provide a practical, actionable 'remedy' which is the recommended mode of treatment. This could involve organic or chemical treatments, or changes in care.

  Use the following information for your analysis.

  Description: {{{description}}}
  Photo: {{media url=photoDataUri}}`,
});

const plantDiagnosisFlow = ai.defineFlow(
  {
    name: 'plantDiagnosisFlow',
    inputSchema: PlantDiagnosisInputSchema,
    outputSchema: PlantDiagnosisOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
