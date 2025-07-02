"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { type CropRecommendationOutput } from "@/ai/flows/crop-recommendation";
import { generateFarmingGuide, type FarmingGuideOutput } from "@/ai/flows/farming-guide";
import { Lightbulb, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "../ui/separator";

interface RecommendationDisplayProps {
  result: CropRecommendationOutput | null;
  isLoading: boolean;
}

export function RecommendationDisplay({ result, isLoading }: RecommendationDisplayProps) {
  const { toast } = useToast();
  const [guide, setGuide] = useState<FarmingGuideOutput | null>(null);
  const [isGuideLoading, setIsGuideLoading] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleFetchGuide = async (cropName: string) => {
    setSelectedCrop(cropName);
    setIsGuideLoading(true);
    setGuide(null);
    setIsDialogOpen(true);

    try {
      const guideResult = await generateFarmingGuide({ cropName });
      setGuide(guideResult);
    } catch (error) {
      console.error("Failed to generate farming guide:", error);
      toast({
        title: "Guide Generation Failed",
        description: `Could not generate a farming guide for ${cropName}. Please try again later.`,
        variant: "destructive",
      });
      setIsDialogOpen(false); // Close dialog on error
    } finally {
      setIsGuideLoading(false);
    }
  };

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

  const GuideSkeleton = () => (
    <div className="space-y-6">
        <div className="space-y-2">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-12 w-full" />
        </div>
        <Separator/>
        <div className="space-y-2">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-12 w-full" />
        </div>
        <Separator/>
        <div className="space-y-2">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-12 w-full" />
        </div>
    </div>
  );

  const GuideContent = () => {
    if (!guide) return null;
    return (
        <div className="space-y-4 text-sm">
            {[
                { title: "Land Preparation", content: guide.landPreparation },
                { title: "Planting", content: guide.planting },
                { title: "Watering & Irrigation", content: guide.wateringAndIrrigation },
                { title: "Fertilizer Application", content: guide.fertilizerApplication },
                { title: "Pest & Disease Control", content: guide.pestAndDiseaseControl },
                { title: "Harvesting", content: guide.harvesting },
                { title: "Post-Harvest Handling", content: guide.postHarvestHandling },
            ].map((section, index) => (
                <div key={index} className="space-y-1">
                    <h4 className="font-semibold text-primary">{section.title}</h4>
                    <p className="text-muted-foreground leading-relaxed">{section.content}</p>
                </div>
            ))}
        </div>
    )
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
                <AccordionContent className="text-muted-foreground space-y-4">
                  <p>{rec.reason}</p>
                  <Button variant="outline" size="sm" onClick={() => handleFetchGuide(rec.cropName)}>
                      <BookOpen className="mr-2 h-4 w-4" />
                      View Farming Guide
                  </Button>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <p className="text-muted-foreground">No recommendations could be generated.</p>
        )}
      </CardContent>
    </Card>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl">Farming Guide for {selectedCrop}</DialogTitle>
          <DialogDescription>
            A detailed, step-by-step guide for cultivating {selectedCrop} in Kenya.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
            {isGuideLoading ? <GuideSkeleton /> : <GuideContent />}
        </div>
      </DialogContent>
    </Dialog>
  );
}
