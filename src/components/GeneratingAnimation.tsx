"use client";

import { useEffect, useState } from "react";
import { BookOpen, CheckCircle, Code, Zap } from "lucide-react";

export default function GeneratingAnimation({
  language,
  difficulty,
  mcqCount,
  codingCount,
  completed,
}: {
  language: string;
  difficulty: string;
  mcqCount: number;
  codingCount: number;
  completed: boolean;
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const allSteps = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Analyzing Requirements",
      description: `Setting up ${language} questions at ${difficulty} level`,
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Generating MCQ Questions",
      description: `Creating ${mcqCount} multiple choice questions`,
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: "Creating Coding Challenges",
      description: `Preparing ${codingCount} coding problems`,
      condition: codingCount > 0,
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: "Finalizing Test",
      description: "Organizing and optimizing your practice test",
    },
  ];

  const steps = allSteps.filter((step) => step.condition !== false);

  // Estimate total generation time (ms)
  const estimatedTime = mcqCount * 500 + codingCount * 2000 + 2000; // +2s buffer for setup/finalize

  const progressIntervalMs = 100; // how often we update
  const progressStep = (progressIntervalMs / estimatedTime) * 100;

  useEffect(() => {
    if (completed) {
      setProgress(100);
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + progressStep;
      });
    }, progressIntervalMs);

    return () => clearInterval(interval);
  }, [completed, estimatedTime]);

  useEffect(() => {
    if (completed) {
      setCurrentStep(steps.length - 1);
      return;
    }

    const stepInterval = estimatedTime / steps.length;

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        }
        clearInterval(interval);
        return prev;
      });
    }, stepInterval);

    return () => clearInterval(interval);
  }, [completed, estimatedTime, steps.length]);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-stone-900 rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-stone-600 to-stone-400 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
              <div className="animate-spin">
                <Zap className="h-8 w-8 text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-2">Generating Your Test</h2>
            <p className="text-muted-foreground">
              Please wait while we create personalized questions for you
            </p>
          </div>

          <div className="mb-8">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-stone-600 to-stone-500 h-3 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="space-y-4">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex items-center p-4 rounded-xl transition-all duration-500 ${
                  index <= currentStep
                    ? "border border-stone-200"
                    : "border border-stone-500"
                }`}
              >
                <div
                  className={`flex-shrink-0 p-2 rounded-lg mr-4 transition-all duration-500 ${
                    index <= currentStep
                      ? "bg-stone-200 text-black"
                      : "bg-stone-800 text-muted-foreground"
                  }`}
                >
                  {index < currentStep ? (
                    <CheckCircle className="h-6 w-6" />
                  ) : (
                    step.icon
                  )}
                </div>
                <div className="flex-1">
                  <h3
                    className={`font-semibold transition-colors duration-500 ${
                      index <= currentStep ? "" : "text-foreground/60"
                    }`}
                  >
                    {step.title}
                  </h3>
                  <p
                    className={`text-sm transition-colors duration-500 ${
                      index <= currentStep
                        ? "text-muted-foreground"
                        : "text-muted-foreground/60"
                    }`}
                  >
                    {step.description}
                  </p>
                </div>
                {index === currentStep && index < steps.length - 1 && (
                  <div className="flex-shrink-0">
                    <div className="animate-pulse">
                      <div className="w-2 h-2 bg-stone-600 rounded-full"></div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
