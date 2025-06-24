import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  XCircle,
  Code,
  HelpCircle,
  RotateCcw,
  LayoutDashboard,
} from "lucide-react";
import Link from "next/link";
import { getAttempt } from "@/services/attempt";
import { AttemptI } from "@/models/attempt.model";
import { notFound } from "next/navigation";
import CodeBlock from "@/components/CodeBlock";

export default async function ResultsPage({
  params,
}: {
  params: Promise<{ attemptId: string }>;
}) {
  const { attemptId } = await params;
  const {
    data: attempt,
    success,
  }: {
    data: AttemptI & {
      test: {
        _id: string;
        language: string;
        codingCount: number;
        mcqCount: number;
      };
    };
    success: boolean;
    message: string;
  } = await getAttempt(attemptId);

  if (!attempt || !success) {
    notFound();
  }

  const mcqScore = attempt.mcqScore;
  const totalMcqs = attempt.test.mcqCount;
  const codingScore = attempt.codingScore ?? 0;
  const maxCodingScore = attempt.test.codingCount * 10;

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="sm:text-5xl text-3xl tracking-tight font-bold mb-6">
            Test Results
          </h1>
          <div className="flex flex-wrap gap-4">
            <Card className="flex-1 min-w-[200px]">
              <CardContent>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {mcqScore}/{totalMcqs}
                  </div>
                  <div className="text-sm text-muted-foreground">MCQ Score</div>
                </div>
              </CardContent>
            </Card>
            {attempt.test.codingCount > 0 && (
              <Card className="flex-1 min-w-[200px]">
                <CardContent>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {codingScore}/{maxCodingScore}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Coding Score
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            <Card className="flex-1 min-w-[200px]">
              <CardContent>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {Math.round(
                      ((mcqScore + codingScore) /
                        (totalMcqs + maxCodingScore)) *
                        100
                    )}
                    %
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Overall Score
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-2 mb-6">
            <HelpCircle className="h-6 w-6 text-green-600" />
            <h2 className="text-2xl font-semibold">MCQ Results</h2>
            <Badge variant="secondary">
              {mcqScore}/{totalMcqs} correct
            </Badge>
          </div>

          <div className="space-y-4">
            {attempt.answers?.mcqs.map((mcq, index) => (
              <Card key={index} className="shadow-sm">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg flex-1">
                      Question {index + 1}: {mcq.question}
                    </CardTitle>
                    <div className="flex items-center gap-2 ml-4">
                      {mcq.correct ? (
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-100 dark:hover:bg-green-900">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Correct
                        </Badge>
                      ) : (
                        <Badge variant="destructive">
                          <XCircle className="h-4 w-4 mr-1" />
                          Incorrect
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-100 dark:bg-stone-950 p-3 rounded">
                    <strong>Your Answer:</strong>{" "}
                    {mcq.answer || "No answer provided"}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {attempt.answers.coding.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-6">
              <Code className="h-6 w-6 text-purple-600" />
              <h2 className="text-2xl font-semibold">Coding Results</h2>
              <Badge variant="secondary">
                {codingScore}/{maxCodingScore} marks
              </Badge>
            </div>

            <div className="space-y-6">
              {attempt.answers?.coding.map((coding, index) => (
                <Card key={index} className="shadow-sm">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg flex-1">
                        Problem {index + 1}: {coding.question}
                      </CardTitle>
                      <Badge
                        className={`ml-4 ${
                          coding.marks >= 7
                            ? "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-100 dark:hover:bg-green-900"
                            : coding.marks >= 4
                            ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-100 dark:hover:bg-yellow-900"
                            : "bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900 dark:text-red-100 dark:hover:bg-red-900"
                        }`}
                      >
                        {coding.marks}/10 marks
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-sm">
                      <h4 className="font-semibold text-sm text-muted-foreground mb-2">
                        Your Solution:
                      </h4>
                      <CodeBlock
                        code={coding.answer}
                        language={attempt.test.language || ""}
                      />
                    </div>

                    <div>
                      <h4 className="font-semibold text-sm text-muted-foreground mb-2">
                        AI Feedback:
                      </h4>
                      <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded dark:bg-blue-950 dark:border-blue-500">
                        <p className="text-sm text-blue-800  dark:text-blue-200">
                          {coding.feedback}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-center gap-4">
          <Link href="/dashboard">
            <Button>
              <LayoutDashboard className="h-4 w-4 mr-2" />
              Dashboard
            </Button>
          </Link>
          <Link href={`/test/${attempt.test._id}`}>
            <Button variant="outline">
              <RotateCcw className="h-4 w-4 mr-2" />
              Retake Test
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
