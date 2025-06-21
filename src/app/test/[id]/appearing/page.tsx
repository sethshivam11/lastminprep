"use client";

import Guidelines from "@/components/Guidelines";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import TimerDialog from "@/components/TimerDialog";
import { parseTestData } from "@/lib/helpers";
import { useCompletion } from "@ai-sdk/react";
import { getTest } from "@/services/tests";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import TestForm from "@/components/TestForm";

function Page() {
  const { id } = useParams<{ id: string }>();
  const { completion, error, setCompletion, complete, isLoading } =
    useCompletion({
      api: `/api/test/${id}/questions`,
    });

  const [isQuestionsPresent, setIsQuestionsPresent] = useState(false);
  const [testDetails, setTestDetails] = useState({
    difficulty: "",
    coding: "",
    mcqCount: 0,
    codingCount: 0,
    language: "",
  });

  const { name, mcqs, coding } = parseTestData(completion, isQuestionsPresent);

  const handleQuestionsPresent = async () => {
    const response = await getTest(id);
    if (response?.success) {
      setIsQuestionsPresent(true);
      setCompletion(JSON.stringify(response.data));
    }
  };

  const getQuestions = async () => {
    try {
      complete("");
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        toast.error(
          error.message || "Something went wrong while generating questions"
        );
      }
    }
  };

  useEffect(() => {
    const test = localStorage.getItem(`test-${id}`);
    if (test) {
      const parsedTest = JSON.parse(test);
      setTestDetails(parsedTest);
      if (!parsedTest.questions || !parsedTest.questions.mcqs?.length) {
        getQuestions();
      } else {
        setIsQuestionsPresent(true);
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
    }
  }, [error]);

  return (
    <div className="flex flex-col gap-4 sm:p-10 p-4 max-w-5xl mx-auto min-h-screen">
      <Guidelines />
      {completion ? (
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
            testId={id}
          />
        </>
      ) : (
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
