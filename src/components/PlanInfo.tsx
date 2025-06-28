import { Check, Zap } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const PlanInfo = ({
  limits,
}: {
  limits: {
    daily: number;
    weekly: number;
    monthly: number;
  };
}) => {
  const features = [
    `${limits.daily} responses per day`,
    `${limits.weekly} responses per week`,
    `${limits.monthly} responses per month`,
    `Coding & Multiple Choice Questions`,
    `Job description customization`,
    `Multiple difficulty levels`,
    `Language preferences`,
  ];

  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl flex items-center gap-2">
              <Zap className="h-5 w-5 text-amber-500" />
              Free Plan Features
            </CardTitle>
            <CardDescription>
              Everything you need to ace your interviews
            </CardDescription>
          </div>
          <Badge
            variant="secondary"
            className="bg-green-100 text-green-700 border-green-200"
          >
            Active
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-3">
              <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
              {feature}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PlanInfo;
