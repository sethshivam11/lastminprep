"use client";

import React from "react";
import { useCompletion } from "ai/react";
import { Loader2 } from "lucide-react";

function Page({}) {
  const { complete, isLoading, completion } = useCompletion({
    api: "/api/test",
    body: {
      mcqCount: 1,
      codingCount: 1,
      language: "javascript",
      difficulty: "easy",
      jobDesc: "",
      extraDesc: "",
    },
  });

  const fetchTest = () => {
    try {
      complete("");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
        <button onClick={() => navigator.clipboard.writeText(completion)}>
            copy
        </button>
      <button onClick={fetchTest} disabled={isLoading} className="bg-stone-800 px-4 py-2 rounded-md text-white flex items-center justify-center disabled:opacity-80">
        {isLoading ? <Loader2 className="animate-spin" /> : "Create Test"}
      </button>
      {completion}
    </div>
  );
}

export default Page;
