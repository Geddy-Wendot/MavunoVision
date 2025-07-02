"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { kenyanCounties, cropData, fertilizerTypes, soilTypes, getPredictedRainfall, type CropData } from "@/lib/data";
import { predictCropYield, type CropYieldOutput } from "@/ai/flows/crop-yield-prediction";
import { getCropRecommendation, type CropRecommendationOutput } from "@/ai/flows/crop-recommendation";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import React from "react";

const formSchema = z.object({
  county: z.string({ required_error: "Please select a county." }),
  crop: z.string({ required_error: "Please select a crop." }),
  year: z.coerce.number().min(new Date().getFullYear(), { message: `Year must be ${new Date().getFullYear()} or later.` }),
  area: z.coerce.number().positive({ message: "Area must be a positive number." }),
  rainfall: z.coerce.number().positive({ message: "Rainfall must be a positive number." }),
  fertilizer: z.string({ required_error: "Please select a fertilizer type." }),
  soilQuality: z.string({ required_error: "Please select a soil quality." }),
});

const recommendationSchema = formSchema.omit({ crop: true, fertilizer: true });

export type PredictionFormState = z.infer<typeof formSchema>;

interface PredictionFormProps {
    onPrediction: (result: CropYieldOutput | null) => void;
    onRecommendation: (result: CropRecommendationOutput | null) => void;
    onFormStateChange: (state: PredictionFormState | null) => void;
    setPredicting: (isPredicting: boolean) => void;
    setRecommending: (isRecommending: boolean) => void;
    isPredicting: boolean;
    isRecommending: boolean;
}

export function PredictionForm({ onPrediction, onRecommendation, onFormStateChange, setPredicting, setRecommending, isPredicting, isRecommending }: PredictionFormProps) {
  const { toast } = useToast();
  const [availableCrops, setAvailableCrops] = React.useState<CropData[]>([]);
  
  const form = useForm<PredictionFormState>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      year: new Date().getFullYear() + 1,
      area: 10,
    },
  });

  const { formState, watch, control, setValue, getValues } = form;
  const watchedCounty = watch("county");
  const watchedCrop = watch("crop");
  const watchedYear = watch("year");
  
  React.useEffect(() => {
    const subscription = watch((value) => {
      onFormStateChange(value as PredictionFormState);
    });
    return () => subscription.unsubscribe();
  }, [watch, onFormStateChange]);

  React.useEffect(() => {
    if (watchedCounty) {
      const filteredCrops = cropData.filter(crop => crop.counties.includes(watchedCounty));
      setAvailableCrops(filteredCrops);
      if (watchedCrop && !filteredCrops.some(c => c.name === watchedCrop)) {
          setValue("crop", "", { shouldValidate: true });
      }
    } else {
      setAvailableCrops([]);
    }
  }, [watchedCounty, setValue, form, watchedCrop]);

  React.useEffect(() => {
    if (watchedCounty && watchedYear >= new Date().getFullYear()) {
        const predictedRainfall = getPredictedRainfall(watchedCounty, watchedYear);
        setValue("rainfall", predictedRainfall, { shouldValidate: true });
    }
  }, [watchedCounty, watchedYear, setValue]);

  const handleGetRecommendation = async () => {
    const values = getValues();
    const parsed = recommendationSchema.safeParse(values);

    if (!parsed.success) {
      toast({
        title: "Missing Information",
        description: "Please fill out County, Year, Area, and Soil Quality to get a recommendation.",
        variant: "destructive",
      });
      // Trigger validation on the fields
      form.trigger(['county', 'year', 'area', 'soilQuality', 'rainfall']);
      return;
    }
    
    setRecommending(true);
    onRecommendation(null);
    try {
      const result = await getCropRecommendation(parsed.data);
      onRecommendation(result);
    } catch(error) {
      console.error("Recommendation failed:", error);
      toast({
        title: "Recommendation Failed",
        description: "There was an error while generating recommendations. Please try again.",
        variant: "destructive",
      });
    } finally {
      setRecommending(false);
    }
  };

  async function onSubmit(values: PredictionFormState) {
    setPredicting(true);
    onPrediction(null);
    try {
      const result = await predictCropYield(values);
      onPrediction(result);
    } catch (error) {
      console.error("Prediction failed:", error);
      toast({
        title: "Prediction Failed",
        description: "There was an error while predicting the crop yield. Please try again.",
        variant: "destructive",
      });
    } finally {
        setPredicting(false);
    }
  }

  const isBusy = isPredicting || isRecommending;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Crop Analysis</CardTitle>
        <CardDescription>Get yield predictions or crop recommendations from our AI.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
                control={control}
                name="county"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>County</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a county" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        {kenyanCounties.sort().map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                    </FormItem>
                )}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={control}
                  name="year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Year</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g. 2025" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="area"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Area (hectares)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g. 10" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </div>
            <FormField
                control={control}
                name="soilQuality"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Soil Quality</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Select soil quality" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {soilTypes.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                    </FormItem>
                )}
                />
             <FormField
                control={control}
                name="rainfall"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Predicted Rainfall (mm)</FormLabel>
                    <FormControl>
                    <Input type="number" readOnly placeholder="Auto-populated" {...field} value={field.value ?? ""} className="bg-muted"/>
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            
            <Card className="bg-muted/30 p-4 space-y-4">
                <p className="text-sm text-center text-muted-foreground font-semibold">For a specific prediction, select a crop and fertilizer.</p>
                <FormField
                  control={control}
                  name="crop"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Crop</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value || ""} disabled={!watchedCounty}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={watchedCounty ? "Select a crop" : "Select a county first"} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {availableCrops.map(c => <SelectItem key={c.name} value={c.name}>{c.name}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="fertilizer"
                  render={({ field }) => (
                      <FormItem>
                      <FormLabel>Fertilizer Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                          <SelectTrigger>
                              <SelectValue placeholder="Select fertilizer" />
                          </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                              {fertilizerTypes.map(f => <SelectItem key={f} value={f}>{f}</SelectItem>)}
                          </SelectContent>
                      </Select>
                      <FormMessage />
                      </FormItem>
                  )}
                />
            </Card>


            <div className="flex flex-col sm:flex-row gap-2">
                <Button type="submit" className="w-full" disabled={!watchedCrop || isBusy}>
                  {isPredicting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Predict Yield
                </Button>
                <Button type="button" variant="outline" className="w-full" onClick={handleGetRecommendation} disabled={!!watchedCrop || isBusy}>
                  {isRecommending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Get Recommendation
                </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
