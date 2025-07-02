import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { CropYieldOutput } from "@/ai/flows/crop-yield-prediction";
import { Wheat, Droplets, TestTube2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface YieldDisplayProps {
  result: CropYieldOutput | null;
  isLoading: boolean;
}

export function YieldDisplay({ result, isLoading }: YieldDisplayProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-medium font-headline">Yield Prediction & Advice</CardTitle>
            <Wheat className="w-5 h-5 text-accent" />
        </div>
        <CardDescription>AI-powered yield forecast and farming recommendations.</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-12 w-1/2 rounded-md" />
            <Skeleton className="h-4 w-3/4 rounded-md" />
            <Skeleton className="h-4 w-4/5 rounded-md" />
          </div>
        ) : result ? (
          <div className="space-y-4">
            <div>
                <p className="text-sm font-medium text-muted-foreground">Predicted Yield</p>
                <div className="text-4xl font-bold text-primary">
                    {result.predictedYield.toFixed(2)}{' '}
                    <span className="text-xl font-medium text-muted-foreground">tons/hectare</span>
                </div>
            </div>
            <Separator />
            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <TestTube2 className="w-5 h-5 text-accent" />
                    <h4 className="font-semibold">Recommended Fertilizer</h4>
                </div>
                <p className="text-muted-foreground">{result.recommendedFertilizer}</p>
            </div>
            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <Droplets className="w-5 h-5 text-accent" />
                    <h4 className="font-semibold">Irrigation Advice</h4>
                </div>
                <p className="text-muted-foreground">{result.irrigationAdvice}</p>
            </div>
          </div>
        ) : (
          <p className="text-muted-foreground text-center pt-4">Select a crop and click "Predict Yield" to see results.</p>
        )}
      </CardContent>
    </Card>
  );
}
