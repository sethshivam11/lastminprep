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
import { Attempts } from "./DashboardAnalytics";
import { Loader2 } from "lucide-react";

export function SolutionAccuracy({
  loading,
  attempts,
}: {
  loading: boolean;
  attempts: Attempts;
}) {
  const chartData = [
    {
      correct: attempts.correct,
      questions: attempts.incorrect + attempts.correct,
      fill: "var(--color-correct)",
    },
  ];

  const chartConfig = {
    questions: {
      label: "Questions",
    },
    correct: {
      label: `Correct:`,
      color:
        (chartData[0].correct / chartData[0].questions) * 100 < 50
          ? "var(--chart-5)"
          : (chartData[0].correct / chartData[0].questions) * 100 < 75
          ? "var(--chart-3)"
          : "var(--chart-2)",
    },
  } satisfies ChartConfig;

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Solution Accuracy</CardTitle>
        <CardDescription>Measure correctness of your attempts</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0 h-full">
        {loading ? (
          <div className="flex items-center justify-center h-full min-h-40">
            <Loader2 className="animate-spin" size="40" />
          </div>
        ) : (
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-full"
          >
            <RadialBarChart
              data={chartData}
              startAngle={90}
              endAngle={-(chartData[0].correct / chartData[0].questions) * 270}
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
        )}
      </CardContent>
      {!loading && (
        <CardFooter className="flex-col items-start">
          <ul className="text-sm text-muted-foreground">
            <li>
              Accuracy:{" "}
              <span className="text-foreground">
                {Math.floor(
                  (chartData[0].correct / chartData[0].questions) * 100 || 0
                )}
                %
              </span>
            </li>
            <li>
              Correct Answers:{" "}
              <span className="text-foreground">
                {chartData[0].correct || 0}
              </span>
            </li>
            <li>
              Incorrect Answers:{" "}
              <span className="text-foreground">
                {chartData[0].questions - chartData[0].correct || 0}
              </span>
            </li>
          </ul>
        </CardFooter>
      )}
    </Card>
  );
}
