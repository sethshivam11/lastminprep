"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
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
import { attemptsAnalytics } from "@/services/attempt";
import { Loader2 } from "lucide-react";

const chartConfig = {
  count: {
    label: "Interviews",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

interface Data {
  day: string;
  count: number;
  date: string;
}

export function InterviewActivity({ className }: { className?: string }) {
  const [data, setData] = useState<Data[]>([]);
  const [loading, setLoading] = useState(true);
  const chartData = data;

  useEffect(() => {
    async function fetchData() {
      const response = await attemptsAnalytics();
      if (response.success) {
        setData(response.data);
      }
      setLoading(false);
    }
    if (data.length > 0) return setLoading(false);
    fetchData();
  }, [data]);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Interview Activity</CardTitle>
        <CardDescription>
          Daily breakdown of interviews you&apos;ve attempted
          <button onClick={() => console.log(data)}>print</button>
        </CardDescription>
      </CardHeader>
      <CardContent className="h-full items-end">
        {loading ? (
          <div className="flex items-center justify-center h-full min-h-40">
            <Loader2 className="animate-spin" size="40" />
          </div>
        ) : (
          <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="day"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="count" fill="var(--color-count)" radius={8} />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
