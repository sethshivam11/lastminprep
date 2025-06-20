import { z } from "zod";

const testNameSchema = z.string().max(50, {
  message: "Test name is too long",
});

const createdAtSchema = z.date({
  message: "Invalid date",
});

const languageSchema = z.enum(
  ["javascript", "python", "java", "cpp", "c", "sql"],
  {
    message: "Invalid language",
  }
);

const difficultySchema = z.enum(["easy", "intermediate", "hard"], {
  message: "Invalid difficulty",
});

const jobDescSchema = z
  .string()
  .max(250, {
    message: "Job description is too long",
  })
  .optional();

const extraDescSchema = z
  .string()
  .max(100, {
    message: "Extra description is too long",
  })
  .optional();

const mcqCountSchema = z.enum(["5", "10", "15", "20"], {
  message: "Invalid mcq count",
});

const codingCountSchema = z.enum(["0", "1", "2", "3"], {
  message: "Invalid coding count",
});

export {
  testNameSchema,
  createdAtSchema,
  languageSchema,
  difficultySchema,
  jobDescSchema,
  extraDescSchema,
  mcqCountSchema,
  codingCountSchema,
};
