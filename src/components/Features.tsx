import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart3, Brain, Code } from "lucide-react";
import React from "react";

function Features() {
  const features = [
    {
      title: "AI-Generated Questions",
      description: (
        <>
          Our
          <span className="text-teal-500">
            &nbsp;AI creates questions&nbsp;
          </span>
          that match real interview patterns from top tech companies.
        </>
      ),
      icon: <Brain className="h-10 w-10 mb-6 text-teal-500" />,
      card: "bg-teal-100/50 dark:bg-teal-950/40 hover:bg-teal-100 dark:hover:bg-teal-950/80 shadow-none border border-teal-500 dark:border-teal-900 transition-all duration-300",
    },
    {
      title: "Instant Evaluation",
      description: (
        <>
          Get immediate feedback on your code solutions. Our
          <span className="text-amber-500">
            &nbsp;AI evaluates your code&nbsp;
          </span>
          for correctness, efficiency, and best practices in real-time.
        </>
      ),
      icon: <Code className="h-10 w-10 mb-2 text-amber-500" />,
      card: "bg-amber-100/50 dark:bg-amber-950/40 hover:bg-amber-100/80 dark:hover:bg-amber-950/80 shadow-none border border-amber-500 dark:border-amber-900 transition-all duration-300",
    },
    {
      title: "Performance Insights",
      description: (
        <>
          <span className="text-green-500">Visualize your strengths&nbsp;</span>
          and weaknesses across different topics and question types.
        </>
      ),
      icon: <BarChart3 className="h-10 w-10 mb-2 text-green-500" />,
      card: "bg-green-100/50 dark:bg-green-950/40 hover:bg-green-100 dark:hover:bg-green-950/80 shadow-none border border-green-500 dark:border-green-900 transition-all duration-300",
    },
  ];

  return (
    <section
      id="features"
      className="w-full py-12 md:py-24 lg:py-32 bg-muted/50"
    >
      <div className="px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Features
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Everything you need to prepare for your next coding interview
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
          {features.map((feature, index) => (
            <Card key={index} className={feature.card}>
              <CardHeader>
                {feature.icon}
                <CardTitle className="text-xl tracking-tight font-semibold">
                  {feature.title}
                </CardTitle>
                <CardDescription className="text-black dark:text-white text-base">
                  {feature.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
