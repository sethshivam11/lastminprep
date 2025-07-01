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
import { attemptsActivity } from "@/services/attempt";
import { ChartColumnDecreasing, Loader2 } from "lucide-react";
import { getProfileActivity } from "@/services/profile";

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

export function InterviewActivity({
  className,
  profileId,
}: {
  className?: string;
  profileId?: string;
}) {
  const [data, setData] = useState<Data[]>([]);
  const [loading, setLoading] = useState(true);
  const chartData = data;

  useEffect(() => {
    async function fetchProfileActivity() {
      if (!profileId) return setLoading(false);
      const response = await getProfileActivity(profileId);
      if (response.success) {
        setData(response.data);
      }
      setLoading(false);
    }
    async function fetchData() {
      if (profileId) {
        return fetchProfileActivity();
      }
      const response = await attemptsActivity();
      if (response.success) {
        setData(response.data);
      }
      setLoading(false);
    }
    if (data.length > 0) return setLoading(false);
    fetchData();
  }, [profileId]);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Interview Activity</CardTitle>
        <CardDescription>
          Daily breakdown of interviews you&apos;ve attempted
        </CardDescription>
      </CardHeader>
      <CardContent className="h-full items-end">
        {data.length > 0 ? (
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
        ) : loading ? (
          <div className="flex items-center justify-center h-full min-h-40">
            <Loader2 className="animate-spin" size="40" />
          </div>
        ) : (
          <div className="flex flex-col gap-2 w-full justify-center items-center h-full min-h-60">
            <ChartColumnDecreasing size="60" />
            <span className="text-muted-foreground">
              No data available for activity
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
