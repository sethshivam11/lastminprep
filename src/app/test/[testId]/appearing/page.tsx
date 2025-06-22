"use client";

import Guidelines from "@/components/Guidelines";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import TimerDialog from "@/components/TimerDialog";
import { parseTestData } from "@/lib/helpers";
import { useCompletion } from "@ai-sdk/react";
import { getTest } from "@/services/tests";
import { Loader2 } from "lucide-react";
import TestForm from "@/components/TestForm";

function Page() {
  const query = useSearchParams();
  const { testId } = useParams<{ testId: string }>();
  const { completion, error, setCompletion, complete, isLoading } =
    useCompletion({
      api: `/api/test/${testId}/questions`,
    });

  const [isQuestionsPresent, setIsQuestionsPresent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [testDetails, setTestDetails] = useState({
    difficulty: "",
    coding: "",
    mcqCount: 0,
    codingCount: 0,
    language: "",
  });

  const { name, mcqs, coding } = parseTestData(completion, isQuestionsPresent);

  const handleQuestionsPresent = async (testDetailsPresent: boolean = true) => {
    const response = await getTest(testId);
    if (response?.success) {
      setIsQuestionsPresent(true);
      setCompletion(JSON.stringify(response.data));
      if (!testDetailsPresent) {
        setTestDetails({
          difficulty: response.data.difficulty,
          coding: response.data.coding,
          mcqCount: response.data.mcqCount,
          codingCount: response.data.codingCount,
          language: response.data.language,
        });
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    const questionsPresent = query.get("questionsPresent");
    if (questionsPresent === "1") {
      handleQuestionsPresent(false);
    } else {
      const test = localStorage.getItem(`test-${testId}`);
      if (test) {
        const parsedTest = JSON.parse(test);
        setTestDetails(parsedTest);
        setLoading(false);
        complete("");
      }
    }
  }, []);

  useEffect(() => {
    if (!error) return;
    if (error instanceof Error) {
      const response = JSON.parse(error.message) || {
        message: "Something went wrong",
      };
      if (response.message === "Test already has questions") {
        handleQuestionsPresent();
      }
      setLoading(false);
    }
  }, [error]);

  return (
    <div className="flex flex-col gap-4 sm:p-10 p-4 max-w-5xl mx-auto min-h-screen">
      <Guidelines />
      {completion.length > 0 && (
        <>
          <div className="flex justify-between items-center gap-2">
            <div className="space-y-4">
              <h1 className="sm:text-5xl text-3xl tracking-tight font-bold">
                {name}
              </h1>
              <p className="text-sm text-muted-foreground">
                This test has {testDetails.mcqCount} multiple choice questions
                and {testDetails.codingCount} coding question
                {testDetails.codingCount > 1 && "s"} in{" "}
                <span className="font-bold text-foreground capitalize">
                  {testDetails.language}
                </span>{" "}
                with{" "}
                <span className="font-bold text-foreground capitalize">
                  {testDetails.difficulty}
                </span>{" "}
                difficulty.
              </p>
            </div>
            <TimerDialog />
          </div>
          <TestForm
            isLoading={isLoading}
            coding={coding}
            mcqs={mcqs}
            language={testDetails.language}
            testId={testId}
          />
        </>
      )}
      {loading && completion.length == 0 && (
        <div className="flex flex-col justify-center items-center h-screen">
          <Loader2 className="animate-spin" size="40" />
          <p className="text-muted-foreground text-sm mt-2">
            Loading questions...
          </p>
        </div>
      )}
    </div>
  );
}

export default Page;
