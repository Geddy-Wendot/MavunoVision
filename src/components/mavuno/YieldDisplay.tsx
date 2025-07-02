import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { CropYieldOutput } from "@/ai/flows/crop-yield-prediction";
import { Wheat } from "lucide-react";

interface YieldDisplayProps {
  result: CropYieldOutput | null;
  isLoading: boolean;
}

export function YieldDisplay({ result, isLoading }: YieldDisplayProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium font-headline">Predicted Yield</CardTitle>
        <Wheat className="w-5 h-5 text-accent" />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-12 w-1/2 rounded-md" />
        ) : result ? (
          <div className="text-4xl font-bold text-primary">
            {result.predictedYield.toFixed(2)}{' '}
            <span className="text-xl font-medium text-muted-foreground">tons/hectare</span>
          </div>
        ) : (
          <p className="text-muted-foreground">Submit the form to see a prediction.</p>
        )}
      </CardContent>
    </Card>
  );
}
