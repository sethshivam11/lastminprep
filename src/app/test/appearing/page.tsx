"use client";

import Guidelines from "@/components/Guidelines";
import TestSkeleton from "@/components/TestSkeleton";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import McqCard from "@/components/McqCard";
import CodingCard from "@/components/CodingCard";
import SubmitDialog from "@/components/SubmitDialog";

function Page() {
  const query = useSearchParams();

  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [testDetails, setTestDetails] = useState({
    difficulty: "",
    coding: "",
    mcq: "",
    language: "",
  });
  const [stream, setStream] = useState(`JavaScript Beginner Test  
---  
### MCQ ###  
Question: What will be the output of the following code?  
Options: "hello5", "hello5hello", "hellohello", Error  
Answer: "hello5"  
!!!  
let str = "hello";  
console.log(str + 5);  
!!!  
---  
### CODING ###  
Question: Write a function that takes a string and returns the reverse of the string.  
Expected Input Format: A single string containing only lowercase letters.  
Expected Output Format: A single string which is the reversed version of the input string.  
Constraints: The length of the string will be between 1 and 100.  
Example Input: "javascript"  
Example Output: "tpircsavaj"  
!!!  
function reverseString(str) {  
    return str.split("").reverse().join("");  
}  
console.log(reverseString("javascript"));  
!!!  `);
  const [testName, mcqRes, codingRes] = stream.split("---");

  const mcqQuestions = React.useMemo(() => {
    return mcqRes
      .trim()
      .split("### MCQ ###")
      .filter(Boolean)
      .map((mcq) => {
        const lines = mcq.trim().split("\n");
        const question = lines[0]?.replace("Question: ", "").trim();
        const options = lines[1]
          ?.replace("Options: ", "")
          .split(",")
          .map((opt) => opt.trim());
        const answer = lines[2]?.replace("Answer: ", "").trim();
        const codeblock = mcq.split("!!!")[1].replaceAll("!!!", "");
        return { question, codeblock, options, answer, response: "" };
      });
  }, [stream]);
  const codingQuestions = React.useMemo(() => {
    return codingRes
      .trim()
      .split("### CODING ###")
      .filter(Boolean)
      .map((coding) => {
        const lines = coding.trim().split("\n");
        const question = lines[0]?.replace("Question: ", "").trim();
        const inputFormat = lines[1]
          ?.replace("Expected Input Format: ", "")
          .trim();
        const outputFormat = lines[2]
          ?.replace("Expected Output Format: ", "")
          .trim();
        const constraints = lines[3]?.replace("Constraints: ", "").trim();
        const exampleInput = lines[4]?.replace("Example Input: ", "").trim();
        const exampleOutput = lines[5]?.replace("Example Output: ", "").trim();
        const codeblock = coding?.split("!!!")[1]?.replaceAll("!!!", "");

        return {
          question,
          inputFormat,
          outputFormat,
          constraints,
          exampleInput,
          exampleOutput,
          codeblock,
          response: "",
        };
      })
      .filter(Boolean);
  }, [stream]);

  const handleChange = () => {};
  const handleSubmit = () => {};

  useEffect(() => {
    const language = query.get("language") || "javascript";
    const difficulty = query.get("difficulty") || "beginner";
    setTestDetails({ ...testDetails, language, difficulty });
  }, [query]);

  if (loading) {
    return <TestSkeleton />;
  }

  return (
    <div className="flex flex-col sm:gap-10 gap-4 sm:p-10 p-4 max-w-5xl mx-auto">
      <Guidelines />
      <div className="space-y-4">
        <h1 className="sm:text-5xl text-3xl tracking-tight font-bold">
          {testName}
        </h1>
        <p className="text-sm text-muted-foreground">
          This test has {mcqQuestions.length} multiple choice questions and{" "}
          {codingQuestions.length} coding questions in{" "}
          <span className="font-bold text-foreground capitalize">
            {testDetails.language}
          </span>{" "}
          with{" "}
          <span className="font-bold text-foreground capitalize">
            {testDetails.difficulty}
          </span>{" "}
          difficulty .
        </p>
      </div>

      {mcqQuestions.map((mcq, index) => (
        <McqCard
          mcq={mcq}
          language={testDetails.language}
          handleChange={handleChange}
          key={index}
        />
      ))}
      {codingQuestions.map((coding, index) => (
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
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default Page;
