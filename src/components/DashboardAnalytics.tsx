"use client";

import React, { useEffect, useState } from "react";
import { ChallengeDifficulty } from "./ChallengeDifficulty";
import { SolutionAccuracy } from "./SolutionAccuracy";
import { testsAnalytics } from "@/services/tests";

export interface Difficulties {
  difficulty: string;
  count: number;
}

export interface Attempts {
  correct: number;
  incorrect: number;
  accuracy: number;
}

interface Data {
  difficulties: Difficulties[];
  attempts: Attempts;
}

function DashboardAnalytics() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Data>({
    difficulties: [],
    attempts: {
      correct: 0,
      incorrect: 0,
      accuracy: 0,
    },
  });

  useEffect(() => {
    async function fetchData() {
      const response = await testsAnalytics();
      if (response.success) {
        setData(response.data);
      }
      setLoading(false);
    }
    if (data.difficulties.length > 0) return setLoading(false);
    fetchData();
  }, [data]);

  return (
    <div className="grid sm:grid-cols-2 gap-4 col-span-2">
      <ChallengeDifficulty difficulties={data.difficulties} loading={loading} />
      <SolutionAccuracy attempts={data.attempts} loading={loading} />
    </div>
  );
}

export default DashboardAnalytics;
