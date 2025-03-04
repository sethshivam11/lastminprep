import { ChallengeDifficulty } from "@/components/ChallengeDifficulty";
import { ProblemSolved } from "@/components/ProblemSolved";
import { SolutionAccuracy } from "@/components/SolutionAccuracy";
import { TestTable } from "@/components/TestTable";
import React from "react";

function Page() {
  return (
    <div className="flex flex-col sm:gap-10 gap-4 sm:p-10 p-4 max-w-8xl mx-auto">
      <h1 className="sm:text-5xl text-3xl tracking-tight font-bold">Dashboard</h1>
      <div className="grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-2">
        <ProblemSolved />
        <ChallengeDifficulty />
        <SolutionAccuracy />
      </div>
      <TestTable />
    </div>
  );
}

export default Page;
