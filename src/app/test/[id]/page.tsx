import { CorrectAnswers } from "@/components/CorrectAnswers";
import { ScoreTrends } from "@/components/ScoreTrends";
import { TestAttempts } from "@/components/TestAttempts";
import TestDetails from "@/components/TestDetails";
import { Test } from "@/components/TestTable";

function Page() {
  // { params }: { params: { id: string } }
  const test: Test = {
    id: "4",
    name: "Data Analyst",
    difficulty: "hard",
    language: "python",
    createdAt: "2025-01-02T01:23:25.519Z",
    attempts: 3,
    mcq: 10,
    coding: 2,
  };

  return (
    <div className="flex flex-col sm:gap-10 gap-4 sm:p-10 p-4 max-w-7xl mx-auto min-h-screen">
      <TestDetails test={test} />
      <div className="grid md:grid-cols-2 gap-4">
        <ScoreTrends />
        <CorrectAnswers />
      </div>
      <TestAttempts />
    </div>
  );
}

export default Page;
