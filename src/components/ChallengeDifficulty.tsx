"use client";

import { Label, Pie, PieChart } from "recharts";
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
import { useMemo } from "react";

const chartData = [
  { level: "easy", difficulty: 8, fill: "var(--color-easy)" },
  { level: "intermediate", difficulty: 5, fill: "var(--color-intermediate)" },
  { level: "hard", difficulty: 2, fill: "var(--color-hard)" },
];

const chartConfig = {
  easy: {
    label: "Easy",
    color: "var(--chart-2)",
  },
  intermediate: {
    label: "Intermediate",
    color: "var(--chart-3)",
  },
  hard: {
    label: "Hard",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

export function ChallengeDifficulty() {
  const totalTests = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.difficulty, 0);
  }, []);

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Challenge Difficulty</CardTitle>
        <CardDescription>
          Track your progress across difficulties
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-full"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="difficulty"
              nameKey="level"
              innerRadius={60}
              strokeWidth={5}
            >
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
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalTests.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Difficulty
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-1 items-start">
        <ul className="text-sm text-muted-foreground">
          <li>
            Easy:{" "}
            {Math.floor((chartData[0]?.difficulty * 100) / totalTests || 0)}%
          </li>
          <li>
            Intermediate:{" "}
            {Math.floor((chartData[1]?.difficulty * 100) / totalTests || 0)}%
          </li>
          <li>
            Hard:{" "}
            {Math.floor((chartData[2]?.difficulty * 100) / totalTests || 0)}%
          </li>
        </ul>
      </CardFooter>
    </Card>
  );
}
