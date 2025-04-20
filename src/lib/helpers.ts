export const languages = ["python", "java", "cpp", "c", "javascript", "sql"];

export const difficulty = ["easy", "intermediate", "hard"];

export const mcqOptions = ["5", "10", "15", "20"];

export const codingOptions = ["0", "1", "2", "3", "4", "5"];

type MCQQuestion = {
  question: string;
  options: string[];
  answer: string;
  codeblock?: string;
};

type CodingQuestion = {
  question: string;
  inputFormat?: string;
  outputFormat?: string;
  constraints?: string;
  exampleInput?: string;
  exampleOutput?: string;
};

type ParsedTest = {
  name: string;
  mcqQuestions: MCQQuestion[];
  codingQuestions: CodingQuestion[];
};


export function parseTestData(input: string): ParsedTest {
  const lines = input.split('\n');
  const name = lines[0].trim();

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
      currentSection = '';
      codeblock = false;
      codeLines = [];
      continue;
    }

    if (line.startsWith('###')) {
      currentSection = line.replace(/###/g, '').trim();
      continue;
    }

    if (line === '!!!') {
      codeblock = !codeblock;
      if (!codeblock && currentSection === 'MCQ') {
        current.codeblock = codeLines.join('\n');
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
