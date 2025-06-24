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
import { ChartPie, Loader2 } from "lucide-react";

const chartConfig = {
  questions: {
    label: "Questions",
  },
  correct: {
    label: "Correct",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function CorrectAnswers({
  correct,
  total,
  loading,
}: {
  correct: number;
  total: number;
  loading?: boolean;
}) {
  const chartData = [
    {
      correct: "correct",
      questions: correct,
      total,
      fill: "var(--color-correct)",
    },
  ];

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Overall Accuracy</CardTitle>
        <CardDescription>
          A comparison of total attempts vs. correct answers across all attempts
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 md:pb-0 pb-6 items-center h-full">
        {correct && total ? (
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-96 xl:h-80 md:h-60"
          >
            <RadialBarChart
              data={chartData}
              startAngle={90}
              endAngle={-(chartData[0].questions / chartData[0].total) * 270}
              innerRadius={80}
              outerRadius={160}
            >
              <PolarGrid
                gridType="circle"
                radialLines={false}
                stroke="none"
                className="first:fill-muted last:fill-background"
                polarRadius={[90, 70]}
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
        ) : loading ? (
          <div className="flex items-center justify-center w-full h-full min-h-40">
            <Loader2 className="animate-spin" size="40" />
          </div>
        ) : (
          <div className="flex flex-col gap-2 w-full justify-center items-center h-full min-h-40">
            <ChartPie size="60" />
            <span className="text-muted-foreground">
              No data available for accuracy
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
