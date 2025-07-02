"use client";

import { useState } from 'react';
import { Header } from '@/components/mavuno/Header';
import { PredictionForm, type PredictionFormState } from '@/components/mavuno/PredictionForm';
import { YieldDisplay } from '@/components/mavuno/YieldDisplay';
import { TrendAnalysis } from '@/components/mavuno/TrendAnalysis';
import { type CropYieldOutput } from '@/ai/flows/crop-yield-prediction';
import { type CropRecommendationOutput } from '@/ai/flows/crop-recommendation';
import { Card, CardContent } from '@/components/ui/card';
import { RecommendationDisplay } from '@/components/mavuno/RecommendationDisplay';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PestDiagnosis } from '@/components/mavuno/PestDiagnosis';

export default function Home() {
  const [predictionResult, setPredictionResult] = useState<CropYieldOutput | null>(null);
  const [recommendationResult, setRecommendationResult] = useState<CropRecommendationOutput | null>(null);
  const [formState, setFormState] = useState<PredictionFormState | null>(null);
  const [isPredicting, setIsPredicting] = useState(false);
  const [isRecommending, setIsRecommending] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
        <Tabs defaultValue="analysis" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="analysis">Crop Analysis</TabsTrigger>
            <TabsTrigger value="diagnosis">Pest & Disease Diagnosis</TabsTrigger>
          </TabsList>
          <TabsContent value="analysis" className="mt-6">
            <div className="grid gap-8 md:grid-cols-5">
              <div className="md:col-span-2">
                <PredictionForm 
                  onPrediction={setPredictionResult}
                  onRecommendation={setRecommendationResult}
                  onFormStateChange={setFormState}
                  setPredicting={setIsPredicting}
                  setRecommending={setIsRecommending}
                  isPredicting={isPredicting}
                  isRecommending={isRecommending}
                />
              </div>
              <div className="md:col-span-3 space-y-8">
                <YieldDisplay result={predictionResult} isLoading={isPredicting} />
                <RecommendationDisplay result={recommendationResult} isLoading={isRecommending} />
                {formState?.crop && formState?.county ? (
                  <TrendAnalysis cropName={formState.crop} countyName={formState.county} />
                ) : (
                    <Card>
                        <CardContent className="pt-6">
                            <p className="text-muted-foreground text-center">Select a county and crop to view its historical trend analysis.</p>
                        </CardContent>
                    </Card>
                )}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="diagnosis" className="mt-6">
            <PestDiagnosis />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
