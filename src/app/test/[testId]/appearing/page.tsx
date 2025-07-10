"use client";

import Guidelines from "@/components/Guidelines";
import { notFound, useParams, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import TimerDialog from "@/components/TimerDialog";
import { getQuestions } from "@/services/tests";
import { Loader2, TriangleAlert } from "lucide-react";
import TestForm from "@/components/TestForm";
import GeneratingAnimation from "@/components/GeneratingAnimation";
import { Button } from "@/components/ui/button";

function Page() {
  const query = useSearchParams();
  const { testId } = useParams<{ testId: string }>();
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [questionsCount, setQuestionsCount] = useState({
    mcqs: 0,
    coding: 0,
  });
  const [retryCount, setRetryCount] = useState(0);
  const [test, setTest] = useState({
    name: "",
    user: "",
    questions: {
      mcqs: [],
      coding: [],
    },
    difficulty: "",
    language: "",
    mcqCount: 0,
    codingCount: 0,
    jobDescription: "",
    extraDescription: "",
  });

  const fetchQuestions = async (retry: boolean = false) => {
    if (!generating) setGenerating(true);
    if (retry) setRetryCount((prev) => prev + 1);

    const questionsPresent = query.get("questionsPresent");
    if (questionsPresent !== "1") {
      setLoading(false);
      setGenerating(true);
    }

    const response = await getQuestions(testId);
    if (response?.success) {
      setTest(response.data);
    } else {
      setErrorMessage(
        response?.message ||
          `Failed to ${questionsPresent ? "fetch" : "generate"} test questions.`
      );
    }
    setLoading(false);
    setGenerating(false);
  };

  useEffect(() => {
    const mcqs = Number(query.get("mcqs")) || 0;
    const coding = Number(query.get("coding")) || 0;
    setQuestionsCount({
      mcqs,
      coding,
    });

    if (test.questions.mcqs.length > 0 || generating) return;
    fetchQuestions();
  }, []);

  if (errorMessage === "Test not found") {
    notFound();
  }

  return (
    <div className="flex flex-col gap-4 sm:p-10 p-4 max-w-5xl mx-auto min-h-screen">
      <Guidelines />
      {test.questions.mcqs.length > 0 ? (
        <>
          <div className="flex justify-between items-center gap-2">
            <div className="space-y-4">
              <h1 className="sm:text-5xl text-3xl tracking-tight font-bold">
                {test.name}
              </h1>
              <p className="text-sm text-muted-foreground">
                This test has {test.mcqCount} multiple choice questions and{" "}
                {test.codingCount} coding question
                {test.codingCount > 1 && "s"} in{" "}
                <span className="font-bold text-foreground capitalize">
                  {test.language}
                </span>{" "}
                with{" "}
                <span className="font-bold text-foreground capitalize">
                  {test.difficulty}
                </span>{" "}
                difficulty.
              </p>
            </div>
            <TimerDialog />
          </div>
          <TestForm
            isLoading={loading}
            coding={test.questions.coding}
            mcqs={test.questions.mcqs}
            language={test.language}
            testId={testId}
          />
        </>
      ) : loading ? (
        <div className="flex flex-col justify-center items-center h-screen">
          <Loader2 className="animate-spin" size="40" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      ) : errorMessage ? (
        <div className="flex flex-col justify-center items-center h-screen">
          <TriangleAlert size="60" />
          <h3 className="text-xl font-bold tracking-tight mt-2">
            Some Error Occured
          </h3>
          <p className="text-muted-foreground">{errorMessage}</p>
          {retryCount < 3 && (
            <Button onClick={() => fetchQuestions(true)}>Retry</Button>
          )}
        </div>
      ) : (
        generating && (
          <GeneratingAnimation
            language={test.language}
            difficulty={test.difficulty}
            completed={!generating}
            mcqCount={questionsCount.mcqs}
            codingCount={questionsCount.coding}
          />
        )
      )}
    </div>
  );
}

export default Page;
