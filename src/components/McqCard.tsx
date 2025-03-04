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

interface Props {
  mcq: {
    question: string;
    codeblock: string;
    options: string[];
    answer: string;
    response: string;
  };
  language: string;
  handleChange: (value: string) => void;
}

function McqCard({ mcq, language }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{mcq.question}</CardTitle>
        <CardDescription>
          {language && (
            <CodeBlock language={language} code={mcq.codeblock?.trim()} />
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <RadioGroup className="flex flex-col gap-5">
            {mcq.options?.map((option, index) => (
              <div key={index} className="flex space-x-2">
                <RadioGroupItem value={option} id={`q-${index}`} />
                <Label htmlFor={`q-${index}`}>{option}</Label>
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
