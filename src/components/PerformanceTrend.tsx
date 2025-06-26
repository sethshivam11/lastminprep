"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";
import { ChartArea, Loader2 } from "lucide-react";
import { getProfilePerformance } from "@/services/profile";

const chartConfig = {
  score: {
    label: "Score",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function PerformanceTrend({ profileId }: { profileId: string }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const chartData = data;

  useEffect(() => {
    const fetchData = async () => {
      const response = await getProfilePerformance(profileId);
      if (response.success) {
        setData(response.data);
      }
      setLoading(false);
    };
    if (data.length > 0) return setLoading(false);
    fetchData();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Trend</CardTitle>
        <CardDescription>
          Track how your scores improve over time.
        </CardDescription>
      </CardHeader>
      {data.length > 1 ? (
        <CardContent>
          <ChartContainer config={chartConfig}>
            <AreaChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => new Date(value).getDate().toString()}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Area
                dataKey="score"
                type="natural"
                fill="var(--color-score)"
                fillOpacity={0.4}
                stroke="var(--color-score)"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      ) : loading ? (
        <div className="flex items-center justify-center h-full min-h-40">
          <Loader2 className="animate-spin" size="40" />
        </div>
      ) : (
        <div className="flex flex-col gap-2 w-full justify-center items-center h-full min-h-60">
          <ChartArea size="60" />
          <span className="text-muted-foreground">
            No data available for activity
          </span>
        </div>
      )}
    </Card>
  );
}
