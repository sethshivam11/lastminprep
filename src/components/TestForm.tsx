import {
  CodingAnswer,
  CodingQuestion,
  MCQAnswer,
  MCQQuestion,
} from "@/lib/helpers";
import React, { useState } from "react";
import McqCard from "./McqCard";
import CodingCard from "./CodingCard";
import SubmitDialog from "./SubmitDialog";
import { toast } from "sonner";
import { submitTest } from "@/services/tests";
import { useRouter } from "next/navigation";
import { Code, HelpCircle } from "lucide-react";
import { Badge } from "./ui/badge";

interface Answers {
  mcqs: MCQAnswer[];
  coding: CodingAnswer[];
}

function TestForm({
  mcqs,
  coding,
  isLoading,
  language,
  testId,
}: {
  mcqs: MCQQuestion[];
  coding: CodingQuestion[];
  isLoading: boolean;
  language: string;
  testId: string;
}) {
  const router = useRouter();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [answers, setAnswers] = useState<Answers>({
    mcqs: [],
    coding: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    value: string,
    index: number,
    isCoding: boolean = false
  ) => {
    if (answers.mcqs.length === 0 && answers.coding.length === 0) {
      const mcqsStructure = mcqs.map((question) => ({
        question: question.question,
        answer: "",
        correct: false,
      }));
      const codingStructure = coding.map((question) => ({
        answer: "",
        exampleInput: question.exampleInput || "",
        exampleOutput: question.exampleOutput || "",
        constraints: question.constraints || "",
        inputFormat: question.inputFormat || "",
        outputFormat: question.outputFormat || "",
        question: question.question,
      }));
      setAnswers({
        mcqs: mcqsStructure,
        coding: codingStructure,
      });
    }

    if (isCoding) {
      setAnswers((prev) => ({
        ...prev,
        coding: prev.coding.map((ans, idx) => {
          if (idx === index) return { ...ans, answer: value };
          else return ans;
        }),
      }));
    } else {
      setAnswers((prev) => ({
        ...prev,
        mcqs: prev.mcqs.map((ans, idx) => {
          const optionIndex = parseInt(value);
          if (idx === index && optionIndex >= 0) {
            const answer = mcqs[index].options[parseInt(value)];
            const correct = mcqs[index].answer === answer;
            return {
              ...ans,
              answer,
              correct,
            };
          } else return ans;
        }),
      }));
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const body: { mcqs: MCQAnswer[]; coding: CodingAnswer[] } = {
      mcqs: answers.mcqs,
      coding: answers.coding.map((codingAnswer) => ({
        question: codingAnswer.question,
        answer: codingAnswer.answer,
      })),
    };
    const response = await submitTest(testId, body);
    localStorage.removeItem(`test-${testId}`);
    setIsSubmitting(false);
    setDialogOpen(false);
    if (response?.success) {
      toast.success("Test submitted successfully!");
      router.push(`/attempt/${response.data._id}`);
    } else {
      const action = response.message.includes("exceeded")
        ? {
            label: "Check Usage",
            onClick: () => router.push("/usage"),
          }
        : undefined;
      const description =
        response.data?.description || "Please try again later.";
      toast.error(response.message, {
        description,
        action,
      });
    }
  };

  return (
    <>
      {mcqs.length > 0 && (
        <>
          <div className="flex items-center gap-2 pt-6">
            <HelpCircle className="h-6 w-6 text-green-600" />
            <h2 className="text-2xl font-semibold">
              Multiple Choice Questions
            </h2>
            <Badge variant="secondary">{mcqs.length} questions</Badge>
          </div>
          {mcqs.map((mcq, index) => (
            <McqCard
              mcq={mcq}
              language={language}
              value={answers.mcqs[index]?.answer || ""}
              handleChange={(value) => handleChange(value, index)}
              index={index}
              key={`mcq-${index}`}
            />
          ))}
        </>
      )}

      {coding.length > 0 && (
        <>
          <div className="flex items-center gap-2 pt-6">
            <Code className="h-6 w-6 text-purple-600" />
            <h2 className="text-2xl font-semibold">Coding Questions</h2>
            <Badge variant="secondary">{coding.length} questions</Badge>
          </div>
          {coding.map((coding, index) => (
            <CodingCard
              coding={coding}
              index={index}
              value={answers.coding[index]?.answer || ""}
              handleChange={(value) => handleChange(value, index, true)}
              key={`coding-${index}`}
            />
          ))}
        </>
      )}
      {!isLoading && (
        <SubmitDialog
          open={dialogOpen}
          setOpen={setDialogOpen}
          handleSubmit={handleSubmit}
          loading={isSubmitting}
        />
      )}
    </>
  );
}

export default TestForm;
