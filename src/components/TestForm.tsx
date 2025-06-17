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
          if (idx === index)
            return {
              ...ans,
              answer: value,
              correct: value === mcqs[index].answer,
            };
          else return ans;
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
    setIsSubmitting(false);
    setDialogOpen(false);
    if (response?.success) {
      toast.success("Test submitted successfully!");
      router.push(`/attempt/${response._id}`);
    }
  };

  return (
    <>
      {mcqs.length > 0 && (
        <>
          <div className="flex items-center gap-2 mb-6">
            <HelpCircle className="h-6 w-6 text-green-600" />
            <h2 className="text-2xl font-semibold text-gray-900">
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
          <div className="flex items-center gap-2 mb-6">
            <Code className="h-6 w-6 text-purple-600" />
            <h2 className="text-2xl font-semibold text-gray-900">
              Coding Questions
            </h2>
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
