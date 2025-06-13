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
  handleChange: (value: string) => void;
}

function CodingCard({ coding }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">{coding.question}</CardTitle>
        <CardDescription>
          <div className="flex flex-col gap-2 text-muted-foreground text-sm">
            <p>{coding.exampleInput}</p>
            <p>{coding.exampleOutput}</p>
            <p>{coding.constraints}</p>
            <p>{coding.inputFormat}</p>
            <p>{coding.outputFormat}</p>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Textarea
          placeholder="Write your code here"
          className="min-h-[200px] mb-2"
          defaultValue={coding.code || ""}
        />
        <Button variant="outline">Clear</Button>
      </CardContent>
    </Card>
  );
}

export default CodingCard;
