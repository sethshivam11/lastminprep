export const languages = ["python", "java", "cpp", "c", "javascript", "sql"];

export const difficulty = ["easy", "intermediate", "hard"];

export const mcqOptions = ["5", "10", "15", "20"];

export const codingOptions = ["0", "1", "2", "3", "4", "5"];

export type MCQQuestion = {
  question: string;
  options: string[];
  answer: string;
  codeblock?: string;
  code?: string;
};

export type CodingQuestion = {
  question: string;
  inputFormat?: string;
  outputFormat?: string;
  constraints?: string;
  exampleInput?: string;
  exampleOutput?: string;
  code?: string;
};

type ParsedTest = {
  name: string;
  mcqs: MCQQuestion[];
  coding: CodingQuestion[];
};

export function parseTestData(
  input: string,
  isJSON: boolean = false
): ParsedTest {
  if (!input) return { name: "", mcqs: [], coding: [] };

  if (isJSON) {
    const output = JSON.parse(input);

    return {
      name: output.name,
      mcqs: output.questions.mcqs,
      coding: output.questions.coding,
    };
  }

  const mcqs: MCQQuestion[] = [];
  const coding: CodingQuestion[] = [];

  const nameMatch = input.match(/"name"\s*:\s*"([^"]*)"/);
  const name = nameMatch ? nameMatch[1] : "";

  // Match MCQs with "code" that can be empty or multiline
  const mcqRegex =
    /{\s*"question"\s*:\s*"([^"]+?)",\s*"code"\s*:\s*"((?:[^"\\]|\\.)*?)",\s*"options"\s*:\s*\[((?:\s*"[^"]*"\s*,?\s*)+)\],\s*"answer"\s*:\s*"([^"]+?)"\s*}/g;

  let match;
  while ((match = mcqRegex.exec(input))) {
    const question = match[1];
    const code = match[2].replace(/\\n/g, "\n").replace(/\\"/g, '"');
    const optionsRaw = match[3];
    const options = optionsRaw
      .split(",")
      .map((opt) => opt.trim().replace(/^"|"$/g, ""));
    const answer = match[4];

    mcqs.push({ question, code, options, answer });
  }

  // Match coding questions with starterCode (renamed from code)
  const codingRegex =
    /{\s*"question"\s*:\s*"([^"]+?)",[^}]*?"exampleInput"\s*:\s*"([^"]*?)",\s*"exampleOutput"\s*:\s*"([^"]*?)",\s*"starterCode"\s*:\s*"((?:[^"\\]|\\.)*?)"\s*}/g;

  while ((match = codingRegex.exec(input))) {
    const question = match[1];
    const exampleInput = match[2];
    const exampleOutput = match[3];
    const starterCode = match[4].replace(/\\n/g, "\n").replace(/\\"/g, '"');

    // Optionally match constraints if present
    const constraintsMatch = input.match(
      new RegExp(
        `"question"\\s*:\\s*"${question.replace(
          /[.*+?^${}()|[\]\\]/g,
          "\\$&"
        )}"[\\s\\S]*?"constraints"\\s*:\\s*"([^"]*?)"`
      )
    );
    const constraints = constraintsMatch ? constraintsMatch[1] : "";

    coding.push({
      question,
      constraints,
      exampleInput,
      exampleOutput,
      code: starterCode,
    });
  }

  return { name, mcqs, coding };
}

export async function generateTest(
  testId: string,
  onMessage: (chunk: string) => void
) {
  const res = await fetch(`/api/test/${testId}/questions`, {
    method: "POST",
  });

  if (!res.body) throw new Error("No response body");

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let done = false;

  while (!done) {
    const { value, done: doneReading } = await reader.read();
    done = doneReading;
    const chunk = decoder.decode(value);
    onMessage(chunk);
  }
}
