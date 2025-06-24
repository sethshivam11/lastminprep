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
import { Difficulties } from "./DashboardAnalytics";
import { ChartPie, Loader2 } from "lucide-react";

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

export function ChallengeDifficulty({
  loading,
  difficulties,
}: {
  loading: boolean;
  difficulties: Difficulties[];
}) {
  const chartData = ["easy", "intermediate", "hard"].map((level) => {
    const entry = difficulties.find((d) => d.difficulty === level);
    return {
      level,
      difficulty: entry?.count || 0,
      fill: `var(--color-${level})`,
    };
  });

  const totalTests = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.difficulty, 0);
  }, [difficulties]);

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Challenge Difficulty</CardTitle>
        <CardDescription>
          Track your progress across difficulties
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0 h-full">
        {difficulties.length > 0 ? (
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
        ) : loading ? (
          <div className="flex items-center justify-center h-full min-h-40">
            <Loader2 className="animate-spin" size="40" />
          </div>
        ) : (
          <div className="flex flex-col gap-2 w-full justify-center items-center h-full min-h-60">
            <ChartPie size="60" />
            <span className="text-muted-foreground">
              No data available for difficulty
            </span>
          </div>
        )}
      </CardContent>
      {!loading && difficulties.length > 0 && (
        <CardFooter className="flex-col gap-1 items-start">
          <ul className="text-sm text-muted-foreground">
            <li>
              Easy:{" "}
              <span className="text-foreground">
                {Math.floor((chartData[0]?.difficulty * 100) / totalTests || 0)}
                %
              </span>
            </li>
            <li>
              Intermediate:{" "}
              <span className="text-foreground">
                {Math.floor((chartData[1]?.difficulty * 100) / totalTests || 0)}
                %
              </span>
            </li>
            <li>
              Hard:{" "}
              <span className="text-foreground">
                {Math.floor((chartData[2]?.difficulty * 100) / totalTests || 0)}
                %
              </span>
            </li>
          </ul>
        </CardFooter>
      )}
    </Card>
  );
}
