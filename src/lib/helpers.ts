export const languages = ["python", "java", "cpp", "c", "javascript", "sql"];

export const difficulty = ["easy", "intermediate", "hard"];

export const mcqOptions = ["5", "10", "15", "20"];

export const codingOptions = ["0", "1", "2", "3", "4", "5"];

export type MCQQuestion = {
  question: string;
  options: string[];
  answer: string;
  codeblock?: string;
};

export type CodingQuestion = {
  question: string;
  inputFormat?: string;
  outputFormat?: string;
  constraints?: string;
  exampleInput?: string;
  exampleOutput?: string;
  codeblock?: string;
};

type ParsedTest = {
  name: string;
  mcqQuestions: MCQQuestion[];
  codingQuestions: CodingQuestion[];
};

export function parseTestData(input: string): ParsedTest {
  const lines = input.split('\n');
  const name = lines[0].replace(/^###|###$/g, '').trim();

  const mcqQuestions: MCQQuestion[] = [];
  const codingQuestions: CodingQuestion[] = [];

  let currentSection = '';
  let current: Partial<MCQQuestion & CodingQuestion> = {};
  let codeblock = false;
  let codeLines: string[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line === '---') {
      if (currentSection === 'MCQ' && current.question) {
        mcqQuestions.push(current as MCQQuestion);
      } else if (currentSection === 'CODING' && current.question) {
        codingQuestions.push(current as CodingQuestion);
      }
      current = {};
      codeblock = false;
      codeLines = [];
      continue;
    }

    if (line.startsWith('###')) {
      currentSection = line.replace(/###/g, '').trim();
      continue;
    }

    if (line.includes('!!!')) {
      const split = line.split('!!!');
      // Handle single-line codeblocks like: Codeblock: !!! code here !!!
      if (split.length === 3) {
        const code = split[1].trim();
        current.codeblock = code;
      } else {
        codeblock = !codeblock;
        if (!codeblock && codeLines.length > 0) {
          current.codeblock = codeLines.join('\n');
          codeLines = [];
        }
      }
      continue;
    }

    if (codeblock) {
      codeLines.push(line);
      continue;
    }

    if (currentSection === 'MCQ') {
      if (line.startsWith('Question:')) {
        current.question = line.replace('Question:', '').trim();
      } else if (line.startsWith('Options:')) {
        current.options = line.replace('Options:', '').split(',').map(opt => opt.trim());
      } else if (line.startsWith('Answer:')) {
        current.answer = line.replace('Answer:', '').trim();
      }
    }

    if (currentSection === 'CODING') {
      if (line.startsWith('Question:')) {
        current.question = line.replace('Question:', '').trim();
      } else if (line.startsWith('Expected Input Format:')) {
        current.inputFormat = line.replace('Expected Input Format:', '').trim();
      } else if (line.startsWith('Expected Output Format:')) {
        current.outputFormat = line.replace('Expected Output Format:', '').trim();
      } else if (line.startsWith('Constraints:')) {
        current.constraints = line.replace('Constraints:', '').trim();
      } else if (line.startsWith('Example Input:')) {
        current.exampleInput = line.replace('Example Input:', '').trim();
      } else if (line.startsWith('Example Output:')) {
        current.exampleOutput = line.replace('Example Output:', '').trim();
      }
    }
  }

  if (currentSection === 'MCQ' && current.question) {
    mcqQuestions.push(current as MCQQuestion);
  } else if (currentSection === 'CODING' && current.question) {
    codingQuestions.push(current as CodingQuestion);
  }

  return { name, mcqQuestions, codingQuestions };
}


export async function generateTest(testId: string, onMessage: (chunk: string) => void) {
  const res = await fetch(`/api/test/${testId}/questions`, {
    method: 'POST',
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
