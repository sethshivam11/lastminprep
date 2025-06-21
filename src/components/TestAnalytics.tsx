"use client";

import { useState, useEffect } from "react";
import { ScoreTrends } from "./ScoreTrends";
import { CorrectAnswers } from "./CorrectAnswers";
import { getTestAnalytics } from "@/services/tests";

function TestAnalytics({ testId }: { testId: string }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    scores: [],
    correct: 0,
    total: 0,
  });

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const response = await getTestAnalytics(testId);
      if (response.success) {
        setData(response.data);
      }
      setLoading(false);
    }
    if (!testId) return;
    fetchData();
  }, [testId]);

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <ScoreTrends scores={data.scores} loading={loading} />
      <CorrectAnswers
        correct={data.correct}
        total={data.total}
        loading={loading}
      />
    </div>
  );
}

export default TestAnalytics;
