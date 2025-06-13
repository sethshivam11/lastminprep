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
  handleChange: (value: string) => void;
}

function McqCard({ mcq, language, index }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{mcq.question}</CardTitle>
        <CardDescription>
          {language && mcq.code && (
            <CodeBlock language={language} code={mcq.code?.trim()} />
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <RadioGroup className="flex flex-col gap-5">
            {mcq.options?.map((option, idx) => (
              <div key={`q-${index}-${idx}`} className="flex space-x-2">
                <RadioGroupItem value={option} id={`q-${index}-${idx}`} />
                <Label htmlFor={`q-${index}-${idx}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
          <Button variant="outline" className="self-end">
            Clear
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default McqCard;
