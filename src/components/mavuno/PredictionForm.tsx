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

export type PredictionFormState = z.infer<typeof formSchema>;

interface PredictionFormProps {
    onPrediction: (result: CropYieldOutput | null) => void;
    onFormStateChange: (state: PredictionFormState | null) => void;
    setPredicting: (isPredicting: boolean) => void;
}

export function PredictionForm({ onPrediction, onFormStateChange, setPredicting }: PredictionFormProps) {
  const { toast } = useToast();
  const [availableCrops, setAvailableCrops] = React.useState<CropData[]>([]);
  
  const form = useForm<PredictionFormState>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      year: new Date().getFullYear() + 1,
      area: 10,
    },
  });

  const { formState, watch, control, setValue } = form;
  const watchedCounty = watch("county");
  const watchedYear = watch("year");
  
  React.useEffect(() => {
    const subscription = watch((value) => {
      const parsedValues = formSchema.safeParse(value);
      if (parsedValues.success) {
        onFormStateChange(parsedValues.data);
      } else {
        onFormStateChange(value as PredictionFormState);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, onFormStateChange]);

  React.useEffect(() => {
    if (watchedCounty) {
      const filteredCrops = cropData.filter(crop => crop.counties.includes(watchedCounty));
      setAvailableCrops(filteredCrops);
      // Reset crop selection if the current one is not in the new list
      const currentCrop = form.getValues("crop");
      if (currentCrop && !filteredCrops.some(c => c.name === currentCrop)) {
          setValue("crop", "", { shouldValidate: true });
      }
    } else {
      setAvailableCrops([]);
    }
  }, [watchedCounty, setValue, form]);

  React.useEffect(() => {
    if (watchedCounty && watchedYear >= new Date().getFullYear()) {
        const predictedRainfall = getPredictedRainfall(watchedCounty, watchedYear);
        setValue("rainfall", predictedRainfall, { shouldValidate: true });
    }
  }, [watchedCounty, watchedYear, setValue]);


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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Predict Your Yield</CardTitle>
        <CardDescription>Enter your farm's details to get an AI-powered yield prediction.</CardDescription>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={control}
                  name="year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prediction Year</FormLabel>
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
                name="rainfall"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Predicted Rainfall (mm)</FormLabel>
                    <FormControl>
                    <Input type="number" placeholder="Select county and year" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
            </div>

            <Button type="submit" className="w-full" disabled={formState.isSubmitting}>
              {formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Predict Yield
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
