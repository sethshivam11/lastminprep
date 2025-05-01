"use client";

import Guidelines from "@/components/Guidelines";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import CodingCard from "@/components/CodingCard";
import McqCard from "@/components/McqCard";
import SubmitDialog from "@/components/SubmitDialog";
import TimerDialog from "@/components/TimerDialog";
import { parseTestData } from "@/lib/helpers";
import { useCompletion } from "@ai-sdk/react";

function Page() {
  const { id } = useParams<{ id: string }>();
  const { completion, error, setCompletion } =
    useCompletion({
      api: `/api/test/${id}/questions`,
    });

  const [dialogOpen, setDialogOpen] = useState(false);
  const [testDetails, setTestDetails] = useState({
    difficulty: "",
    coding: "",
    mcqCount: 0,
    codingCount: 0,
    language: "",
  });
  const { name, mcqQuestions, codingQuestions } = parseTestData(completion);

  const handleChange = () => {};

  useEffect(() => {
    const test = localStorage.getItem(`test-${id}`);
    if (test) {
      const parsedTest = JSON.parse(test);
      setTestDetails(parsedTest);
    }
  }, []);

  useEffect(() => {
    console.log(error);
    if (error instanceof Error) {
      const response = JSON.parse(error.message) || {
        message: "Something went wrong",
      };
      if (response.message === "Test already has questions") {
        setCompletion(response.data.questions);
      }
    }
  }, [error]);

  return (
    <div className="flex flex-col gap-4 sm:p-10 p-4 max-w-5xl mx-auto min-h-screen">
      <Guidelines />

      <div className="flex justify-between items-center gap-2">
        <div className="space-y-4">
          <h1 className="sm:text-5xl text-3xl tracking-tight font-bold">
            {name}
          </h1>
          <p className="text-sm text-muted-foreground">
            This test has {testDetails.mcqCount} multiple choice questions and{" "}
            {testDetails.codingCount} coding question
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

      {mcqQuestions.length > 0 &&
        mcqQuestions.map((mcq, index) => (
          <McqCard
            mcq={mcq}
            language={testDetails.language}
            handleChange={handleChange}
            key={index}
          />
        ))}
      {codingQuestions.length > 0 &&
        codingQuestions.map((coding, index) => (
          <CodingCard
            coding={coding}
            language={testDetails.language}
            handleChange={handleChange}
            key={index}
          />
        ))}
      <SubmitDialog
        open={dialogOpen}
        setOpen={setDialogOpen}
        handleSubmit={() => {}}
      />
    </div>
  );
}

export default Page;
