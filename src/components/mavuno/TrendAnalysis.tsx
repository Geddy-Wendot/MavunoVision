"use client";

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { Skeleton } from "@/components/ui/skeleton";
import { cropData } from "@/lib/data";
import { generateYieldTrendSummary } from '@/ai/flows/yield-trend-summary';
import { useToast } from '@/hooks/use-toast';
import { TrendingUp } from 'lucide-react';

interface TrendAnalysisProps {
  cropName: string;
  countyName: string;
}

const chartConfig = {
  yield: {
    label: "Yield (tons/ha)",
    color: "hsl(var(--primary))",
  },
};

export function TrendAnalysis({ cropName, countyName }: TrendAnalysisProps) {
  const [summary, setSummary] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const { toast } = useToast();

  const data = React.useMemo(() => cropData.find(c => c.name === cropName)?.historicalData || [], [cropName]);

  React.useEffect(() => {
    if (!cropName || !countyName || data.length === 0) return;

    const fetchSummary = async () => {
      setIsLoading(true);
      setSummary(null);
      try {
        const historicalDataString = data.map(d => `Year ${d.year}: ${d.yield} tons/ha`).join(', ');
        const result = await generateYieldTrendSummary({
          crop: cropName,
          county: countyName,
          historicalData: historicalDataString,
        });
        setSummary(result.summary);
      } catch (error) {
        console.error("Trend analysis failed:", error);
        toast({
          title: "Trend Analysis Failed",
          description: "Could not generate historical trend summary.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchSummary();
  }, [cropName, countyName, data, toast]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
            <TrendingUp className="w-6 h-6" />
            Historical Trend for {cropName} in {countyName}
        </CardTitle>
        <CardDescription>Yield in tons per hectare from the last 9 years.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" />
                    <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                    <ChartTooltip
                        cursor={{fill: "hsl(var(--accent) / 0.1)"}}
                        content={<ChartTooltipContent indicator="dot" />}
                    />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Line type="monotone" dataKey="yield" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4, fill: "hsl(var(--primary))" }} activeDot={{ r: 6, fill: "hsl(var(--primary))" }} />
                </LineChart>
            </ResponsiveContainer>
        </ChartContainer>

        <div className="mt-6">
            <h4 className="font-semibold mb-2 font-headline">AI-Generated Summary for {countyName}</h4>
            {isLoading ? (
                <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                </div>
            ) : (
                <p className="text-sm text-muted-foreground italic leading-relaxed">"{summary || 'No summary available.'}"</p>
            )}
        </div>
      </CardContent>
    </Card>
  );
}
