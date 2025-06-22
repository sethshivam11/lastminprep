"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { TestI } from "@/models/test.model";
import { Loader2, PlayCircle } from "lucide-react";
import { useRouter } from "next/navigation";

function StartTest({ test }: { test: TestI }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleStart = () => {
    localStorage.setItem(`test-${test._id}`, JSON.stringify(test));
    setLoading(true);
    router.push(`/test/${test._id}/appearing?questionsPresent=1`);
  };

  return (
    <Button
      size="lg"
      className="flex items-center gap-2"
      onClick={handleStart}
      disabled={loading}
    >
      {loading ? (
        <>
          <Loader2 className="animate-spin" /> Starting...
        </>
      ) : (
        <>
          <PlayCircle className="h-20 w-20" />
          Start Test
        </>
      )}
    </Button>
  );
}

export default StartTest;
