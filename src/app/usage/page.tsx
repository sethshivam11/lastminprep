"use client";

import { Lightbulb, Loader2, TriangleAlert } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Usage from "@/components/Usage";
import PlanInfo from "@/components/PlanInfo";
import { useEffect, useState } from "react";
import { getUsage } from "@/services/user";

export interface Limits {
  daily: number;
  weekly: number;
  monthly: number;
}

function Page() {
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [data, setData] = useState<{
    limits: Limits;
    usage: Limits;
  }>({
    limits: {
      daily: 0,
      weekly: 0,
      monthly: 0,
    },
    usage: {
      daily: 0,
      weekly: 0,
      monthly: 0,
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await getUsage();
      if (response.success) {
        setData(response.data);
        console.log(response.data);
      } else {
        setErrorMessage(response.message || "Failed to fetch usage data");
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  if (errorMessage) {
    return (
      <div className="flex flex-col gap-2 items-center justify-center h-screen">
        <TriangleAlert size="40" />
        <p className="text-muted-foreground">{errorMessage}</p>
      </div>
    );
  } else if (loading) {
    return (
      <div className="flex flex-col gap-2 items-center justify-center h-screen">
        <Loader2 className="animate-spin" size="40" />
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:gap-10 gap-4 sm:p-10 p-4 max-w-7xl mx-auto min-h-screen">
      <h1 className="sm:text-5xl text-3xl tracking-tight font-bold">
        Limits & Usage
      </h1>
      <div className="w-full">
        <PlanInfo limits={data.limits} />
        <Usage limits={data.limits} usage={data.usage} />

        <Card>
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Lightbulb className="text-blue-500" />
              Usage Tips
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <p>
                Generate tests efficiently by being specific with your job
                descriptions and requirements.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <p>
                Mix coding and multiple choice questions to maximize your
                interview preparation.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <p>
                Usage limits reset daily, weekly, and monthly to help you pace
                your preparation.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Page;
