import { TestTable } from "@/components/TestTable";
import React from "react";

function Page() {
  return (
    <div className="flex flex-col sm:gap-10 gap-4 sm:p-10 p-4 max-w-8xl mx-auto">
      <h1 className="sm:text-5xl text-3xl tracking-tight font-bold">Tests</h1>
      <TestTable />
    </div>
  );
}

export default Page;
