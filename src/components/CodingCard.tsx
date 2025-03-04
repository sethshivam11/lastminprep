import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import CodeBlock from "./CodeBlock";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

interface Props {
  coding: {
    question: string;
    inputFormat: string;
    outputFormat: string;
    constraints: string;
    exampleInput: string;
    exampleOutput: string;
    codeblock: string;
    response: string;
  };
  language: string;
  handleChange: (value: string) => void;
}

function CodingCard({ coding, language }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">{coding.question}</CardTitle>
        <CardDescription>
          {language && (
            <CodeBlock language={language} code={coding.codeblock?.trim()} />
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Textarea
          placeholder="Write your code here"
          className="min-h-[200px] mb-2"
        />
        <Button variant="outline">Clear</Button>
      </CardContent>
    </Card>
  );
}

export default CodingCard;
