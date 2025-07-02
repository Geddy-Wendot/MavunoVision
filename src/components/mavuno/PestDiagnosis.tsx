"use client";

import * as React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { diagnosePlantDisease, type PlantDiagnosisOutput } from '@/ai/flows/plant-disease-diagnosis';
import { Loader2, AlertTriangle, Sparkles, CheckCircle, Bug, ShieldCheck, Info } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';

export function PestDiagnosis() {
  const { toast } = useToast();
  const [photoFile, setPhotoFile] = React.useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = React.useState<string | null>(null);
  const [description, setDescription] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [result, setResult] = React.useState<PlantDiagnosisOutput | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!photoFile) {
      toast({
        title: "No Photo Selected",
        description: "Please upload a photo of the plant to analyze.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    setResult(null);

    try {
      if (!photoPreview) {
        throw new Error("File preview is not available.");
      }

      const diagnosisResult = await diagnosePlantDisease({
        photoDataUri: photoPreview,
        description: description,
      });
      setResult(diagnosisResult);
    } catch (error) {
      console.error("Diagnosis failed:", error);
      toast({
        title: "Analysis Failed",
        description: "There was an error while analyzing the plant. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const AnalysisResult = () => {
    if (isLoading) {
        return (
            <Card>
                <CardContent className="pt-6 space-y-4">
                    <Skeleton className="w-32 h-6" />
                    <Skeleton className="w-full h-4" />
                    <Skeleton className="w-full h-4" />
                    <Skeleton className="w-4/5 h-4" />
                </CardContent>
            </Card>
        )
    }

    if (!result) return null;

    if (!result.isPlant) {
      return (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Not a Plant</AlertTitle>
          <AlertDescription>
            Our AI could not detect a plant in the uploaded image. Please try another photo.
          </AlertDescription>
        </Alert>
      );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-accent" />
                    Analysis Complete
                </CardTitle>
                <CardDescription>
                    {result.plantName ? `Identified Plant: ${result.plantName}` : "Here is the diagnosis for your plant."}
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {result.isHealthy ? (
                    <Alert className="border-green-300 bg-green-50 text-green-800">
                        <CheckCircle className="h-4 w-4 !text-green-600" />
                        <AlertTitle>Plant is Healthy!</AlertTitle>
                        <AlertDescription>
                            Our analysis indicates that your plant is healthy and shows no clear signs of disease or pests.
                        </AlertDescription>
                    </Alert>
                ) : (
                    <>
                        <Alert variant="destructive">
                            <Bug className="h-4 w-4" />
                            <AlertTitle>Diagnosis: {result.diagnosis || "Unhealthy"}</AlertTitle>
                            <AlertDescription>
                                The plant appears to be unhealthy. See the recommended remedy below.
                            </AlertDescription>
                        </Alert>
                         <Alert>
                            <ShieldCheck className="h-4 w-4" />
                            <AlertTitle>Recommended Remedy</AlertTitle>
                            <AlertDescription>
                                {result.remedy || "No specific remedy provided. Ensure proper watering, sunlight, and nutrients."}
                            </AlertDescription>
                        </Alert>
                    </>
                )}
            </CardContent>
        </Card>
    )
  }

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Diagnose Plant Health</CardTitle>
          <CardDescription>Upload a photo of a plant to get an AI-powered health analysis and treatment recommendations.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="plant-photo">Plant Photo</Label>
            <Input id="plant-photo" type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} className="file:text-primary file:font-semibold" />
          </div>
          {photoPreview && (
            <div className="relative w-full aspect-square max-w-sm mx-auto rounded-md overflow-hidden border-2 border-dashed">
                <Image src={photoPreview} alt="Plant preview" fill style={{ objectFit: 'cover' }} />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="description">Optional Description</Label>
            <Textarea 
                id="description"
                placeholder="e.g., 'The leaves have yellow spots and there are small white insects underneath.'" 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <Button onClick={handleAnalyze} disabled={isLoading || !photoFile} className="w-full">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Analyze Plant
          </Button>
        </CardContent>
      </Card>
      
      <div className="space-y-4">
        {result || isLoading ? (
            <AnalysisResult />
        ) : (
            <Card className="flex items-center justify-center h-full min-h-[300px]">
                <CardContent className="text-center text-muted-foreground p-6">
                    <Info className="mx-auto h-12 w-12 mb-4 text-primary/50" />
                    <p>Your analysis results will appear here.</p>
                </CardContent>
            </Card>
        )}
      </div>
    </div>
  );
}
