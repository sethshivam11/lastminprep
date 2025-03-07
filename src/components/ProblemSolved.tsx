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
import { useMemo, useState } from "react";

type ChartType = "mcq" | "coding";

const chartData = [
  { problem: "Arrays", mcq: 7, coding: 2 },
  { problem: "Strings", mcq: 6, coding: 1 },
  { problem: "Search", mcq: 9, coding: 1 },
  { problem: "Recursion", mcq: 8, coding: 2 },
  { problem: "DP", mcq: 5, coding: 2 },
  { problem: "Graphs", mcq: 7, coding: 1 },
  { problem: "Stacks", mcq: 6, coding: 1 },
];

const chartConfig = {
  mcq: {
    label: "MCQs",
    color: "hsl(var(--chart-1))",
  },
  coding: {
    label: "Coding",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

export function ProblemSolved() {
  const [activeChart, setActiveChart] = useState<ChartType>("mcq");
  const total = useMemo(
    () => ({
      mcq: chartData.reduce((acc, curr) => acc + curr.mcq, 0),
      coding: chartData.reduce((acc, curr) => acc + curr.coding, 0),
    }),
    []
  );

  return (
    <Card className="sm:col-span-2">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Problem Solving Breakdown</CardTitle>
          <CardDescription>
            Understand your strengths and weaknesses
          </CardDescription>
        </div>
        <div className="flex">
          {Object.keys(total).map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key as keyof typeof total]?.toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="mt-2">
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="problem"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar
              dataKey={activeChart}
              fill={`var(--color-${activeChart})`}
              radius={8}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
