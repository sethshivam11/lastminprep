import { Lightbulb } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PlanInfo from "@/components/PlanInfo";
import Usage from "@/components/Usage";

async function page() {
  return (
    <div className="flex flex-col sm:gap-10 gap-4 sm:p-10 p-4 max-w-7xl mx-auto min-h-screen">
      <h1 className="sm:text-5xl text-3xl tracking-tight font-bold">
        Limits & Usage
      </h1>
      <div className="w-full">
        <PlanInfo />

        <Usage />

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
                Generate questions efficiently by being specific with your job
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

export default page;
