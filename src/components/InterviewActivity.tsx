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
const chartData = [
  { day: "Mon", interview: 1 },
  { day: "Tue", interview: 2 },
  { day: "Wed", interview: 1 },
  { day: "Thur", interview: 0 },
  { day: "Fri", interview: 0 },
  { day: "Sat", interview: 2 },
  { day: "Sun", interview: 0 },
];

const chartConfig = {
  interview: {
    label: "Interviews",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function InterviewActivity({ className }: { className?: string }) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Interview Activity</CardTitle>
        <CardDescription>
          Daily breakdown of interviews you&apos;ve attempted
        </CardDescription>
      </CardHeader>
      <CardContent>
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
            <Bar dataKey="interview" fill="var(--color-interview)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
