import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import CodeBlock from "./CodeBlock";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { MCQQuestion } from "@/lib/helpers";

interface Props {
  mcq: MCQQuestion;
  language: string;
  index: number;
  value: string;
  handleChange: (value: string) => void;
}

function McqCard({ mcq, language, index, value, handleChange }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">
          Q{index + 1}: {mcq.question}
        </CardTitle>
        <CardDescription>
          {language && mcq.code && (
            <CodeBlock language={language} code={mcq.code?.trim()} />
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <RadioGroup
            className="flex flex-col gap-5"
            onValueChange={(value) => handleChange(value)}
          >
            {mcq.options?.map((option, idx) => (
              <div key={`q-${index + 1}-${idx + 1}`} className="flex space-x-2">
                <RadioGroupItem
                  value={idx.toString()}
                  id={`q${index + 1}-o${idx + 1}`}
                  checked={value === option}
                />
                <Label htmlFor={`q${index + 1}-o${idx + 1}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
          <Button
            variant="outline"
            className="self-end"
            onClick={() => handleChange("")}
          >
            Clear
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default McqCard;
