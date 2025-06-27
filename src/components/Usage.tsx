import { Calendar, Clock, TrendingUp, LucideIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface UsageCardProps {
  title: string;
  description: string;
  used: number;
  limit: number;
  icon: LucideIcon;
  color: "blue" | "purple" | "green";
}

function Usage() {
  const usageData = {
    daily: { used: 3, limit: 5 },
    weekly: { used: 18, limit: 30 },
    monthly: { used: 67, limit: 100 },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <UsageCard
        title="Daily Usage"
        description="Questions generated today"
        used={usageData.daily.used}
        limit={usageData.daily.limit}
        icon={Clock}
        color="blue"
      />
      <UsageCard
        title="Weekly Usage"
        description="Questions generated this week"
        used={usageData.weekly.used}
        limit={usageData.weekly.limit}
        icon={Calendar}
        color="purple"
      />
      <UsageCard
        title="Monthly Usage"
        description="Questions generated this month"
        used={usageData.monthly.used}
        limit={usageData.monthly.limit}
        icon={TrendingUp}
        color="green"
      />
    </div>
  );
}

const UsageCard = ({
  title,
  description,
  used,
  limit,
  icon: Icon,
  color,
}: UsageCardProps) => {
  const percentage = (used / limit) * 100;
  const remaining = limit - used;

  const colorClasses = {
    blue: {
      badge:
        "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 border-blue-200 dark:border-blue-800",
      icon: "text-blue-500",
    },
    purple: {
      badge:
        "bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-200 border-purple-200 dark:border-purple-800",
      icon: "text-purple-500",
    },
    green: {
      badge:
        "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 border-green-200 dark:border-green-800",
      icon: "text-green-500",
    },
  };

  return (
    <Card className="relative overflow-hidden hover:shadow-md transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icon className={`h-5 w-5 ${colorClasses[color].icon}`} />
            <CardTitle className="text-lg">{title}</CardTitle>
          </div>
          <Badge variant="secondary" className={colorClasses[color].badge}>
            {remaining} left
          </Badge>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-end justify-between">
          <div>
            <div className="text-3xl font-bold">{used}</div>
            <div className="text-sm text-muted-foreground">
              of {limit} questions
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-semibold">
              {percentage.toFixed(0)}%
            </div>
            <div className="text-xs text-muted-foreground">used</div>
          </div>
        </div>
        <Progress value={percentage} className="h-2" />
      </CardContent>
    </Card>
  );
};

export default Usage;
