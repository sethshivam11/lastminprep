"use client";

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
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
const chartData = [
  {
    correct: "correct",
    questions: 90,
    total: 100,
    fill: "var(--color-correct)",
  },
];

const chartConfig = {
  questions: {
    label: "Questions",
  },
  correct: {
    label: "Correct",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function CorrectAnswers() {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Overall Accuracy</CardTitle>
        <CardDescription>
          A comparison of total attempts vs. correct answers across all attempts
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 md:pb-0 pb-6 items-center max-h-full">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-96 xl:h-80 md:h-60"
        >
          <RadialBarChart
            data={chartData}
            startAngle={90}
            endAngle={-(chartData[0].questions / chartData[0].total) * 270}
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
            <RadialBar dataKey="questions" background />
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
    </Card>
  );
}
