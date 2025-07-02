"use client";

import { useState } from 'react';
import { Header } from '@/components/mavuno/Header';
import { PredictionForm, type PredictionFormState } from '@/components/mavuno/PredictionForm';
import { YieldDisplay } from '@/components/mavuno/YieldDisplay';
import { TrendAnalysis } from '@/components/mavuno/TrendAnalysis';
import { type CropYieldOutput } from '@/ai/flows/crop-yield-prediction';
import { Card, CardContent } from '@/components/ui/card';

export default function Home() {
  const [predictionResult, setPredictionResult] = useState<CropYieldOutput | null>(null);
  const [formState, setFormState] = useState<PredictionFormState | null>(null);
  const [isPredicting, setIsPredicting] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
        <div className="grid gap-8 md:grid-cols-5">
          <div className="md:col-span-2">
            <PredictionForm 
              onPrediction={setPredictionResult}
              onFormStateChange={setFormState}
              setPredicting={setIsPredicting}
            />
          </div>
          <div className="md:col-span-3 space-y-8">
            <YieldDisplay result={predictionResult} isLoading={isPredicting} />
            {formState?.crop ? (
               <TrendAnalysis cropName={formState.crop} />
            ) : (
                <Card>
                    <CardContent className="pt-6">
                        <p className="text-muted-foreground text-center">Select a crop to view its historical trend analysis.</p>
                    </CardContent>
                </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
