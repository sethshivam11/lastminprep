import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { CodingQuestion } from "@/lib/helpers";

interface Props {
  coding: CodingQuestion;
  value: string;
  index: number;
  handleChange: (value: string) => void;
}

function CodingCard({ coding, value, index, handleChange }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">
          Q{index + 1}: {coding.question}
        </CardTitle>
        <CardDescription className="flex flex-col gap-2 pt-2 select-none">
          {(coding.exampleInput || coding.exampleOutput) && (
            <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg border border-l-4 border-green-400 dark:border-green-900">
              <h4 className="font-semibold text-lg text-green-800 dark:text-green-600 mb-1">
                Example
              </h4>
              <div className="flex items-start justify-center gap-2 mb-1">
                {coding.exampleInput && (
                  <div className="flex flex-col gap-1 w-full">
                    <p className="text-sm font-medium text-green-700 text-wrap">Input:</p>
                    <pre className="bg-white dark:bg-black p-2 rounded text-sm text-gray-800 dark:text-gray-200 border select-text text-wrap">
                      {coding.exampleInput}
                    </pre>
                  </div>
                )}

                {coding.exampleOutput && (
                  <div className="flex flex-col gap-1 w-full">
                    <p className="text-sm font-medium text-green-700 text-wrap">
                      Output:
                    </p>
                    <pre className="bg-white dark:bg-black p-2 rounded text-sm text-gray-800 dark:text-gray-200 border select-text text-wrap">
                      {coding.exampleOutput}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          )}
          {coding.constraints && (
            <div className="space-y-4">
              <div className="bg-orange-50 dark:bg-orange-950/20 p-4 rounded-lg border border-l-4 border-orange-400 dark:border-orange-900/50">
                <h4 className="font-semibold text-lg text-orange-600 dark:text-amber-600 mb-1">
                  Constraints
                </h4>
                <p className="text-orange-500 dark:text-amber-700 text-sm">
                  {coding.constraints}
                </p>
              </div>
            </div>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Textarea
          placeholder="Write your code here"
          className="min-h-[200px] mb-2"
          value={value}
          onChange={(e) => handleChange(e.target.value)}
        />
        <Button
          variant="outline"
          className="float-right mb-4"
          onClick={() => handleChange("")}
        >
          Clear
        </Button>
      </CardContent>
    </Card>
  );
}

export default CodingCard;
