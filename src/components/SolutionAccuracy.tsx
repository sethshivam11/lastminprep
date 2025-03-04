"use client";

import { TrendingUp } from "lucide-react";
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
  { correct: 1000, questions: 1260, fill: "var(--color-correct)" },
];

const chartConfig = {
  questions: {
    label: "Questions",
  },
  correct: {
    label: `Correct:`,
    color:
      (chartData[0].correct / chartData[0].questions) * 100 < 50
        ? "hsl(var(--chart-5))"
        : (chartData[0].correct / chartData[0].questions) * 100 < 75
        ? "hsl(var(--chart-3))"
        : "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function SolutionAccuracy() {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Solution Accuracy</CardTitle>
        <CardDescription>Measure correctness of your attempts</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-full">
          <RadialBarChart
            data={chartData}
            startAngle={90}
            endAngle={-(chartData[0].correct / chartData[0].questions) * 270}
            innerRadius={100}
            outerRadius={180}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-background"
              polarRadius={[110, 90]}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <RadialBar dataKey="correct" background />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-4xl font-bold"
                        >
                          {chartData[0].questions.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Questions
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start">
        <ul className="text-sm text-muted-foreground">
          <li>
            Accuracy:{" "}
            {Math.floor(
              (chartData[0].correct / chartData[0].questions) * 100 || 0
            )}
            %
          </li>
          <li>Correct Answers: {chartData[0].correct || 0}</li>
          <li>
            Incorrect Answers:{" "}
            {chartData[0].questions - chartData[0].correct || 0}
          </li>
        </ul>
      </CardFooter>
    </Card>
  );
}
