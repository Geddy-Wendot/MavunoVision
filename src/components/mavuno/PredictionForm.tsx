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
import { cropData, fertilizerTypes, soilTypes } from "@/lib/data";
import { predictCropYield, type CropYieldOutput } from "@/ai/flows/crop-yield-prediction";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import React from "react";

const formSchema = z.object({
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
  
  const form = useForm<PredictionFormState>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      year: new Date().getFullYear() + 1,
      area: 10,
      rainfall: 500,
    },
  });

  const { formState, watch } = form;
  
  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      const parsedValues = formSchema.safeParse(value);
      if (parsedValues.success) {
        onFormStateChange(parsedValues.data);
      } else if (name === 'crop') {
        onFormStateChange({ ...form.getValues(), crop: value.crop! });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, onFormStateChange, form]);


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
              control={form.control}
              name="crop"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Crop</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a crop" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {cropData.map(c => <SelectItem key={c.name} value={c.name}>{c.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
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
                  control={form.control}
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
                control={form.control}
                name="rainfall"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Expected Rainfall (mm)</FormLabel>
                    <FormControl>
                    <Input type="number" placeholder="e.g. 500" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                control={form.control}
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
                control={form.control}
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
