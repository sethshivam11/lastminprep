import { Button } from "./ui/button";
import Link from "next/link";
import {
  Braces,
  Brain,
  Briefcase,
  Code,
  FileText,
  ListTodo,
  PlayCircle,
} from "lucide-react";
import { TestI } from "@/models/test.model";

function TestDetails({ test }: { test: TestI }) {
  return (
    <div className="space-y-4">
      <div className="flex max-sm:flex-col justify-between gap-2 sm:pb-10 py-4">
        <h1 className="sm:text-5xl text-3xl tracking-tight font-bold">
          {test.name}
        </h1>
        <Link
          href={`/test/${test._id}/appearing?questionsPresent=1&mcqs=${test.mcqCount}&coding=${test.codingCount}`}
        >
          <Button size="lg" className="flex items-center gap-2">
            <PlayCircle className="h-20 w-20" />
            Start Test
          </Button>
        </Link>
      </div>
      <div className="grid lg:grid-cols-4 grid-cols-2 gap-4">
        <div className="ring-1 ring-input rounded-lg flex items-center gap-5 py-4 px-6 shadow-sm">
          <div className="text-orange-400">
            <Code className="h-8 w-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-muted-foreground">Language</h3>{" "}
            <p className="capitalize sm:text-2xl text-xl font-semibold">
              {test.language}
            </p>
          </div>
        </div>
        <div className="ring-1 ring-input rounded-lg flex items-center gap-5 py-4 px-6 shadow-sm">
          <div className="text-blue-600">
            <Brain className="h-8 w-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-muted-foreground">Difficulty</h3>{" "}
            <p className="capitalize sm:text-2xl text-xl font-semibold">
              {test.difficulty}
            </p>
          </div>
        </div>
        <div className="ring-1 ring-input rounded-lg flex items-center gap-5 py-4 px-6 shadow-sm">
          <div className="text-pink-600">
            <ListTodo className="h-8 w-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-muted-foreground">MCQs</h3>{" "}
            <p className="capitalize sm:text-2xl text-xl font-semibold">
              {test.mcqCount}
            </p>
          </div>
        </div>
        <div className="ring-1 ring-input rounded-lg flex items-center gap-5 py-4 px-6 shadow-sm">
          <div className="text-purple-500">
            <Braces className="h-8 w-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-muted-foreground">Coding</h3>{" "}
            <p className="capitalize sm:text-2xl text-xl font-semibold">
              {test.codingCount}
            </p>
          </div>
        </div>
      </div>
      <Button className="w-full sm:hidden" asChild>
        <Link
          href={`/test/${test.id}/appearing`}
          className="flex items-center gap-2"
        >
          <PlayCircle className="h-20 w-20" />
          Start Test
        </Link>
      </Button>
      <div className="grid lg:grid-cols-2 gap-4">
        {test.jobDescription && (
          <div className="ring-1 ring-input rounded-lg flex flex-col gap-5 p-6 shadow-sm">
            <div className="text-purple-500 flex gap-4">
              <Briefcase className="h-8 w-8" />
              <h3 className="text-foreground sm:text-2xl text-xl tracking-tight font-semibold">
                Job Description
              </h3>{" "}
            </div>
            <div className="space-y-1">
              <p className="capitalize text-sm font-semibold text-muted-foreground">
                {test.jobDescription}
              </p>
            </div>
          </div>
        )}
        {test.extraDescription && (
          <div className="ring-1 ring-input rounded-lg flex flex-col gap-5 p-6 shadow-sm">
            <div className="text-red-400 flex gap-4">
              <FileText className="h-8 w-8" />
              <h3 className="text-foreground sm:text-2xl text-xl tracking-tight font-semibold">
                Additional Information
              </h3>{" "}
            </div>
            <div className="space-y-1">
              <p className="capitalize text-sm font-semibold text-muted-foreground">
                {test.extraDescription}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TestDetails;
