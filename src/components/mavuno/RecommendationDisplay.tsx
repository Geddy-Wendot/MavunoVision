"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { type CropRecommendationOutput } from "@/ai/flows/crop-recommendation";
import { Lightbulb } from "lucide-react";

interface RecommendationDisplayProps {
  result: CropRecommendationOutput | null;
  isLoading: boolean;
}

export function RecommendationDisplay({ result, isLoading }: RecommendationDisplayProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="font-headline flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-accent" />
            Crop Recommendations
          </CardTitle>
          <CardDescription>Generating recommendations for your farm...</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="space-y-2">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-4 w-5/6" />
            </div>
             <div className="space-y-2">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-4 w-4/6" />
            </div>
        </CardContent>
      </Card>
    );
  }

  if (!result) {
    return null; // Don't render anything if there's no result and not loading
  }

  return (
    <Card className="bg-accent/5">
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-accent" />
          Crop Recommendations
        </CardTitle>
        <CardDescription>Based on your inputs, here are the top 3 recommended crops.</CardDescription>
      </CardHeader>
      <CardContent>
        {result.recommendations && result.recommendations.length > 0 ? (
          <Accordion type="single" collapsible defaultValue="item-0">
            {result.recommendations.map((rec, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="font-semibold text-primary">{rec.cropName}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {rec.reason}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <p className="text-muted-foreground">No recommendations could be generated.</p>
        )}
      </CardContent>
    </Card>
  );
}
