"use client";

import { TrendingDown, TrendingUp } from "lucide-react";
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

const chartData = [
  { attempt: 1, mcq: 9, coding: 2 },
  { attempt: 2, mcq: 8, coding: 1 },
  { attempt: 3, mcq: 9, coding: 1 },
  { attempt: 4, mcq: 6, coding: 2 },
];

const chartConfig = {
  mcq: {
    label: "MCQs",
    color: "hsl(var(--chart-1))",
    icon: TrendingUp,
  },
  coding: {
    label: "Coding",
    color: "hsl(var(--chart-2))",
    icon: TrendingDown,
  },
} satisfies ChartConfig;

export function ScoreTrends() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Trend</CardTitle>
        <CardDescription>
          A comparison of performance trends between coding and MCQ attempts
        </CardDescription>
      </CardHeader>
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
              dataKey="attempt"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <defs>
              <linearGradient id="fillMcq" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-mcq)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-mcq)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillCoding" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-coding)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-coding)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="coding"
              type="natural"
              fill="url(#fillCoding)"
              fillOpacity={0.4}
              stroke="var(--color-coding)"
              stackId="a"
            />
            <Area
              dataKey="mcq"
              type="natural"
              fill="url(#fillMcq)"
              fillOpacity={0.4}
              stroke="var(--color-mcq)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
