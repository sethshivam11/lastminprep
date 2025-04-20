import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface MCQ extends Document {
  question: string;
  options: string[];
  answer: string;
  createdAt: Date;
}

export interface Coding extends Document {
  question: string;
  inputFormat: string;
  outputFormat: string;
  constraints: string;
  exampleInput: string;
  exampleOutput: string;
}

export interface TestI extends Document {
  name: string;
  user: ObjectId;
  mcqQuestions: MCQ[];
  codingQuestions: Coding[];
  difficulty: "easy" | "intermediate" | "hard";
  language: string;
  mcqCount: number;
  codingCount: number;
  jobDescription?: string;
  extraDescription?: string;
  attempts: ObjectId[];
}

const MCQSchema: Schema<MCQ> = new Schema({
  question: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const CodingSchema: Schema<Coding> = new Schema({
  question: String,
  inputFormat: String,
  outputFormat: String,
  constraints: String,
  exampleInput: String,
  exampleOutput: String,
});

const TestSchema: Schema<TestI> = new Schema({
  name: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  mcqQuestions: [MCQSchema],
  codingQuestions: [CodingSchema],
  language: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    enum: ["easy", "intermediate", "hard"],
    required: true,
  },
  mcqCount: {
    type: Number,
    required: true,
  },
  codingCount: {
    type: Number,
    required: true,
  },
  jobDescription: String,
  extraDescription: String,
});

const TestModel = (mongoose.models.test ||
  mongoose.model<TestI>("test", TestSchema)) as mongoose.Model<TestI>;

export default TestModel;
